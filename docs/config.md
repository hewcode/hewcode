# Configuration

The `Config` class manages global configuration values for Hewcode. It's registered as a singleton in Laravel's service container.

## Customizing Date Formats

Override the default date and datetime formats in a service provider:

```php
use Hewcode\Hewcode\Hewcode;

public function boot(): void
{
    Hewcode::config()->setDateFormat('Y-m-d');
    Hewcode::config()->setDatetimeFormat('Y-m-d H:i:s');
}
```

See PHP's [date format documentation](https://www.php.net/manual/en/datetime.format.php) for all available format characters.
