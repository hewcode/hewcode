# Widgets

Build dashboard components with stats, charts, and data visualizations in your Hewcode application.

## Getting Started

Create widgets to display on your dashboard:

```php
use Hewcode\Hewcode\Props;
use Hewcode\Hewcode\Widgets;
use Hewcode\Hewcode\Lists;

class DashboardController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('dashboard/index', Props\Props::for($this)->components(['widgets']));
    }

    #[Widgets\Expose]
    public function widgets(): Widgets\Widgets
    {
        return Widgets\Widgets::make([
            Widgets\StatsWidget::make('total_users')
                ->label('Total Users')
                ->value(User::count())
                ->icon('lucide-users'),
        ])->columns(2)->visible(auth()->check());
    }
}
```

:::danger
Always use visibility checks to ensure widgets are only shown to authorized users. Authorization middleware alone is not sufficient.
:::

On the frontend, render the widgets:

```tsx
import Widgets from '@hewcode/react/components/widgets/Widgets';
import { usePage } from '@inertiajs/react';

export default function Dashboard() {
    const { widgets } = usePage().props;

    return (
        <div>
            <Widgets {...widgets} />
        </div>
    );
}
```

## Widget Types

Hewcode provides five widget types for different use cases.

### Stats Widget

Display key metrics with optional trends and icons:

```php
use Hewcode\Hewcode\Support\Enums\Color;

Widgets\StatsWidget::make('revenue')
    ->label('Monthly Revenue')
    ->value(45230)
    ->format('currency')
    ->icon('lucide-dollar-sign')
    ->color(Color::SUCCESS)
    ->description('Total revenue this month')
    ->trend([
        'value' => 12,
        'direction' => 'up',
        'label' => 'from last month',
    ]);
```

**Formats:**
- `currency` - Formats as currency (e.g., $45,230.00)
- `number` - Formats with thousand separators (e.g., 45,230)
- `percentage` - Formats as percentage (e.g., 45.23%)

### List Widget

Display a simple list of items:

```php
Widgets\ListWidget::make('recent_activity')
    ->label('Recent Activity')
    ->items([
        'New user registered: John Doe',
        'Post published: Getting Started',
        'Comment added on: Laravel Tips',
    ])
    ->icon('lucide-activity');
```

### Card Widget

Display custom HTML content with optional actions:

```php
Widgets\CardWidget::make('welcome')
    ->label('Welcome Back')
    ->content('<p>You have 5 new notifications.</p>')
    ->actions([
        Actions\Action::make('view_all')
            ->label('View All')
            ->url(route('notifications.index')),
    ]);
```

### Listing Widget

Embed a data table within a widget using the existing Lists component:

```php
Widgets\ListingWidget::make('recent_posts')
    ->label('Recent Posts')
    ->listing(fn (Lists\Listing $listing) => $listing
        ->query(Post::query()->latest()->take(5))
        ->columns([
            Lists\Schema\TextColumn::make('title'),
            Lists\Schema\TextColumn::make('created_at')
                ->formatStateUsing(fn ($state) => $state->diffForHumans()),
        ])
        ->filters([])
        ->bulkActions([])
    )
    ->compact(true);
```

The `compact()` method reduces padding for a tighter layout within the widget.

### Chart Widget

Visualize data with interactive charts powered by Recharts:

```php
Widgets\ChartWidget::make('sales_chart')
    ->label('Sales Overview')
    ->chartType('area')  // line, bar, area, pie
    ->data([
        ['name' => 'Jan', 'sales' => 4000],
        ['name' => 'Feb', 'sales' => 3000],
        ['name' => 'Mar', 'sales' => 5000],
        ['name' => 'Apr', 'sales' => 4500],
    ])
    ->height(300)
    ->options([
        'xAxisKey' => 'name',
        'areas' => [
            ['dataKey' => 'sales', 'name' => 'Sales'],
        ],
    ]);
```

**Chart Types:**

**Line Chart:**
```php
->chartType('line')
->options([
    'xAxisKey' => 'month',
    'lines' => [
        ['dataKey' => 'revenue', 'name' => 'Revenue'],
        ['dataKey' => 'expenses', 'name' => 'Expenses'],
    ],
])
```

**Bar Chart:**
```php
->chartType('bar')
->options([
    'xAxisKey' => 'month',
    'bars' => [
        ['dataKey' => 'sales', 'name' => 'Sales'],
    ],
])
```

**Area Chart:**
```php
->chartType('area')
->options([
    'xAxisKey' => 'date',
    'areas' => [
        ['dataKey' => 'users', 'name' => 'Active Users'],
    ],
])
```

**Pie Chart:**
```php
->chartType('pie')
->data([
    ['name' => 'Product A', 'value' => 400],
    ['name' => 'Product B', 'value' => 300],
    ['name' => 'Product C', 'value' => 200],
])
->options([
    'dataKey' => 'value',
])
```

## Layout

Control widget grid layout with the `columns()` method:

```php
Widgets\Widgets::make([
    $this->statsWidget1(),
    $this->statsWidget2(),
    $this->chartWidget(),
    $this->listingWidget(),
])->columns(2);  // 1, 2, 3, or 4 columns
```

The grid is responsive and automatically adjusts for mobile screens.

## Common Patterns

### Dynamic Values

Use closures to compute values dynamically:

```php
Widgets\StatsWidget::make('active_users')
    ->label('Active Users')
    ->valueUsing(fn () => User::where('last_login', '>', now()->subHour())->count());
```

### Conditional Visibility

Show widgets based on permissions or conditions:

```php
Widgets\StatsWidget::make('admin_stats')
    ->label('Admin Statistics')
    ->value(100)
    ->visible(auth()->user()?->isAdmin() ?? false);
```

### Refresh Intervals

Auto-refresh widget data at specified intervals:

```php
Widgets\StatsWidget::make('live_visitors')
    ->label('Live Visitors')
    ->valueUsing(fn () => Cache::get('active_visitors', 0))
    ->refreshInterval(30);  // seconds
```

When `refreshInterval()` is set, the widget will automatically poll the backend at the specified interval and update its data without refreshing the page. This is perfect for real-time dashboards showing live metrics.

**How it works:**
- The frontend polls the `/_hewcode` endpoint with a `getWidget` call
- The backend re-evaluates the widget's data (closures are re-executed)
- Fresh data is merged into the widget without a full page reload
- Polling only occurs when the widget has a `refreshInterval` set

**Best practices:**
- Use closures with `->valueUsing()` for dynamic data that changes
- Set reasonable intervals (e.g., 30 seconds or more) to avoid excessive requests
- Consider caching expensive queries that are polled frequently

## Theming

Widget colors automatically adapt to your application's light and dark themes using CSS variables. Chart colors use the following variables:

- `--chart-data-1` through `--chart-data-5` for data series colors
- Standard theme variables (`--border`, `--foreground`, etc.) for UI elements

You can customize these in your `globals.css` file:

```css
:root {
    --chart-data-1: oklch(0.6 0.12 220);
    --chart-data-2: oklch(0.65 0.1 180);
    /* ... */
}
```
