# Discovery API

The Discovery API provides a modern, attribute-based approach to organizing listings and actions in your controllers. It automatically discovers methods marked with `#[Lists\Expose]` and `#[Actions\Expose]` attributes and combines them into a single data structure for your frontend.

## Key Benefits

- **Clean Organization**: Separate concerns into individual methods
- **Attribute-Based**: Use PHP 8 attributes for declarative configuration
- **Automatic Discovery**: No manual wiring of data
- **Type Safety**: Built on the `Discoverable` interface
- **Flexible API**: Easy to add custom data alongside discovered items
- **Implements Arrayable**: Works seamlessly with Laravel/Inertia

## Basic Usage

### Simple Discovery

```php
use Hewcode\Hewcode\Discovery\Discovery;
use Hewcode\Hewcode\Contracts\ResourceController;

class PostController extends Controller implements ResourceController
{
    public function index(): Response
    {
        return Inertia::render('posts/index', Discovery::for($this));
    }

    public function canAccess(?string $method = '__invoke'): bool
    {
        return auth()->user()?->can('manage-posts') ?? false;
    }

    #[Lists\Expose]
    public function posts(): Lists\Listing
    {
        return Lists\Listing::make()
            ->query(Post::query())
            ->columns([
                TextColumn::make('title')->sortable(),
                TextColumn::make('status'),
            ]);
    }
}
```

This automatically discovers the `posts()` method and includes its data in the response as `['posts' => $postsData]`.

### Adding Custom Data

```php
public function index(): Response
{
    return Inertia::render('posts/index',
        Discovery::for($this)
            ->with('title', 'My Posts')
            ->with('user', auth()->user())
    );
}
```

Result: `['posts' => $postsData, 'title' => 'My Posts', 'user' => $userData]`

### Batch Data Addition

```php
public function index(): Response
{
    return Inertia::render('posts/index',
        Discovery::for($this)->withData([
            'title' => 'My Posts',
            'breadcrumbs' => $this->getBreadcrumbs(),
            'permissions' => $this->getUserPermissions(),
        ])
    );
}
```

### Selective Discovery

```php
public function index(): Response
{
    // Only discover specific methods
    return Inertia::render('posts/index',
        Discovery::for($this)
            ->only(['posts', 'filters'])
            ->with('title', 'Filtered View')
    );
}

#[Lists\Expose]
public function posts(): Lists\Listing { /* ... */ }

#[Actions\Expose]
public function actions(): Actions\Actions { /* ... */ }

#[Lists\Expose]
public function filters(): Lists\Listing { /* ... */ }
```

Only `posts` and `filters` will be discovered; `actions` will be ignored.

## Expose Attributes

### Lists\Expose

Use `#[Lists\Expose]` to mark methods that return `Lists\Listing` instances:

```php
#[Lists\Expose]
public function posts(): Lists\Listing
{
    return Lists\Listing::make()
        ->query(Post::query())
        ->columns([/* ... */]);
}
```

**Custom Keys:**

```php
#[Lists\Expose('custom_posts')]
public function posts(): Lists\Listing
{
    // Will be available as 'custom_posts' instead of 'posts'
    return Lists\Listing::make(/* ... */);
}
```

### Actions\Expose

Use `#[Actions\Expose]` to mark methods that return `Actions\Actions` instances:

```php
#[Actions\Expose]
public function actions(): Actions\Actions
{
    return Actions\Actions::make([
        Action::make('export')->label('Export Data'),
        Action::make('import')->label('Import Data'),
    ]);
}
```

**Custom Keys:**

```php
#[Actions\Expose('bulk_operations')]
public function actions(): Actions\Actions
{
    // Will be available as 'bulk_operations' instead of 'actions'
    return Actions\Actions::make([/* ... */]);
}
```

## Method Requirements

### Visibility

**Methods must be public.** The Discovery system only scans public methods for security and clarity:

```php
// ✅ Correct - public method
#[Lists\Expose]
public function posts(): Lists\Listing { /* ... */ }

// ❌ Wrong - protected/private methods are ignored
#[Lists\Expose]
protected function posts(): Lists\Listing { /* ... */ }
```

### Return Types

**Methods must return objects implementing the `Discoverable` interface:**

- `Lists\Listing` - implements `Discoverable`
- `Actions\Actions` - implements `Discoverable`

```php
#[Lists\Expose]
public function posts(): Lists\Listing  // ✅ Implements Discoverable
{
    return Lists\Listing::make(/* ... */);
}

#[Actions\Expose]
public function actions(): Actions\Actions  // ✅ Implements Discoverable
{
    return Actions\Actions::make([/* ... */]);
}

#[Lists\Expose]
public function invalid(): array  // ❌ Array doesn't implement Discoverable
{
    return ['data' => 'value'];
}
```

## Advanced Usage

### Multiple Listings

```php
class DashboardController extends Controller implements ResourceController
{
    public function dashboard(): Response
    {
        return Inertia::render('dashboard', Discovery::for($this));
    }

    public function canAccess(?string $method = '__invoke'): bool
    {
        return auth()->user()?->can('view-dashboard') ?? false;
    }

    #[Lists\Expose]
    public function recentPosts(): Lists\Listing
    {
        return Lists\Listing::make()
            ->query(Post::query()->latest()->limit(5))
            ->columns([/* ... */]);
    }

    #[Lists\Expose('popular_posts')]
    public function popularPosts(): Lists\Listing
    {
        return Lists\Listing::make()
            ->query(Post::query()->orderBy('views', 'desc')->limit(5))
            ->columns([/* ... */]);
    }

    #[Actions\Expose]
    public function dashboardActions(): Actions\Actions
    {
        return Actions\Actions::make([
            Action::make('refresh')->label('Refresh Data'),
        ]);
    }
}
```

Result: `['recentPosts' => $data, 'popular_posts' => $data, 'dashboardActions' => $data]`

### Conditional Discovery

```php
public function index(): Response
{
    $discovery = Discovery::for($this)->with('title', 'Posts');

    if (auth()->user()->can('manage_posts')) {
        $discovery = $discovery->only(['posts', 'actions']);
    } else {
        $discovery = $discovery->only(['posts']);
    }

    return Inertia::render('posts/index', $discovery);
}
```

### Complex Data Integration

```php
public function analytics(): Response
{
    return Inertia::render('analytics',
        Discovery::for($this)
            ->withData([
                'title' => 'Analytics Dashboard',
                'dateRange' => $this->getDateRange(),
                'metrics' => $this->calculateMetrics(),
            ])
            ->only(['posts', 'users'])
    );
}

#[Lists\Expose]
public function posts(): Lists\Listing
{
    return Lists\Listing::make()
        ->query(Post::query()->whereBetween('created_at', $this->getDateRange()))
        ->columns([/* ... */]);
}

#[Lists\Expose]
public function users(): Lists\Listing
{
    return Lists\Listing::make()
        ->query(User::query()->whereBetween('created_at', $this->getDateRange()))
        ->columns([/* ... */]);
}
```

## Error Handling

### Common Errors

**Missing Attribute:**
```php
// ❌ This will be ignored (no error, just not discovered)
public function posts(): Lists\Listing
{
    return Lists\Listing::make(/* ... */);
}
```

**Wrong Return Type:**
```php
#[Lists\Expose]
public function posts(): array  // ❌ InvalidArgumentException
{
    return ['data' => 'value'];
}
```

**Key Conflicts:**
```php
public function index(): Response
{
    return Inertia::render('posts/index',
        Discovery::for($this)
            ->with('posts', 'custom data')  // ❌ InvalidArgumentException
    );
}

#[Lists\Expose]
public function posts(): Lists\Listing { /* ... */ }  // Conflicts with 'posts' key above
```

### Error Messages

The Discovery system provides clear, actionable error messages:

```
Method App\Http\Controllers\PostController::posts() with attribute must return
an object implementing Discoverable interface, got array

Key conflict: "posts" already exists in data or discovered listings.
Method App\Http\Controllers\PostController::posts() conflicts with existing key.
```

## Best Practices

### 1. Organize by Concern
```php
#[Lists\Expose]
public function posts(): Lists\Listing { /* Main data listing */ }

#[Actions\Expose]
public function actions(): Actions\Actions { /* Bulk operations */ }

#[Lists\Expose('recent_activity')]
public function recentActivity(): Lists\Listing { /* Secondary data */ }
```

### 2. Use Descriptive Method Names
```php
#[Lists\Expose('published_posts')]
public function publishedPosts(): Lists\Listing { /* Clear intent */ }

#[Lists\Expose('draft_posts')]
public function draftPosts(): Lists\Listing { /* Clear intent */ }
```

### 3. Leverage Custom Keys
```php
#[Lists\Expose('main_listing')]
public function posts(): Lists\Listing { /* Semantic naming */ }

#[Actions\Expose('bulk_operations')]
public function actions(): Actions\Actions { /* Descriptive naming */ }
```

### 4. Keep Methods Focused
```php
// ✅ Good - focused responsibility
#[Lists\Expose]
public function activePosts(): Lists\Listing
{
    return Lists\Listing::make()
        ->query(Post::where('status', 'active'))
        ->columns([/* ... */]);
}

// ❌ Avoid - mixed concerns
#[Lists\Expose]
public function postsAndCategories(): Lists\Listing
{
    // Don't mix different data types in one method
}
```

## Framework Integration

### Inertia.js

The Discovery API implements `Arrayable`, so it works seamlessly with Inertia:

```php
public function index(): Response
{
    // Automatic array conversion
    return Inertia::render('posts/index', Discovery::for($this));
}
```

### API Responses

For API endpoints, explicitly convert to array:

```php
public function api(): JsonResponse
{
    return response()->json(Discovery::for($this)->toArray());
}
```

### Testing

Test discovered data structure:

```php
public function test_posts_index_discovery()
{
    $response = $this->get('/posts');

    $response->assertInertia(fn (Assert $page) =>
        $page->has('posts.records')
             ->has('actions')
             ->where('title', 'My Posts')
    );
}
```

## Migration from Legacy Patterns

### Before (Manual Array Building)
```php
public function index(): Response
{
    return Inertia::render('posts/index', [
        'posts' => Lists\Listing::make(/* ... */)->toData(),
        'actions' => Actions\Actions::make([/* ... */])->toData(),
        'title' => 'My Posts',
    ]);
}
```

### After (Discovery API)
```php
public function index(): Response
{
    return Inertia::render('posts/index',
        Discovery::for($this)->with('title', 'My Posts')
    );
}

#[Lists\Expose]
public function posts(): Lists\Listing { /* ... */ }

#[Actions\Expose]
public function actions(): Actions\Actions { /* ... */ }
```

The Discovery API provides a more maintainable, testable, and organized approach to handling complex controller data requirements.