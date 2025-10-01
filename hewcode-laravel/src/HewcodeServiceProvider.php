<?php

namespace Hewcode\Hewcode;

use Hewcode\Hewcode\Http\Controllers\ActionController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Spatie\LaravelPackageTools\Package;
use Spatie\LaravelPackageTools\PackageServiceProvider;

class HewcodeServiceProvider extends PackageServiceProvider
{
    public function configurePackage(Package $package): void
    {
        /*
         * This class is a Package Service Provider
         *
         * More info: https://github.com/spatie/laravel-package-tools
         */
        $package
            ->name('hewcode')
            ->hasConfigFile()
            ->hasTranslations();
    }

    public function packageBooted()
    {
        // Register Hewcode routes
        Route::prefix('_hewcode')
            ->middleware('web')
            ->group(function () {
                Route::post('action', [ActionController::class, 'handle'])
                    ->name('hewcode.action');
            });

        Inertia::share([
            'hewcode' => [
                'locale' => [
                    'lang' => request()->getLocale(),
                    'messages' => flattenLocaleArray(is_array(__('hewcode::hewcode')) ? __('hewcode::hewcode') : [], 'hewcode'),
                ],
            ],
        ]);
    }
}
