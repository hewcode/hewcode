<?php

namespace Hewcode\Hewcode\Mcp\Tools;

use Illuminate\Contracts\JsonSchema\JsonSchema;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use Laravel\Mcp\Request;
use Laravel\Mcp\Response;
use Laravel\Mcp\Server\Tool;

class CreateListingTool extends Tool
{
    /**
     * The tool's description.
     */
    protected string $description = 'Creates a Hewcode Listing definition class with columns, filters, actions, and other configurations. Use this to scaffold data table views for Eloquent models.';

    /**
     * Handle the tool request.
     */
    public function handle(Request $request): Response
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'model' => 'required|string',
            'columns' => 'array',
            'columns.*.name' => 'required|string',
            'columns.*.type' => 'string|in:text,image,badge,datetime,date,boolean',
            'columns.*.sortable' => 'boolean',
            'columns.*.searchable' => 'boolean',
            'filters' => 'array',
            'actions' => 'array',
            'relationships' => 'array',
            'generate' => 'boolean',
        ]);

        $name = $validated['name'];
        $model = $validated['model'];
        $columns = $validated['columns'] ?? [];
        $filters = $validated['filters'] ?? [];
        $actions = $validated['actions'] ?? [];
        $relationships = $validated['relationships'] ?? [];
        $generate = $validated['generate'] ?? false;

        // Ensure name ends with "Listing"
        if (! Str::endsWith($name, 'Listing')) {
            $name .= 'Listing';
        }

        $path = app_path('Hewcode/Listings/'.$name.'.php');

        // Check if file exists
        if (File::exists($path)) {
            return Response::error("Listing already exists at {$path}. Use a different name or delete the existing file.");
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
        if (! empty($columns)) {
            $config = ['columns' => $columns];
            $commandOptions['--config'] = json_encode($config);
        }

        // Call hew:listing command
        $exitCode = Artisan::call('hew:listing', $commandOptions);

        if ($exitCode !== 0) {
            return Response::error("Failed to generate listing. Artisan command exited with code {$exitCode}.");
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
                ->description('The Listing class name (e.g., "UserListing" or "User"). Will automatically append "Listing" if not present.')
                ->required(),

            'model' => $schema->string()
                ->description('The Eloquent model class name (e.g., "User", "App\\Models\\Post")')
                ->required(),

            'columns' => $schema->array()
                ->description('Array of column definitions for the data table.')
                ->items($schema->object()
                    ->properties([
                        'name' => $schema->string()
                            ->description('Column name (e.g., "title", "email", "created_at")')
                            ->required(),
                        'type' => $schema->string()
                            ->enum(['text', 'image', 'badge', 'datetime', 'date', 'boolean'])
                            ->description('Column type: text, image, badge, datetime, date, or boolean')
                            ->default('text'),
                        'sortable' => $schema->boolean()
                            ->description('Whether the column is sortable')
                            ->default(false),
                        'searchable' => $schema->boolean()
                            ->description('Whether the column is searchable')
                            ->default(false),
                    ])
                ),

            'filters' => $schema->array()
                ->description('Array of filter field names to add to the listing')
                ->items($schema->string()),

            'actions' => $schema->array()
                ->description('Array of action names (e.g., ["edit", "delete", "view"])')
                ->items($schema->string()),

            'relationships' => $schema->array()
                ->description('Array of relationships to eager load (e.g., ["author", "category"])')
                ->items($schema->string()),

            'generate' => $schema->boolean()
                ->description('Auto-generate columns from model\'s database table schema')
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

   use App\Hewcode\Listings\\{$name};

   #[Lists\Expose]
   public function listing(): Lists\Listing
   {
       return {$name}::make('listing');
   }

2. Register the controller method in your Inertia page props:

   Props\Props::for(\$this)
       ->components(['listing'])

3. Use the DataTable component in your frontend:

   import DataTable from '@hewcode/react/components/listing/DataTable';

   const { listing } = usePage().props;
   return <DataTable {...listing} />;

4. Customize columns, filters, and actions in {$relativePath}

Note: Column labels will auto-generate from locale files (app.{model}.columns.column_name).
Remember to set proper visibility/authorization checks if needed.
EOT;
    }
}
