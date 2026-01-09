# Forms

## Getting Started

Let's start with the absolute minimum. In your controller, create a method that returns a Form instance. Use the `#[Forms\Expose]` attribute to expose the form to the frontend, and then pass the name of the method to the `components()` method of the Props builder inside the Inertia render call.

When you pass a model instance to the Props builder's `record()` method, the form will automatically load that record for editing. If no record is provided, the form will operate in "create" mode.

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

:::danger
Remember to always make sure the visibility of actions is properly set using authorization checks to prevent unauthorized access. Assume that controller middleware and controller method checks are not sufficient.
:::

On the frontend, just spread the props:

```tsx
import Form from '@hewcode/react/components/form/Form';
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

By default, since you passed a record and/or specified a model class, the form will update or create records automatically when submitted. If you are not operating on a model or wish to customize the submission logic, you an use the `submitUsing()` method to provide your own callback.

You can receive the submitted form data using a `$data` parameter, and the current record (if any) using a `$record` parameter.

```php
use Hewcode\Hewcode\Forms;

->submitUsing(function (array $data, ?Post $record) {
    if ($record) {
        // Update existing record
        $record->update($data);
    } else {
        // Create new record
        Post::create($data);
    }
})
```

## Form Definition

You can define a Form definition class that allows you to reuse the same form in multiple places.

Create a form definition using the command:

```bash
php artisan hew:form UserForm --model=User --generate
```

You can pass:
* `--model=User` to specify the model explicitly.
* `--generate` to auto-generate form fields based on your model's table structure.

This will create a class that extends `Hewcode\Hewcode\Forms\FormDefinition`:

```php
use App\Models\User;
use Hewcode\Hewcode\Forms;

class UserForm extends Forms\FormDefinition
{
    protected string $model = User::class;

    public function default(Forms\Form $form): Forms\Form
    {
        return $form
            ->visible()
            ->schema([
                Forms\Schema\TextInput::make('name')
                    ->required()
                    ->maxLength(255),
                Forms\Schema\TextInput::make('email')
                    ->email()
                    ->required()
                    ->maxLength(255),
            ]);
    }
}
```

You can then use this Form definition in your controller:

```php
#[Forms\Expose]
public function form(): Forms\Form
{
    return UserForm::make();
}
```

You can pass an additional context parameter which will use a different method than `default()`:

```php
#[Forms\Expose]
public function admins(): Forms\Form
{
    return UserForm::make('employee', context: 'employee');
}

// In UserForm.php
class UserForm extends Forms\FormDefinition
{
    // ...

    public function employee(Forms\Form $form): Forms\Form
    {
        return $form
            ->visible()
            ->schema([
                Forms\Schema\TextInput::make('name')
                    ->required()
                    ->maxLength(255),
                Forms\Schema\TextInput::make('email')
                    ->email()
                    ->required()
                    ->maxLength(255),
                Forms\Schema\Select::make('role')
                    ->options([
                        'admin' => 'Admin',
                        'editor' => 'Editor',
                        'viewer' => 'Viewer',
                    ])
                    ->required(),
            ]);
    }
}
```

## Essentials

### Visibility

Control whether the form is visible using the `visible()` method. You can pass a boolean or a closure that returns a boolean. This is a required step to ensure the form is only shown when appropriate.

```php
->visible(true)
->visible(fn () => auth()->user()?->can('manage-posts') ?? false)
```

### Fill form state

You can fill the form state with custom data using the `fillUsing()` method. This is automatically done when a record is provided, but you can override it to customize the data population logic.

```php
->fillUsing([
    'name' => 'Default Name',
])
```

You can also provide a closure that receives the current record (if any) and returns an array of field values:

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

## Schema

Define which fields to display using the `schema()` method.

Labels are automatically generated from your locale files if no explicit label is provided. See [Automatic Locale Labels](./auto-localization) for more details.

```php
use Hewcode\Hewcode\Forms;

->schema([
    Forms\Schema\TextInput::make('title')  // default label: __('app.posts.columns.title')
        ->required(),
    Forms\Schema\Textarea::make('content')
        ->label('Content'),
    Forms\Schema\Select::make('status')
        ->options(PostStatus::class),
])
```

### Visibility

Control field visibility using the `visible()` method on individual fields. You can pass a boolean or a closure that receives the current record (if any) and returns a boolean.

```php
Forms\Schema\DateTimePicker::make('published_at')
    ->label('Published At')
    ->visible(fn (?Post $record) => $record?->status === PostStatus::PUBLISHED)
```

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

### State formatting

You can format field values for display using the `formatStateUsing()` method. This accepts a closure that receives the current state and returns the formatted value.

```php
Forms\Schema\TextInput::make('price')
    ->label('Price')
    ->formatStateUsing(fn ($state) => $state ? number_format($state / 100, 2) : null)
```

### Dehydration

By default, all fields are "dehydrated", meaning their values are included in the final form data sent to the server. If you have a computed or display-only field that shouldn't be part of the submission, use the `dehydrated(false)` method.

```php
Forms\Schema\TextInput::make('full_name')
    ->formatStateUsing(fn ($record) => $record->first_name . ' ' . $record->last_name)
    ->dehydrated(false),
Forms\Schema\TextInput::make('age')
    ->label('Age')
    ->dehydrated(fn () => false),
```

### Mutate dehydrated state

You can transform field values before passing to the final state array using the `dehydrateStateUsing()` method. This accepts a closure that receives the current state and returns the transformed value.

```php
Forms\Schema\TextInput::make('price')
    ->label('Price')
    ->dehydrateStateUsing(fn ($state) => $state ? (int) ($state * 100) : null)
```

### Mutate saved state

This is only relevant when a form is automatically operating (creating/editing) a model (either via the `model()` method or by passing a record). You can customize how a field's value is saved to the model using the `saveUsing()` method. This accepts a closure that receives the current state and the model instance, allowing you to implement custom save logic.

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

## Field Types

### TextInput

Single-line text input for short strings:

```php
Forms\Schema\TextInput::make('title')
    ->label('Post Title')
    ->placeholder('Enter a title...')
    ->required()
    ->maxLength(255)
```

### Textarea

Multi-line text input for longer content:

```php
Forms\Schema\Textarea::make('content')
    ->label('Content')
    ->rows(8)
    ->placeholder('Write your post content here...')
    ->required()
```

### Select

Dropdown selection from predefined options. You can pass an array of options, a Closure that returns an array, or an Enum class.

```php
Forms\Schema\Select::make('status')
    ->label('Status')
    ->options(PostStatus::class)  // Enum
    ->required(),
Forms\Schema\Select::make('category')
    ->options([
        'tech' => 'Technology',
        'business' => 'Business',
        'lifestyle' => 'Lifestyle',
    ]),
Forms\Schema\Select::make('tags')
    ->options(fn () => Tag::pluck('name', 'id')->toArray())
```

If you want to allow multiple selections, use the `multiple()` method:

```php
Forms\Schema\Select::make('tags')
    ->label('Tags')
    ->options(fn () => Tag::pluck('name', 'id')->toArray())
    ->multiple()
```

You can set a default selected value using the `default()` method:

```php
Forms\Schema\Select::make('status')
    ->label('Status')
    ->options(PostStatus::class)
    ->default(PostStatus::DRAFT->value)
```

### Relationship Select

The select field can also work with Eloquent relationships. Allowing you to select one or more related models easily. It also supports preloading options and searching.

```php
Forms\Schema\Select::make('category_id')
    ->label('Category')
    ->relationship('category', titleColumn: 'name')  // Relationship name and title column
    ->searchable()
    ->preload()  // Load first 25 options immediately
    ->required()
```

You can customize the query used to fetch options:

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

### DateTimePicker

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

Use the custom calendar picker instead of native browser input:

```php
Forms\Schema\DateTimePicker::make('published_at')
    ->native(false)  // Custom calendar/time picker with popover
```

## Footer Actions

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

### Submit action

You can customize the main submit action using `->submitAction()` method:

```php
use Hewcode\Hewcode\Actions;

->submitAction(fn (Actions\Action $action) => $action
    ->label('Save Post')
    ->color('primary')
)
```

## Context

You can pass additional context to the form using the `context()` method. This allows you to customize the form behavior based on different scenarios.

```php
->context('administration')  // Pass a simple string context
->context([
    'project_id' => request()->route('project'),
]) // Pass an array of context data
```

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
}
```

**Frontend component:**

```tsx
import Form from '@hewcode/react/components/form/Form';
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
