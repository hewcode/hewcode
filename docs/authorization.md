# Authorization

- [The ResourceController Contract](#the-resourcecontroller-contract)
- [Why It's Required](#why-its-required)
- [Method-Specific Authorization](#method-specific-authorization)

<a name="the-resourcecontroller-contract"></a>
## The ResourceController Contract

Controllers that use Discovery to expose listings and actions must implement the `ResourceController` contract. This ensures that only authorized users can access your endpoints.

```php
use Hewcode\Hewcode\Contracts\ResourceController;

class PostController extends Controller implements ResourceController
{
    public function canAccess(?string $method = '__invoke'): bool
    {
        // Return true if the current user can access this method
        return auth()->user()?->can('manage-posts') ?? false;
    }

    #[Lists\Expose]
    public function posts(): Lists\Listing
    {
        return Lists\Listing::make()
            ->query(Post::query())
            ->columns([/* ... */]);
    }
}
```

<a name="why-its-required"></a>
## Why It's Required

When Discovery calls your exposed methods to get listing data or execute actions, it first checks if the user is authorized by calling `canAccess()` with the method name. If it returns `false`, a 403 error is thrown.

Without this contract, your exposed endpoints would be unprotected.

<a name="method-specific-authorization"></a>
## Method-Specific Authorization

The `canAccess()` method receives the target method name, allowing different permissions per action:

```php
public function canAccess(?string $method = '__invoke'): bool
{
    return match ($method) {
        'index', 'show' => auth()->user()?->can('view-posts') ?? false,
        'create', 'store' => auth()->user()?->can('create-posts') ?? false,
        'edit', 'update' => auth()->user()?->can('edit-posts') ?? false,
        'destroy' => auth()->user()?->can('delete-posts') ?? false,
        default => false,
    };
}
```

Use whatever authorization logic your application needs—Laravel policies, gates, role checks, or custom logic.
