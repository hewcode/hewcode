# Installation

Hewcode allows you to quickly build lists, forms, and panels on the Laravel-Inertia-React stack with minimal code. Quickly create pages, use toasts, modals, and more with built-in shadcn/ui components.

This project was inspired by [Filament](https://filamentphp.com), and brings a similar developer experience to React-based applications. It was built on the official [Laravel-Inertia-React starter kit](https://github.com/laravel/react-starter-kit).

## Requirements

Hewcode requires the following:

* PHP 8.2+
* [Laravel 12](https://laravel.com/docs/12.x)
* [Inertia.js 2](https://inertiajs.com/)
* [React 19+](https://react.dev/)

## Installation

Install the Laravel package via Composer:

```bash
composer require hewcode/hewcode
```

The package will automatically register its service provider.

Next, Install the React package and set up the Inertia provider:

```bash
npm install @hewcode/react
```

Update your Inertia app setup (typically in `resources/js/app.tsx`) to wrap your app with the `HewcodeProvider`, and configure the `resolve` so that it can find both your app's pages and Hewcode's built-in pages:

```tsx
import HewcodeProvider from '@hewcode/react/layouts/provider';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

createInertiaApp({
    // ...
    resolve: (name) =>
        resolvePageComponent([`./pages/${name}.tsx`, `../../node_modules/@hewcode/react/src/pages/${name}.tsx`], {
            ...import.meta.glob('./pages/**/*.tsx'),
            ...import.meta.glob('../../node_modules/@hewcode/react/src/pages/hewcode/**/*.tsx'),
        }),
    setup({el, App, props}) {
        const root = createRoot(el);

        root.render(
            <HewcodeProvider {...props}>
                <App {...props} />
            </HewcodeProvider>
        );
    },
    // ...
});
```

Update your Blade template (typically `resources/views/app.blade.php`) to include Hewcode's page components in Vite's build process:

```php
@vite([
    'resources/js/app.tsx',
    \Hewcode\Hewcode\Hewcode::resolvePageComponent([
        "resources/js/pages/{$page['component']}.tsx",
        "hewcode::pages/{$page['component']}.tsx"
    ])
])
```

The `hewcode::` prefix is a shorthand that expands to `node_modules/@hewcode/react/src/`. This ensures that both your app's pages and Hewcode's built-in pages (like the dashboard) are properly loaded by Vite.

:::tip Local Development
If you're developing Hewcode locally using `npm link`, add this to your `.env` file to match the symlink-resolved paths that Vite generates:

```bash
HEWCODE_REACT_PATH=packages/hewcode-react
```
:::

Finally, add the global styles to your application's CSS file (typically `resources/css/app.css`):

```css
@import '@hewcode/react/styles/globals.css';
```

This import should be placed at the top of your CSS file, before any custom styles.

## Locale

Hewcode automatically checks `__('app.models.{model}.columns.{column}')` for column labels. So you should prepare an `app.php` language file. Example:
```php
// lang/en/app.php
return [
    'posts' => [
        'columns' => [
            'title' => 'Article Title',
            'status' => 'Publication Status',
            'published_at' => 'Publication Date',
        ],
    ],
    // Add more models...
];
```

See [Automatic Locale Labels](./auto-localization) for more details.

## Next Steps

- **[Lists](./listings)**: Build record listings with sorting, filtering, and pagination among other features.
- **[Forms](./forms)**: Create forms for creating and editing records with validation and custom fields.
- **[Panels](./panels)**: Quickly build dashboard panels.
