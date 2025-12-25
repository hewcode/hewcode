# Layout Components

Hewcode provides essential React layout components for building consistent application interfaces.

## App Layout

The main application layout for your app with sidebar, header, and content area:

```tsx
import AppLayout from '@hewcode/react/layouts/app-layout';

export default function Dashboard() {
    const breadcrumbs = [{ title: 'Dashboard', href: '/app' }];
    const actions = [<button key="new">Create New</button>];

    return (
        <AppLayout breadcrumbs={breadcrumbs} actions={actions}>
            <div className="space-y-6">
                {/* Your content */}
            </div>
        </AppLayout>
    );
}
```

## Page Layout

For simpler pages without full app chrome:

```tsx
import PageLayout from '@hewcode/react/layouts/pages/page-layout';

export default function SettingsPage() {
    return (
        <PageLayout breadcrumbs={[{ title: 'Settings', href: '/settings' }]}>
            <div className="max-w-2xl">
                {/* Page content */}
            </div>
        </PageLayout>
    );
}
```

## Auth Layout

For authentication pages like login and registration:

```tsx
import AuthLayout from '@hewcode/react/layouts/auth-layout';

export default function Login() {
    return (
        <AuthLayout>
            <form className="space-y-4">
                {/* Login form */}
            </form>
        </AuthLayout>
    );
}
```