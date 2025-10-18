# Hewcode Documentation

Welcome to the Hewcode documentation! Hewcode is a powerful data table and listing system built for Laravel applications, featuring modern PHP 8 attributes, automatic discovery, and seamless integration with Inertia.js.

## Quick Start

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

### Key Components

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

## Best Practices

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
