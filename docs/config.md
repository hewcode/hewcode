# Config

The `Config` class manages global configuration values for Hewcode. It's registered as a singleton in Laravel's service container.

## Customizing Date Formats

Override the default date and datetime formats in a service provider:

```php
use Hewcode\Hewcode\Support\Config;

public function boot(): void
{
    Config::dateFormat('Y-m-d');
    Config::datetimeFormat('Y-m-d H:i:s');
}
```

### Default Formats

- **Date Format:** `M j, Y` (e.g., "Oct 19, 2024")
- **DateTime Format:** `M j, Y g:i A` (e.g., "Oct 19, 2024 2:30 PM")

### Common Format Examples

```php
// Date formats
Config::dateFormat('Y-m-d');           // 2024-10-19
Config::dateFormat('m/d/Y');           // 10/19/2024
Config::dateFormat('F j, Y');          // October 19, 2024
Config::dateFormat('d/m/Y');           // 19/10/2024

// DateTime formats
Config::datetimeFormat('Y-m-d H:i:s');           // 2024-10-19 14:30:00
Config::datetimeFormat('m/d/Y h:i A');           // 10/19/2024 02:30 PM
Config::datetimeFormat('d/m/Y H:i');             // 19/10/2024 14:30
```

### Using with TextColumn

After configuring defaults, all date columns use your format:

```php
TextColumn::make('published_at')->date()  // Uses Config::dateFormat()
TextColumn::make('created_at')->datetime()  // Uses Config::datetimeFormat()

// Override for a specific column
TextColumn::make('event_date')->date(format: 'F j, Y')
```

### Getting Current Formats

```php
$dateFormat = Config::dateFormat();
$datetimeFormat = Config::datetimeFormat();
```

See PHP's [date format documentation](https://www.php.net/manual/en/datetime.format.php) for all available format characters.
