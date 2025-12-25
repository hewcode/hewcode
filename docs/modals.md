# Modals

Hewcode provides a simple API to quickly get started with modals/dialogs.

## Using the Modal Hook

With the `useModalManager` hook you can easily display different types of modals from anywhere in your React component tree.

### Confirmation Modals

Display confirmation dialogs and wait for  user response:

```jsx
import useModalManager from '@hewcode/react/hooks/use-modal-manager';

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

### Component Modals

Render an entire component as a modal, giving you full control:

```jsx
import useModalManager from '@hewcode/react/hooks/use-modal-manager';

const modal = useModalManager();

const handleEdit = async () => {
    await modal.component(EditPostModal, { post: currentPost });
};
```

```tsx
import Modal from '@hewcode/react/components/modal';
import Button from '@hewcode/react/components/ui/button';
import Input from '@hewcode/react/components/ui/input';
import { useState } from 'react';
import useModalManager from '@hewcode/react/hooks/use-modal-manager';

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
```

The component receives all props you pass, plus an `onClose` function.

## Modal Component Reference

The base `Modal` component accepts the following props:

| Prop              | Type        | Default | Description                                                                                         |
|-------------------|-------------|---------|-----------------------------------------------------------------------------------------------------|
| `isOpen`          | `boolean`   | `true`  | Whether the modal is open                                                                           |
| `onClose`         | `function`  | -       | Callback when modal should close                                                                    |
| `title`           | `string`    | -       | Modal title displayed in header                                                                     |
| `children`        | `ReactNode` | -       | Modal content                                                                                       |
| `footer`          | `ReactNode` | -       | Footer content (usually buttons)                                                                    |
| `size`            | `string`    | `'lg'`  | Width: `'xs'`, `'sm'`, `'md'`, `'lg'`, `'xl'`, `'2xl'`, `'3xl'`, `'4xl'`, `'5xl'`, `'6xl'`, `'7xl'` |
| `className`       | `string`    | -       | Additional CSS classes for the modal content                                                        |
| `showCloseButton` | `boolean`   | `true`  | Show/hide the X button in top right                                                                 |
