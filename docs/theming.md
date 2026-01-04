# Theming

Hewcode provides a powerful theming system that allows you to override any React component from the framework with your own custom implementation.

## Setup

Add the `hewcodeTheme()` Vite plugin to your `vite.config.ts`:

```typescript
import { hewcodeTheme } from '@hewcode/react/vite';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
        hewcodeTheme(), // Must be first to intercept @hewcode/react imports
        // ... other plugins
    ],
});
```

**Important:** The `hewcodeTheme()` plugin must be placed **first** in the plugins array to properly intercept imports.

## Quick Start

To override any component from `@hewcode/react`, create a matching file in `resources/js/hewcode/theme/` that mirrors the package structure.

**Example:** Override the CardWidget component

1. The package component is at: `@hewcode/react/components/widgets/CardWidget`
2. Create your override at: `resources/js/hewcode/theme/components/widgets/CardWidget.tsx`
3. Your custom component will automatically be used instead of the package version

## How It Works

The `hewcodeTheme()` Vite plugin intercepts all imports from `@hewcode/react` and checks if an override exists in your theme directory first. If found, it uses your version; otherwise, it falls back to the package.

**No additional configuration needed** - just create the file and it works!

## Creating Overrides

Replace a component entirely with your own implementation:

```tsx
// resources/js/hewcode/theme/components/widgets/CardWidget.tsx
import React from 'react';

export default function CardWidget({ heading, description, content }) {
    return (
        <div className="custom-card">
            <h3>{heading}</h3>
            <p>{description}</p>
            <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
    );
}
```
