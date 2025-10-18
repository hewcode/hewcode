# Authorization

Hewcode provides a robust authorization system through the `ResourceController` contract, ensuring that mounted actions and components are properly secured and respect controller-level authorization policies.

The `ResourceController` contract is a core interface that controllers must implement to support mounted actions and ensure proper authorization.

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
        return match ($method) {
            'index', 'show' => auth()->user()?->can('view-posts') ?? false,
            'create', 'store' => auth()->user()?->can('create-posts') ?? false,
            'edit', 'update' => auth()->user()?->can('edit-posts') ?? false,
            'destroy' => auth()->user()?->can('delete-posts') ?? false,
            default => false,
        };
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
