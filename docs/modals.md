# Modals

- [Overview](#overview)
- [Using the Modal Hook](#using-the-modal-hook)
  - [Confirmation Modals](#confirmation-modals)
  - [Custom Modals](#custom-modals)
  - [Component Modals](#component-modals)
  - [Managing Modals](#managing-modals)
- [Creating Custom Modal Components](#creating-custom-modal-components)
  - [Basic Custom Modal](#basic-custom-modal)
  - [Extending the Modal Component](#extending-the-modal-component)
  - [Advanced Example](#advanced-example)
- [Modal Component Reference](#modal-component-reference)

<a name="overview"></a>
## Overview

Hewcode provides a flexible modal system that supports both programmatic usage through the `useModalManager` hook and custom modal components. All modals are promise-based, making them easy to use with async/await patterns.

<a name="using-the-modal-hook"></a>
## Using the Modal Hook

The `useModalManager` hook provides a simple API for displaying modals programmatically.

<a name="confirmation-modals"></a>
### Confirmation Modals

Display confirmation dialogs and wait for user response:

```tsx
import { useModalManager } from '@hewcode/react';

export default function PostActions({ post }) {
    const modal = useModalManager();

    const handleDelete = async () => {
        const confirmed = await modal.confirm({
            title: 'Delete Post',
            description: 'Are you sure you want to delete this post? This action cannot be undone.',
            confirmLabel: 'Delete',
            cancelLabel: 'Cancel',
            variant: 'danger',
        });

        if (confirmed) {
            router.delete(`/posts/${post.id}`);
        }
    };

    return (
        <Button onClick={handleDelete} variant="destructive">
            Delete
        </Button>
    );
}
```

The `confirm()` method returns a promise that resolves to `true` when the user confirms, or `false` when they cancel or close the modal.

**Confirmation modal options:**
- `title` - Modal title
- `description` - Modal body text
- `confirmLabel` - Text for confirm button
- `cancelLabel` - Text for cancel button
- `variant` - Visual style: `'primary'`, `'danger'`, `'warning'`, `'success'`, `'info'` (default: `'danger'`)
- `icon` - Custom Lucide icon component (default: `TriangleAlert`)
- `onConfirm` - Callback when user confirms
- `onCancel` - Callback when user cancels
- `onClose` - Callback when modal closes

<a name="custom-modals"></a>
### Custom Modals

Display custom content in a modal:

```tsx
const modal = useModalManager();

const handleShowDetails = async () => {
    await modal.custom({
        title: 'Post Details',
        size: 'xl',
        children: (
            <div className="space-y-4">
                <div>
                    <h3 className="font-semibold">Title</h3>
                    <p>{post.title}</p>
                </div>
                <div>
                    <h3 className="font-semibold">Content</h3>
                    <p>{post.content}</p>
                </div>
            </div>
        ),
        footer: (
            <Button onClick={() => modal.closeAll()}>Close</Button>
        ),
    });
};
```

**Custom modal options:**
- `title` - Modal title
- `children` - React content to display
- `size` - Modal width: `'xs'`, `'sm'`, `'md'`, `'lg'`, `'xl'`, `'2xl'`, `'3xl'`, `'4xl'`, `'5xl'`, `'6xl'`, `'7xl'` (default: `'lg'`)
- `footer` - Footer content (usually buttons)
- `className` - Additional CSS classes
- `showCloseButton` - Show/hide the X close button (default: `true`)
- `onClose` - Callback when modal closes

<a name="component-modals"></a>
### Component Modals

Render an entire component as a modal, giving you full control:

```tsx
const modal = useModalManager();

const EditPostModal = ({ post, onClose }) => {
    const [title, setTitle] = useState(post.title);

    const handleSubmit = (e) => {
        e.preventDefault();
        router.put(`/posts/${post.id}`, { title });
        onClose();
    };

    return (
        <Modal
            title="Edit Post"
            size="lg"
            onClose={onClose}
            footer={
                <div className="flex gap-2">
                    <Button onClick={handleSubmit}>Save</Button>
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                </div>
            }
        >
            <form onSubmit={handleSubmit}>
                <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Post title"
                />
            </form>
        </Modal>
    );
};

const handleEdit = async () => {
    await modal.component(EditPostModal, { post: currentPost });
};
```

The component receives all props you pass, plus an `onClose` function.

<a name="managing-modals"></a>
### Managing Modals

Check modal state and close all modals:

```tsx
const modal = useModalManager();

// Check if any modals are open
if (modal.hasModals) {
    console.log('Modals are currently open');
}

// Close all open modals at once
modal.closeAll();
```

<a name="creating-custom-modal-components"></a>
## Creating Custom Modal Components

For reusable modal patterns, create custom modal components by extending the base `Modal` component.

<a name="basic-custom-modal"></a>
### Basic Custom Modal

Create a simple custom modal component:

```tsx
import Modal from '@hewcode/react/components/modal';
import Button from '@/components/Button';

export function InfoModal({ title, message, onClose, ...props }) {
    return (
        <Modal
            title={title}
            size="md"
            onClose={onClose}
            footer={
                <Button onClick={onClose} className="w-full">
                    Got it
                </Button>
            }
            {...props}
        >
            <div className="py-4">
                <p className="text-gray-600">{message}</p>
            </div>
        </Modal>
    );
}
```

Use it with the modal manager:

```tsx
const modal = useModalManager();

await modal.component(InfoModal, {
    title: 'Welcome',
    message: 'Thanks for joining our platform!',
});
```

<a name="extending-the-modal-component"></a>
### Extending the Modal Component

The `ConfirmationModal` is a great example of extending the base modal with specific behavior:

```tsx
import Modal from '@hewcode/react/components/modal';
import Button from '@/components/Button';
import { TriangleAlert } from 'lucide-react';

export function ConfirmationModal({
    variant = 'danger',
    icon: Icon = TriangleAlert,
    title,
    description,
    confirmLabel = 'Confirm',
    cancelLabel = 'Cancel',
    onConfirm,
    onCancel,
    onClose,
    ...props
}) {
    const iconColors = {
        primary: 'text-blue-500',
        success: 'text-green-600',
        danger: 'text-red-600',
        warning: 'text-yellow-600',
        info: 'text-blue-600',
    };

    const iconColorClass = iconColors[variant] || iconColors.danger;

    const handleCancel = () => {
        onCancel?.();
        onClose?.();
    };

    const handleConfirm = () => {
        onConfirm?.();
        onClose?.();
    };

    return (
        <Modal onClose={onClose} size="sm" {...props}>
            <div className="py-4 text-center">
                {Icon && (
                    <div className="mb-4">
                        <Icon className={`h-12 w-12 mx-auto ${iconColorClass}`} />
                    </div>
                )}

                {title && (
                    <h3 className="text-lg font-normal text-gray-900 mb-2">
                        {title}
                    </h3>
                )}

                <p className="text-xs text-gray-500 mb-6">{description}</p>

                <div className="space-y-3">
                    <Button
                        variant={variant}
                        onClick={handleConfirm}
                        className="w-full"
                    >
                        {confirmLabel}
                    </Button>

                    <Button
                        variant="default"
                        onClick={handleCancel}
                        className="w-full"
                    >
                        {cancelLabel}
                    </Button>
                </div>
            </div>
        </Modal>
    );
}
```

<a name="advanced-example"></a>
### Advanced Example

Create a multi-step modal with validation:

```tsx
import { useState } from 'react';
import Modal from '@hewcode/react/components/modal';
import Button from '@/components/Button';
import Input from '@/components/Input';

export function CreateUserModal({ onClose, onSuccess }) {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: '',
    });
    const [errors, setErrors] = useState({});

    const validateStep = () => {
        const newErrors = {};
        if (step === 1 && !formData.name) {
            newErrors.name = 'Name is required';
        }
        if (step === 2 && !formData.email) {
            newErrors.email = 'Email is required';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validateStep()) {
            setStep(step + 1);
        }
    };

    const handleSubmit = async () => {
        if (!validateStep()) return;

        try {
            await router.post('/users', formData);
            onSuccess?.();
            onClose();
        } catch (error) {
            setErrors({ submit: 'Failed to create user' });
        }
    };

    return (
        <Modal
            title={`Create User - Step ${step} of 3`}
            size="lg"
            onClose={onClose}
            footer={
                <div className="flex gap-2 justify-end">
                    {step > 1 && (
                        <Button
                            variant="outline"
                            onClick={() => setStep(step - 1)}
                        >
                            Back
                        </Button>
                    )}
                    {step < 3 ? (
                        <Button onClick={handleNext}>Next</Button>
                    ) : (
                        <Button onClick={handleSubmit}>Create User</Button>
                    )}
                </div>
            }
        >
            <div className="space-y-4">
                {step === 1 && (
                    <div>
                        <label>Name</label>
                        <Input
                            value={formData.name}
                            onChange={(e) =>
                                setFormData({ ...formData, name: e.target.value })
                            }
                            error={errors.name}
                        />
                    </div>
                )}
                {step === 2 && (
                    <div>
                        <label>Email</label>
                        <Input
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({ ...formData, email: e.target.value })
                            }
                            error={errors.email}
                        />
                    </div>
                )}
                {step === 3 && (
                    <div>
                        <label>Role</label>
                        <select
                            value={formData.role}
                            onChange={(e) =>
                                setFormData({ ...formData, role: e.target.value })
                            }
                        >
                            <option value="">Select a role</option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </select>
                    </div>
                )}
                {errors.submit && (
                    <p className="text-red-600 text-sm">{errors.submit}</p>
                )}
            </div>
        </Modal>
    );
}
```

Use it:

```tsx
const modal = useModalManager();

await modal.component(CreateUserModal, {
    onSuccess: () => {
        toast.success('User created successfully!');
    },
});
```

<a name="modal-component-reference"></a>
## Modal Component Reference

The base `Modal` component accepts the following props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOpen` | `boolean` | `true` | Whether the modal is open |
| `onClose` | `function` | - | Callback when modal should close |
| `title` | `string` | - | Modal title displayed in header |
| `children` | `ReactNode` | - | Modal content |
| `footer` | `ReactNode` | - | Footer content (usually buttons) |
| `size` | `string` | `'lg'` | Width: `'xs'`, `'sm'`, `'md'`, `'lg'`, `'xl'`, `'2xl'`, `'3xl'`, `'4xl'`, `'5xl'`, `'6xl'`, `'7xl'` |
| `className` | `string` | - | Additional CSS classes for the modal content |
| `showCloseButton` | `boolean` | `true` | Show/hide the X button in top right |

### Size Reference

| Size | Max Width |
|------|-----------|
| `xs` | 320px |
| `sm` | 384px |
| `md` | 448px |
| `lg` | 512px |
| `xl` | 576px |
| `2xl` | 672px |
| `3xl` | 768px |
| `4xl` | 896px |
| `5xl` | 1024px |
| `6xl` | 1152px |
| `7xl` | 1280px |

## Best Practices

**Use appropriate modal sizes:** Start with smaller sizes for simple confirmations and scale up as needed. Most modals should be `sm` to `lg`.

**Always provide an onClose handler:** Users should be able to exit modals easily via the close button, ESC key, or backdrop click.

**Use promises for workflow clarity:** The promise-based API makes it easy to chain actions after modal interactions.

**Create reusable modal components:** For patterns you use frequently, create dedicated modal components rather than using `modal.custom()` repeatedly.

**Leverage variants for confirmation modals:** Use appropriate variants (`danger` for destructive actions, `warning` for caution, `primary` for affirmative actions) to provide visual cues.

**Keep modals focused:** Each modal should handle a single task. For complex workflows, consider multi-step modals or separate modals.
