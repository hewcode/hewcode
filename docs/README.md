# Hewcode Documentation

Hewcode transforms complex data tables and forms into elegant, maintainable code. Built for Laravel and React applications with Inertia.js, it provides sortable, searchable, filterable data tables and declarative forms with a fluent API that handles the complexity of query building, validation, and state management—so you can focus on your business logic.

Inspired by [Filament](https://filamentphp.com), Hewcode brings a similar developer experience to React-based applications.

## Installation

Get started in minutes:

```bash
composer require hewcode/hewcode
npm install @hewcode/react
```

See the [Installation Guide](installation.md) for detailed instructions and requirements.

## Hewcode in 5 Minutes

### Data Tables

Here's how little code it takes to build a fully-featured data table with sorting, searching, filtering, and pagination:

```php
use Hewcode\Hewcode\Props;
use Hewcode\Hewcode\Lists;

class PostController extends Controller
{
    public function index(): Response
    {
        // Props explicitly exposes selected component methods
        return Inertia::render('posts/index', Props\Props::for($this)->components(['posts']));
    }

    #[Lists\Expose] // This attribute marks this as an exposed component
    public function posts(): Lists\Listing
    {
        return Lists\Listing::make()
            ->visible(auth()->check()) // Required: control who can access this listing
            ->query(Post::query()->with('user', 'category'))
            ->columns([
                Lists\Schema\TextColumn::make('title')
                    ->sortable()
                    ->searchable(),
                Lists\Schema\TextColumn::make('published_at')
                    ->date(),
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

### Forms

Building a form that validates and saves data is just as simple:

```php
use Hewcode\Hewcode\Props;
use Hewcode\Hewcode\Forms;

class PostController extends Controller
{
    public function edit(Post $post): Response
    {
        return Inertia::render('posts/edit', Props\Props::for($this)
            ->record($post)
            ->components(['form'])
        );
    }

    #[Forms\Expose]
    public function form(): Forms\Form
    {
        return Forms\Form::make()
            ->model(Post::class)
            ->visible(auth()->check())
            ->schema([
                Forms\Schema\TextInput::make('title')
                    ->required()
                    ->maxLength(255),
                Forms\Schema\Textarea::make('content')
                    ->rows(8)
                    ->required(),
                Forms\Schema\Select::make('status')
                    ->options(PostStatus::class)
                    ->required(),
                Forms\Schema\Select::make('category_id')
                    ->relationship('category')
                    ->searchable()
                    ->preload(),
            ]);
    }
}
```

On the frontend:

```tsx
import { Form } from '@hewcode/react';
import { router, usePage } from '@inertiajs/react';

export default function Edit() {
    const { form: formData } = usePage().props;
    
    return (
        <Form 
            {...formData} 
            onCancel={() => router.visit('/posts')}
        />
    );
}
```

You now have a fully validated form that automatically saves your model with server-side validation.

## Why Hewcode?

Building data-heavy interfaces typically requires hundreds of lines of boilerplate code for filtering, sorting, pagination, validation, and state management. Hewcode eliminates this repetition with a declarative API that's both powerful and maintainable.

**Instead of writing custom controllers, query builders, request handlers, and validation logic for each table and form, you write:**
- Fluent, readable column and field definitions
- Automatic relationship handling
- Required authorization control with ->visible()
- Zero-configuration pagination, search, and validation
- State persistence in sessions or URLs

**Hewcode is perfect for:**
- Admin panels and dashboards
- Data-heavy SaaS applications  
- Internal tools requiring complex filtering
- CRUD interfaces with validated forms
- Any application where you display or edit tabular data

## Learning Path

New to Hewcode? Follow this path to mastery:

### 1. Start Here
**[Props](props.md)** - The explicit data exposure system. Learn how to pass controller data to your views with security in mind.

### 2. Build Your Listings
**[Listing](listing.md)** - The core data table builder. Start with "Your First Listing" for the simplest example, then explore features as you need them.

### 3. Build Your Forms
**[Forms](forms.md)** - Create and edit data with declarative forms. Learn field types, validation, and relationships.

### 4. Build Your Columns
**[TextColumn](text-column.md)** - Learn to format, style, and customize your data display. Covers relationships, badges, conditional formatting, and more.

### 5. Understand Authorization
**[Authorization](authorization.md)** - Secure your listings and actions using the ->visible() method.

### 6. Advanced Features
- **[Config](config.md)** - Customize global defaults like date and datetime formats
- **[Automatic Locale Labels](automatic-locale-labels.md)** - Internationalize your column labels automatically
- **Filters, Tabs, and Actions** - Build complex UIs with minimal code (covered in Listing docs)

## Core Concepts

### Props System
The Props system uses PHP 8 attributes to explicitly control which component methods are exposed. You declare which methods to expose via `->components()`, and those methods must be tagged with `#[Lists\Expose]`, `#[Forms\Expose]`, or `#[Actions\Expose]`. This makes your data flow explicit and prevents accidental exposure of unintended data.

### Listing System  
The Listing class builds data tables from Eloquent models or arrays. It handles query building, pagination, sorting, searching, and filtering—transforming complex requirements into simple method chains.

### Form System
The Form class builds data entry forms that validate and save Eloquent models. It handles field rendering, validation, state management, and data persistence—making CRUD operations trivial.

### Column Schema
Columns define how data is displayed. TextColumn handles formatting, styling, relationships, and conditional display. Other column types extend this foundation for specialized data.

### Field Schema
Fields define form inputs with validation. TextInput, Textarea, Select, and DateTimePicker provide the building blocks for data entry with automatic validation and error handling.

### State Persistence
Listings can save user preferences in URLs (shareable) or sessions (private). This means users don't lose their filters, sorts, or search terms when navigating away and back.

## Quick Reference

| Feature | Documentation |
|---------|---------------|
| Installation | [Installation](installation.md) |
| Passing controller data | [Props](props.md) |
| Building data tables | [Listing](listing.md) |
| Building forms | [Forms](forms.md) |
| Formatting columns | [TextColumn](text-column.md) |
| Rich content components | [Fragments](fragments.md) |
| Configuration | [Config](config.md) |
| Securing endpoints | [Authorization](authorization.md) |
| Translation support | [Automatic Locale Labels](automatic-locale-labels.md) |

## How Hewcode Compares

If you've used other Laravel table builders, here's what makes Hewcode different:

**vs. Manual Query Building:**  
Hewcode eliminates boilerplate. No need to manually handle `request()->input('sort')`, build where clauses for filters, or manage pagination—it's all automatic.

**vs. Filament Tables:**  
Hewcode brings Filament's excellent API design to React applications. While Filament is Laravel + Livewire with its own UI components, Hewcode uses Inertia.js and works with your React components. If you love Filament but need a React frontend, Hewcode is for you.

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

### Use ->visible() for Authorization
Control access to listings and actions by using the required ->visible() method:

```php
// ✅ Explicit authorization on each listing
->visible(auth()->user()?->can('view-posts') ?? false)

// ❌ Too permissive
// ->visible(auth()->check())
```

## Next Steps

Start with **[Your First Listing](listing.md#your-first-listing)** to build your first data table in under 5 minutes, or jump to **[Your First Form](forms.md#your-first-form)** to create validated forms.
