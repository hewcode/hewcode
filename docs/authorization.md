# Authorization

- [Securing Listings](#securing-listings)
- [Securing Actions](#securing-actions)
- [Using Laravel Policies](#using-laravel-policies)

<a name="securing-listings"></a>
## Securing Listings

Every listing and action must explicitly declare who can access it using the `->visible()` method. This ensures that unauthorized users cannot access your data.

```php
use Hewcode\Hewcode\Discovery\Discovery;
use Hewcode\Hewcode\Lists;

class PostController extends Controller
{
    #[Lists\Expose]
    public function posts(): Lists\Listing
    {
        return Lists\Listing::make()
            ->visible(auth()->user()?->can('view-posts') ?? false) // Required: control access
            ->query(Post::query())
            ->columns([/* ... */]);
    }
}
```

If `->visible()` returns `false`, the listing will not be exposed to the frontend.

<a name="securing-actions"></a>
## Securing Actions

Row actions and bulk actions must also use `->visible()`:

```php
use Hewcode\Hewcode\Actions;

->actions([
    Actions\Action::make('edit')
        ->label('Edit')
        ->visible(auth()->user()?->can('edit-posts') ?? false)
        ->action(fn ($record) => redirect()->route('posts.edit', $record)),
    Actions\Action::make('delete')
        ->label('Delete')
        ->visible(auth()->user()?->can('delete-posts') ?? false)
        ->action(fn ($record) => $record->delete()),
])
```

<a name="using-laravel-policies"></a>
## Using Laravel Policies

For cleaner authorization logic, use Laravel's authorization policies:

```php
// In your Listing
->visible(auth()->user()?->can('view', Post::class) ?? false)

// In your Actions
->visible(auth()->user()?->can('update', $record) ?? false)
```

Use whatever authorization logic your application needs—Laravel policies, gates, role checks, or custom logic.
