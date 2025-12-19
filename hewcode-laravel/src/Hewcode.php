<?php

namespace Hewcode\Hewcode;

use Hewcode\Hewcode\Panel\Navigation\Navigation;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Facade;

/**
 * @method static string|self dateFormat(?string $format = null)
 * @method static string|self datetimeFormat(?string $format = null)
 * @method static mixed config(string $key, mixed $default = null)
 * @method static array sharedData()
 * @method static array getSharedData(string $key)
 * @method static \Illuminate\Http\JsonResponse response(int $status = 200, mixed $data = null)
 * @method static void shareWithResponse(string $key, string|null $identifier, array $data)
 * @method static void discover(string $path)
 * @method static array getDiscoveryPaths()
 * @method static string|null routeName(string $name, ?string $panel = null)
 * @method static string|null route(string $name, array $parameters = [], bool $absolute = true, ?string $panel = null)
 * @method static array|\Hewcode\Hewcode\Panel\Resource[] discovered(string $panel)
 * @method static array|\Hewcode\Hewcode\Panel\Resource[] getResources(string $panel)
 * @method static \Hewcode\Hewcode\Panel\Resource|null getResourceByName(string $name, string $panel)
 * @method static Panel\Panel panel(?string $name = null)
 * @method static Collection<int, \Hewcode\Hewcode\Panel\Panel> panels()
 * @method static bool isPanel(?string $name = null)
 * @method static \Hewcode\Hewcode\Panel\Panel|null currentPanel()
 *
 * @see \Hewcode\Hewcode\Manager
 */
class Hewcode extends Facade
{
    protected static function getFacadeAccessor(): string
    {
        return 'hewcode';
    }
}
