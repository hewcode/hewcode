<?php

namespace Hewcode\Hewcode\Mcp\Tools;

use Illuminate\Contracts\JsonSchema\JsonSchema;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use Laravel\Mcp\Request;
use Laravel\Mcp\Response;
use Laravel\Mcp\Server\Tool;

class CreateResourceTool extends Tool
{
    /**
     * The tool's description.
     */
    protected string $description = 'Creates a complete Hewcode Resource with listing and form methods. This generates a full CRUD interface including index, create, and edit pages. Optionally creates separate ListingDefinition and FormDefinition classes for reusability.';

    /**
     * Handle the tool request.
     */
    public function handle(Request $request): Response
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'model' => 'required|string',
            'panels' => 'nullable|array',
            'panels.*' => 'string',
            'listing_config' => 'array',
            'form_config' => 'array',
            'generate_definitions' => 'boolean',
            'generate' => 'boolean',
        ]);

        $name = $validated['name'];
        $model = $validated['model'];
        $panels = $validated['panels'] ?? null;
        $listingConfig = $validated['listing_config'] ?? [];
        $formConfig = $validated['form_config'] ?? [];
        $generateDefinitions = $validated['generate_definitions'] ?? false;
        $generate = $validated['generate'] ?? false;

        // Ensure name ends with "Resource"
        if (! Str::endsWith($name, 'Resource')) {
            $name .= 'Resource';
        }

        $path = app_path('Hewcode/Resources/'.$name.'.php');

        // Check if file exists
        if (File::exists($path)) {
            return Response::error("Resource already exists at {$path}. Use a different name or delete the existing file.");
        }

        $createdFiles = [];

        // Optionally generate separate definitions
        if ($generateDefinitions) {
            // Generate ListingDefinition
            $listingName = str_replace('Resource', 'Listing', $name);
            $listingTool = new CreateListingTool;

            try {
                $listingResponse = $listingTool->handle(new Request([
                    'name' => $listingName,
                    'model' => $model,
                    'columns' => $listingConfig['columns'] ?? [],
                    'filters' => $listingConfig['filters'] ?? [],
                    'actions' => $listingConfig['actions'] ?? [],
                    'relationships' => $listingConfig['relationships'] ?? [],
                    'generate' => $generate,
                ]));

                $createdFiles[] = "app/Hewcode/Listings/{$listingName}.php";
            } catch (\Exception $e) {
                return Response::error('Failed to generate listing: '.$e->getMessage());
            }

            // Generate FormDefinition
            $formName = str_replace('Resource', 'Form', $name);
            $formTool = new CreateFormTool;

            try {
                $formResponse = $formTool->handle(new Request([
                    'name' => $formName,
                    'model' => $model,
                    'fields' => $formConfig['fields'] ?? [],
                    'generate' => $generate,
                ]));

                $createdFiles[] = "app/Hewcode/Forms/{$formName}.php";
            } catch (\Exception $e) {
                return Response::error('Failed to generate form: '.$e->getMessage());
            }
        }

        // Build command options
        $commandOptions = [
            'name' => $name,
            '--model' => $model,
        ];

        if ($panels) {
            $commandOptions['--panels'] = implode(',', $panels);
        }

        if ($generate) {
            $commandOptions['--generate'] = true;
        }

        // Build config JSON if detailed config is provided
        if (! empty($listingConfig) || ! empty($formConfig)) {
            $config = [];
            if (! empty($listingConfig)) {
                $config['listing'] = $listingConfig;
            }
            if (! empty($formConfig)) {
                $config['form'] = $formConfig;
            }
            $commandOptions['--config'] = json_encode($config);
        }

        // Call hew:resource command
        $exitCode = Artisan::call('hew:resource', $commandOptions);

        if ($exitCode !== 0) {
            return Response::error("Failed to generate resource. Artisan command exited with code {$exitCode}.");
        }

        $createdFiles[] = str_replace(base_path().'/', '', $path);

        return Response::text($this->successMessage($name, $model, $createdFiles, $generateDefinitions));
    }

    /**
     * Get the tool's input schema.
     */
    public function schema(JsonSchema $schema): array
    {
        return [
            'name' => $schema->string()
                ->description('The Resource class name (e.g., "ProductResource" or "Product"). Will automatically append "Resource" if not present.')
                ->required(),

            'model' => $schema->string()
                ->description('The Eloquent model class name (e.g., "Product", "App\\Models\\Post")')
                ->required(),

            'panels' => $schema->array()
                ->description('Array of panel names to assign this resource to (e.g., ["admin", "app"]). If not specified, uses the default panel.')
                ->items($schema->string()),

            'listing_config' => $schema->object()
                ->description('Configuration for the listing (data table). Same parameters as create_listing tool.')
                ->properties([
                    'columns' => $schema->array()
                        ->description('Array of column definitions')
                        ->items($schema->object()),
                    'filters' => $schema->array()
                        ->description('Array of filter names')
                        ->items($schema->string()),
                    'actions' => $schema->array()
                        ->description('Array of action names (e.g., ["edit", "delete"])')
                        ->items($schema->string()),
                    'relationships' => $schema->array()
                        ->description('Array of relationships to eager load')
                        ->items($schema->string()),
                ]),

            'form_config' => $schema->object()
                ->description('Configuration for the form. Same parameters as create_form tool.')
                ->properties([
                    'fields' => $schema->array()
                        ->description('Array of field definitions')
                        ->items($schema->object()),
                ]),

            'generate_definitions' => $schema->boolean()
                ->description('Whether to generate separate ListingDefinition and FormDefinition classes for reusability. If false, listing and form are defined inline in the resource.')
                ->default(false),

            'generate' => $schema->boolean()
                ->description('Auto-generate columns and fields from model\'s database table schema')
                ->default(false),
        ];
    }

    protected function successMessage(string $name, string $model, array $createdFiles, bool $generatedDefinitions): string
    {
        $filesSection = collect($createdFiles)->map(fn ($file) => "  - {$file}")->implode("\n");

        $definitionsNote = $generatedDefinitions
            ? "\nNote: Separate Listing and Form definitions were created for reusability."
            : "\nNote: Listing and form are defined inline. Use generate_definitions: true to create separate reusable classes.";

        return <<<EOT
✓ Created {$name} resource

Files created:
{$filesSection}
{$definitionsNote}

The resource includes:
- Index page (listing with data table)
- Create page (form for new records)
- Edit page (form for existing records)

Next steps:
1. The resource is automatically discovered and registered in your panel(s)

2. Access the resource at:
   /{panel-name}/{model-plural}
   Example: /admin/products

3. Navigation is auto-registered with the resource name

4. Customize the resource, listing, and form as needed

5. Run migrations if you haven't already:
   php artisan migrate

The resource is ready to use! Visit your panel to see it in action.
EOT;
    }
}
