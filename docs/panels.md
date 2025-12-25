# Panels

Hewcode includes a complete panel system for building sophisticated application interfaces. Panels provide navigation, resource management, and layout components out of the box.

## Quick Start

Register the default panel in your service provider `AppServiceProvider`.

```php
use Hewcode\Hewcode\Hewcode;

public function register(): void
{
    Hewcode::panel(); // By default this is the 'app' panel
}
```

If you pass a name to the `panel()` method, it will register the panel with that name, and you can register multiple panels:

```php
Hewcode::panel('admin'); // Registers custom 'admin' panel  
Hewcode::panel('dashboard'); // Registers custom 'dashboard' panel
```

**Accessing Panels:** Once registered, panels are accessible at `/{panel-name}`:
- Default panel: `/app`
- Admin panel: `/admin` 
- Dashboard panel: `/dashboard`

## Resources

You can create resources to quickly get started with managing records in your panels.

```bash
php artisan hew:resource ProductResource
```

You can pass: 
* `--model=Product` to specify the model explicitly.
* `--panels=admin,app` to assign the resource to specific panels.
* `--generate` to auto-generate form fields and listing columns based on your model's table structure.

This will output the following resource class:

```php
<?php

namespace App\Hewcode\Resources;

use App\Models\Product;
use Hewcode\Hewcode\Actions;
use Hewcode\Hewcode\Forms;
use Hewcode\Hewcode\Lists;
use Hewcode\Hewcode\Panel;

class ProductResource extends Panel\Resource
{
    protected string $model = Product::class;

    public function pages(): array
    {
        return [
            Panel\Controllers\Resources\IndexController::page(),
            Panel\Controllers\Resources\CreateController::page(),
            Panel\Controllers\Resources\EditController::page(),
        ];
    }

    public function form(Forms\Form $form): Forms\Form
    {
        return $form
            ->visible(auth()->check())
            ->schema([
                Forms\Schema\TextInput::make('name')
                    ->required(),
            ]);
    }

    public function listing(Lists\Listing $listing): Lists\Listing
    {
        return $listing
            ->visible(auth()->check())
            ->query(Product::query())
            ->columns([
                Lists\Schema\TextColumn::make('id')
                    ->sortable(),
                Lists\Schema\TextColumn::make('name')
                    ->sortable()
                    ->searchable(),
                Lists\Schema\TextColumn::make('created_at')
                    ->datetime()
                    ->sortable(),
            ])
            ->actions([
                Actions\Eloquent\EditAction::make(),
                Actions\Eloquent\DeleteAction::make(),
            ])
            ->defaultSort('created_at', 'desc');
    }
}
```

## Advanced Usage

Optionally, if you need more flexibility, or want to reuse lists and forms across your codebase, you can create separate listing and form definition classes in addition to custom page controllers.

### Listing Definitions

Using the following command, you can create a standalone listing definition:

```bash
php artisan hew:listing UserListing --model=User --form=UserForm --generate
```

You can pass:
* `--model=User` to specify the model explicitly.
* `--form=UserForm` to associate a form definition with the listing.
* `--generate` to auto-generate listing columns based on your model's table structure.

This will create the following listing definition:

```php
class UserListing extends Lists\ListingDefinition  
{
    protected string $model = User::class;
    protected ?string $form = UserForm::class;
    
    public function default(Lists\Listing $listing): Lists\Listing
    {
        return $listing
            ->visible(auth()->check())
            ->columns([
                Lists\Schema\TextColumn::make('name')
                    ->sortable()
                    ->searchable(),
                Lists\Schema\TextColumn::make('email')
                    ->searchable(),
                Lists\Schema\TextColumn::make('posts_count')
                    ->sortable(),
            ])
            ->actions([
                Actions\Eloquent\EditAction::make(),
            ]);
    }
}
```

You can then use this listing definition whenever you need to apply the same configuration on a form, or create a new form:

```php
// Create a form from the listing definition:
return app(UserListing::class)->create();

// Mutate an existing form:
return app(UserListing::class)->default($form);
```

### Form Definitions

The same goes for form definitions. Create a form definition:

```bash
php artisan hew:form UserForm --model=User --generate
```

This will create the following form definition:

```php
class UserForm extends Forms\FormDefinition
{
    protected string $model = User::class;
    
    public function default(Forms\Form $form): Forms\Form
    {
        return $form
            ->visible(auth()->check())
            ->schema([
                Forms\Schema\TextInput::make('name')->required(),
                Forms\Schema\TextInput::make('email')->email()->required(),
            ]);
    }
}
```

Then you can use this form definition in your controllers or resources:

```php
// Create a form from the form definition:
return app(UserForm::class)->create();

// Mutate an existing form:
return app(UserForm::class)->default($form);
```

### Resource Page Controllers

You can create custom resource page controllers that extend the base resource controllers to use your listing and form definitions.

For a listing page controller use the following command:

```bash
php artisan hew:resource-page ListUsersController --index
```

```php
class ListUsersController extends Resources\IndexController
{
    public static string $listing = UserListing::class;
    
    protected function props(Props\Props $props): Props\Props
    {
        return $props->appendData([
            // Additional data for this page
        ]);
    }
    
    protected function getHeaderActions(): array
    {
        return [
            Actions\Eloquent\CreateAction::make(),
        ];
    }
}
```

For an edit page controller use the following command:

```bash
php artisan hew:resource-page EditUserController --edit
```

```php
class EditUserController extends Resources\EditController  
{
    public static string $form = UserForm::class;
    
    protected function props(Props\Props $props): Props\Props
    {
        return $props->appendData([
            // Additional data for this page
        ]);
    }
    
    protected function getHeaderActions(): array
    {
        return [
            Actions\Eloquent\DeleteAction::make(),
        ];
    }
}
```

For a create page controller use the following command:

```bash
php artisan hew:resource-page CreateUserController --create
```

```php
class CreateUserController extends Resources\CreateController  
{
    public static string $form = UserForm::class;
    
    protected function props(Props\Props $props): Props\Props
    {
        return $props->appendData([
            // Additional data for this page
        ]);
    }
    
    protected function getHeaderActions(): array
    {
        return [
            Actions\Eloquent\CancelAction::make(),
        ];
    }
}
```

Finally, you can also create a custom form controller:

```bash
php artisan hew:page CustomFormController --form
```

```php
class CustomFormController extends Panel\Controllers\Resources\FormController
{
    public static string $form = UserForm::class;
    
    protected function props(Props\Props $props): Props\Props
    {
        return $props->appendData([
            // Additional data for this page
        ]);
    }
    
    protected function getHeaderActions(): array
    {
        return [
            Actions\Eloquent\SaveAction::make(),
            Actions\Eloquent\CancelAction::make(),
        ];
    }
}
```

## Page Controllers

You can create custom panel page controllers outside of resources to build custom pages.

```bash
php artisan hew:page CustomPageController
```

```php
use Hewcode\Hewcode\Panel;

class CustomPageController extends Panel\Controllers\PageController
{
    protected string $icon = 'lucide-dashboard';
    protected ?int $navigationSort = 10;
    protected bool $shouldRegisterNavigation = true;
    
    protected function getNavigationTitle(): string
    {
        return 'Dashboard';
    }
}
```

## Navigation

Resources and resource controllers are automatically registered in the panel navigation. You can also manually add navigation items or groups.

### Manual Navigation

You can add navigation items to specific panels using the `navigation()` method:

```php
use Hewcode\Hewcode\Hewcode;
use Hewcode\Hewcode\Panel\Navigation;

public function boot(): void
{
    Hewcode::panel('admin')
        ->navigation(function (Navigation\Navigation $navigation) {
            return $navigation
                ->item(
                    NavigationItem::make('Dashboard')
                        ->url('/admin')
                        ->icon('lucide-home')
                        ->order(10)
                )
                ->item(
                    NavigationGroup::make('Content Management')
                        ->order(20)
                        ->items([
                            NavigationItem::make('Posts')
                                ->url('/admin/posts')
                                ->icon('lucide-file-text'),
                            NavigationItem::make('Categories')
                                ->url('/admin/categories')
                                ->icon('lucide-tag'),
                        ])
                );
       });

    Hewcode::panel('app')
        ->navigation(function (Navigation\Navigation $navigation) {
            return $navigation
                ->item(
                    NavigationItem::make('My Dashboard')
                        ->url('/app')
                        ->icon('lucide-home')
                );
        });
}
```

### Automatic Navigation

Controllers automatically register navigation items in the panels they're assigned to:

```php
class CustomPageController extends PageController
{
    protected string $icon = 'lucide-settings';
    protected ?int $navigationSort = 100;
    protected bool $shouldRegisterNavigation = true; // Default is true
    
    protected function getNavigationTitle(): string
    {
        return 'Custom Page';
    }
}
```

You can override the automatic navigation registration method `registerNavigation`. This is useful if you want to add more items or groups or conditionally register navigation.

```php
public function registerNavigation(Navigation\Navigation $navigation): void
{
    if (! $this->getShouldRegisterNavigation()) {
        return;
    }

    $navigation->item(
        Navigation\NavigationItem::make()
            ->url(fn () => Hewcode::route($this->getRouteName()))
            ->label($this->getNavigationTitle())
            ->icon($this->getNavigationIcon())
            ->order($this->navigationSort)
    );
}
```

## Frontend Integration

Panel pages use default frontend components automatically. You can optionally override them by setting the `view` property on page controllers:

```php
class ListUsersController extends Resources\IndexController
{
    public static string $listing = UserListing::class;
    
    // Optional: Override the default view
    public function view(): string
    {
        return 'custom/users/index'; // Uses resources/js/pages/custom/users/index.tsx
    }
}

class EditUserController extends Resources\EditController  
{
    public static string $form = UserForm::class;
    
    // Optional: Override the default view
    public function view(): string
    {
        return 'custom/users/edit'; // Uses resources/js/pages/custom/users/edit.tsx
    }
}
```

The default frontend components are:
- Index pages: `@hewcode/react/pages/hewcode/resources/index` (renders DataTable)
- Form pages: `@hewcode/react/pages/hewcode/resources/form` (renders Form)
- Dashboard: `@hewcode/react/pages/hewcode/dashboard`

If you create custom views, they should follow this pattern:

```tsx
// Custom index page
import { usePage } from '@inertiajs/react';
import DataTable from '@hewcode/react/components/data-table/DataTable';
import PageLayout from '@/layouts/pages/page-layout';

export default function CustomIndex() {
    const { listing } = usePage().props;
    
    return (
        <PageLayout>
            <DataTable {...listing} />
        </PageLayout>
    );
}
```

```tsx
// Custom form page  
import { usePage, router } from '@inertiajs/react';
import Form from '@hewcode/react/components/form/Form';
import PageLayout from '@/layouts/pages/page-layout';

export default function CustomForm() {
    const { form } = usePage().props;
    
    return (
        <PageLayout>
            <Form {...form} onCancel={() => router.visit('/users')} />
        </PageLayout>
    );
}
```
