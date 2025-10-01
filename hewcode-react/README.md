# @hewcode/react

React components for Hewcode applications.

## Installation

```bash
npm install @hewcode/react
```

## Tailwind CSS Setup

This package uses Tailwind CSS classes. To ensure the styles are properly compiled, add the package's distribution files to your Tailwind CSS content configuration:

```js
// tailwind.config.js
module.exports = {
  content: [
    // ... your existing content paths
    './node_modules/@hewcode/react/dist/**/*.js',
  ],
  // ... rest of your config
}
```

## Usage

```jsx
import { DataTable } from '@hewcode/react'

function MyComponent() {
  return (
    <DataTable
      // component props
    />
  )
}
```

## Components

- `DataTable` - A full-featured data table component with sorting, filtering, pagination, and search