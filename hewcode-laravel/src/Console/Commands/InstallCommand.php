<?php

namespace Hewcode\Hewcode\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use Symfony\Component\Console\Attribute\AsCommand;

#[AsCommand(name: 'hew:install')]
class InstallCommand extends Command
{
    protected $signature = 'hew:install
                            {--force : Overwrite existing files without confirmation}
                            {--dry-run : Show what would be changed without making changes}
                            {--skip-npm : Skip npm package installation}';

    protected $description = 'Install Hewcode Laravel package';

    public function handle(): int
    {
        if ($this->option('dry-run')) {
            $this->components->info('Running in dry-run mode - no files will be modified');
            $this->newLine();
        }

        $this->components->info('Installing Hewcode...');

        $this->updateAppFile();
        $this->updateViteConfig();
        $this->updateAppBlade();
        $this->updateAppCss();

        if (! $this->option('dry-run')) {
            if (! $this->option('skip-npm')) {
                $this->installNpmPackages();
            }
            $this->displayNextSteps();
            $this->components->info('Hewcode installation complete!');
        } else {
            $this->newLine();
            $this->components->info('Dry run complete - no files were modified');
        }

        return self::SUCCESS;
    }

    protected function updateAppFile(): void
    {
        // Try to find the app file with various extensions
        $possiblePaths = [
            resource_path('js/app.tsx'),
            resource_path('js/app.ts'),
            resource_path('js/app.jsx'),
            resource_path('js/app.js'),
        ];

        $appFilePath = null;
        foreach ($possiblePaths as $path) {
            if (File::exists($path)) {
                $appFilePath = $path;
                break;
            }
        }

        if (! $appFilePath) {
            $this->components->warn('File not found: resources/js/app.{tsx,ts,jsx,js}');
            $this->components->warn('Make sure you have Inertia.js set up first.');

            return;
        }

        $fileName = basename($appFilePath);
        $content = File::get($appFilePath);

        // Check if already updated
        if (str_contains($content, 'HewcodeProvider')) {
            $this->components->info("✓ {$fileName} already configured");

            return;
        }

        // Ensure CSS is imported
        $cssImportPattern = "/import\s+['\"]\.\.\/css\/app\.css['\"]/";
        if (! preg_match($cssImportPattern, $content)) {
            // Add CSS import at the top of the file, before other imports
            $content = "import '../css/app.css';\n".$content;
        }

        // Add HewcodeProvider import
        if (! str_contains($content, "import HewcodeProvider from '@hewcode/react/layouts/provider'")) {
            $content = preg_replace(
                "/(import.*?from\s+['\"]react['\"];?\n)/",
                "$1import HewcodeProvider from '@hewcode/react/layouts/provider';\n",
                $content
            );
        }

        // Determine file extension for glob patterns
        $extension = pathinfo($appFilePath, PATHINFO_EXTENSION);

        // Update resolve function
        $content = preg_replace(
            '/resolve:\s*\(name\)\s*=>\s*resolvePageComponent\(\s*`\.\/pages\/\$\{name\}\.'.$extension.'`,\s*import\.meta\.glob\([\'"]\.\/pages\/\*\*\/\*\.'.$extension.'[\'"]\)\s*\)/s',
            "resolve: (name) =>\n        resolvePageComponent([`./pages/\${name}.{$extension}`, `../../node_modules/@hewcode/react/src/pages/\${name}.{$extension}`], {\n            ...import.meta.glob('./pages/**/*.{$extension}'),\n            ...import.meta.glob('../../node_modules/@hewcode/react/src/pages/hewcode/**/*.{$extension}'),\n        })",
            $content
        );

        // Wrap App with HewcodeProvider
        $content = preg_replace(
            '/root\.render\(\s*<App\s*\{\.\.\.props\}\s*\/>\s*\)/s',
            "root.render(\n            <HewcodeProvider {...props}>\n                <App {...props} />\n            </HewcodeProvider>\n        )",
            $content
        );

        if ($this->option('dry-run')) {
            $this->components->info("Would update: {$fileName}");
        } elseif ($this->option('force') || $this->components->confirm("Update resources/js/{$fileName}?", true)) {
            File::put($appFilePath, $content);
            $this->components->info("✓ Updated {$fileName}");
        } else {
            $this->components->warn("Skipped {$fileName}");
        }
    }

    protected function updateViteConfig(): void
    {
        // Try to find the vite config file
        $possiblePaths = [
            base_path('vite.config.ts'),
            base_path('vite.config.js'),
        ];

        $viteConfigPath = null;
        foreach ($possiblePaths as $path) {
            if (File::exists($path)) {
                $viteConfigPath = $path;
                break;
            }
        }

        if (! $viteConfigPath) {
            $this->components->warn('File not found: vite.config.{ts,js}');

            return;
        }

        $fileName = basename($viteConfigPath);
        $content = File::get($viteConfigPath);

        // Check if already updated
        if (str_contains($content, "@vitejs/plugin-react")) {
            $this->components->info("✓ {$fileName} already configured");

            return;
        }

        // Add react import
        if (! str_contains($content, "import react from '@vitejs/plugin-react'")) {
            $content = preg_replace(
                "/(import laravel from 'laravel-vite-plugin';?\n)/",
                "$1import react from '@vitejs/plugin-react';\n",
                $content
            );
        }

        // Add react() to plugins array
        $content = preg_replace(
            '/(plugins:\s*\[\s*laravel\([^)]+\),?)/s',
            "$1\n        react(),",
            $content
        );

        if ($this->option('dry-run')) {
            $this->components->info("Would update: {$fileName}");
        } elseif ($this->option('force') || $this->components->confirm("Update {$fileName}?", true)) {
            File::put($viteConfigPath, $content);
            $this->components->info("✓ Updated {$fileName}");
        } else {
            $this->components->warn("Skipped {$fileName}");
        }
    }

    protected function updateAppBlade(): void
    {
        $appBladePath = resource_path('views/app.blade.php');

        if (! File::exists($appBladePath)) {
            $this->components->warn("File not found: {$appBladePath}");

            return;
        }

        $content = File::get($appBladePath);

        // Check if already updated
        if (str_contains($content, 'Hewcode::resolvePageComponent')) {
            $this->components->info('✓ app.blade.php already configured');

            return;
        }

        // Find the app file extension
        $appFileExtension = $this->findAppFileExtension();
        if (! $appFileExtension) {
            $this->components->warn('Could not find app file to determine extension');

            return;
        }

        // Replace @vite directive
        $viteDirective = <<<BLADE
@vite([
    'resources/js/app.{$appFileExtension}',
    \Hewcode\Hewcode\Hewcode::resolvePageComponent([
        "resources/js/pages/{\$page['component']}.{$appFileExtension}",
        "hewcode::pages/{\$page['component']}.{$appFileExtension}"
    ])
])
BLADE;

        $content = preg_replace(
            "/@vite\(\[?\s*['\"]resources\/js\/app\.(tsx|ts|jsx|js)['\"],?\s*\]?\)/s",
            $viteDirective,
            $content
        );

        if ($this->option('dry-run')) {
            $this->components->info('Would update: app.blade.php');
        } elseif ($this->option('force') || $this->components->confirm('Update resources/views/app.blade.php?', true)) {
            File::put($appBladePath, $content);
            $this->components->info('✓ Updated app.blade.php');
        } else {
            $this->components->warn('Skipped app.blade.php');
        }
    }

    protected function updateAppCss(): void
    {
        $appCssPath = resource_path('css/app.css');

        if (! File::exists($appCssPath)) {
            $this->components->warn("File not found: {$appCssPath}");

            return;
        }

        $content = File::get($appCssPath);

        // Check if already updated
        if (str_contains($content, "@import '@hewcode/react/styles/globals.css'")) {
            $this->components->info('✓ app.css already configured');

            return;
        }

        // Add import at the top
        $import = "@import '@hewcode/react/styles/globals.css';\n\n";
        $content = $import.$content;

        if ($this->option('dry-run')) {
            $this->components->info('Would update: app.css');
        } elseif ($this->option('force') || $this->components->confirm('Update resources/css/app.css?', true)) {
            File::put($appCssPath, $content);
            $this->components->info('✓ Updated app.css');
        } else {
            $this->components->warn('Skipped app.css');
        }
    }

    protected function findAppFileExtension(): ?string
    {
        $possiblePaths = [
            resource_path('js/app.tsx') => 'tsx',
            resource_path('js/app.ts') => 'ts',
            resource_path('js/app.jsx') => 'jsx',
            resource_path('js/app.js') => 'js',
        ];

        foreach ($possiblePaths as $path => $extension) {
            if (File::exists($path)) {
                return $extension;
            }
        }

        return null;
    }

    protected function installNpmPackages(): void
    {
        $this->newLine();
        $this->components->info('Installing npm packages...');

        // Check if npm is available
        exec('command -v npm', $output, $returnCode);
        if ($returnCode !== 0) {
            $this->components->warn('npm is not available. Please install npm packages manually:');
            $this->components->warn('npm install @hewcode/react @vitejs/plugin-react');

            return;
        }

        // Check if package.json exists
        if (! File::exists(base_path('package.json'))) {
            $this->components->warn('package.json not found. Skipping npm installation.');

            return;
        }

        $process = proc_open(
            'npm install @hewcode/react @vitejs/plugin-react',
            [
                0 => ['pipe', 'r'],
                1 => ['pipe', 'w'],
                2 => ['pipe', 'w'],
            ],
            $pipes,
            base_path()
        );

        if (is_resource($process)) {
            fclose($pipes[0]);

            while ($line = fgets($pipes[1])) {
                $this->line('  '.$line);
            }

            fclose($pipes[1]);
            fclose($pipes[2]);

            $returnCode = proc_close($process);

            if ($returnCode === 0) {
                $this->components->info('✓ npm packages installed successfully');
            } else {
                $this->components->error('Failed to install npm packages');
                $this->components->warn('Please run manually: npm install @hewcode/react @vitejs/plugin-react');
            }
        }
    }

    protected function displayNextSteps(): void
    {
        $this->newLine();
        $this->components->info('Next steps:');
        $this->newLine();

        $steps = [];

        if ($this->option('skip-npm')) {
            $steps[] = 'Run: npm install @hewcode/react @vitejs/plugin-react';
        }

        $steps[] = 'Run: npm run build';
        $steps[] = 'Check the documentation at packages/docs/ for more details';

        $this->components->bulletList($steps);
    }
}
