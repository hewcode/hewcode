<?php

namespace Hewcode\Hewcode;

use Illuminate\Support\Facades\Facade;

/**
 * @method static string|self dateFormat(?string $format = null)
 * @method static string|self datetimeFormat(?string $format = null)
 * @method static \Hewcode\Hewcode\Support\Config config()
 * @method static array sharedData()
 * @method static array getSharedData(string $key)
 * @method static \Illuminate\Http\JsonResponse response(int $status = 200, mixed $data = null)
 * @method static void shareWithResponse(string $key, string|null $identifier, array $data)
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
