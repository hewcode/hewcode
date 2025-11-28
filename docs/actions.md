# Actions

- [When To Use Actions](#when-to-use-actions)
- [How Actions Work](#how-actions-work)
- [Your First Action](#your-first-action)
- [Action Configuration](#action-configuration)
    - [Visual Styling](#visual-styling)
    - [Confirmation Dialogs](#confirmation-dialogs)
    - [Forms in Actions](#forms-in-actions)
    - [Authorization](#authorization)
- [Common Patterns](#common-patterns)
- [Integration with Toasts](#integration-with-toasts)
- [Complete Example](#complete-example)

<a name="when-to-use-actions"></a>
## When To Use Actions

Standalone Actions provide page-level operation buttons that trigger backend operations. Use Hewcode Actions when you need to:

- Add global operation buttons to your pages (create, export, refresh, import)
- Create reusable action definitions with consistent styling and behavior
- Integrate user operations with forms, confirmations, and toast notifications

Actions handle the complete flow from button click to backend execution, including authorization, confirmation dialogs, form collection, and result feedback.

For actions that operate on table rows or selected records, see the [Listing documentation](listing.md#row-actions).

<a name="how-actions-work"></a>
## How Actions Work

When a user clicks an action button, here's the flow:

```
Button Click → Form (optional) → Confirmation (optional) → Backend Execution → Toast Feedback
```

The Action class:
1. Handles the button rendering with appropriate styling and labels
2. Optionally shows a form to collect additional data from the user
3. Optionally requires user confirmation before proceeding
4. Executes your custom action callback with the collected data
5. Can display toast notifications to provide feedback

You define what happens in the action callback, and the Action class manages the UI flow.

<a name="your-first-action"></a>
## Your First Action

Create a basic action that appears as a button on your page:

```php
use Hewcode\Hewcode\Props;
use Hewcode\Hewcode\Actions;

class PostController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('posts/index', Props\Props::for($this)->components(['actions']));
    }

    #[Actions\Expose]
    public function actions(): Actions\Actions
    {
        return Actions\Actions::make([
            Actions\Action::make('create')
                ->label('New Post')
                ->color('primary')
                ->action(fn () => redirect()->route('posts.create')),
        ])->visible(auth()->user()?->can('create-posts') ?? false);
    }
}
```

On the frontend, render the actions:

```tsx
import { Actions } from '@hewcode/react';
import { usePage } from '@inertiajs/react';

export default function Index() {
    const { actions } = usePage().props;
    
    return (
        <div>
            <Actions {...actions} />
            {/* Your other content */}
        </div>
    );
}
```

This creates a primary-colored "New Post" button that redirects to the create page when clicked.

<a name="action-configuration"></a>
## Action Configuration

Actions provide several configuration options to control their appearance and behavior.

<a name="visual-styling"></a>
### Visual Styling

Control the visual appearance of action buttons:

```php
Actions\Action::make('publish')
    ->label('Publish Post')                    // Button text
    ->color('primary')                         // primary, secondary, danger, warning, success
    ->icon('lucide-send')                      // Lucide icon name
    ->size('sm')                               // sm, md, lg
    ->variant('outline')                       // solid (default), outline, ghost
```

**Color meanings:**
- `primary` - Main actions (create, save, confirm)
- `secondary` - Secondary actions (cancel, view)
- `danger` - Destructive actions (delete, remove)
- `warning` - Caution actions (archive, disable)
- `success` - Positive actions (approve, publish)

<a name="confirmation-dialogs"></a>
### Confirmation Dialogs

Add confirmation dialogs for destructive or important actions:

```php
Actions\Action::make('delete')
    ->label('Delete')
    ->color('danger')
    ->requiresConfirmation()
    ->confirmationText('Delete Post?')
    ->confirmationDescription('This action cannot be undone. The post will be permanently removed.')
    ->confirmationIcon('lucide-trash-2')
    ->action(fn (Post $record) => $record->delete());
```

The confirmation dialog will appear when the user clicks the action button, requiring explicit confirmation before executing.

<a name="forms-in-actions"></a>
### Forms in Actions

Collect additional data from users before executing actions:

```php
Actions\Action::make('schedule')
    ->label('Schedule Post')
    ->color('primary')
    ->form([
        Forms\Schema\DateTimePicker::make('publish_at')
            ->label('Publish At')
            ->required()
            ->native(false),
        Forms\Schema\Textarea::make('notes')
            ->label('Notes')
            ->rows(3),
    ])
    ->action(function (Post $record, array $data) {
        $record->update([
            'status' => PostStatus::SCHEDULED,
            'published_at' => $data['publish_at'],
            'notes' => $data['notes'],
        ]);
    });
```

When users click the action, a modal with the form appears. The action receives both the record and the form data.

Customize the modal appearance with headings and descriptions:

```php
Actions\Action::make('schedule')
    ->label('Schedule Post')
    ->color('primary')
    ->modalHeading('Schedule Publication')
    ->modalDescription('Choose when and how to publish this post.')
    ->form([
        Forms\Schema\DateTimePicker::make('publish_at')
            ->label('Publish At')
            ->required()
            ->native(false),
        Forms\Schema\Textarea::make('notes')
            ->label('Notes')
            ->rows(3),
    ])
    ->action(function (Post $record, array $data) {
        $record->update([
            'status' => PostStatus::SCHEDULED,
            'published_at' => $data['publish_at'],
            'notes' => $data['notes'],
        ]);
    });
```

Both `modalHeading()` and `modalDescription()` support static strings or closures for dynamic content:

```php
->modalHeading(fn (Post $record) => "Schedule: {$record->title}")
->modalDescription(fn (Post $record) => "This will be published on {$record->schedule_date}.")
```

<a name="authorization"></a>
### Authorization

Control who can see and use actions:

```php
Actions\Action::make('delete')
    ->label('Delete')
    ->color('danger')
    ->visible(fn (Post $record) => auth()->user()->can('delete', $record))
    ->action(fn (Post $record) => $record->delete());

// For standalone actions
Actions\Actions::make([
    Actions\Action::make('create')
        ->label('New Post')
        ->action(fn () => redirect()->route('posts.create')),
])->visible(auth()->user()?->can('create-posts') ?? false);
```

Use `->visible()` with closures for dynamic authorization or boolean values for static checks.

<a name="common-patterns"></a>
## Common Patterns

These patterns cover typical action use cases.

### Create Operations

```php
// Create action
Actions\Action::make('create')
    ->label('New Post')
    ->color('primary')
    ->action(fn () => redirect()->route('posts.create'));
```

### Import Operations

```php
Actions\Action::make('import')
    ->label('Import Posts')
    ->color('secondary')
    ->form([
        Forms\Schema\FileUpload::make('file')
            ->label('CSV File')
            ->acceptedFileTypes(['text/csv'])
            ->required(),
    ])
    ->action(function (array $data) {
        $this->importPosts($data['file']);
        
        Toast::make()
            ->title('Import Started')
            ->message('Posts are being imported in the background.')
            ->success()
            ->send();
    });
```

### Data Export

```php
Actions\Action::make('export_all')
    ->label('Export All Posts')
    ->color('secondary')
    ->action(function () {
        $filename = 'posts-export-' . now()->format('Y-m-d') . '.csv';
        
        return response()->streamDownload(function () {
            $file = fopen('php://output', 'w');
            fputcsv($file, ['ID', 'Title', 'Status', 'Created']);
            
            Post::chunk(1000, function ($posts) use ($file) {
                foreach ($posts as $post) {
                    fputcsv($file, [
                        $post->id,
                        $post->title,
                        $post->status->value,
                        $post->created_at->format('Y-m-d'),
                    ]);
                }
            });
            
            fclose($file);
        }, $filename);
    });
```

<a name="integration-with-toasts"></a>
## Integration with Toasts

Actions work seamlessly with [toast notifications](toasts.md) to provide user feedback:

```php
Actions\Action::make('sync_data')
    ->label('Sync External Data')
    ->color('primary')
    ->action(function () {
        try {
            $this->syncExternalData();
            
            Toast::make()
                ->title('Data Synced')
                ->message('External data has been successfully synchronized.')
                ->success()
                ->send();
                
        } catch (Exception $e) {
            Toast::make()
                ->title('Sync Failed')
                ->message('Please try again or contact support.')
                ->error()
                ->send();
        }
    });
```

Toast notifications appear automatically after action execution, providing clear feedback about success or failure.

<a name="complete-example"></a>
## Complete Example

Here's a comprehensive example showing standalone actions:

```php
use Hewcode\Hewcode\Props;
use Hewcode\Hewcode\Lists;
use Hewcode\Hewcode\Actions;
use Hewcode\Hewcode\Forms;
use Hewcode\Hewcode\Toasts\Toast;
use Illuminate\Support\Collection;

class PostController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('posts/index', 
            Props\Props::for($this)->components(['posts', 'actions'])
        );
    }



    #[Actions\Expose]
    public function actions(): Actions\Actions
    {
        return Actions\Actions::make([
            Actions\Action::make('create')
                ->label('New Post')
                ->color('primary')
                ->icon('lucide-plus')
                ->action(fn () => redirect()->route('posts.create')),
            
            Actions\Action::make('import')
                ->label('Import Posts')
                ->color('secondary')
                ->form([
                    Forms\Schema\FileUpload::make('file')
                        ->label('CSV File')
                        ->acceptedFileTypes(['text/csv'])
                        ->required(),
                ])
                ->action(function (array $data) {
                    $this->importPosts($data['file']);
                    
                    Toast::make()
                        ->title('Import Started')
                        ->message('Posts are being imported in the background.')
                        ->success()
                        ->send();
                }),
                
            Actions\Action::make('export_all')
                ->label('Export All')
                ->color('secondary')
                ->action(fn () => $this->exportAllPosts()),
        ])->visible(auth()->user()?->can('manage-posts') ?? false);
    }

    private function importPosts($file)
    {
        // Implementation for importing posts
    }
    
    private function exportAllPosts()
    {
        // Implementation for exporting all posts
        return response()->download($this->generateCsv());
    }
}
```