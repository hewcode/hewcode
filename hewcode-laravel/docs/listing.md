# Listing

The `Listing` class is a powerful data table builder that provides pagination, sorting, filtering, and searching capabilities for your data. It supports both Eloquent models and iterable data sources.

## Discovery API (Recommended)

The Discovery API provides a clean, attribute-based approach to organizing multiple listings and actions in your controllers. This is the recommended way to use listings in modern Hewcode applications.

### Quick Example

```php
use Hewcode\Hewcode\Discovery;
use Hewcode\Hewcode\Lists;
use Hewcode\Hewcode\Actions;
use Hewcode\Hewcode\Contracts\ResourceController;

class PostController extends Controller implements ResourceController
{
    public function index(): Response
    {
        return Inertia::render('posts/index', Discovery\Discovery::for($this));
    }

    public function canAccess(?string $method = '__invoke'): bool
    {
        return auth()->user()?->can('manage-posts') ?? false;
    }

    #[Lists\Expose]
    public function posts(): Lists\Listing
    {
        return Lists\Listing::make()
            ->query(Post::query()->with(['user', 'category']))
            ->columns([
                Lists\Schema\TextColumn::make('title')->sortable()->searchable(),
                Lists\Schema\TextColumn::make('status'),
            ])
            ->persistInSession();
    }

    #[Actions\Expose]
    public function actions(): Actions\Actions
    {
        return Actions\Actions::make([
            Action::make('export')->label('Export Posts'),
        ]);
    }
}
```

**Key Benefits:**
- Clean separation of concerns with attributed methods
- Automatic discovery and data transformation
- Flexible API for adding custom data
- Type-safe with the `Discoverable` interface

For detailed information about the Discovery API, see the [Discovery Documentation](discovery.md).

## Basic Usage

### With Eloquent Models

```php
use Hewcode\Hewcode\Lists;

$listing = Lists\Listing::make()
    ->query(Post::query()->with(['user', 'category']))
    ->columns([
        Lists\Schema\TextColumn::make('title'),
        Lists\Schema\TextColumn::make('status'),
    ])
    ->toData();
```

### With Iterable Data

```php
$data = [
    ['name' => 'John', 'email' => 'john@example.com'],
    ['name' => 'Jane', 'email' => 'jane@example.com'],
];

$listing = Lists\Listing::make()
    ->data($data)
    ->columns([
        Lists\Schema\TextColumn::make('name'),
        Lists\Schema\TextColumn::make('email'),
    ])
    ->toData();
```

## Configuration Methods

### Columns

Define the columns to display in your listing:

```php
->columns([
    Lists\Schema\TextColumn::make('id'),
    Lists\Schema\TextColumn::make('title')->sortable()->searchable(),
    Lists\Schema\TextColumn::make('user.name')->label('Author'),
])
```

### Default Sorting

Set the default sort column and direction:

```php
->defaultSort('created_at', 'desc')  // Default: 'asc'
```

### Pagination

Control the number of items per page:

```php
->perPage(20)  // Default: 15
```

### Filters

Add filters to allow users to narrow down results:

```php
use Hewcode\Hewcode\Lists;

->filters([
    Lists\Filters\SelectFilter::make('status')
        ->label('Status')
        ->options(PostStatus::class),
    Lists\Filters\SelectFilter::make('category')
        ->label('Category')
        ->field('category_id')
        ->options(Category::pluck('name', 'id')->toArray()),
    Lists\Filters\DateRangeFilter::make('published_date')
        ->label('Published Date')
        ->field('published_at'),
])
```

### Row Background Colors

Add conditional row styling:

```php
->bgColor(fn (Post $post) => match ($post->status) {
    PostStatus::DRAFT => 'warning',
    PostStatus::PUBLISHED => 'success',
    default => null,
})
```

### URL Persistence

Control which interactions persist in the URL. By default, nothing persists in the URL to provide a cleaner experience:

```php
// Enable specific URL persistence
->persistSearchInUrl()      // Search terms persist in URL
->persistSortInUrl()        // Sort column/direction persist in URL
->persistFiltersInUrl()     // Filter values persist in URL
->persistColumnsInUrl()     // Column visibility persist in URL

// Or enable all at once
->persistInUrl()            // All interactions persist in URL

// You can also disable persistence explicitly
->persistSearchInUrl(false)
```

**Benefits of URL persistence:**
- Bookmarkable/shareable URLs with current table state
- Browser back/forward navigation preserves table state
- Page refresh maintains current filters/search/sort

**Benefits of disabled persistence (default):**
- Cleaner URLs without query parameters
- No URL clutter when exploring data
- Better UX for users who don't want URL changes

### Session Persistence

Control which interactions persist in the user's session. This provides state persistence without cluttering URLs:

```php
// Enable specific session persistence
->persistSearchInSession()      // Search terms persist in session
->persistSortInSession()        // Sort column/direction persist in session
->persistFiltersInSession()     // Filter values persist in session
->persistColumnsInSession()     // Column visibility persist in session

// Or enable all at once
->persistInSession()            // All interactions persist in session

// You can also provide a custom session key
->sessionKey('my_custom_listing_key')
->persistInSession()

// Mix session and URL persistence
->persistSearchInUrl()          // Search shows in URL
->persistSortInSession()        // Sort persists in session only
```

**Benefits of session persistence:**
- State persists across page visits without URL changes
- Clean URLs while maintaining user preferences
- Great for user-specific table configurations
- Automatic cleanup when session expires

**Session vs URL persistence:**
- **Session**: Private to user, doesn't affect URLs, expires with session
- **URL**: Shareable, bookmarkable, visible in browser history
- **Both**: You can enable both for maximum flexibility

## Complete Examples

### Using Discovery API (Recommended)

Here's a comprehensive example using the modern Discovery API:

```php
use Hewcode\Hewcode\Discovery;
use Hewcode\Hewcode\Lists;
use Hewcode\Hewcode\Actions;
use Hewcode\Hewcode\Contracts\ResourceController;

class PostController extends Controller implements ResourceController
{
    public function index(): Response
    {
        return Inertia::render('posts/index', Discovery\Discovery::for($this)->with('title', 'My Posts'));
    }

    public function canAccess(?string $method = '__invoke'): bool
    {
        return match ($method) {
            'index', 'show' => auth()->user()?->can('view-posts') ?? false,
            'create', 'store' => auth()->user()?->can('create-posts') ?? false,
            'edit', 'update' => auth()->user()?->can('edit-posts') ?? false,
            'destroy' => auth()->user()?->can('delete-posts') ?? false,
            default => false,
        };
    }

    #[Lists\Expose]
    public function posts(): Lists\Listing
    {
        return Lists\Listing::make()
            ->query(Post::query()->with(['user', 'category']))
            ->columns([
                Lists\Schema\TextColumn::make('id')->togglable(true, true),
                Lists\Schema\TextColumn::make('title')
                    ->sortable()
                    ->searchable()
                    ->after(fn (Post $post) => $post->slug),
                Lists\Schema\TextColumn::make('content')
                    ->searchable()
                    ->wrap()
                    ->togglable(),
                Lists\Schema\TextColumn::make('status')
                    ->sortable()
                    ->badge(true, 'secondary')
                    ->getStateUsing(fn (Post $post) => $post->status->getLabel()),
                Lists\Schema\TextColumn::make('published_at')
                    ->label('Published At')
                    ->sortable()
                    ->getStateUsing(fn (Post $post) => $post->published_at?->format('M j, Y'))
                    ->togglable(),
                Lists\Schema\TextColumn::make('user.name')
                    ->label('Author')
                    ->sortable()
                    ->searchable()
                    ->badge(variant: 'outline'),
                Lists\Schema\TextColumn::make('category.name')
                    ->sortable()
                    ->searchable()
                    ->badge()
                    ->color(fn (Post $post) => $post->category->color)
                    ->togglable(),
                Lists\Schema\TextColumn::make('created_at')
                    ->label('Created At')
                    ->sortable()
                    ->getStateUsing(fn (Post $post) => $post->created_at->format('M j, Y g:i A'))
                    ->togglable(isToggledHiddenByDefault: true),
            ])
            ->defaultSort('created_at', 'desc')
            ->bgColor(fn (Post $post) => match ($post->status) {
                PostStatus::DRAFT => 'warning',
                PostStatus::PUBLISHED => 'success',
                default => null,
            })
            ->filters([
                Lists\Filters\SelectFilter::make('status')
                    ->label('Status')
                    ->options(PostStatus::class),
                Lists\Filters\SelectFilter::make('category')
                    ->label('Category')
                    ->field('category_id')
                    ->options(Category::pluck('name', 'id')->toArray())
                    ->multiple(),
                Lists\Filters\DateRangeFilter::make('published_date')
                    ->label('Published Date')
                    ->field('published_at'),
            ])
            ->actions([
                Actions\Action::make('edit')
                    ->label('Edit')
                    ->color('primary')
                    ->action('edit'),
                Actions\Action::make('delete')
                    ->label('Delete')
                    ->color('danger')
                    ->action('delete'),
            ])
            ->perPage(10)
            ->persistInSession();
    }

    #[Actions\Expose]
    public function actions(): Actions\Actions
    {
        return Actions\Actions::make([
            Action::make('test')
                ->color('warning')
                ->action('test'),
        ]);
    }
}
```

### Using Direct Listing (Legacy)

Here's the same example using the direct listing approach:

```php
public function index(): Response
{
    return Inertia::render('posts/index', [
        'posts' => Lists\Listing::make()
            ->query(Post::query()->with(['user', 'category']))
            ->columns([
                Lists\Schema\TextColumn::make('id'),
                Lists\Schema\TextColumn::make('title')
                    ->sortable()
                    ->searchable()
                    ->after(fn (Post $post) => $post->slug),
                // ... (same column configuration as above)
            ])
            ->defaultSort('created_at', 'desc')
            ->bgColor(fn (Post $post) => match ($post->status) {
                PostStatus::DRAFT => 'warning',
                PostStatus::PUBLISHED => 'success',
                default => null,
            })
            ->filters([
                // ... (same filter configuration as above)
            ])
            ->perPage(10)
            ->persistSearchInUrl()          // Search appears in URL for sharing
            ->persistSortInSession()        // Sort persists in session only
            ->persistFiltersInSession()     // Filters persist privately in session
            ->toData(),
        'title' => 'My Posts',
    ]);
}
```

## Request Parameters

The listing automatically handles these request parameters:

- `search` - Global search term
- `sort` - Sort field
- `direction` - Sort direction (`asc` or `desc`)
- `page` - Current page number
- `filter.*` - Filter values

## Output Format

The `toData()` method returns an array with the following structure:

```php
[
    'records' => [...], // Array of record data
    'pagination' => [
        'currentPage' => 1,
        'totalPages' => 10,
        'totalItems' => 150,
        'itemsPerPage' => 15,
    ],
    'columns' => [...], // Column metadata
    'sortable' => [...], // Sortable field names
    'filters' => [...], // Filter definitions
    'urlPersistence' => [
        'persistFiltersInUrl' => false,
        'persistSortInUrl' => false,
        'persistColumnsInUrl' => false,
        'persistSearchInUrl' => true,
    ],
    'sessionPersistence' => [
        'persistFiltersInSession' => true,
        'persistSortInSession' => true,
        'persistColumnsInSession' => false,
        'persistSearchInSession' => false,
        'sessionKey' => 'chisel_listing_App\\Http\\Controllers\\PostController_00000000123abc',
    ],
    'currentValues' => [
        'search' => 'John Doe',
        'sort' => 'created_at',
        'direction' => 'desc',
        'filter' => [
            'status' => 'published',
            'category' => '1',
        ],
        'columns' => [
            'title' => true,
            'content' => false,
            'status' => true,
        ],
    ],
]
```

## Relationship Support

The listing fully supports Eloquent relationships:

```php
// Searching and sorting on relationships
TextColumn::make('user.name')
    ->sortable()
    ->searchable()

// Deep relationships
TextColumn::make('category.parent.name')
```

When using relationships, make sure to eager load them in your query:

```php
->query(Post::query()->with(['user', 'category.parent']))
```
