# TextColumn

The `TextColumn` class is the primary column type for displaying text data in listings. It provides extensive customization options for formatting, styling, and behavior.

## Basic Usage

```php
use Hewcode\Hewcode\Lists\Schema\TextColumn;

TextColumn::make('title')
```

## Label Configuration

### Explicit Labels

Set a custom label for the column header:

```php
TextColumn::make('published_at')
    ->label('Published At')
```

### Automatic Locale Labels

When no explicit label is set, TextColumn automatically looks for translations in your locale files:

- For regular columns: `app.{plural_model}.columns.{column_name}`
- For relationship columns: `app.{related_model}.columns.{column_name}`

```php
// For Post model with column 'title'
// Looks for: app.posts.columns.title

// For relationship column 'category.name'
// Looks for: app.categories.columns.name
```

Example locale file (`lang/en/app.php`):

```php
return [
    'posts' => [
        'columns' => [
            'id' => 'Post ID',
            'title' => 'Article Title',
            'content' => 'Article Content',
            'status' => 'Publication Status',
        ],
    ],
    'categories' => [
        'columns' => [
            'name' => 'Category Name',
            'description' => 'Category Description',
        ],
    ],
];
```

If no translation is found, falls back to the default title-cased column name.

## Sorting and Searching

### Make Column Sortable

```php
TextColumn::make('title')
    ->sortable()  // Uses the column name as sort field

// Custom sort field
TextColumn::make('user.name')
    ->sortable(true, 'users.name')
```

### Make Column Searchable

```php
TextColumn::make('title')
    ->searchable()  // Uses the column name as search field

// Custom search field
TextColumn::make('category.name')
    ->searchable(true, 'categories.name')
```

### Combined Sorting and Searching

```php
TextColumn::make('title')
    ->sortable()
    ->searchable()
```

## Data Transformation

### Custom Data Retrieval

Override how data is retrieved from the record:

```php
TextColumn::make('status')
    ->getStateUsing(fn (Post $post) => $post->status->getLabel())

TextColumn::make('published_at')
    ->getStateUsing(fn (Post $post) => $post->published_at?->format('M j, Y'))
```

### Data Formatting

Format the retrieved value before display:

```php
TextColumn::make('price')
    ->formatStateUsing(fn ($value) => '$' . number_format($value, 2))
```

### Combining Both

```php
TextColumn::make('created_at')
    ->getStateUsing(fn (Post $post) => $post->created_at)
    ->formatStateUsing(fn (Carbon $date) => $date->format('M j, Y g:i A'))
```

## Visual Styling

### Text Wrapping

Allow long text to wrap to multiple lines:

```php
TextColumn::make('content')
    ->wrap()  // Default: false
```

### Badge Display

Display the column value as a badge:

```php
TextColumn::make('status')
    ->badge()  // Default variant

TextColumn::make('user.name')
    ->badge(true, 'outline')  // With specific variant

TextColumn::make('category.name')
    ->badge(true, 'secondary')
```

### Dynamic Colors

Add dynamic coloring based on the record data:

```php
TextColumn::make('category.name')
    ->badge()
    ->color(fn (Post $post) => $post->category->color)

TextColumn::make('status')
    ->color(fn (Post $post) => match ($post->status) {
        PostStatus::DRAFT => 'warning',
        PostStatus::PUBLISHED => 'success',
        default => 'secondary',
    })
```

## Before and After Content

Add content before or after the main column value:

```php
TextColumn::make('title')
    ->after(fn (Post $post) => $post->slug)

TextColumn::make('price')
    ->before(fn (Product $product) => '$')
    ->after(fn (Product $product) => ' USD')
```

## Visibility Control

### Static Visibility

```php
TextColumn::make('internal_notes')
    ->visible(false)  // Always hidden
```

### Dynamic Visibility

```php
TextColumn::make('admin_notes')
    ->visible(fn () => auth()->user()->isAdmin())
```

### Conditional Value Omission

Omit (empty) the column value for specific records while keeping the column visible:

```php
TextColumn::make('email')
    ->omit(fn (User $record) => !auth()->user()->canViewEmails())

TextColumn::make('salary')
    ->omit(fn (Employee $record) => $record->department !== 'HR')
```

**Note:** The `omit()` method differs from `visible()` in that:
- `visible()` controls whether the entire column appears for all records
- `omit()` controls whether the value is shown for individual records, returning `null` when the condition is met

## Relationship Columns

TextColumn seamlessly handles Eloquent relationships:

```php
// Single relationship
TextColumn::make('user.name')
    ->label('Author')

// Nested relationships
TextColumn::make('category.parent.name')
    ->label('Parent Category')
```

**Important:** Make sure to eager load relationships in your query:

```php
Post::query()->with(['user', 'category.parent'])
```

## Complete Examples

### Basic Text Column

```php
TextColumn::make('title')
    ->sortable()
    ->searchable()
```

### Formatted Date Column

```php
TextColumn::make('published_at')
    ->label('Published At')
    ->sortable()
    ->getStateUsing(fn (Post $post) => $post->published_at?->format('M j, Y'))
```

### Badge with Dynamic Color

```php
TextColumn::make('status')
    ->sortable()
    ->badge(true, 'secondary')
    ->getStateUsing(fn (Post $post) => $post->status->getLabel())
    ->color(fn (Post $post) => match ($post->status) {
        PostStatus::DRAFT => 'warning',
        PostStatus::PUBLISHED => 'success',
        default => 'secondary',
    })
```

### Relationship Column with Additional Content

```php
TextColumn::make('user.name')
    ->label('Author')
    ->sortable()
    ->searchable()
    ->badge(true, 'outline')
    ->after(fn (Post $post) => $post->user->email)
```

### Long Content Column

```php
TextColumn::make('content')
    ->searchable()
    ->wrap()
    ->formatStateUsing(fn ($value) => Str::limit($value, 100))
```

## Method Chaining

All TextColumn methods return the instance, allowing for fluent method chaining:

```php
TextColumn::make('title')
    ->label('Article Title')
    ->sortable()
    ->searchable()
    ->wrap()
    ->badge()
    ->color(fn ($record) => 'blue')
    ->before(fn ($record) => '📝 ')
    ->visible(true)
    ->omit(fn ($record) => $record->is_draft)
```