# Lists

Quickly generate powerful, feature-rich data listings with sorting, searching, filtering, pagination, and more.

## Getting Started

Let's start with the absolute minimum. In your controller, create a method that returns a Listing, then use the `Props` class to expose it to your Inertia component in the rendering method. The Listing method must have the `#[Lists\Expose]` attribute.

```php
use Hewcode\Hewcode\Props;
use Hewcode\Hewcode\Lists;

class PostController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('posts/index', Props\Props::for($this)
            ->components(['posts'])
        );
    }

    #[Lists\Expose]
    public function posts(): Lists\Listing
    {
        return Lists\Listing::make()
            ->visible(auth()->user()?->can('manage-posts') ?? false) // Required
            ->query(Post::query())
            ->columns([
                Lists\Schema\TextColumn::make('title'),
                Lists\Schema\TextColumn::make('status'),
            ]);
    }
}
```

:::danger
Remember to always make sure the visibility of actions is properly set using authorization checks to prevent unauthorized access. Assume that controller middleware and controller method checks are not sufficient.
:::

On the frontend, just spread the props:

```tsx
import DataTable from '@hewcode/react/components/data-table/DataTable';
import { usePage } from '@inertiajs/react';

export default function Index() {
    const { posts } = usePage().props;
    
    return <DataTable {...posts} />;
}
```

That's it. 

## Listing Definition

You can define a Listing definition class that allows you to reuse the same listing in multiple places.

Create a listing definition using the command:

```bash
php artisan hew:listing UserListing --model=User --form=UserForm --generate
```

You can pass:
* `--model=User` to specify the model explicitly.
* `--form=UserForm` to associate a form definition with the listing.
* `--generate` to auto-generate listing columns based on your model's table structure.

This will create a class that extends `Hewcode\Hewcode\Lists\ListingDefinition`:

```php
use App\Models\User;
use Hewcode\Hewcode\Actions;
use Hewcode\Hewcode\Lists;

class UserListing extends Lists\ListingDefinition
{
    protected string $model = User::class;

    protected ?string $form = UserForm::class;

    public function default(Lists\Listing $listing): Lists\Listing
    {
        return $listing
            ->visible()
            ->columns([
                Lists\Schema\TextColumn::make('id'),
                Lists\Schema\TextColumn::make('name')
                    ->sortable()
                    ->searchable(),
                Lists\Schema\TextColumn::make('email')
                    ->searchable()
                    ->wrap(),
                Lists\Schema\TextColumn::make('posts_count')
                    ->label('Posts')
                    ->sortable(),
            ])
            ->actions([
                Actions\Eloquent\EditAction::make(),
            ])
            ->defaultSort('created_at', 'desc')
            ->perPage(25);
    }
}
```

The `$form` is optional and refers to a Form definition class that will be used for editing records. See the [Forms documentation](forms.md#form-definitions) for more details.

You can then use this Listing definition in your controller:

```php
#[Lists\Expose]
public function users(): Lists\Listing
{
    return UserListing::make('users');
}
```

You can pass an additional context parameter which will use a different method than `default()`:

```php
#[Lists\Expose]
public function admins(): Lists\Listing
{
    return UserListing::make('admins', context: 'administration');
}

// In UserListing.php
class UserListing extends Lists\ListingDefinition
{
    // ...

    public function administration(Lists\Listing $listing): Lists\Listing
    {
        return $listing
            ->visible()
            ->query(User::query()->where('is_admin', true))
            ->columns([
                // ...
            ]);
    }
}
```

## Essentials

### Pagination

Control how many items appear per page. Users can typically change this in the UI, but this sets the default.

```php
->perPage(20)  // Default: 15
```

### Default Sorting

Set which column is sorted by default and in which direction.
Users can still change the sort by clicking column headers, but this sets the initial state.

```php
->defaultSort('created_at', 'desc')  // Second param defaults to 'asc'
```
### Relationships

#### Listing Records from a Relationship

To display a model's related records (e.g., a user's posts), use the `->relationship()` method. This requires providing the owner record either through Props or explicitly:

###### Using Props with record()

```php
// Controller
public function edit(User $user): Response
{
    return Inertia::render('users/edit', Props\Props::for($this)
        ->record($user)  // Sets the owner record for relationship listings
        ->components(['form', 'posts'])
    );
}

#[Lists\Expose]
public function posts(): Lists\Listing
{
    return Lists\Listing::make()
        ->visible(auth()->check())
        ->relationship('posts')  // Uses the record from Props
        ->columns([
            Lists\Schema\TextColumn::make('title')->sortable()->searchable(),
            Lists\Schema\TextColumn::make('status')->badge(),
            Lists\Schema\TextColumn::make('published_at')->date(),
        ])
        ->defaultSort('created_at', 'desc');
}
```

###### Explicit owner record

```php
#[Lists\Expose]
public function posts(): Lists\Listing
{
    $user = User::find(request()->route('user'));
    
    return Lists\Listing::make()
        ->visible(auth()->check())
        ->ownerRecord($user)     // Explicitly set the owner
        ->relationship('posts')  // Uses the explicitly set owner
        ->columns([
            Lists\Schema\TextColumn::make('title')->sortable()->searchable(),
            Lists\Schema\TextColumn::make('status')->badge(),
            Lists\Schema\TextColumn::make('published_at')->date(),
        ])
        ->defaultSort('created_at', 'desc');
}
```

###### Custom relationship queries

You can modify the relationship query by passing a closure as the second parameter:

```php
#[Lists\Expose]
public function posts(): Lists\Listing
{
    return Lists\Listing::make()
        ->visible(auth()->check())
        ->relationship('posts', fn (Builder $query) => 
            $query->where('status', PostStatus::PUBLISHED)
                  ->with('category')
                  ->orderBy('featured', 'desc')
        )
        ->columns([
            Lists\Schema\TextColumn::make('title')->sortable()->searchable(),
            Lists\Schema\TextColumn::make('category.name')->badge(),
            Lists\Schema\TextColumn::make('published_at')->date(),
        ]);
}
```

This allows you to filter, eager load additional relationships, or apply custom sorting to the relationship query while still maintaining the automatic scoping to the owner record.

## Columns

You can declare columns to display in the listing, the column name corresponds to the model attribute.

Labels are automatically generated from your locale files if no explicit label is provided. See [Automatic Locale Labels](auto-localization) for more details.

```php
->columns([
    TextColumn::make('id'),
    TextColumn::make('title'), // default label: __('app.posts.columns.title')
    TextColumn::make('user.name')
        ->label('Author'),
])
```

### Visibility

You can control whether a column is visible using `->visible()` or `->hidden()`:

```php
TextColumn::make('internal_notes')
    ->visible(false)  // Always hidden,
TextColumn::make('admin_notes')
    ->hidden(fn () => ! auth()->user()->isAdmin())
```

### Omission

You can omit a cell value conditionally using `->omit()`:

```php
TextColumn::make('email')
    ->omit(fn (User $record) => ! auth()->user()->canViewEmails()),
TextColumn::make('salary')
    ->omit(fn (User $record) => $record->department !== 'HR')
```

:::info
The `omit()` method differs from `visible()` in that:
- `visible()` controls whether the entire column appears for all records
- `omit()` controls whether the value is shown for individual records, returning `null` when the condition is met
:::

### Formatting

You can format column values using `->formatStateUsing()`:

```php
TextColumn::make('price')
    ->formatStateUsing(fn ($state) => '$' . number_format($state, 2))
```

### Limiting Text Length

Truncate long text to a specified number of characters:

```php
TextColumn::make('description')
    ->limit(100),  // Truncate to 100 characters with '...'
TextColumn::make('content')
    ->limit(50, '…'),  // Custom suffix
```

### Datetime Columns

Using the `->date()` or `->datetime()` methods will format the column value appropriately. This will use the default configured format which can be customized as described in the [Configuration](config) docs. You can also pass a custom format string.

These methods also allow using relative display.

```php
TextColumn::make('published_at')
    ->date(),
TextColumn::make('created_at')
    ->datetime(format: 'M j, Y g:i A'),
TextColumn::make('updated_at')
    ->datetime(relative: true),
```

### Sortable & Searchable

You can make columns sortable and searchable:

```php
->columns([
    Lists\Schema\TextColumn::make('title')
        ->sortable()
        ->searchable(),
    Lists\Schema\TextColumn::make('status')
        ->sortable(),
]);
```

### Wrapping Text

You can enable text wrapping for long content:

```php
TextColumn::make('content')
    ->wrap(),  // Enable text wrapping
```

### Color

### Badge Columns

You can display column values as badges for better visual distinction. If using a custom color, the badge will use that color.

```php
TextColumn::make('status')
    ->badge()  // Default variant

TextColumn::make('user.name')
    ->badge(true, 'outline')  // With specific variant

TextColumn::make('category.name')
    ->badge(true, 'secondary')
```

### Color

You can customize the color of text or badges with a static value or dynamically based on the record's data.

```php
use Hewcode\Hewcode\Support\Enums\Color;

// Static color with enum (recommended)
TextColumn::make('priority')
    ->badge()
    ->color(Color::DANGER);

// Static color with string
TextColumn::make('priority')
    ->badge()
    ->color('danger');

// Dynamic color from record data
TextColumn::make('category.name')
    ->badge()
    ->color(fn ($record) => $record->category->color);

// Dynamic color with conditional logic using enums
TextColumn::make('status')
    ->badge()
    ->color(fn ($record) => match ($record->status) {
        PostStatus::DRAFT => Color::WARNING,
        PostStatus::PUBLISHED => Color::SUCCESS,
        default => Color::SECONDARY,
    });

// Dynamic color with strings
TextColumn::make('status')
    ->color(fn ($record) => match ($record->status) {
        PostStatus::DRAFT => 'warning',
        PostStatus::PUBLISHED => 'success',
        default => 'secondary',
    });
```

:::tip
Use the `Hewcode\Hewcode\Support\Enums\Color` enum for type-safe color values.
:::

### Icons

You can add icons to columns, either static or dynamic based on the record's data. When using badges, the icon appears inside the badge.

```php
TextColumn::make('email')
    ->icon('lucide-mail'),
TextColumn::make('status')
    ->badge()
    ->icon(fn($record) => match($record->status) {
        PostStatus::PUBLISHED => 'lucide-circle-check',
        PostStatus::DRAFT => 'lucide-pencil',
        PostStatus::ARCHIVED => 'lucide-archive',
        default => null,
    })
```

You can also customize the icon position and size:

```php
TextColumn::make('priority')
    ->icon('lucide-flag', position: 'after', size: 20)
```

:::tip
Browse available icons at [lucide.dev/icons](https://lucide.dev/icons/). All icons must use the `lucide-` prefix (e.g., `lucide-circle-check`, `lucide-pencil`).
:::

### After & Before content

You can add additional content before or after the cell value. This can be static text or dynamic based on the record's data. You can also use badges here.

```php
use Hewcode\Hewcode\Fragments\Badge;

TextColumn::make('title')
    ->after(fn ($record) => $record->slug)

TextColumn::make('name')
    ->before(fn (User $record) => Badge::make('Admin'))
```

```php
TextColumn::make('title')
    ->after(fn (Post $record) => 
        Badge::make(
            label: $record->status->getLabel(),
            color: match ($record->status) {
                PostStatus::PUBLISHED => 'success',
                PostStatus::DRAFT => 'warning',
                PostStatus::ARCHIVED => 'secondary',
            },
            icon: match ($record->status) {
                PostStatus::PUBLISHED => 'lucide-circle-check',
                PostStatus::DRAFT => 'lucide-pencil',
                PostStatus::ARCHIVED => 'lucide-archive',
                default => null,
            },
            variant: 'secondary',
        )
    )
```

### Togglable Columns

You can allow users to show or hide specific columns using the `->togglable()` method. This will display a popover menu where users can toggle column visibility.

```php
TextColumn::make('content')
    ->searchable()
    ->wrap()
    ->togglable(),
TextColumn::make('created_at')
    ->togglable(isToggledHiddenByDefault: true),
```

### Relationships

You can display related model data using dot notation in column definitions:

```php
// Single relationship
TextColumn::make('user.name')
    ->label('Author')

// Nested relationships
TextColumn::make('category.parent.name')
    ->label('Parent Category')
```

:::warning
Make sure to eager load relationships in your query.
```php
->query(Post::query()->with(['user', 'category.parent']))
```
:::

## Filters

You can specify filters to allow users to narrow down results. Filters appear in a popover panel above the table.

```php
use Hewcode\Hewcode\Lists\Filters;

->filters([
    Lists\Filters\SelectFilter::make('status')
        ->label('Status')
        ->options(PostStatus::class),  // Enum or array
    Lists\Filters\SelectFilter::make('category')
        ->label('Category')
        ->field('category_id')  // Which DB field to filter
        ->options(Category::pluck('name', 'id')->toArray())
        ->multiple()  // Allow multiple selections
        ->searchable(),  // Add search to dropdown
    Lists\Filters\DateRangeFilter::make('published_date')
        ->label('Published Date')
        ->field('published_at'),
])
```

### Relationship filters

You can also create filters that load options from related models using the `->relationship()` method:

```php
Lists\Filters\SelectFilter::make('category')
    ->label('Category')
    ->field('category_id')
    ->relationship('category', 'name')  // Load from category relationship
    ->searchable()
    ->multiple()
    ->preload()  // Load first 25 options immediately
```

This works identically to form relationship fields, including:
- Automatic option loading from the related model
- Real-time search as users type
- Custom query modification for scoping

**Custom relationship query:**

Customize the relationship query using a closure:

```php
->relationship(
    relationshipName: 'author',
    titleColumn: 'name',
    modifyQueryUsing: fn ($query) => $query->where('active', true)
)
```

### Deferred Filtering

By default, filters apply immediately as users change them. For complex queries or large datasets, you may want to defer filter application until the user explicitly clicks "Apply Filters":

```php
->filters([
    Lists\Filters\SelectFilter::make('status')
        ->label('Status')
        ->options(PostStatus::class),
    Lists\Filters\SelectFilter::make('category')
        ->label('Category')
        ->field('category_id')
        ->options(Category::pluck('name', 'id')->toArray()),
])
->deferFiltering()  // Add "Apply Filters" button
```

### Inline Filters

Display filters inline below the table header instead of in a popover:

```php
->inlineFilters()
```

## Advanced Features

These features handle more complex use cases.

### Tabs

Tabs provide quick navigation between different data views, perfect for status-based filtering or common queries:

```php
use Hewcode\Hewcode\Lists;
use Illuminate\Database\Eloquent\Builder;

->tabs([
    Lists\Tabs\Tab::make('all')
        ->label('All Posts')
        ->badge(fn () => Post::count()),  // Show count in badge
    Lists\Tabs\Tab::make('published')
        ->label('Published')
        ->badge(fn () => Post::where('status', PostStatus::PUBLISHED)->count())
        ->query(fn (Builder $query) => $query->where('status', PostStatus::PUBLISHED)),
    Lists\Tabs\Tab::make('drafts')
        ->label('Drafts')
        ->badge(fn () => Post::where('status', PostStatus::DRAFT)->count())
        ->query(fn (Builder $query) => $query->where('status', PostStatus::DRAFT)),
])
->defaultTab('all')  // Which tab is active by default
```

**How tabs work:**
- Each tab can modify the base query with the `query()` callback
- Badges update dynamically and show counts or other metrics
- The default tab is active when no tab parameter is in the request
- Tab state persists based on your persistence configuration

### Row Background Colors

Add visual indicators with conditional row styling:

```php
use Hewcode\Hewcode\Support\Enums\Color;

// With Color enum (recommended)
->bgColor(fn ($record) => match ($record->status) {
    PostStatus::DRAFT => Color::WARNING,
    PostStatus::PUBLISHED => Color::SUCCESS,
    PostStatus::ARCHIVED => Color::SECONDARY,
    default => null,
})

// With strings
->bgColor(fn ($record) => match ($record->status) {
    PostStatus::DRAFT => 'warning',      // Yellow background
    PostStatus::PUBLISHED => 'success',  // Green background
    PostStatus::ARCHIVED => 'secondary', // Gray background
    default => null,                     // No special color
})
```

:::tip
Use the `Hewcode\Hewcode\Support\Enums\Color` enum for type-safe color values.
:::

### Clickable Rows

Make entire table rows clickable to navigate to a URL or trigger an action.

#### Navigate to a URL

```php
->recordUrl(fn (Post $record) => route('posts.edit', $record))
```

#### Trigger a Row Action

Instead of navigating to a URL, you can trigger a specific row action when clicking anywhere on the row:

```php
->recordAction('edit')
->actions([
    Actions\Eloquent\EditAction::make(),
])

// or
->recordAction('custom')
->actions([
    Actions\Action::make('custom')
        ->label('Custom Action')
        ->action(fn (Post $record) => /* your logic here */),
])
```

The action name must match one of your row actions. When the row is clicked, it triggers the action exactly as if the user clicked the action button—including confirmation modals, forms, and all other action behavior.

### Reordering

Enable users to reorder records visually:

```php
->reorderable('order')  // Column name that stores the order
```

**Requirements:**
- Your model must have an integer column (e.g., `order`, `position`, `sort_order`)
- The column should have a default value (typically `0`)
- Only works with Eloquent queries (not iterable data)

**Example migration:**
```php
$table->integer('order')->default(0);
```

When reordering is enabled, users can drag rows to reposition them, and the order column updates automatically.

## Actions

You can attach actions to listings for both individual rows and bulk operations.

For more details about building actions, see the [Actions](actions) documentation.

### Row Actions

Add action buttons that appear on each row, operating on the specific record:

```php
use Hewcode\Hewcode\Actions;

->actions([
    Actions\Action::make('duplicate')
        ->label('Duplicate')
        ->color('secondary')
        ->action(fn (Post $record) => $record->replicate()->save())
])
```

You can use some predefined Eloquent actions for Editing, Deleting, and Restoring records:

```php
use Hewcode\Hewcode\Actions;
use Hewcode\Hewcode\Forms;

->actions([
    Actions\Eloquent\EditAction::make()
        ->form([
            Forms\Schema\TextInput::make('title')
                ->label('Title')
                ->required()
                ->maxLength(255),
            Forms\Schema\Textarea::make('content')
                ->label('Content')
                ->rows(8)
                ->required(),
            Forms\Schema\Select::make('status')
                ->label('Status')
                ->options(PostStatus::class)
                ->required(),
        ])
        ->visible(fn (Post $record) => auth()->user()->can('update', $record)),

    Actions\Eloquent\DeleteAction::make()
        ->visible(fn (Post $record) => auth()->user()->can('delete', $record)),

    Actions\Eloquent\RestoreAction::make()
        ->visible(fn (Post $record) => $record->trashed()),
])
```

:::tip
Row actions automatically receive the `$record` parameter and form data as `$data` if a form is defined.
:::

### Bulk Actions

You can let users select multiple rows and perform batch operations:

```php
use Hewcode\Hewcode\Actions;
use Hewcode\Hewcode\Toasts\Toast;
use Illuminate\Support\Collection;

->bulkActions([
    Actions\BulkAction::make('publish')
        ->label('Publish Selected')
        ->color('primary')
        ->action(function (Collection $records) {
            $count = $records->count();

            $records->each->update([
                'status' => PostStatus::PUBLISHED,
                'published_at' => now(),
            ]);

            Toast::make()
                ->title("Published $count Posts")
                ->success()
                ->send();
        }),

    Actions\BulkAction::make('export')
        ->label('Export Selected')
        ->color('secondary')
        ->action(function (Collection $records) {
            $filename = 'posts-export-' . now()->format('Y-m-d') . '.csv';

            return response()->streamDownload(function () use ($records) {
                $file = fopen('php://output', 'w');
                fputcsv($file, ['ID', 'Title', 'Status', 'Created']);

                foreach ($records as $record) {
                    fputcsv($file, [
                        $record->id,
                        $record->title,
                        $record->status->value,
                        $record->created_at->format('Y-m-d'),
                    ]);
                }

                fclose($file);
            }, $filename);
        }),

    Actions\BulkAction::make('change_status')
        ->label('Change Status')
        ->color('warning')
        ->form([
            Forms\Schema\Select::make('status')
                ->label('New Status')
                ->options(PostStatus::class)
                ->required(),
        ])
        ->action(function (Collection $records, array $data) {
            $count = $records->count();
            $status = PostStatus::from($data['status']);

            $records->each->update(['status' => $status]);

            Toast::make()
                ->title("Updated $count Posts")
                ->message("Status changed to {$status->getLabel()}")
                ->success()
                ->send();
        }),
])
```

:::tip
Bulk actions receive a Collection of selected records as `$records`, and form data as `$data` if a form is defined.
:::

You can also use predefined Eloquent bulk actions for Deleting and Restoring records:

```php
use Hewcode\Hewcode\Actions;

->bulkActions([
    Actions\Eloquent\BulkDeleteAction::make(),

    Actions\Eloquent\BulkDeleteAction::make()
        ->forceDelete(),

    Actions\Eloquent\BulkRestoreAction::make(),
])
```

## State Persistence

Listings can remember user preferences so they don't lose their filters, sorts, or search terms when navigating away. You have two persistence strategies: URL and session.

### Understanding Persistence Strategies

| Feature | URL Persistence | Session Persistence | No Persistence |
|---------|----------------|---------------------|----------------|
| Shareable state | ✅ Yes | ❌ No | ❌ No |
| Bookmarkable | ✅ Yes | ❌ No | ❌ No |
| Private to user | ❌ No | ✅ Yes | ✅ Yes |
| Clean URLs | ❌ No | ✅ Yes | ✅ Yes |
| Survives restart | ✅ Yes | ⚠️ Depends on session config | ❌ No |
| Best for | Shareable reports, public listings | User preferences, private tables | Exploratory browsing |

### URL Persistence

State is stored in query parameters, making listings shareable and bookmarkable:

```php
// Enable specific features
->persistSearchInUrl()      // ?search=laravel
->persistSortInUrl()        // ?sort=title&direction=asc
->persistFiltersInUrl()     // ?filter[status]=published
->persistColumnsInUrl()     // ?columns[content]=false

// Or enable everything at once
->persistInUrl()
```

**When to use URL persistence:**
- Reports that users share with colleagues
- Public data views where anyone can access the same filtered view
- When you want browser back/forward to work with table state
- Analytics dashboards where filters define different views

**Example URL with persistence:**
```
/posts?search=laravel&sort=created_at&direction=desc&filter[status]=published&tab=featured
```

### Session Persistence

State is stored server-side in the user's session, keeping URLs clean:

```php
// Enable specific features
->persistSearchInSession()
->persistSortInSession()
->persistFiltersInSession()
->persistColumnsInSession()

// Or enable everything at once
->persistInSession()

// Optionally customize the session key
->sessionKey('my_custom_key')
->persistInSession()
```

**When to use session persistence:**
- Personal preference settings (which columns a user likes to see)
- Frequently filtered views where users return to the same filters
- When you want clean URLs without query parameters
- Private user-specific table configurations

**How it works:**
The session key is auto-generated from your controller class and method name, ensuring each listing has unique storage. State persists until the session expires or is cleared.

### Mixing Strategies

You can combine URL and session persistence for different features:

```php
->persistSearchInUrl()        // Search shows in URL (shareable)
->persistSortInSession()      // Sort is private preference
->persistFiltersInSession()   // Filters are private preference
->persistColumnsInSession()   // Column visibility is private
```

This keeps URLs shareable while maintaining private preferences.

### Disabling Persistence

By default, nothing persists (providing the cleanest UX for exploratory use). To explicitly disable:

```php
->persistSearchInUrl(false)
->persistSortInSession(false)
```

## Context

You can pass additional context to listings that will be passed down to related forms and actions within, Using the `->context()` method:

```php
->context('administration')  // Pass a simple string context
->context([
    'project_id' => request()->route('project'),
]) // Pass an array of context data
```

In any closure used in the listing or its related forms/actions, you can access the context via a `$context` parameter:

```php
use Hewcode\Hewcode\Lists\Schema\TextColumn;
use Hewcode\Hewcode\Support\Context;

TextColumn::make('title')
    ->after(fn (Context $context) => "Project ID: " . $context['project_id'])
```

## Working with Iterable Data

While Listings work best with Eloquent models, you can also use arrays or collections:

```php
#[Lists\Expose]
public function stats(): Lists\Listing
{
    $data = [
        ['name' => 'John Doe', 'email' => 'john@example.com', 'role' => 'Admin'],
        ['name' => 'Jane Smith', 'email' => 'jane@example.com', 'role' => 'User'],
    ];

    return Lists\Listing::make()
        ->data($data)  // Use ->data() instead of ->query()
        ->columns([
            Lists\Schema\TextColumn::make('name')->sortable()->searchable(),
            Lists\Schema\TextColumn::make('email')->searchable(),
            Lists\Schema\TextColumn::make('role'),
        ]);
}
```

**Limitations with iterable data:**
- No relationship support
- No drag-and-drop reordering
- Less performant for large datasets

For production use with large datasets, always prefer Eloquent models.

## Complete Real-World Example

Here's a comprehensive example showing most features working together:

```php
use Hewcode\Hewcode\Props;
use Hewcode\Hewcode\Lists;
use Hewcode\Hewcode\Actions;
use Hewcode\Hewcode\Fragments\Badge;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Collection;

class PostController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('posts/index', Props\Props::for($this)->components(['posts', 'actions']));
    }

    #[Lists\Expose]
    public function posts(): Lists\Listing
    {
        return Lists\Listing::make()
            ->visible(auth()->user()?->can('manage-posts') ?? false) // Required
            // Eager load relationships to avoid N+1
            ->query(Post::query()->with(['user', 'category']))
            // Define columns with various features
            ->columns([
                Lists\Schema\TextColumn::make('id')
                    ->togglable(true, true),  // Hidden by default
                Lists\Schema\TextColumn::make('title')
                    ->sortable()
                    ->searchable()
                    ->after(fn ($record) => Badge::make($record->slug)),  // Show slug below
                Lists\Schema\TextColumn::make('status')
                    ->sortable()
                    ->badge(true, 'secondary')
                    ->getStateUsing(fn ($record) => $record->status->getLabel())
                    ->color(fn ($record) => match ($record->status) {
                        PostStatus::DRAFT => 'warning',
                        PostStatus::PUBLISHED => 'success',
                        PostStatus::ARCHIVED => 'secondary',
                    }),
                Lists\Schema\TextColumn::make('user.name')
                    ->label('Author')
                    ->sortable()
                    ->searchable()
                    ->badge(variant: 'outline'),
                Lists\Schema\TextColumn::make('category.name')
                    ->sortable()
                    ->searchable()
                    ->badge()
                    ->color(fn ($record) => $record->category->color),
                Lists\Schema\TextColumn::make('published_at')
                    ->label('Published')
                    ->sortable()
                    ->getStateUsing(fn ($record) => 
                        $record->published_at?->format('M j, Y')
                    ),
                Lists\Schema\TextColumn::make('created_at')
                    ->sortable()
                    ->getStateUsing(fn ($record) => 
                        $record->created_at->format('M j, Y g:i A')
                    )
                    ->togglable(isToggledHiddenByDefault: true),
            ])
            // Set default sort
            ->defaultSort('created_at', 'desc')
            // Add status-based row colors
            ->bgColor(fn ($record) => match ($record->status) {
                PostStatus::DRAFT => 'warning',
                PostStatus::PUBLISHED => 'success',
                default => null,
            })
            // Add tabs for quick filtering
            ->tabs([
                Lists\Tabs\Tab::make('all')
                    ->label('All')
                    ->badge(fn () => Post::count()),
                Lists\Tabs\Tab::make('published')
                    ->label('Published')
                    ->badge(fn () => Post::where('status', PostStatus::PUBLISHED)->count())
                    ->query(fn (Builder $query) => 
                        $query->where('status', PostStatus::PUBLISHED)
                    ),
                Lists\Tabs\Tab::make('drafts')
                    ->label('Drafts')
                    ->badge(fn () => Post::where('status', PostStatus::DRAFT)->count())
                    ->query(fn (Builder $query) => 
                        $query->where('status', PostStatus::DRAFT)
                    ),
            ])
            ->defaultTab('all')
            // Add filters
            ->filters([
                Lists\Filters\SelectFilter::make('status')
                    ->label('Status')
                    ->options(PostStatus::class),
                Lists\Filters\SelectFilter::make('category')
                    ->label('Category')
                    ->field('category_id')
                    ->relationship('category', 'name')
                    ->searchable()
                    ->multiple()
                    ->preload(),
                Lists\Filters\DateRangeFilter::make('published_date')
                    ->label('Published Date')
                    ->field('published_at'),
            ])
            // Add row actions
            ->actions([
                Actions\Eloquent\EditAction::make()
                    ->form([
                        Forms\Schema\TextInput::make('title')
                            ->label('Title')
                            ->required()
                            ->maxLength(255),
                        Forms\Schema\Textarea::make('content')
                            ->label('Content')
                            ->rows(8)
                            ->required(),
                        Forms\Schema\Select::make('status')
                            ->label('Status')
                            ->options(PostStatus::class)
                            ->required(),
                    ]),
                Actions\Eloquent\DeleteAction::make(),
                Actions\Eloquent\RestoreAction::make()
                    ->visible(fn ($record) => $record->trashed()),
            ])
            // Add bulk actions
            ->bulkActions([
                Actions\Eloquent\BulkDeleteAction::make(),
                Actions\Eloquent\BulkDeleteAction::make()
                    ->forceDelete(),
                Actions\Eloquent\BulkRestoreAction::make(),
                Actions\BulkAction::make('publish')
                    ->label('Publish Selected')
                    ->color('primary')
                    ->action(fn (Collection $records) =>
                        $records->each->update(['status' => PostStatus::PUBLISHED])
                    ),
            ])
            // Configure pagination
            ->perPage(15)
            // Persist state in session (not URL for clean links)
            ->persistInSession();
    }

    #[Actions\Expose]
    public function actions(): Actions\Actions
    {
        return Actions\Actions::make([
            Actions\Action::make('create')
                ->label('New Post')
                ->color('primary')
                ->action(fn () => redirect()->route('posts.create')),
        ])->visible(auth()->user()?->can('manage-posts') ?? false);
    }
}
```

For more details about standalone actions, see the [Actions documentation](actions).
