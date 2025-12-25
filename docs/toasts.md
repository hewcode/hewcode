# Toasts

Hewcode provides a toast notification system built on top of [Sonner](https://sonner.emilkowal.ski/) using shadcn/ui, offering beautiful, accessible, and easy-to-use notifications. You can trigger toasts from both your Laravel backend and React frontend.

## Backend Toasts

Trigger toast notifications from your Laravel controllers, actions, or any backend logic using the `Toast` class as long as the response is an Inertia response or a `Hewcode::response()`.

:::warning
Inside Hewcode actions, the response is always a Hewcode response, so you can use toasts directly, unless you explicitly return a response object within the action.
:::

### Basic Usage

```php
use Hewcode\Hewcode\Toasts\Toast;

Toast::make()
    ->title('Post published successfully')
    ->success()
    ->send();
```

### Toast Types

```php
use Hewcode\Hewcode\Toasts\Toast;

// Success toast
Toast::make()
    ->title('Post created successfully')
    ->success()
    ->send();

// Danger toast
Toast::make()
    ->title('Failed to save changes')
    ->message('Please check your internet connection and try again.')
    ->danger()
    ->send();

// Warning toast
Toast::make()
    ->title('Storage limit approaching')
    ->warning()
    ->send();

// Info toast
Toast::make()
    ->title('Processing in background')
    ->message('You will be notified when the export is complete.')
    ->info()
    ->send();
```

Available type methods:
- `success()` - Green, for completed actions
- `error()` or `danger()` - Red, for errors and failures
- `warning()` - Yellow, for caution messages
- `info()` - Blue, for informational messages

### Positioning

Control where toasts appear on screen:

```php
Toast::make()
    ->title('Notification')
    ->success()
    ->topRight()    // Default
    ->send();

Toast::make()
    ->title('Notification')
    ->bottomLeft()
    ->send();
```

Available position methods:
- `topLeft()`
- `topCenter()`
- `topRight()` (default)
- `bottomLeft()`
- `bottomCenter()`
- `bottomRight()`

### Duration and Dismissibility

```php
// Custom duration (in milliseconds)
Toast::make()
    ->title('Session expiring soon')
    ->info()
    ->duration(10000)  // Show for 10 seconds
    ->send();

// Make non-dismissible
Toast::make()
    ->title('Critical error')
    ->error()
    ->dismissible(false)
    ->send();
```

### Multiple Toasts

You can send multiple toasts from a single request:

```php
use Hewcode\Hewcode\Toasts\Toast;
use Hewcode\Hewcode\Hewcode;

public function processImport()
{
    Toast::make()
        ->title('Import started')
        ->info()
        ->send();

    // ... processing logic ...

    Toast::make()
        ->title('Import completed')
        ->message('Processed 1,234 records successfully.')
        ->success()
        ->send();
        
    return Hewcode::response(data: []);
}
```

### In Actions

Toasts work seamlessly with Hewcode actions:

```php
use Hewcode\Hewcode\Actions\Action;
use Hewcode\Hewcode\Toasts\Toast;

Action::make('publish')
    ->action(function () {
        // Your logic here

        Toast::make()
            ->title('Post published')
            ->success()
            ->send();
    })
```

## Frontend Toasts

You can also directly trigger toasts from your React components using the `useToastManager` hook.

```tsx
import useToastManager from '@hewcode/react/hooks/use-toast-manager';

export default function MyComponent() {
    const toast = useToastManager();

    const handleClick = () => {
        toast.success('Operation completed successfully!');
    };

    return <Button onClick={handleClick}>Click me</Button>;
}
```

### Toast Types

Hewcode provides four toast types, each with its own visual styling and semantic meaning:

```tsx
const toast = useToastManager();

toast.success('Post published successfully!');
toast.danger('Failed to save changes. Please try again.');
toast.warning('You have unsaved changes.');
toast.info('Your session will expire in 5 minutes.');
```

## Internationalization

Default toast messages are automatically translated based on your application's locale. Set up translation keys in your language files:

```php
// lang/en/app.php
return [
    'toasts' => [
        'success' => 'Success! Operation completed.',
        'error' => 'An error occurred. Please try again.',
        'warning' => 'Warning: Please review your action.',
        'info' => 'Information',
    ],
];
```

Now when you call `toast.success()` without a message, it automatically uses the translated default.

## Use Sonner Directly

If you want to use Sonner's full API, you can access the underlying Sonner toast instance:

```tsx
import useToastManager from '@hewcode/react/hooks/use-toast-manager';

const { toast: sonner } = useToastManager();

// or
const toast = useToastManager();

const sonner = toast.toast;
```
