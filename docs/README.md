# Hewcode Documentation

Hewcode transforms complex data table requirements into elegant, maintainable code. Built for Laravel applications, it provides sortable, searchable, filterable data tables with a fluent API that handles the complexity of query building, request parsing, and state management—so you can focus on your business logic.

## Hewcode in 5 Minutes

Here's how little code it takes to build a fully-featured data table with sorting, searching, filtering, and pagination:

```php
use Hewcode\Hewcode\Discovery\Discovery;
use Hewcode\Hewcode\Lists;
use Hewcode\Hewcode\Contracts\ResourceController;

class PostController extends Controller implements ResourceController
{
    public function index(): Response
    {
        // Discovery automatically finds and transforms your listings
        return Inertia::render('posts/index', Discovery::for($this));
    }

    public function canAccess(?string $method = '__invoke'): bool
    {
        return auth()->check(); // Secure your listings with authorization
    }

    #[Lists\Expose] // This attribute tells Discovery to expose this listing
    public function posts(): Lists\Listing
    {
        return Lists\Listing::make()
            ->query(Post::query()->with('user', 'category'))
            ->columns([
                Lists\Schema\TextColumn::make('title')
                    ->sortable()
                    ->searchable(),
                Lists\Schema\TextColumn::make('user.name')
                    ->label('Author')
                    ->badge(variant: 'outline'),
                Lists\Schema\TextColumn::make('status')
                    ->badge(),
            ])
            ->filters([
                Lists\Filters\SelectFilter::make('status')
                    ->options(PostStatus::class),
            ])
            ->defaultSort('created_at', 'desc');
    }
}
```

On the frontend, it's even simpler:

```tsx
import { DataTable } from '@hewcode/react';
import { usePage } from '@inertiajs/react';

export default function Index() {
    const { posts } = usePage().props;
    
    return <DataTable {...posts} />;
}
```

That's it. You now have a production-ready data table with sorting, filtering, search, pagination, and relationship support.

## Why Hewcode?

Building data-heavy interfaces typically requires hundreds of lines of boilerplate code for filtering, sorting, pagination, and state management. Hewcode eliminates this repetition with a declarative API that's both powerful and maintainable.

**Instead of writing custom controllers, query builders, and request handlers for each table, you write:**
- Fluent, readable column definitions
- Automatic relationship handling  
- Built-in authorization with ResourceController
- Zero-configuration pagination and search
- State persistence in sessions or URLs

**Hewcode is perfect for:**
- Admin panels and dashboards
- Data-heavy SaaS applications  
- Internal tools requiring complex filtering
- Any application where you display tabular data

## Learning Path

New to Hewcode? Follow this path to mastery:

### 1. Start Here
**[Listing](listing.md)** - The core data table builder. Start with "Your First Listing" for the simplest example, then explore features as you need them.

### 2. Build Your Columns  
**[TextColumn](text-column.md)** - Learn to format, style, and customize your data display. Covers relationships, badges, conditional formatting, and more.

### 3. Understand Authorization
**[Authorization](authorization.md)** - Secure your listings and actions with the ResourceController contract and Laravel's authorization system.

### 4. Advanced Features
- **[Automatic Locale Labels](automatic-locale-labels.md)** - Internationalize your column labels automatically
- **Filters, Tabs, and Actions** - Build complex UIs with minimal code (covered in Listing docs)

## Core Concepts

### Discovery API
The Discovery API uses PHP 8 attributes to automatically detect and transform listings in your controllers. Methods tagged with `#[Lists\Expose]` become data sources for your frontend components. This keeps your controllers clean and your data transformation automatic.

### Listing System  
The Listing class builds data tables from Eloquent models or arrays. It handles query building, pagination, sorting, searching, and filtering—transforming complex requirements into simple method chains.

### Column Schema
Columns define how data is displayed. TextColumn handles formatting, styling, relationships, and conditional display. Other column types extend this foundation for specialized data.

### State Persistence
Listings can save user preferences in URLs (shareable) or sessions (private). This means users don't lose their filters, sorts, or search terms when navigating away and back.

## Quick Reference

| Feature | Documentation |
|---------|---------------|
| Building data tables | [Listing](listing.md) |
| Formatting columns | [TextColumn](text-column.md) |
| Securing endpoints | [Authorization](authorization.md) |
| Translation support | [Automatic Locale Labels](automatic-locale-labels.md) |

## How Hewcode Compares

If you've used other Laravel table builders, here's what makes Hewcode different:

**vs. Manual Query Building:**  
Hewcode eliminates boilerplate. No need to manually handle `request()->input('sort')`, build where clauses for filters, or manage pagination—it's all automatic.

**vs. Filament Tables:**  
Hewcode is framework-agnostic on the frontend. While Filament is Laravel + Livewire, Hewcode works with any frontend (React, Vue, etc.) via Inertia. You control your UI completely.

**vs. Livewire Tables:**  
Similar philosophy but different architecture. Hewcode uses Inertia for SPA-like experiences without page reloads, while Livewire stays server-rendered. Choose based on your frontend preferences.

## Best Practices

### Use Automatic Labels for Consistency
Set up translation files once, and all your columns automatically get proper labels:

```php
// lang/en/app.php
return [
    'posts' => [
        'columns' => [
            'title' => 'Article Title',
            'status' => 'Publication Status',
            'published_at' => 'Publication Date',
        ],
    ],
];
```

Now every listing with these columns uses consistent labels, and internationalization is free.

### Eager Load Relationships
Always eager load when using relationship columns to avoid N+1 queries:

```php
// ✅ Efficient
->query(Post::query()->with('user', 'category'))

// ❌ Will cause N+1 queries
->query(Post::query())
```

### Choose the Right Persistence Strategy  
- **Session persistence** for user-specific preferences (filters they use regularly)
- **URL persistence** for shareable views (reports, filtered lists)
- **No persistence** for exploratory browsing

### Implement canAccess Properly
The ResourceController contract is your security layer. Be explicit:

```php
public function canAccess(?string $method = '__invoke'): bool
{
    // ✅ Explicit per-method authorization
    return match ($method) {
        'index' => auth()->user()?->can('view-posts') ?? false,
        'edit' => auth()->user()?->can('edit-posts') ?? false,
        default => false,
    };
    
    // ❌ Too permissive
    // return auth()->check();
}
```

## Getting Help

- **Check the examples** in your PostController and posts/index.tsx  
- **Read the source** at `packages/hewcode/` and `packages/hewcode-react/`
- **Search the docs** for specific methods or patterns

## Next Steps

Start with **[Your First Listing](listing.md#your-first-listing)** to build your first data table in under 5 minutes.
