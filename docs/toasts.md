# Toasts

- [Overview](#overview)
- [Backend Toasts](#backend-toasts)
  - [Basic Usage](#basic-usage)
  - [Toast Types](#backend-toast-types)
  - [Positioning](#positioning)
  - [Duration and Dismissibility](#duration-and-dismissibility)
- [Frontend Toasts](#frontend-toasts)
  - [Toast Types](#toast-types)
  - [Custom Messages](#custom-messages)
  - [Default Messages](#default-messages)
- [Common Patterns](#common-patterns)
  - [Form Submission Feedback](#form-submission-feedback)
  - [Action Confirmation](#action-confirmation)
  - [Warning Messages](#warning-messages)
  - [Loading States](#loading-states)
- [Internationalization](#internationalization)
- [Best Practices](#best-practices)

<a name="overview"></a>
## Overview

Hewcode provides a toast notification system built on top of [Sonner](https://sonner.emilkowal.ski/), offering beautiful, accessible, and easy-to-use notifications. You can trigger toasts from both your Laravel backend and React frontend.

<a name="backend-toasts"></a>
## Backend Toasts

Trigger toast notifications from your Laravel controllers, actions, or any backend logic using the `Toast` class. Toasts are stored in the session and automatically displayed on the next page render.

<a name="basic-usage"></a>
### Basic Usage

```php
use Hewcode\Hewcode\Toasts\Toast;

Toast::make()
    ->title('Post published successfully')
    ->success()
    ->send();
```

<a name="backend-toast-types"></a>
### Toast Types

```php
use Hewcode\Hewcode\Toasts\Toast;

// Success toast
Toast::make()
    ->title('Post created successfully')
    ->success()
    ->send();

// Error toast
Toast::make()
    ->title('Failed to save changes')
    ->message('Please check your internet connection and try again.')
    ->error()
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

<a name="positioning"></a>
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

<a name="duration-and-dismissibility"></a>
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

<a name="frontend-toasts"></a>
## Frontend Toasts

Import and use the `useToastManager` hook in any component:

```tsx
import { useToastManager } from '@hewcode/react';

export default function MyComponent() {
    const toast = useToastManager();

    const handleClick = () => {
        toast.success('Operation completed successfully!');
    };

    return <Button onClick={handleClick}>Click me</Button>;
}
```

<a name="toast-types"></a>
### Toast Types

Hewcode provides four toast types, each with its own visual styling and semantic meaning:

```tsx
const toast = useToastManager();

// Success - Green, for completed actions
toast.success('Post published successfully!');

// Danger/Error - Red, for errors and failures
toast.danger('Failed to save changes. Please try again.');

// Warning - Yellow, for caution messages
toast.warning('You have unsaved changes.');

// Info - Blue, for informational messages
toast.info('Your session will expire in 5 minutes.');
```

**When to use each type:**

| Type | Use for | Examples |
|------|---------|----------|
| `success` | Completed actions, confirmations | "Post created", "Settings saved", "File uploaded" |
| `danger` | Errors, failures | "Network error", "Invalid data", "Action failed" |
| `warning` | Caution, non-critical issues | "Unsaved changes", "Approaching limit", "Session expiring" |
| `info` | Informational messages | "New feature available", "Processing in background", "Tip: You can..." |

<a name="custom-messages"></a>
### Custom Messages

All toast methods accept a custom message string:

```tsx
const toast = useToastManager();

toast.success('Your profile has been updated successfully!');
toast.danger('Unable to connect to the server. Please check your internet connection.');
toast.warning('You are about to exceed your storage quota.');
toast.info('Did you know? You can use keyboard shortcuts to navigate faster.');
```

<a name="default-messages"></a>
### Default Messages

If you call a toast method without a message, it uses a default translated message:

```tsx
const toast = useToastManager();

// Uses the translation key 'app.toasts.success'
toast.success();

// Uses the translation key 'app.toasts.error'
toast.danger();

// Uses the translation key 'app.toasts.warning'
toast.warning();

// Uses the translation key 'app.toasts.info'
toast.info();
```

Default translation keys:
- `app.toasts.success` → Default success message
- `app.toasts.error` → Default error message
- `app.toasts.warning` → Default warning message
- `app.toasts.info` → Default info message

<a name="common-patterns"></a>
## Common Patterns

<a name="form-submission-feedback"></a>
### Form Submission Feedback

Provide feedback on form submissions:

```tsx
import { useToastManager } from '@hewcode/react';
import { useForm } from '@inertiajs/react';

export default function EditPost({ post }) {
    const toast = useToastManager();
    const { data, setData, put, processing } = useForm({
        title: post.title,
        content: post.content,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        
        put(`/posts/${post.id}`, {
            onSuccess: () => {
                toast.success('Post updated successfully!');
            },
            onError: () => {
                toast.danger('Failed to update post. Please try again.');
            },
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Form fields */}
            <Button type="submit" disabled={processing}>
                Save Changes
            </Button>
        </form>
    );
}
```

<a name="action-confirmation"></a>
### Action Confirmation

Combine toasts with modals for complete user feedback:

```tsx
import { useToastManager, useModalManager } from '@hewcode/react';

export default function PostActions({ post }) {
    const toast = useToastManager();
    const modal = useModalManager();

    const handleDelete = async () => {
        const confirmed = await modal.confirm({
            title: 'Delete Post',
            description: 'This action cannot be undone.',
            variant: 'danger',
        });

        if (confirmed) {
            router.delete(`/posts/${post.id}`, {
                onSuccess: () => {
                    toast.success('Post deleted successfully');
                },
                onError: () => {
                    toast.danger('Failed to delete post');
                },
            });
        }
    };

    return (
        <Button onClick={handleDelete} variant="destructive">
            Delete
        </Button>
    );
}
```

<a name="warning-messages"></a>
### Warning Messages

Warn users before they take potentially problematic actions:

```tsx
import { useToastManager } from '@hewcode/react';

export default function Editor({ hasUnsavedChanges }) {
    const toast = useToastManager();

    const handleNavigateAway = () => {
        if (hasUnsavedChanges) {
            toast.warning('You have unsaved changes!');
            return;
        }
        router.visit('/dashboard');
    };

    return (
        <Button onClick={handleNavigateAway}>
            Back to Dashboard
        </Button>
    );
}
```

<a name="loading-states"></a>
### Loading States

Inform users about background operations:

```tsx
import { useToastManager } from '@hewcode/react';

export default function FileUploader() {
    const toast = useToastManager();
    const [uploading, setUploading] = useState(false);

    const handleUpload = async (file) => {
        setUploading(true);
        toast.info('Uploading file...');

        try {
            await uploadFile(file);
            toast.success('File uploaded successfully!');
        } catch (error) {
            toast.danger('Upload failed. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <input
            type="file"
            onChange={(e) => handleUpload(e.target.files[0])}
            disabled={uploading}
        />
    );
}
```

### Validation Errors

Display validation errors clearly:

```tsx
const handleSubmit = (e) => {
    e.preventDefault();

    post('/posts', data, {
        onError: (errors) => {
            if (Object.keys(errors).length > 0) {
                toast.danger('Please fix the errors in the form.');
            }
        },
    });
};
```

### Optimistic UI Updates

Provide immediate feedback with optimistic updates:

```tsx
const handleLike = async () => {
    // Immediately show success
    toast.success('Post liked!');
    
    // Update UI optimistically
    setLiked(true);
    
    try {
        await router.post(`/posts/${post.id}/like`);
    } catch (error) {
        // Revert on error
        setLiked(false);
        toast.danger('Failed to like post');
    }
};
```

### Bulk Actions

Provide feedback for operations on multiple items:

```tsx
const handleBulkDelete = async (selectedIds) => {
    toast.info(`Deleting ${selectedIds.length} items...`);
    
    try {
        await router.delete('/posts/bulk', {
            data: { ids: selectedIds },
        });
        toast.success(`Successfully deleted ${selectedIds.length} posts`);
    } catch (error) {
        toast.danger('Some posts could not be deleted');
    }
};
```

<a name="internationalization"></a>
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

```php
// lang/es/app.php
return [
    'toasts' => [
        'success' => 'Éxito! Operación completada.',
        'error' => 'Ocurrió un error. Por favor, inténtelo de nuevo.',
        'warning' => 'Advertencia: Por favor, revise su acción.',
        'info' => 'Información',
    ],
];
```

Now when you call `toast.success()` without a message, it automatically uses the translated default.

<a name="best-practices"></a>
## Best Practices

**Be specific with messages:** Instead of generic "Success!" messages, tell users exactly what happened: "Post published successfully" is better than "Success!"

**Use appropriate toast types:** Match the toast type to the message's semantic meaning. Don't use success toasts for errors just because you want green.

**Keep messages concise:** Toast notifications should be scannable at a glance. Keep them to one sentence when possible.

**Don't overuse toasts:** Not every action needs a toast. Reserve them for operations where the user expects feedback or where the outcome isn't immediately visible.

**Combine with other feedback:** For destructive actions, use a confirmation modal before showing a success/error toast. For forms, combine field-level validation errors with toast notifications.

**Time-sensitive information:** Use info toasts for time-sensitive information like "Session expiring soon" to give users time to act.

**Avoid toast spam:** If multiple operations complete simultaneously, consider consolidating into a single message: "5 posts published successfully" instead of 5 individual toasts.

**Use warnings sparingly:** Warning toasts are for situations that need user attention but aren't errors. Overusing them dilutes their importance.

**Consider the user's context:** A toast saying "Saved" might be perfect during form editing, but confusing if shown when the user is viewing a different page.

**Provide actionable information:** When showing errors, include guidance when possible: "Failed to upload file. File size must be under 10MB" is more helpful than just "Upload failed."
