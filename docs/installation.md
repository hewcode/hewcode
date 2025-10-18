# Installation

- [Requirements](#requirements)
- [Installing the Laravel Package](#installing-the-laravel-package)
- [Installing the React Package](#installing-the-react-package)
- [Configuration](#configuration)
- [Next Steps](#next-steps)

<a name="requirements"></a>
## Requirements

Hewcode requires the following:

- PHP 8.2 or higher
- Laravel 12.x
- Inertia.js
- React 19.x or higher

<a name="installing-the-laravel-package"></a>
## Installing the Laravel Package

Install the Hewcode Laravel package via Composer:

```bash
composer require hewcode/hewcode
```

The package will automatically register its service provider.

<a name="installing-the-react-package"></a>
## Installing the React Package

Install the Hewcode React package:

```bash
npm install @hewcode/react
```

<a name="configuration"></a>
## Configuration

Hewcode works out of the box with minimal configuration. However, you may want to publish the configuration file to customize behavior:

```bash
php artisan vendor:publish --tag=hewcode-config
```

This will create a `config/hewcode.php` file where you can customize various settings.

### Translation Files (Optional)

If you want to use automatic locale labels, set up your translation files:

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

See [Automatic Locale Labels](automatic-locale-labels.md) for more details.

## Next Steps

Now that Hewcode is installed, you're ready to build your first real listing:

- **[Your First Listing](listing.md#your-first-listing)** - Build a complete data table in minutes
- **[TextColumn Reference](text-column.md)** - Learn about column customization
- **[Authorization](authorization.md)** - Secure your listings properly
