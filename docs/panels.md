# Panels

Hewcode includes a complete panel system for building sophisticated application interfaces. Panels provide navigation, resource management, and layout components out of the box.

## Quick Start

Register panels in your service provider. You can register multiple panels with custom names:

```php
use Hewcode\Hewcode\Hewcode;

// In AppServiceProvider
public function register(): void
{
    Hewcode::panel(); // Registers the default 'app' panel
    Hewcode::panel('admin'); // Registers custom 'admin' panel  
    Hewcode::panel('dashboard'); // Registers custom 'dashboard' panel
}
```

## Creating Resources

The fastest way to create resources is using the `hew:resource` Artisan command:

### Basic Usage

```bash
# Create a simple resource
php artisan hew:resource ProductResource

# Specify the model explicitly
php artisan hew:resource ProductResource --model=Product

# Assign to specific panels
php artisan hew:resource ProductResource --panels=admin,app
```

### Auto-Generate from Database

Use the `--generate` option to automatically create form fields and listing columns based on your model's table structure.

The `--generate` option intelligently maps database columns to appropriate form fields and listing columns.

## Multiple Panels

Resources and controllers can be assigned to one or more panels using the `panels()` method:

```php
class PostsResource extends Resource
{
    // This resource will be available in both 'app' and 'admin' panels
    public function panels(): array
    {
        return ['app', 'admin'];
    }
}

class ListUsersController extends Resources\IndexController
{
    // This controller will be available in the 'admin' panel only
    public function panels(): array
    {
        return ['admin'];
    }
}

class GlobalController extends PageController
{
    // This controller will be available in ALL panels
    public function panels(): bool
    {
        return true;
    }
}
```

## Resources

Hewcode offers two patterns for organizing panel resources, depending on your complexity needs.

### Approach 1: Simple Resource (Low Boilerplate)

For straightforward cases, define everything in a single resource class:

```php
use Hewcode\Hewcode\Panel\Resource;
use Hewcode\Hewcode\Panel\Controllers\Resources;

class PostsResource extends Resource
{
    protected string $model = Post::class;
    
    public function pages(): array
    {
        return [
            Resources\IndexController::page(),
            // Resources\CreateController::page(), 
            // Resources\EditController::page(),
        ];
    }
    
    public function form(Forms\Form $form): Forms\Form
    {
        return $form
            ->visible(auth()->check())
            ->schema([
                Forms\Schema\TextInput::make('title')->required(),
                Forms\Schema\Textarea::make('content')->required(),
                Forms\Schema\Select::make('status')->options(PostStatus::class),
            ]);
    }
    
    public function listing(Lists\Listing $listing): Lists\Listing  
    {
        return $listing
            ->visible(auth()->check())
            ->query(Post::query()->with('user', 'category'))
            ->columns([
                Lists\Schema\TextColumn::make('title')->sortable()->searchable(),
                Lists\Schema\TextColumn::make('status')->badge(),
                Lists\Schema\TextColumn::make('user.name')->badge(variant: 'outline'),
            ])
            ->actions([
                Actions\Eloquent\EditAction::make(),
                Actions\Eloquent\DeleteAction::make(),
            ]);
    }
}
```

### Approach 2: Separate Components (More Flexible)

For complex scenarios requiring customization, separate into individual classes:

**1. Create dedicated listing definition:**
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
                Lists\Schema\TextColumn::make('name')->sortable()->searchable(),
                Lists\Schema\TextColumn::make('email')->searchable(),
                Lists\Schema\TextColumn::make('posts_count')->sortable(),
            ])
            ->actions([
                Actions\Eloquent\EditAction::make(),
            ]);
    }
}
```

**2. Create dedicated form definition:**
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

**3. Create custom controllers extending base controllers:**
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

class EditUserController extends Resources\EditController  
{
    public static string $form = UserForm::class;
    
    protected function getHeaderActions(): array
    {
        return [
            // Custom header actions
        ];
    }
}
```

### Quick Creation Commands

Generate the separate components quickly with Artisan commands:

```bash
# Create listing definition
php artisan hew:listing UserListing --model=User --generate

# Create form definition  
php artisan hew:form UserForm --model=User --generate

# Create custom page controller
php artisan hew:page CustomPageController --icon=lucide-settings --panels=admin
```

## Artisan Commands

Hewcode provides Laravel-style make commands for rapid panel development:

### `hew:resource` - Complete Resources
```bash
# Create a simple resource with inline form/listing methods
php artisan hew:resource ProductResource --generate

# Specify model and panels
php artisan hew:resource ProductResource --model=Product --panels=admin,app --generate
```

### `hew:listing` - Listing Definitions  
```bash
# Create standalone listing definition
php artisan hew:listing ProductListing --model=Product --generate

# Associate with form definition
php artisan hew:listing ProductListing --model=Product --form=ProductForm --generate
```

### `hew:form` - Form Definitions
```bash
# Create standalone form definition  
php artisan hew:form ProductForm --model=Product --generate

# Basic form without generation
php artisan hew:form ProductForm --model=Product
```

### `hew:page` - Page Controllers
```bash
# Basic page controller
php artisan hew:page DashboardController

# With custom icon and panels
php artisan hew:page SettingsController --icon=lucide-settings --panels=admin,app

# Available in all panels
php artisan hew:page GlobalController --panels=all

# No navigation menu entry
php artisan hew:page ApiController --no-nav --view=api/status
```

## Navigation

Each panel has its own navigation that's scoped to that specific panel. Navigation items are automatically registered by resources and controllers, and you can also add manual items.

### Manual Navigation Items

You can add navigation items to specific panels using the `navigation()` method:

```php
use Hewcode\Hewcode\Hewcode;
use Hewcode\Hewcode\Panel\Navigation\NavigationItem;
use Hewcode\Hewcode\Panel\Navigation\NavigationGroup;

// In AppServiceProvider boot() method
public function boot(): void
{
    // Add navigation items to the 'admin' panel
    Hewcode::panel('admin')->navigation(function ($navigation) {
        $navigation->item(
            NavigationItem::make('Dashboard')
                ->url('/admin')
                ->icon('lucide-home')
                ->order(10)
        );
        
        $navigation->item(
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
    
    // Different navigation for 'app' panel
    Hewcode::panel('app')->navigation(function ($navigation) {
        $navigation->item(
            NavigationItem::make('My Dashboard')
                ->url('/app')
                ->icon('lucide-home')
        );
    });
}
```

### Automatic Navigation from Controllers

Controllers automatically register navigation items in the panels they're assigned to:

```php
class CustomPageController extends PageController
{
    protected string $icon = 'lucide-settings';
    protected ?int $navigationSort = 100;
    protected bool $shouldRegisterNavigation = true; // Default is true
    
    public function panels(): array
    {
        return ['admin']; // This nav item appears only in admin panel
    }
    
    // OR for all panels:
    public function panels(): bool
    {
        return true; // This nav item appears in ALL panels
    }
    
    protected function getNavigationTitle(): string
    {
        return 'Custom Page';
    }
}
```

### Navigation Item Options

```php
NavigationItem::make('Item Name')
    ->url('/custom/url')                    // Static URL
    ->url(fn () => route('custom.route'))   // Dynamic URL
    ->icon('lucide-icon-name')              // Lucide icon
    ->order(50)                             // Sort order
    ->badge('New')                          // Badge text
    ->badge(fn () => Post::count())         // Dynamic badge
```

## Page Controllers

Panel page controllers handle common CRUD operations. There are base controllers you can extend for customization, or use directly via the resource's `pages()` method.

### Using Controllers in Resources

For simple cases, use the built-in page controllers:

```php
public function pages(): array
{
    return [
        Resources\IndexController::page(),   // Listing page
        Resources\CreateController::page(),  // Create form page  
        Resources\EditController::page(),    // Edit form page
    ];
}
```

### Custom Controller Classes

For more control, extend the base controllers:

```php
class ListUsersController extends Resources\IndexController
{
    public static string $listing = UserListing::class;
    
    protected function getHeaderActions(): array
    {
        return [
            Actions\Eloquent\CreateAction::make(),
        ];
    }
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
import { DataTable } from '@hewcode/react';
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
import { Form } from '@hewcode/react';
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

## Choosing the Right Approach

**Use Simple Resource (Approach 1) when:**
- Building straightforward CRUD interfaces
- You don't need custom controller logic
- You want minimal boilerplate
- The listing and form logic is straightforward

**Use Separate Components (Approach 2) when:**
- You need custom controller behavior
- Complex listing or form logic requires reuse
- You want to customize header actions or props
- Building complex interfaces with specialized requirements
