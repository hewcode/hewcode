# Automatic Locale Labels

TextColumn automatically resolves column labels from your application's translation files when no explicit label is provided. This feature enables internationalization and consistent labeling across your application.

## How It Works

When a TextColumn is created without an explicit label, the system:

1. **Detects the model context** from the Eloquent query
2. **Determines the appropriate translation key** based on the column type
3. **Attempts translation lookup** in your locale files
4. **Falls back to default behavior** if no translation exists

## Translation Key Patterns

### Regular Columns

For standard model columns, the translation key follows this pattern:

```
app.{plural_model_name}.columns.{column_name}
```

**Examples:**
- `Post` model, `title` column → `app.posts.columns.title`
- `User` model, `email` column → `app.users.columns.email`
- `Category` model, `description` column → `app.categories.columns.description`

### Relationship Columns

For relationship columns (containing dot notation), the system intelligently resolves to the related model:

```
app.{related_model_plural}.columns.{column_name}
```

**Examples:**
- `category.name` → `app.categories.columns.name`
- `user.email` → `app.users.columns.email`
- `post.category.parent.name` → `app.categories.columns.name`

## Setting Up Translation Files

### Directory Structure

Place your translation files in the standard Laravel locations:

```
lang/
├── en/
│   └── app.php
├── es/
│   └── app.php
└── fr/
    └── app.php
```

### Translation File Format

Create an `app.php` file for each locale:

```php
<?php
// lang/en/app.php

return [
    'posts' => [
        'columns' => [
            'id' => 'Post ID',
            'title' => 'Article Title',
            'content' => 'Article Content',
            'status' => 'Publication Status',
            'published_at' => 'Publication Date',
            'created_at' => 'Creation Date',
            'updated_at' => 'Last Modified',
        ],
    ],
    'categories' => [
        'columns' => [
            'id' => 'Category ID',
            'name' => 'Category Name',
            'slug' => 'URL Slug',
            'description' => 'Category Description',
            'color' => 'Display Color',
            'created_at' => 'Creation Date',
        ],
    ],
    'users' => [
        'columns' => [
            'id' => 'User ID',
            'name' => 'Full Name',
            'email' => 'Email Address',
            'email_verified_at' => 'Email Verified',
            'created_at' => 'Registration Date',
        ],
    ],
];
```

### Multi-language Example

```php
<?php
// lang/es/app.php

return [
    'posts' => [
        'columns' => [
            'id' => 'ID del Artículo',
            'title' => 'Título del Artículo',
            'content' => 'Contenido del Artículo',
            'status' => 'Estado de Publicación',
            'published_at' => 'Fecha de Publicación',
            'created_at' => 'Fecha de Creación',
        ],
    ],
    'categories' => [
        'columns' => [
            'name' => 'Nombre de Categoría',
            'description' => 'Descripción de Categoría',
        ],
    ],
];
```

## Examples in Practice

### Before (Manual Labels)

```php
TextColumn::make('id')->label('Post ID'),
TextColumn::make('title')->label('Article Title'),
TextColumn::make('content')->label('Article Content'),
TextColumn::make('status')->label('Publication Status'),
TextColumn::make('category.name')->label('Category Name'),
TextColumn::make('user.name')->label('Author Name'),
```

### After (Automatic Labels)

```php
// These will automatically resolve from locale files
TextColumn::make('id'),           // → 'Post ID'
TextColumn::make('title'),        // → 'Article Title'
TextColumn::make('content'),      // → 'Article Content'
TextColumn::make('status'),       // → 'Publication Status'
TextColumn::make('category.name'), // → 'Category Name' (from categories translations)
TextColumn::make('user.name'),    // → 'Full Name' (from users translations)

// Explicit labels still override automatic ones
TextColumn::make('published_at')->label('Custom Published Date'),
```

## Complete Listing Example

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
            ->query(Post::query()->with(['user', 'category']))
            ->columns([
                // Automatic labels from app.posts.columns.*
                TextColumn::make('id'),        // → 'Post ID'
                TextColumn::make('title'),     // → 'Article Title'
                TextColumn::make('content'),   // → 'Article Content'
                TextColumn::make('status'),    // → 'Publication Status'

                // Automatic labels from related models
                TextColumn::make('category.name'), // → from app.categories.columns.name
                TextColumn::make('user.name'),     // → from app.users.columns.name

                // Explicit labels still work and take precedence
                TextColumn::make('published_at')
                    ->label('Custom Publication Date'),
            ]);
    }
}
```

## Fallback Behavior

If no translation is found, the system falls back to the original behavior:

1. **Dot notation columns**: `category.name` → `"Category Name"`
2. **Regular columns**: `created_at` → `"Created At"`

## Best Practices

### 1. Organize by Model

Keep translations organized by model to maintain clarity:

```php
return [
    'posts' => [
        'columns' => [
            // All post-related column translations
        ],
    ],
    'users' => [
        'columns' => [
            // All user-related column translations
        ],
    ],
];
```

### 2. Consistent Naming

Use consistent naming patterns across models:

```php
'created_at' => 'Creation Date',  // Not "Created On", "Date Created", etc.
'updated_at' => 'Last Modified',  // Consistent across all models
```

### 3. Relationship Columns

Remember that relationship columns resolve to the related model's translations:

```php
// In your listings
TextColumn::make('author.name'),      // Uses app.users.columns.name
TextColumn::make('category.parent.name'), // Uses app.categories.columns.name

// In your translations
'users' => [
    'columns' => [
        'name' => 'Author Name',  // Will be used for author.name
    ],
],
'categories' => [
    'columns' => [
        'name' => 'Category Name', // Will be used for category.name AND category.parent.name
    ],
],
```

### 4. Override When Needed

Use explicit labels when the automatic translation doesn't fit the context:

```php
TextColumn::make('user.name')
    ->label('Article Author'), // More specific than generic 'Full Name'
```

## Migration Strategy

If you have existing listings with manual labels, you can migrate gradually:

1. **Set up translation files** with your current labels
2. **Remove explicit labels** one at a time and verify the automatic resolution
3. **Update translations** as needed for better consistency

This allows you to maintain functionality while cleaning up repetitive label definitions across your application.
