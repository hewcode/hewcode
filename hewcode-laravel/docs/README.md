# Hewcode Documentation

Welcome to the Hewcode documentation! Hewcode is a powerful data table and listing system built for Laravel applications, featuring modern PHP 8 attributes, automatic discovery, and seamless integration with Inertia.js.

## Quick Start

### Modern Approach (Recommended)

Use the Discovery API with Expose attributes for the cleanest, most maintainable approach:

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
                TextColumn::make('title')->sortable()->searchable(),
                TextColumn::make('status'),
            ]);
    }
}
```

## Core Documentation

### 🚀 **[Discovery API](discovery.md)** *(Recommended)*
Modern, attribute-based approach to organizing listings and actions. Features automatic discovery, type safety, and a clean fluent API.

### 📋 **[Listing](listing.md)**
Comprehensive guide to the Listing class - the core data table builder with pagination, sorting, filtering, and searching capabilities.

### 🏷️ **[Expose Attributes](expose-attributes.md)**
Deep dive into `#[Lists\Expose]` and `#[Actions\Expose]` attributes for declarative controller organization.

### 📝 **[TextColumn](text-column.md)**
Complete reference for the TextColumn class, including formatting, styling, relationships, and behavior customization.

### 🌐 **[Automatic Locale Labels](automatic-locale-labels.md)**
Internationalization support with automatic label resolution from translation files.

### 🔒 **[Authorization](authorization.md)**
Comprehensive authorization system using the ResourceController contract to secure mounted actions and ensure proper access control.

## Architecture Overview

### Discovery System
```
Controller Method → Attribute → Discovery → Data Array → Frontend
     ↓               ↓           ↓            ↓           ↓
#[Lists\Expose] → Discovery → toArray() → Inertia → React/Vue
```

### Key Components

#### 1. **Discovery API** (`Hewcode\Hewcode\Discovery\Discovery`)
- Automatic method discovery using PHP 8 attributes
- Fluent API for adding custom data
- Implements `Arrayable` for seamless Laravel integration
- Type-safe with the `Discoverable` interface

#### 2. **Expose Attributes**
- `#[Lists\Expose]` - For listing methods
- `#[Actions\Expose]` - For action methods
- Support custom keys and automatic naming
- Enforce public method visibility

#### 3. **Listing System** (`Hewcode\Hewcode\Lists\Listing`)
- Core data table functionality
- Eloquent and iterable data support
- Advanced filtering, sorting, and searching
- Session and URL persistence options

#### 4. **Column System** (`Hewcode\Hewcode\Lists\Schema\*`)
- TextColumn for text data display
- Automatic locale label resolution
- Rich formatting and styling options
- Relationship support

## Migration Guide

### From Legacy Patterns

**Before (Manual Array Building):**
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

**After (Discovery API):**
```php
class PostController extends Controller implements ResourceController
{
    public function index(): Response
    {
        return Inertia::render('posts/index',
            Discovery::for($this)->with('title', 'My Posts')
        );
    }

    public function canAccess(?string $method = '__invoke'): bool
    {
        return auth()->user()?->can('manage-posts') ?? false;
    }

    #[Lists\Expose]
    public function posts(): Lists\Listing { /* ... */ }

    #[Actions\Expose]
    public function actions(): Actions\Actions { /* ... */ }
}
```

## Best Practices

### 1. **Use Discovery API for New Projects**
The Discovery API provides better organization, type safety, and maintainability.

### 2. **Organize by Concern**
```php
#[Lists\Expose]           // Main data
public function posts(): Lists\Listing { /* ... */ }

#[Actions\Expose]         // Bulk operations
public function actions(): Actions\Actions { /* ... */ }

#[Lists\Expose('filters')] // Secondary data
public function availableFilters(): Lists\Listing { /* ... */ }
```

### 3. **Leverage Automatic Labels**
Set up translation files for consistent, internationalized column labels:

```php
// lang/en/app.php
'posts' => [
    'columns' => [
        'title' => 'Article Title',
        'status' => 'Publication Status',
    ],
],
```

### 4. **Use Meaningful Method Names**
```php
#[Lists\Expose('published_posts')]
public function publishedPosts(): Lists\Listing { /* Clear intent */ }

#[Lists\Expose('draft_posts')]
public function draftPosts(): Lists\Listing { /* Clear intent */ }
```

## Examples

### Simple Blog Posts Listing
```php
class PostController extends Controller implements ResourceController
{
    public function canAccess(?string $method = '__invoke'): bool
    {
        return auth()->user()?->can('view-posts') ?? false;
    }

    #[Lists\Expose]
    public function posts(): Lists\Listing
    {
        return Lists\Listing::make()
            ->query(Post::query()->with(['user', 'category']))
            ->columns([
                TextColumn::make('title')->sortable()->searchable(),
                TextColumn::make('user.name')->label('Author'),
                TextColumn::make('category.name')->badge(),
                TextColumn::make('status')->badge(),
                TextColumn::make('published_at')->sortable(),
            ])
            ->filters([
                SelectFilter::make('status')->options(PostStatus::class),
                SelectFilter::make('category')->options(Category::pluck('name', 'id')),
            ])
            ->defaultSort('published_at', 'desc')
            ->persistInSession();
    }
}
```

### Dashboard with Multiple Listings
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

    #[Lists\Expose('recent_posts')]
    public function recentPosts(): Lists\Listing
    {
        return Lists\Listing::make()
            ->query(Post::query()->latest()->limit(5))
            ->columns([/* ... */]);
    }

    #[Lists\Expose('top_users')]
    public function topUsers(): Lists\Listing
    {
        return Lists\Listing::make()
            ->query(User::query()->withCount('posts')->orderBy('posts_count', 'desc')->limit(10))
            ->columns([/* ... */]);
    }

    #[Actions\Expose]
    public function dashboardActions(): Actions\Actions
    {
        return Actions\Actions::make([
            Action::make('refresh')->label('Refresh Data'),
            Action::make('export')->label('Export Report'),
        ]);
    }
}
```

## Framework Integration

### Inertia.js
Discovery implements `Arrayable` for seamless Inertia integration:

```php
// Automatic array conversion
return Inertia::render('posts/index', Discovery::for($this));
```

### API Responses
For API endpoints:

```php
return response()->json(Discovery::for($this)->toArray());
```

### Testing
Test discovered data structure:

```php
$response->assertInertia(fn (Assert $page) =>
    $page->has('posts.records')
         ->has('actions')
         ->where('title', 'My Posts')
);
```

## Contributing

When contributing to Hewcode documentation:

1. **Follow the established patterns** shown in existing docs
2. **Include practical examples** for all features
3. **Show both Discovery API and legacy approaches** when relevant
4. **Update this README** when adding new documentation files

## Support

- **GitHub Issues**: Report bugs and request features
- **Documentation**: Comprehensive guides and examples
- **Examples**: Real-world usage patterns in the docs

---

**Built with ❤️ for Laravel developers who value clean, maintainable code.**