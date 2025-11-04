# Props

- [What is Props?](#what-is-props)
- [Basic Usage](#basic-usage)
- [Passing Custom Data](#passing-custom-data)
- [Exposing Components](#exposing-components)
- [Required Attributes](#required-attributes)
- [Error Handling](#error-handling)

<a name="what-is-props"></a>
## What is Props?

Props is a simple, explicit way to gather controller data and expose it to your Inertia frontend. Instead of auto-discovering all exposed methods, you explicitly declare which component methods should be called and passed to your view.

This approach:
- Makes data flow explicit and auditable
- Prevents accidental exposure of unintended methods
- Reduces security risks through explicit opt-in
- Keeps your controller-to-view contract clear

<a name="basic-usage"></a>
## Basic Usage

The simplest usage is to specify which components to expose:

```php
use Hewcode\Hewcode\Props;
use Inertia\Inertia;

class PostController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('posts/index',
            Props\Props::for($this)->components(['posts', 'actions'])
        );
    }

    #[Lists\Expose]
    public function posts(): Lists\Listing
    {
        return Lists\Listing::make()
            ->visible(auth()->check())
            ->query(Post::query());
    }

    #[Actions\Expose]
    public function actions(): Actions\Actions
    {
        return Actions\Actions::make([
            // action definitions
        ]);
    }
}
```

Frontend receives:
```typescript
props.posts   // The listing data
props.actions // The actions
```

<a name="passing-custom-data"></a>
## Passing Custom Data

Props also accepts custom data that you can pass directly to your frontend:

```php
return Inertia::render('posts/index',
    Props\Props::make($this, [
        'title' => 'Posts',
        'description' => 'Manage your posts',
        'user' => auth()->user(),
    ])->components(['posts', 'actions'])
);
```

Custom data is merged with component data:

```typescript
props.title       // Custom data
props.description // Custom data
props.user        // Custom data
props.posts       // Component data
props.actions     // Component data
```

<a name="exposing-components"></a>
## Exposing Components

Use the `components()` method to specify which controller methods to expose:

```php
Props\Props::for($this)->components(['posts', 'actions', 'filters'])
```

Each name must:
1. Match a public method on the controller
2. Have either `#[Lists\Expose]` or `#[Actions\Expose]` attribute
3. Be unique (no conflicts with custom data keys)

If any of these conditions are violated, Props throws an `InvalidArgumentException` with a clear error message.

<a name="required-attributes"></a>
## Required Attributes

Every component method must have an Expose attribute. This ensures developers explicitly mark methods as safe to expose:

```php
// ✅ Correct - has required attribute
#[Lists\Expose]
public function posts(): Lists\Listing
{
    return Lists\Listing::make()->visible(auth()->check());
}

// ❌ Will throw error - missing attribute
public function posts(): Lists\Listing
{
    return Lists\Listing::make();
}
```

This requirement prevents accidental exposure of methods that return sensitive data.

<a name="error-handling"></a>
## Error Handling

Props validates everything and throws clear errors:

```php
// Method doesn't exist
Props\Props::for($this)->components(['nonexistent'])
// InvalidArgumentException: Method App\Http\Controllers\PostController::nonexistent() does not exist

// Method is not public
Props\Props::for($this)->components(['privateMethod'])
// InvalidArgumentException: Method App\Http\Controllers\PostController::privateMethod() must be public

// Missing required attribute
Props\Props::for($this)->components(['posts'])
// InvalidArgumentException: Method App\Http\Controllers\PostController::posts() must have either #[Lists\Expose] or #[Actions\Expose] attribute

// Key conflicts
Props\Props::make($this, ['posts' => 'custom data'])
    ->components(['posts'])
// InvalidArgumentException: Key conflict: "posts" already exists in data or discovered components

// Method throws exception
Props\Props::for($this)->components(['posts'])
// RuntimeException: Error calling component method App\Http\Controllers\PostController::posts(): [original error]
```

All errors include the controller class and method name for easy debugging.
