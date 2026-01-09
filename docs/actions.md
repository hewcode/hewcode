# Actions

An even faster way to add actions into your Hewcode-powered Laravel application.

## Getting Started

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

:::danger
Remember to always make sure the visibility of actions is properly set using authorization checks to prevent unauthorized access. Assume that controller middleware and controller method checks are not sufficient.
:::

On the frontend, render the actions:

```tsx
import Actions from '@hewcode/react/components/actions/Actions';
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

## Essentials

Actions provide several configuration options to control their appearance and behavior.

### Visuals

Control the visual appearance of action buttons:

```php
use Hewcode\Hewcode\Support\Enums\Color;

// With Color enum (recommended)
Actions\Action::make('publish')
    ->label('Publish Post')
    ->color(Color::PRIMARY)
    ->icon('lucide-send')
    ->variant('outline');

// With string
Actions\Action::make('publish')
    ->label('Publish Post')
    ->color('primary')  // primary, secondary, danger, warning, success, info
    ->icon('lucide-send');
```

:::tip
Use the `Hewcode\Hewcode\Support\Enums\Color` enum for type-safe color values.
:::

### Links

You can create actions that function as simple links:

```php
use Hewcode\Hewcode\Support\Enums\Color;

Actions\Action::make('view_website')
    ->label('View Website')
    ->color(Color::SECONDARY)
    ->url('https://example.com'),

Actions\Action::make('view_docs')
    ->label('View Documentation')
    ->url('https://docs.example.com')
    ->openInNewTab(),  // Opens in new tab with security attributes
```

### Require Confirmation

Add confirmation dialogs for destructive or important actions:

```php
use Hewcode\Hewcode\Support\Enums\Color;

Actions\Action::make('delete')
    ->label('Delete')
    ->color(Color::DANGER)
    ->requiresConfirmation()
    ->modalHeading('Delete Post?')
    ->modalDescription('This action cannot be undone. The post will be permanently removed.')
    ->action(fn (Post $record) => $record->delete());
```

### Forms in Actions

Collect additional data from users before executing actions:

```php
use Hewcode\Hewcode\Support\Enums\Color;

Actions\Action::make('schedule')
    ->label('Schedule Post')
    ->color(Color::PRIMARY)
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
use Hewcode\Hewcode\Support\Enums\Color;

Actions\Action::make('schedule')
    ->label('Schedule Post')
    ->color(Color::PRIMARY)
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

You can also control the modal width using `modalWidth()`:

```php
use Hewcode\Hewcode\Support\Enums\Size;

// With Size enum (recommended)
Actions\Action::make('detailed_info')
    ->modalHeading('Detailed Information')
    ->modalWidth(Size::LARGE)
    ->form([
        // ... complex form with lots of fields
    ]);

// With string (xs, sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl, 6xl, 7xl)
Actions\Action::make('detailed_info')
    ->modalWidth('4xl')
    ->form([...]);

// With closure
Actions\Action::make('dynamic_modal')
    ->modalWidth(fn ($record) => $record->hasLargeForm() ? '5xl' : 'lg')
    ->form([...]);
```

:::tip
Use the `Hewcode\Hewcode\Support\Enums\Size` enum for type-safe size values.
:::

### Authorization

Control who can see and use actions:

```php
use Hewcode\Hewcode\Support\Enums\Color;

Actions\Action::make('delete')
    ->label('Delete')
    ->color(Color::DANGER)
    ->visible(fn (Post $record) => auth()->user()->can('delete', $record))
    ->action(fn (Post $record) => $record->delete());

Actions\Actions::make([
    Actions\Action::make('create')
        ->label('New Post')
        ->action(fn () => redirect()->route('posts.create')),
])
    ->visible(auth()->user()?->can('create-posts') ?? false);
```

Use `->visible()` with closures for dynamic authorization or boolean values for static checks.

## Toasts

Actions work seamlessly with [toast notifications](./toasts) to provide user feedback:

```php
use Hewcode\Hewcode\Support\Enums\Color;

Actions\Action::make('sync_data')
    ->label('Sync External Data')
    ->color(Color::PRIMARY)
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
        use Hewcode\Hewcode\Support\Enums\Color;

        return Actions\Actions::make([
            Actions\Action::make('create')
                ->label('New Post')
                ->color(Color::PRIMARY)
                ->icon('lucide-plus')
                ->action(fn () => redirect()->route('posts.create')),

            Actions\Action::make('import')
                ->label('Import Posts')
                ->color(Color::SECONDARY)
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
                ->color(Color::SECONDARY)
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
