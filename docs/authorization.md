# Authorization

Hewcode provides a robust authorization system through the `ResourceController` contract, ensuring that mounted actions and components are properly secured and respect controller-level authorization policies.

## ResourceController Contract

The `ResourceController` contract (`Hewcode\Hewcode\Contracts\ResourceController`) is a core interface that controllers must implement to support mounted actions and ensure proper authorization.

### Interface Definition

```php
namespace Hewcode\Hewcode\Contracts;

interface ResourceController
{
    public function canAccess(?string $method = '__invoke'): bool;
}
```

### Implementation

Controllers that mount actions (using components like `Listing` with actions or standalone action components) must implement the `ResourceController` contract:

```php
use Hewcode\Hewcode\Contracts\ResourceController;
use Illuminate\Http\Request;

class PostController extends Controller implements ResourceController
{
    public function canAccess(?string $method = '__invoke'): bool
    {
        // Implement your authorization logic here
        return $this->authorize('access', $method);
    }

    #[Lists\Expose]
    public function posts(): Lists\Listing
    {
        return Lists\Listing::make()
            ->query(Post::query())
            ->columns([
                TextColumn::make('title'),
                TextColumn::make('status'),
            ])
            ->actions([
                Action::make('edit')->action('edit'),
                Action::make('delete')->action('delete'),
            ]);
    }
}
```

## Authorization Flow

When actions are mounted and executed through the `ActionController`, the following authorization flow occurs:

### 1. Controller Validation

The `ActionController` first validates that the target controller implements `ResourceController`:

```php
if (! $controller instanceof ResourceController) {
    // In local environment, throws RuntimeException with helpful message
    // In production, returns 403 Forbidden response
    return response()->json(['success' => false], 403);
}
```

### 2. Method Authorization

After validating the contract implementation, the controller's `canAccess` method is called with the specific route method:

```php
if (! $controller->canAccess($method)) {
    return response()->json([
        'success' => false,
        'message' => 'Unauthorized',
    ], 403);
}
```

### 3. Action Execution

Only if both validations pass, the action is executed on the mounted component.

## Authorization Patterns

### Basic Permission Check

```php
public function canAccess(?string $method = '__invoke'): bool
{
    // Simple permission check
    return auth()->user()?->can('manage-posts') ?? false;
}
```

### Method-Specific Authorization

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

### Resource-Based Authorization

```php
public function canAccess(?string $method = '__invoke'): bool
{
    $user = auth()->user();

    if (!$user) {
        return false;
    }

    // Check general access to the resource
    if (!$user->can('access-posts')) {
        return false;
    }

    // Additional method-specific checks
    return match ($method) {
        'index', 'show' => true, // Already checked above
        'create', 'store' => $user->can('create', Post::class),
        'edit', 'update' => $user->can('update', Post::class),
        'destroy' => $user->can('delete', Post::class),
        default => false,
    };
}
```

### Role-Based Authorization

```php
public function canAccess(?string $method = '__invoke'): bool
{
    $user = auth()->user();

    if (!$user) {
        return false;
    }

    return match ($method) {
        'index', 'show' => $user->hasAnyRole(['admin', 'editor', 'viewer']),
        'create', 'store' => $user->hasAnyRole(['admin', 'editor']),
        'edit', 'update' => $user->hasAnyRole(['admin', 'editor']),
        'destroy' => $user->hasRole('admin'),
        default => false,
    };
}
```

## Security Features

### Development Safety

In local development environments, the system provides helpful error messages when controllers don't implement the required contract:

```php
throw new RuntimeException("Controller for route [$routeName] must implement ".ResourceController::class);
```

### Production Security

In production environments, the system fails securely by returning a 403 Forbidden response without exposing implementation details.

### Action Validation

The authorization system works in conjunction with other security measures:

1. **Component Hash Validation**: Ensures actions are called from legitimate components
2. **Method Existence Check**: Verifies the component method exists on the controller
3. **Action Mounting Validation**: Confirms the component implements `MountsActions`
4. **Record Resolution**: Properly resolves and authorizes individual records when needed

## Best Practices

### 1. Always Implement the Contract

```php
// ✅ Good - Implements ResourceController
class PostController extends Controller implements ResourceController
{
    public function canAccess(?string $method = '__invoke'): bool
    {
        return auth()->user()?->can('manage-posts') ?? false;
    }
}

// ❌ Bad - Missing ResourceController implementation
class PostController extends Controller
{
    // Actions will be blocked due to missing contract
}
```

### 2. Use Laravel's Authorization Features

Leverage Laravel's built-in authorization system:

```php
public function canAccess(?string $method = '__invoke'): bool
{
    // Use Laravel policies
    return $this->authorize('viewAny', Post::class);
}
```

### 3. Fail Securely

Always default to denying access:

```php
public function canAccess(?string $method = '__invoke'): bool
{
    return match ($method) {
        'index' => $this->checkIndexAccess(),
        'create' => $this->checkCreateAccess(),
        // Always include a default case that denies access
        default => false,
    };
}
```

### 4. Consider Context

For more complex authorization scenarios, consider the full context:

```php
public function canAccess(?string $method = '__invoke'): bool
{
    $user = auth()->user();
    $route = request()->route();

    // Use route parameters for context-aware authorization
    if ($route->hasParameter('post')) {
        $post = $route->parameter('post');
        return $user?->can('view', $post) ?? false;
    }

    return $user?->can('viewAny', Post::class) ?? false;
}
```

## Error Handling

### Development Errors

When a controller doesn't implement `ResourceController` in a local environment:

```
RuntimeException: Controller for route [posts.index] must implement Hewcode\Hewcode\Contracts\ResourceController
```

### Production Responses

In production, unauthorized access attempts return structured JSON responses:

```json
{
    "success": false,
    "message": "Unauthorized"
}
```

## Integration with Discovery API

The authorization system works seamlessly with the Discovery API:

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
            ->query(Post::query())
            ->columns([/* ... */])
            ->actions([
                Action::make('edit')->action('edit'),
                Action::make('delete')->action('delete'),
            ]);
    }

    #[Actions\Expose]
    public function actions(): Actions\Actions
    {
        return Actions\Actions::make([
            Action::make('bulk-delete')->action('bulkDelete'),
        ]);
    }
}
```

All mounted actions from both the listing and standalone actions will be properly authorized through the `canAccess` method before execution.