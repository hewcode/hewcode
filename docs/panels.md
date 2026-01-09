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

## Panel

### Layout

Panels support two layout styles: sidebar layout (default) and header layout. You can configure the layout using the `sidebarLayout()` or `headerLayout()` methods:

```php
// Sidebar layout (default)
Hewcode::panel('admin');

// Header layout
Hewcode::panel('admin')->headerLayout();

// Chain with other configurations
Hewcode::panel('admin')
    ->title('Admin Panel')
    ->headerLayout();
```

The sidebar layout displays navigation in a collapsible sidebar, while the header layout displays navigation in a top header bar.

### Logo

Customize the panel logo and icon using the `logo()` and `logoIcon()` methods:

```php
Hewcode::panel('admin')
    ->logo(asset('images/logo.svg'))
    ->logoIcon(asset('images/icon.svg'));
```

Both methods support lazy evaluation with closures:

```php
Hewcode::panel('admin')
    ->logo(fn () => asset('images/logo.svg'))
    ->logoIcon(fn () => asset('images/icon.svg'));
```

**How it works:**
- `logo()` - Full logo image displayed in the sidebar/header. When set, it replaces the default logo completely.
- `logoIcon()` - Icon displayed alongside the panel title. Only shown when `logo()` is not set.

If neither is set, the default Hewcode logo and icon are used.

### Features

Panels include built-in authentication and settings features that can be toggled on or off. All features are enabled by default.

```php
Hewcode::panel('admin')
    ->login(false)              // Disable login
    ->registration(false)       // Disable registration
    ->passwordReset(false)      // Disable password reset
    ->emailVerification(false)  // Disable email verification
    ->profileSettings(false)    // Disable profile settings page
    ->passwordSettings(false)   // Disable password settings page
    ->appearanceSettings(false); // Disable appearance settings page
```

**Available Features:**
- `login()` - Login and logout functionality
- `registration()` - User registration
- `passwordReset()` - Forgot password and reset password
- `emailVerification()` - Email verification flow
- `profileSettings()` - Profile edit and delete account
- `passwordSettings()` - Change password
- `appearanceSettings()` - Theme/appearance preferences

### Middleware

You can customize the middleware stack for each panel.

#### Replacing Middleware

Replace the middleware stack by passing an array to `middleware()`:

```php
Hewcode::panel('admin')
    ->middleware([
        \App\Http\Middleware\CustomAuth::class,
        \App\Http\Middleware\CheckSubscription::class,
    ]);
```

#### Appending Middleware

Add middleware using the `append` parameter:

```php
Hewcode::panel('admin')
    ->middleware(append: [
        \App\Http\Middleware\CheckSubscription::class,
        \App\Http\Middleware\LogActivity::class,
    ]);

// Or append multiple times
Hewcode::panel('admin')
    ->middleware(append: [\App\Http\Middleware\CheckSubscription::class])
    ->middleware(append: [\App\Http\Middleware\TwoFactorAuth::class]);
```

**Note:** The middleware applies to all protected routes including dashboard, resources, settings, and authenticated auth routes (email verification, password confirmation, logout). Guest routes (login, register, password reset) are not affected.

### Dashboard

Each panel includes a default dashboard page. You can customize the dashboard by creating a custom controller that extends `DashboardController`:

**Step 1:** Create your custom dashboard controller:

```php
// app/Panel/CustomDashboardController.php
namespace App\Panel;

use Hewcode\Hewcode\Panel\Controllers\DashboardController;
use Hewcode\Hewcode\Widgets;

class CustomDashboardController extends DashboardController
{
    #[Widgets\Expose]
    public function widgets(): Widgets\Widgets
    {
        return Widgets\Widgets::make([
            $this->hewcodeInfoWidget(), // Inherited from parent
            $this->customWidget(),
        ])->visible();
    }

    protected function customWidget(): Widgets\StatsWidget
    {
        return Widgets\StatsWidget::make('total_users')
            ->label('Total Users')
            ->value(\App\Models\User::count())
            ->icon('lucide-users');
    }

    // Specify which panels this dashboard belongs to
    public function panels(): array
    {
        return ['admin'];
    }
}
```

**Step 2:** Register the custom dashboard with your panel:

```php
use App\Panel\CustomDashboardController;

Hewcode::panel('admin')
    ->dashboard(CustomDashboardController::class);
```

**How it works:**
- Your custom controller must extend `DashboardController`
- It can be placed anywhere in your application (not limited to discovery paths)
- If discovered automatically (e.g., in `app/Hewcode/Controllers/`), the default dashboard is skipped
- If not discovered, it's registered manually
- Inherits all base dashboard functionality including the Hewcode info widget

**Note:** The custom dashboard controller will replace the default panel dashboard. You can still call `$this->hewcodeInfoWidget()` to include the default Hewcode version widget.

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

:::info
Resources include `form()` and `listing()` methods for inline configuration. For reusable definitions across multiple resources, see [Listing Definition](./listings.md#listing-definition) and [Form Definition](forms.md#form-definition).
:::

## Advanced Usage

Optionally, if you need more flexibility, you can create custom page controllers that use your listing and form definitions.

### Resource Page Controllers

:::info
The examples below reference `UserListing` and `UserForm` definition classes. Learn how to create these at [Listing Definition](./listings.md#listing-definition) and [Form Definition](./forms.md#form-definition).
:::

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
