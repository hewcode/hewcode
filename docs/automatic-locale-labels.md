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

## Fallback Behavior

If no translation is found, the system falls back to the original behavior:

1. **Dot notation columns**: `category.name` → `"Category Name"`
2. **Regular columns**: `created_at` → `"Created At"`
