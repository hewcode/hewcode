# TextColumn

- [Quick Reference](#quick-reference)
- [When To Use TextColumn](#when-to-use-textcolumn)
- [Basic Usage](#basic-usage)
- [Label Configuration](#label-configuration)
- [Sorting and Searching](#sorting-and-searching)
- [Data Transformation](#data-transformation)
- [Visual Styling](#visual-styling)
- [Before and After Content](#before-and-after-content)
- [Visibility Control](#visibility-control)
- [Relationship Columns](#relationship-columns)
- [Complete Examples](#complete-examples)
- [Common Recipes](#common-recipes)
- [Troubleshooting](#troubleshooting)
- [Method Chaining](#method-chaining)

<a name="quick-reference"></a>
## Quick Reference

The `TextColumn` class is the primary column type for displaying text data in listings. It provides extensive customization options for formatting, styling, and behavior, from simple text display to complex formatted output with badges, colors, and relationship data.

| What You Want | Method | Example |
|---------------|--------|---------|
| Make it sortable | `->sortable()` | `TextColumn::make('title')->sortable()` |
| Include in search | `->searchable()` | `TextColumn::make('email')->searchable()` |
| Custom label | `->label()` | `->label('Full Name')` |
| Format dates | `->getStateUsing()` | `->getStateUsing(fn ($r) => $r->date->format('M j'))` |
| Display as badge | `->badge()` | `->badge()` or `->badge(true, 'outline')` |
| Dynamic colors | `->color()` | `->color(fn ($r) => $r->status->color())` |
| Show relationships | Dot notation | `TextColumn::make('user.name')` |
| Wrap long text | `->wrap()` | `->wrap()` |
| Let users hide it | `->togglable()` | `->togglable()` |
| Additional content | `->after()` or `->before()` | `->after(fn ($r) => $r->slug)` |
| Conditional hiding | `->omit()` | `->omit(fn ($r) => !$r->is_public)` |

<a name="when-to-use-textcolumn"></a>
## When To Use TextColumn

Use TextColumn for:

- Plain text values (names, titles, descriptions)
- Formatted text (dates, currency, phone numbers)
- Status indicators with badges
- Relationship data (user names, category names)
- Any data that can be represented as a string

For non-text data types (images, booleans, numbers with special formatting), future column types will provide specialized handling, but TextColumn works for most use cases today.

<a name="basic-usage"></a>
## Basic Usage

```php
use Hewcode\Hewcode\Lists\Schema\TextColumn;

TextColumn::make('title')
```

<a name="label-configuration"></a>
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

<a name="sorting-and-searching"></a>
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

<a name="data-transformation"></a>
## Data Transformation

### Custom Data Retrieval

Override how data is retrieved from the record:

```php
TextColumn::make('status')
    ->getStateUsing(fn ($record) => $record->status->getLabel())

TextColumn::make('published_at')
    ->getStateUsing(fn ($record) => $record->published_at?->format('M j, Y'))
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
    ->getStateUsing(fn ($record) => $record->created_at)
    ->formatStateUsing(fn (Carbon $date) => $date->format('M j, Y g:i A'))
```

<a name="visual-styling"></a>
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
    ->color(fn ($record) => $record->category->color)

TextColumn::make('status')
    ->color(fn ($record) => match ($record->status) {
        PostStatus::DRAFT => 'warning',
        PostStatus::PUBLISHED => 'success',
        default => 'secondary',
    })
```

<a name="before-and-after-content"></a>
## Before and After Content

Add content before or after the main column value:

```php
TextColumn::make('title')
    ->after(fn ($record) => $record->slug)

TextColumn::make('price')
    ->before(fn ($record) => '$')
    ->after(fn ($record) => ' USD')
```

<a name="visibility-control"></a>
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

<a name="relationship-columns"></a>
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

<a name="complete-examples"></a>
## Complete Examples

### Basic Text Column

The simplest column—just display the value:

```php
TextColumn::make('title')
```

### Sortable and Searchable Column

The most common pattern for user-facing text columns:

```php
TextColumn::make('title')
    ->sortable()
    ->searchable()
```

### Formatted Date Column

Display dates in a readable format:

```php
TextColumn::make('published_at')
    ->label('Published')
    ->sortable()
    ->getStateUsing(fn ($record) => $record->published_at?->format('M j, Y'))
```

**Why getStateUsing?** Carbon objects can't be directly converted to strings. This transforms them into the format you want.

### Status Badge with Dynamic Color

Perfect for status fields with color-coded visual indicators:

```php
TextColumn::make('status')
    ->sortable()
    ->badge(true, 'secondary')
    ->getStateUsing(fn ($record) => $record->status->getLabel())
    ->color(fn ($record) => match ($record->status) {
        PostStatus::DRAFT => 'warning',
        PostStatus::PUBLISHED => 'success',
        PostStatus::ARCHIVED => 'secondary',
    })
```

**Result:** A colored badge that shows "Published" in green, "Draft" in yellow, etc.

### Relationship Column with Badge

Display related model data with visual styling:

```php
TextColumn::make('user.name')
    ->label('Author')
    ->sortable()
    ->searchable()
    ->badge(variant: 'outline')
```

**Important:** Remember to eager-load: `->query(Post::query()->with('user'))`

### Relationship Column with Additional Context

Show the main value and supporting information:

```php
TextColumn::make('user.name')
    ->label('Author')
    ->sortable()
    ->searchable()
    ->badge(variant: 'outline')
    ->after(fn ($record) => $record->user->email)
```

**Result:** Shows "John Doe" as a badge with their email below.

### Long Content Column

For description fields or other long text:

```php
TextColumn::make('content')
    ->searchable()
    ->wrap()
    ->formatStateUsing(fn ($value) => Str::limit($value, 100))
```

The combination of `wrap()` and `Str::limit()` ensures long text is readable but not overwhelming.

### Currency Formatting

Display monetary values properly formatted:

```php
TextColumn::make('price')
    ->sortable()
    ->getStateUsing(fn ($record) => $record->price / 100)  // Convert cents
    ->formatStateUsing(fn ($value) => '$' . number_format($value, 2))
```

### Conditional Display Based on Permissions

Hide sensitive data from unauthorized users:

```php
TextColumn::make('email')
    ->searchable()
    ->omit(fn ($record) => !auth()->user()->can('view-user-emails'))
```

The column exists but shows empty values for users without permission.

### Togglable Column Hidden by Default

For details that users might want but don't need to see initially:

```php
TextColumn::make('created_at')
    ->sortable()
    ->getStateUsing(fn ($record) => $record->created_at->format('M j, Y g:i A'))
    ->togglable(isToggledHiddenByDefault: true)
```

Users can enable this column via the column visibility menu.

### Deep Relationship Column

Navigate through multiple relationships:

```php
TextColumn::make('category.parent.name')
    ->label('Parent Category')
    ->sortable()
    ->badge()
```

**Remember to eager-load:** `->query(Post::query()->with('category.parent'))`

<a name="common-recipes"></a>
## Common Recipes

### How to Format Phone Numbers

```php
TextColumn::make('phone')
    ->formatStateUsing(fn ($value) => 
        preg_replace('/(\d{3})(\d{3})(\d{4})/', '($1) $2-$3', $value)
    )
```

### How to Display Boolean as Yes/No

```php
TextColumn::make('is_active')
    ->label('Active')
    ->badge()
    ->getStateUsing(fn ($record) => $record->is_active ? 'Yes' : 'No')
    ->color(fn ($record) => $record->is_active ? 'success' : 'danger')
```

### How to Show Relative Dates

```php
TextColumn::make('created_at')
    ->label('Posted')
    ->getStateUsing(fn ($record) => $record->created_at->diffForHumans())
```

**Result:** "2 hours ago", "3 days ago", etc.

### How to Display Arrays or JSON

```php
TextColumn::make('tags')
    ->formatStateUsing(fn ($value) => collect($value)->join(', '))
```

### How to Add Icons

```php
TextColumn::make('status')
    ->before(fn ($record) => match ($record->status) {
        PostStatus::PUBLISHED => '✓ ',
        PostStatus::DRAFT => '✎ ',
        default => '',
    })
```

<a name="troubleshooting"></a>
## Troubleshooting

### Column showing "[object Object]" or weird output

**Problem:** Trying to display a complex object like a Carbon date or model directly.

**Solution:** Use `getStateUsing()` to convert it to a string:

```php
// ❌ Doesn't work
TextColumn::make('published_at')

// ✅ Works
TextColumn::make('published_at')
    ->getStateUsing(fn ($record) => $record->published_at?->format('Y-m-d'))
```

### Relationship column not sortable

**Problem:** Clicking the relationship column header doesn't sort or throws an error.

**Solution:** Explicitly specify the database path for sorting:

```php
TextColumn::make('user.name')
    ->sortable(true, 'users.name')  // Specify the full table.column path
```

### Search not finding relationship values

**Problem:** Searching doesn't find values in relationship columns.

**Solution:** Specify the searchable field explicitly:

```php
TextColumn::make('user.name')
    ->searchable(true, 'users.name')
```

### Badge not displaying

**Problem:** Called `->badge()` but text still appears as plain text.

**Solution:** Ensure you're using the `@hewcode/react` DataTable component on the frontend, which knows how to render badges.

### After/Before content not showing

**Problem:** Used `->after()` but the content doesn't appear.

**Solution:** Check that the callback returns a string value (not an object or array):

```php
// ❌ Returns an object
->after(fn ($record) => $record->user)

// ✅ Returns a string
->after(fn ($record) => $record->user->email)
```

<a name="method-chaining"></a>
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