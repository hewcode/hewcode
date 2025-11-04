# Listing

- [When To Use Listings](#when-to-use-listings)
- [How It Works](#how-it-works)
- [Your First Listing](#your-first-listing)
    - [Adding Sorting and Search](#adding-sorting-and-search)
    - [Working with Relationships](#working-with-relationships)
- [How Discovery Works](#how-discovery-works)
- [Essential Configuration](#essential-configuration)
    - [Columns](#columns)
    - [Default Sorting](#default-sorting)
    - [Pagination](#pagination)
    - [Filters](#filters)
- [Common Patterns](#common-patterns)
- [Advanced Features](#advanced-features)
    - [Tabs](#tabs)
    - [Row Background Colors](#row-background-colors)
    - [Drag-and-Drop Reordering](#drag-and-drop-reordering)
    - [Row Actions](#row-actions)
    - [Bulk Actions](#bulk-actions)
- [State Persistence](#state-persistence)
- [Working with Iterable Data](#working-with-iterable-data)
- [Troubleshooting](#troubleshooting)
- [Complete Real-World Example](#complete-real-world-example)
- [Reference](#reference)
    - [Request Parameters](#reference-request-parameters)
    - [Output Format](#reference-output-format)

<a name="when-to-use-listings"></a>
## When To Use Listings

When building admin panels or data-heavy applications, you need more than just a table—you need sorting, filtering, pagination, and search that works seamlessly with your Eloquent models. Hewcode's Listing class provides this complete solution with a fluent, declarative API that transforms complex data table requirements into elegant, maintainable code.

Use Hewcode Listings when you need to:

- Display tabular data from Eloquent models with user-driven sorting and filtering
- Build admin interfaces that work with complex data relationships
- Provide search functionality across multiple fields without writing custom queries  
- Maintain user preferences for table state across sessions or in shareable URLs
- Enable bulk operations on multiple selected records
- Create filterable reports or data exports

Listings handle the heavy lifting of query building, request parsing, and data transformation—letting you focus on business logic instead of boilerplate.

<a name="how-it-works"></a>
## How It Works

When a user interacts with your listing (sorts, filters, searches), here's the flow:

```
Browser Request → Laravel Controller → Listing Class → Query Builder → Database
     ↓                                        ↓
Frontend Props ← Data Transformation ← Paginated Results
```

The Listing class:
1. Receives the HTTP request parameters (sort, filters, search, page)
2. Applies them to your Eloquent query builder automatically
3. Executes the query with proper eager loading
4. Transforms results into a frontend-ready format
5. Returns pagination metadata, column definitions, and current state

You configure what's possible (which columns are sortable, what filters exist), and Listing handles the execution.

<a name="your-first-listing"></a>
## Your First Listing

Let's start with the absolute minimum. In your controller, create a method that returns a Listing:

```php
use Hewcode\Hewcode\Props;
use Hewcode\Hewcode\Lists;

class PostController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('posts/index', Props\Props::for($this)->components(['posts']));
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

On the frontend, just spread the props:

```tsx
import { DataTable } from '@hewcode/react';
import { usePage } from '@inertiajs/react';

export default function Index() {
    const { posts } = usePage().props;
    
    return <DataTable {...posts} />;
}
```

That's it. You now have a paginated table with two columns showing your posts.

<a name="adding-sorting-and-search"></a>
### Adding Sorting and Search

Add sorting and search capabilities with simple method calls:

```php
#[Lists\Expose]
public function posts(): Lists\Listing
{
    return Lists\Listing::make()
        ->query(Post::query())
        ->columns([
            Lists\Schema\TextColumn::make('title')
                ->sortable()      // Clickable column header
                ->searchable(),   // Included in global search
            Lists\Schema\TextColumn::make('status')
                ->sortable(),
        ])
        ->defaultSort('created_at', 'desc');
}
```

Now users can click column headers to sort and use the search box to filter.

<a name="working-with-relationships"></a>
### Working with Relationships

Display related data with dot notation:

```php
#[Lists\Expose]
public function posts(): Lists\Listing
{
    return Lists\Listing::make()
        ->query(Post::query()->with('user', 'category'))  // Eager load!
        ->columns([
            Lists\Schema\TextColumn::make('title')->sortable()->searchable(),
            Lists\Schema\TextColumn::make('user.name')
                ->label('Author')
                ->sortable()
                ->searchable(),
            Lists\Schema\TextColumn::make('category.name')
                ->sortable(),
        ]);
}
```

**Important:** Always eager load relationships with `->with()` to avoid N+1 query problems.

<a name="how-props-works"></a>
## How Props Works

Props gives you explicit control over which component methods are exposed. You declare which methods to expose via `->components()`, and those methods must have the `#[Lists\Expose]` or `#[Actions\Expose]` attribute. Props calls each method and passes the results as props to your Inertia component.

The method name becomes the prop name:

```php
Props\Props::for($this)->components(['posts', 'actions'])
// Frontend receives props.posts and props.actions
```

Each method must have the appropriate attribute:

```php
#[Lists\Expose]
public function posts(): Lists\Listing
{
    return Lists\Listing::make()...;
}
```

<a name="essential-configuration"></a>
## Essential Configuration

These are the most commonly used configuration methods you'll need for typical listings.

<a name="columns"></a>
### Columns

Define which data columns to display. See [TextColumn](text-column.md) for detailed column customization.

```php
->columns([
    TextColumn::make('id'),
    TextColumn::make('title')->sortable()->searchable(),
    TextColumn::make('user.name')->label('Author')->sortable(),
])
```

Each column can be independently configured for sorting, searching, formatting, and styling.

<a name="default-sorting"></a>
### Default Sorting

Set which column is sorted by default and in which direction:

```php
->defaultSort('created_at', 'desc')  // Second param defaults to 'asc'
```

Users can still change the sort by clicking column headers, but this sets the initial state.

<a name="pagination"></a>
### Pagination

Control how many items appear per page:

```php
->perPage(20)  // Default: 15
```

Users can typically change this in the UI, but this sets the default.

<a name="filters"></a>
### Filters

Add filters to let users narrow down results. Filters appear in a UI panel separate from the table:

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

**Filter types:**
- `SelectFilter` - Dropdown selection (single or multiple)
- `DateRangeFilter` - Start and end date picker

Filters automatically apply to your query based on user selections.

<a name="common-patterns"></a>
## Common Patterns

These patterns cover 80% of typical listing use cases.

### Status Badge Columns

Display status fields as color-coded badges:

```php
TextColumn::make('status')
    ->badge(true, 'secondary')  // Display as badge with variant
    ->getStateUsing(fn ($record) => $record->status->getLabel())  // Get friendly label
    ->color(fn ($record) => match ($record->status) {  // Dynamic color
        PostStatus::DRAFT => 'warning',
        PostStatus::PUBLISHED => 'success',
        PostStatus::ARCHIVED => 'secondary',
    })
```

### Formatted Date Columns

Display dates in a readable format:

```php
TextColumn::make('published_at')
    ->label('Published')
    ->sortable()
    ->getStateUsing(fn ($record) => $record->published_at?->format('M j, Y'))
```

### Relationship Columns with Badges

Show related data with visual styling:

```php
TextColumn::make('category.name')
    ->sortable()
    ->searchable()
    ->badge()
    ->color(fn ($record) => $record->category->color)  // Use category's color
```

### Togglable Columns
*
Let users show/hide columns they don't need:

```php
TextColumn::make('content')
    ->searchable()
    ->wrap()
    ->togglable(),  // User can hide this column
TextColumn::make('id')
    ->togglable(true, true),  // Togglable and hidden by default
TextColumn::make('created_at')
    ->togglable(isToggledHiddenByDefault: true),  // Hidden by default
```

### Secondary Information Display

Show additional context under the main column value:

```php
TextColumn::make('title')
    ->sortable()
    ->searchable()
    ->after(fn ($record) => $record->slug),  // Show slug below title
```

<a name="advanced-features"></a>
## Advanced Features

These features handle more complex use cases.

<a name="tabs"></a>
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

<a name="row-background-colors"></a>
### Row Background Colors

Add visual indicators with conditional row styling:

```php
->bgColor(fn ($record) => match ($record->status) {
    PostStatus::DRAFT => 'warning',      // Yellow background
    PostStatus::PUBLISHED => 'success',  // Green background
    PostStatus::ARCHIVED => 'secondary', // Gray background
    default => null,                     // No special color
})
```

Colors use your theme's color system: `primary`, `secondary`, `success`, `danger`, `warning`, `info`.

<a name="drag-and-drop-reordering"></a>
### Drag-and-Drop Reordering

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

<a name="row-actions"></a>
### Row Actions

Add action buttons that appear on each row:

```php
use Hewcode\Hewcode\Actions;

->actions([
    Actions\Action::make('edit')
        ->label('Edit')
        ->color('primary')
        ->action(fn ($record) => redirect()->route('posts.edit', $record)),
    Actions\Action::make('delete')
        ->label('Delete')
        ->color('danger')
        ->action(fn ($record) => $record->delete()),
])
```

Actions receive the current record and can perform any operation.

<a name="bulk-actions"></a>
### Bulk Actions

Let users select multiple rows and perform batch operations:

```php
use Hewcode\Hewcode\Actions;
use Illuminate\Support\Collection;

->bulkActions([
    Actions\BulkAction::make('delete')
        ->label('Delete Selected')
        ->color('danger')
        ->action(fn (Collection $records) => $records->each->delete()),
    Actions\BulkAction::make('publish')
        ->label('Publish Selected')
        ->color('primary')
        ->action(fn (Collection $records) => 
            $records->each->update(['status' => PostStatus::PUBLISHED])
        ),
    Actions\BulkAction::make('export')
        ->label('Export to CSV')
        ->action(fn (Collection $records) => $this->exportToCsv($records)),
])
```

Bulk actions receive a Collection of selected records. Users select rows with checkboxes and then choose an action from the bulk actions menu.

<a name="state-persistence"></a>
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

<a name="working-with-iterable-data"></a>
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

<a name="complete-real-world-example"></a>
## Complete Real-World Example

Here's a comprehensive example showing most features working together:

```php
use Hewcode\Hewcode\Props;
use Hewcode\Hewcode\Lists;
use Hewcode\Hewcode\Actions;
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
                    ->after(fn ($record) => $record->slug),  // Show slug below
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
                Actions\Action::make('edit')
                    ->label('Edit')
                    ->color('primary')
                    ->action(fn ($record) => redirect()->route('posts.edit', $record)),
                Actions\Action::make('delete')
                    ->label('Delete')
                    ->color('danger')
                    ->action(fn ($record) => $record->delete()),
            ])
            // Add bulk actions
            ->bulkActions([
                Actions\BulkAction::make('delete')
                    ->label('Delete Selected')
                    ->color('danger')
                    ->action(fn (Collection $records) => $records->each->delete()),
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
        ]);
    }
}
```
