<?php

namespace Hewcode\Hewcode;

use Hewcode\Hewcode\Http\Controllers\HewcodeController;
use Hewcode\Hewcode\Http\InertiaProps;
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
        Route::post('/_hewcode', HewcodeController::class)
            ->middleware('web')
            ->name('hewcode.mount');

        Inertia::share(new InertiaProps);
    }
}
