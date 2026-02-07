<?php

namespace Hewcode\Hewcode\Mcp\Tools;

use Illuminate\Contracts\JsonSchema\JsonSchema;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use Laravel\Mcp\Request;
use Laravel\Mcp\Response;
use Laravel\Mcp\Server\Tool;

class CreateFormTool extends Tool
{
    /**
     * The tool's description.
     */
    protected string $description = 'Creates a Hewcode Form definition class with fields, validation, and submission logic. Use this to scaffold forms for creating and editing Eloquent models.';

    /**
     * Handle the tool request.
     */
    public function handle(Request $request): Response
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'model' => 'required|string',
            'fields' => 'array',
            'fields.*.name' => 'required|string',
            'fields.*.type' => 'string|in:text_input,textarea,select,date_time_picker,file_upload,toggle,key_value',
            'fields.*.validation' => 'array',
            'fields.*.options' => 'array',
            'generate' => 'boolean',
        ]);

        $name = $validated['name'];
        $model = $validated['model'];
        $fields = $validated['fields'] ?? [];
        $generate = $validated['generate'] ?? false;

        // Ensure name ends with "Form"
        if (! Str::endsWith($name, 'Form')) {
            $name .= 'Form';
        }

        $path = app_path('Hewcode/Forms/'.$name.'.php');

        // Check if file exists
        if (File::exists($path)) {
            return Response::error("Form already exists at {$path}. Use a different name or delete the existing file.");
        }

        // Build command options
        $commandOptions = [
            'name' => $name,
            '--model' => $model,
        ];

        if ($generate) {
            $commandOptions['--generate'] = true;
        }

        // Build config JSON if detailed config is provided
        if (! empty($fields)) {
            $config = ['fields' => $fields];
            $commandOptions['--config'] = json_encode($config);
        }

        // Call hew:form command
        $exitCode = Artisan::call('hew:form', $commandOptions);

        if ($exitCode !== 0) {
            return Response::error("Failed to generate form. Artisan command exited with code {$exitCode}.");
        }

        return Response::text($this->successMessage($name, $model, $path));
    }

    /**
     * Get the tool's input schema.
     */
    public function schema(JsonSchema $schema): array
    {
        return [
            'name' => $schema->string()
                ->description('The Form class name (e.g., "UserForm" or "User"). Will automatically append "Form" if not present.')
                ->required(),

            'model' => $schema->string()
                ->description('The Eloquent model class name (e.g., "User", "App\\Models\\Post")')
                ->required(),

            'fields' => $schema->array()
                ->description('Array of field definitions. Each field represents a form input.')
                ->items($schema->object()
                    ->properties([
                        'name' => $schema->string()
                            ->description('Field name (e.g., "title", "email", "status")')
                            ->required(),
                        'type' => $schema->string()
                            ->enum(['text_input', 'textarea', 'select', 'date_time_picker', 'file_upload', 'toggle', 'key_value'])
                            ->description('Field type: text_input, textarea, select, date_time_picker, file_upload, toggle, or key_value')
                            ->default('text_input'),
                        'validation' => $schema->array()
                            ->description('Laravel validation rules (e.g., ["required", "max:255", "email"])')
                            ->items($schema->string()),
                        'options' => $schema->object()
                            ->description('Field-specific options')
                            ->properties([
                                'enum' => $schema->string()
                                    ->description('Enum class for select options (e.g., "PostStatus")'),
                                'relationship' => $schema->string()
                                    ->description('Relationship name for select (e.g., "category")'),
                                'title_column' => $schema->string()
                                    ->description('Column to display in relationship select (e.g., "name")'),
                                'rows' => $schema->integer()
                                    ->description('Number of rows for textarea'),
                                'multiple' => $schema->boolean()
                                    ->description('Allow multiple selections for select/file upload'),
                                'searchable' => $schema->boolean()
                                    ->description('Enable search for select'),
                                'preload' => $schema->boolean()
                                    ->description('Preload options for relationship select'),
                            ]),
                    ])
                ),

            'generate' => $schema->boolean()
                ->description('Auto-generate fields from model\'s database table schema')
                ->default(false),
        ];
    }

    protected function successMessage(string $name, string $model, string $path): string
    {
        $relativePath = str_replace(base_path().'/', '', $path);

        return <<<EOT
✓ Created {$name} at {$relativePath}

Next steps:
1. Use in your controller:

   use App\Hewcode\Forms\\{$name};

   #[Forms\Expose]
   public function form(): Forms\Form
   {
       return {$name}::make();
   }

2. Register the controller method in your Inertia page props:

   Props\Props::for(\$this)
       ->record(\$model) // Optional: for edit mode
       ->components(['form'])

3. Use the Form component in your frontend:

   import Form from '@hewcode/react/components/form/Form';

   const { form } = usePage().props;
   return <Form {...form} onCancel={() => router.visit('...')} />;

4. Customize fields, validation, and behavior in {$relativePath}

Note: Labels will auto-generate from locale files (app.{model}.columns.field_name).
Remember to set proper visibility/authorization checks if needed.
EOT;
    }
}
