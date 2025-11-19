# Forms

- [When To Use Forms](#when-to-use-forms)
- [How It Works](#how-it-works)
- [Your First Form](#your-first-form)
- [Essential Configuration](#essential-configuration)
    - [Schema Fields](#schema-fields)
    - [Field Types](#field-types)
    - [Validation](#validation)
- [Common Patterns](#common-patterns)
- [Advanced Features](#advanced-features)
    - [Custom Submit Handlers](#custom-submit-handlers)
    - [Custom Fill Logic](#custom-fill-logic)
    - [Conditional Fields](#conditional-fields)
    - [Relationships](#relationships)
    - [Custom Footer Actions](#custom-footer-actions)
    - [Field State Transformation](#field-state-transformation)
- [Complete Real-World Example](#complete-real-world-example)
- [Reference](#reference)
    - [Available Field Types](#reference-available-field-types)

<a name="when-to-use-forms"></a>
## When To Use Forms

Hewcode's Form class provides a declarative API for building data entry forms that work seamlessly with Eloquent models. Forms handle validation, state management, and data persistence with minimal boilerplate, letting you focus on defining fields rather than writing submission logic.

Use Hewcode Forms when you need to:

- Create or edit Eloquent model records
- Build structured data entry interfaces with validation
- Handle complex field types like selects, date pickers, and textareas
- Automatically populate forms from existing records
- Work with model relationships in form fields
- Validate user input with Laravel's validation system

Forms integrate with Inertia.js and provide a React component that handles all client-side state and submission.

<a name="how-it-works"></a>
## How It Works

When a user interacts with your form, here's the flow:

```
Browser Render → Form Component → User Input → Submit → Backend Validation → Database
     ↓                                                         ↓
Frontend Props ← Form Definition ← Controller    Success/Errors ← Validation
```

The Form class:
1. Receives field schema configuration from your controller
2. Automatically fills form state from an existing record (for editing)
3. Sends field definitions and initial state to the frontend
4. Validates submitted data using Laravel's validator
5. Saves data to the database (or calls your custom handler)

You configure the fields and validation rules, and Form handles the rest.

<a name="your-first-form"></a>
## Your First Form

Let's start with the absolute minimum. In your controller, create a method that returns a Form:

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
            ->visible()  // Required
            ->schema([
                Forms\Schema\TextInput::make('title')
                    ->required(),
                Forms\Schema\Textarea::make('content')
                    ->required(),
            ]);
    }
}
```

On the frontend, just spread the props:

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

That's it. You now have a fully functional form that validates and saves your Post model.

**How it works:**
- When editing, the form automatically fills with the record's current values
- On submit, validation runs server-side using the field rules
- If valid, the record updates automatically
- If invalid, errors display on the appropriate fields

<a name="essential-configuration"></a>
## Essential Configuration

These are the most commonly used configuration methods you'll need for typical forms.

<a name="schema-fields"></a>
### Schema Fields

Define which fields to display using the `schema()` method:

```php
->schema([
    TextInput::make('title')->required(),
    Textarea::make('content'),
    Select::make('status')->options(PostStatus::class),
])
```

Each field automatically generates labels from the field name, handles validation, and manages state.

<a name="field-types"></a>
### Field Types

Hewcode provides several field types out of the box:

#### TextInput

Single-line text input for short strings:

```php
Forms\Schema\TextInput::make('title')
    ->label('Post Title')
    ->placeholder('Enter a title...')
    ->required()
    ->maxLength(255)
```

#### Textarea

Multi-line text input for longer content:

```php
Forms\Schema\Textarea::make('content')
    ->label('Content')
    ->rows(8)
    ->required()
```

#### Select

Dropdown selection from predefined options:

```php
Forms\Schema\Select::make('status')
    ->label('Status')
    ->options(PostStatus::class)  // Enum
    ->required()
```

Or with a static array:

```php
Forms\Schema\Select::make('category')
    ->options([
        'tech' => 'Technology',
        'business' => 'Business',
        'lifestyle' => 'Lifestyle',
    ])
```

#### DateTimePicker

Date and time selection:

```php
Forms\Schema\DateTimePicker::make('published_at')
    ->label('Published At')
```

Configure which components to show:

```php
// Date only
Forms\Schema\DateTimePicker::make('birth_date')
    ->time(false)

// Time only
Forms\Schema\DateTimePicker::make('meeting_time')
    ->date(false)

// Both date and time (default)
Forms\Schema\DateTimePicker::make('published_at')
```

Use custom calendar picker instead of native browser input:

```php
Forms\Schema\DateTimePicker::make('published_at')
    ->native(false)  // Custom calendar/time picker with popover
```

The custom picker provides a consistent UI across all browsers using a calendar popover and time inputs.

<a name="validation"></a>
### Validation

Add validation rules using Laravel's validation syntax:

```php
Forms\Schema\TextInput::make('email')
    ->label('Email Address')
    ->required()
    ->email()
    ->maxLength(255)
```

Common validation methods:
- `required()` - Field must have a value
- `email()` - Must be valid email format
- `maxLength(int)` - Maximum character length
- `minLength(int)` - Minimum character length
- `numeric()` - Must be numeric
- `unique(string $table, string $column = null)` - Must be unique in database

<a name="common-patterns"></a>
## Common Patterns

These patterns cover 80% of typical form use cases.

### Enum Select Fields

Display enums as dropdown options:

```php
Forms\Schema\Select::make('status')
    ->label('Status')
    ->options(PostStatus::class)
    ->required()
```

The select automatically extracts enum values and labels (via `getLabel()` method or name property).

### Optional Fields with Defaults

Provide default values for optional fields:

```php
Forms\Schema\Select::make('status')
    ->label('Status')
    ->options(PostStatus::class)
    ->default(PostStatus::DRAFT->value)
```

### Text Fields with Placeholders

Guide users with helpful placeholder text:

```php
Forms\Schema\TextInput::make('slug')
    ->label('URL Slug')
    ->placeholder('my-post-slug')
    ->maxLength(255)
```

### Long-form Content

Use textarea with custom row height:

```php
Forms\Schema\Textarea::make('description')
    ->label('Description')
    ->rows(5)
    ->placeholder('Enter a brief description...')
```

<a name="advanced-features"></a>
## Advanced Features

These features handle more complex use cases.

<a name="custom-submit-handlers"></a>
### Custom Submit Handlers

Override the default save behavior with custom logic:

```php
#[Forms\Expose]
public function form(): Forms\Form
{
    return Forms\Form::make()
        ->model(Post::class)
        ->visible()
        ->schema([
            Forms\Schema\TextInput::make('title')->required(),
            Forms\Schema\Textarea::make('content')->required(),
        ])
        ->submitUsing(function (array $data, ?Post $record) {
            if ($record) {
                // Updating existing record
                $record->update($data);
                $record->generateSlug();
            } else {
                // Creating new record
                $post = Post::create($data);
                $post->author_id = auth()->id();
                $post->save();
            }
        });
}
```

The `submitUsing()` callback receives:
- `$data` - Validated form data
- `$record` - Current record (if editing) or null (if creating)

<a name="custom-fill-logic"></a>
### Custom Fill Logic

Override how form fields are populated from records:

```php
->fillUsing(function (?Post $record) {
    if (!$record) {
        return [
            'status' => PostStatus::DRAFT->value,
            'author_id' => auth()->id(),
        ];
    }
    
    return [
        'title' => $record->title,
        'content' => $record->content,
        'status' => $record->status->value,
    ];
})
```

This is useful when you need to transform data before displaying it in the form.

<a name="conditional-fields"></a>
### Conditional Fields

Show or hide fields based on conditions:

```php
->schema([
    Forms\Schema\TextInput::make('title')->required(),
    Forms\Schema\DateTimePicker::make('published_at')
        ->label('Published At')
        ->visible(fn (?Post $record) => $record?->status === PostStatus::PUBLISHED),
])
```

The field only appears when the condition returns true.

<a name="relationships"></a>
### Relationships

Select related models with searchable dropdowns:

```php
Forms\Schema\Select::make('category_id')
    ->label('Category')
    ->relationship('category')  // Relationship name
    ->searchable()
    ->preload()  // Load first 25 options immediately
    ->required()
```

**How it works:**
- `relationship('category')` tells the field to work with the category relationship
- `searchable()` enables real-time search as the user types
- `preload()` loads the first 25 options on page load
- The field automatically uses the related model's `name` column (customizable)

**Custom title column:**

```php
Forms\Schema\Select::make('author_id')
    ->label('Author')
    ->relationship('author', titleColumn: 'full_name')
    ->searchable()
    ->preload()
```

**Multiple selection:**

```php
Forms\Schema\Select::make('tags')
    ->label('Tags')
    ->relationship('tags')
    ->multiple()
    ->searchable()
    ->preload()
```

**Custom query modification:**

Modify the relationship query for filtering or scoping:

```php
Forms\Schema\Select::make('author_id')
    ->label('Author')
    ->relationship(
        relationshipName: 'author',
        titleColumn: 'name',
        modifyQueryUsing: fn ($query) => $query->where('active', true)
    )
    ->searchable()
    ->preload()
```

**How relationship fields save:**

When using `relationship()`, the field automatically handles saving:
- **BelongsTo**: Uses `associate()` to set the foreign key
- **BelongsToMany**: Uses `sync()` to update the pivot table
- For multiple selections, combine with `multiple()` method

<a name="custom-footer-actions"></a>
### Custom Footer Actions

Add custom action buttons to the form footer alongside the default submit button:

```php
use Hewcode\Hewcode\Actions;

#[Forms\Expose]
public function form(): Forms\Form
{
    return Forms\Form::make()
        ->model(Post::class)
        ->visible()
        ->schema([
            Forms\Schema\TextInput::make('title')->required(),
            Forms\Schema\Textarea::make('content')->required(),
        ])
        ->footerActions([
            Actions\Action::make('save_draft')
                ->label('Save as Draft')
                ->color('secondary')
                ->action(function (array $data, ?Post $record) {
                    $data['status'] = PostStatus::DRAFT;
                    if ($record) {
                        $record->update($data);
                    } else {
                        Post::create($data);
                    }
                }),
            Actions\Action::make('publish')
                ->label('Publish Now')
                ->color('primary')
                ->action(function (array $data, ?Post $record) {
                    $data['status'] = PostStatus::PUBLISHED;
                    $data['published_at'] = now();
                    if ($record) {
                        $record->update($data);
                    } else {
                        Post::create($data);
                    }
                }),
        ]);
}
```

**Conditional footer actions:**

Show or hide actions based on the current record:

```php
->footerActions([
    Actions\Action::make('unpublish')
        ->label('Unpublish')
        ->color('warning')
        ->visible(fn (?Post $record) => $record?->status === PostStatus::PUBLISHED)
        ->action(fn (Post $record) => $record->update(['status' => PostStatus::DRAFT])),
])
```

<a name="field-state-transformation"></a>
### Field State Transformation

Transform field data when loading from or saving to the database.

**Format when loading (read transformation):**

```php
Forms\Schema\TextInput::make('price')
    ->formatStateUsing(fn ($state) => $state ? $state / 100 : null)  // Convert cents to dollars
```

**Transform when saving (write transformation):**

```php
Forms\Schema\TextInput::make('price')
    ->setStateUsing(fn ($state) => $state ? $state * 100 : null)  // Convert dollars to cents
```

**Prevent saving to database:**

Use `dehydrated(false)` for computed or display-only fields:

```php
Forms\Schema\TextInput::make('full_name')
    ->formatStateUsing(fn ($record) => $record->first_name . ' ' . $record->last_name)
    ->dehydrated(false)  // Don't save this to the database
```

**Custom save logic:**

Handle complex save scenarios with `saveUsing()`:

```php
Forms\Schema\Select::make('tags')
    ->label('Tags')
    ->options(Tag::pluck('name', 'id')->toArray())
    ->multiple()
    ->dehydrated(false)  // Don't try to save as a regular field
    ->saveUsing(function ($state, $record) {
        // Custom sync logic
        $record->tags()->sync($state);
    })
```

**Common use cases:**

```php
// Hash password before saving
Forms\Schema\TextInput::make('password')
    ->setStateUsing(fn ($state) => bcrypt($state))

// JSON encode array data
Forms\Schema\Textarea::make('settings')
    ->formatStateUsing(fn ($state) => json_encode($state, JSON_PRETTY_PRINT))
    ->setStateUsing(fn ($state) => json_decode($state, true))

// Format currency for display
Forms\Schema\TextInput::make('amount')
    ->formatStateUsing(fn ($state) => number_format($state / 100, 2))
    ->setStateUsing(fn ($state) => (int) ($state * 100))
```

<a name="complete-real-world-example"></a>
## Complete Real-World Example

Here's a comprehensive example showing most features working together:

```php
use Hewcode\Hewcode\Props;
use Hewcode\Hewcode\Forms;

class PostController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('posts/edit', Props\Props::for($this)
            ->components(['form'])
        );
    }

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
            ->visible(auth()->user()?->can('manage-posts') ?? false)
            ->schema([
                Forms\Schema\TextInput::make('title')
                    ->label('Title')
                    ->placeholder('Enter post title...')
                    ->required()
                    ->maxLength(255),
                Forms\Schema\Textarea::make('content')
                    ->label('Content')
                    ->placeholder('Write your post content...')
                    ->rows(8)
                    ->required(),
                Forms\Schema\Select::make('status')
                    ->label('Status')
                    ->options(PostStatus::class)
                    ->default(PostStatus::DRAFT->value)
                    ->required(),
                Forms\Schema\Select::make('category_id')
                    ->label('Category')
                    ->relationship('category')
                    ->searchable()
                    ->preload()
                    ->required(),
                Forms\Schema\DateTimePicker::make('published_at')
                    ->label('Published At')
                    ->visible(fn (?Post $record) => 
                        $record?->status === PostStatus::PUBLISHED
                    ),
            ])
            ->submitUsing(function (array $data, ?Post $record) {
                if ($record) {
                    $record->update($data);
                } else {
                    $post = Post::create($data);
                    $post->author_id = auth()->id();
                    $post->save();
                }
            });
    }

    public function store(Request $request): RedirectResponse
    {
        // Form handles this automatically via the submit action
        return redirect()->route('posts.index');
    }

    public function update(Request $request, Post $post): RedirectResponse
    {
        // Form handles this automatically via the submit action
        return redirect()->route('posts.index');
    }
}
```

**Frontend component:**

```tsx
import { Form } from '@hewcode/react';
import { Head, router, usePage } from '@inertiajs/react';
import AppLayout from '../../layouts/app-layout';

export default function Edit() {
    const { form: formData, record } = usePage().props;
    const isEditing = !!record;

    return (
        <AppLayout 
            header={
                <h2 className="text-xl leading-tight font-semibold text-gray-800">
                    {isEditing ? 'Edit Post' : 'Create Post'}
                </h2>
            }
        >
            <Head title={isEditing ? 'Edit Post' : 'Create Post'} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <Form 
                                {...formData} 
                                onCancel={() => router.visit('/posts')}
                                onSuccess={() => {
                                    router.visit('/posts');
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
```

<a name="reference"></a>
## Reference

<a name="reference-available-field-types"></a>
### Available Field Types

#### TextInput
Single-line text input.

**Methods:**
- `make(string $name)` - Create field
- `label(string $label)` - Set label
- `placeholder(string $placeholder)` - Set placeholder
- `default(mixed $value)` - Set default value
- `required()` - Mark as required
- `email()` - Validate as email
- `maxLength(int $length)` - Set max length
- `minLength(int $length)` - Set min length
- `numeric()` - Validate as numeric

#### Textarea
Multi-line text input.

**Methods:**
- `make(string $name)` - Create field
- `label(string $label)` - Set label
- `placeholder(string $placeholder)` - Set placeholder
- `rows(int $rows)` - Set number of rows
- `default(mixed $value)` - Set default value
- `required()` - Mark as required
- `maxLength(int $length)` - Set max length

#### Select
Dropdown selection.

**Methods:**
- `make(string $name)` - Create field
- `label(string $label)` - Set label
- `options(array|string $options)` - Set options (array or enum class)
- `relationship(string $name, string $titleColumn = 'name')` - Load from relationship
- `searchable(bool $searchable = true)` - Enable search
- `multiple(bool $multiple = true)` - Allow multiple selections
- `preload(int $limit = 25)` - Preload options
- `default(mixed $value)` - Set default value
- `required()` - Mark as required

#### DateTimePicker
Date and time selection.

**Methods:**
- `make(string $name)` - Create field
- `label(string $label)` - Set label
- `time(bool $time = true)` - Enable/disable time picker
- `date(bool $date = true)` - Enable/disable date picker
- `native(bool $native = true)` - Use native browser input (true) or custom picker (false)
- `default(mixed $value)` - Set default value
- `required()` - Mark as required

### Form Methods

**Configuration:**
- `make()` - Create new form instance
- `model(string $class)` - Set Eloquent model class
- `schema(array $fields)` - Define form fields
- `visible(bool|Closure $condition = true)` - Set visibility condition

**Customization:**
- `submitUsing(Closure $callback)` - Custom submit handler
- `fillUsing(Closure $callback)` - Custom fill logic
- `submitAction(Closure $callback)` - Customize submit action button
