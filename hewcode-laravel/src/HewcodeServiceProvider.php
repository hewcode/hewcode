<?php

namespace Hewcode\Hewcode;

use Hewcode\Hewcode\Http\InertiaProps;
use Hewcode\Hewcode\Panel\Controllers\HewcodeController;
use Hewcode\Hewcode\Panel\Navigation\Navigation;
use Hewcode\Hewcode\Panel\Routing;
use Hewcode\Hewcode\Support\Config;
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

    public function packageRegistered()
    {
        $this->app->singleton(Config::class, function () {
            return new Config();
        });

        $this->app->singleton(Manager::class, function () {
            return new Manager;
        });

        $this->app->alias(Manager::class, 'hewcode');
    }

    public function packageBooted()
    {
        Route::post('/_hewcode', HewcodeController::class)
            ->middleware('web')
            ->name('hewcode.mount');

        Hewcode::panels()->each(function (Panel\Panel $panel) {
            $panel->register();
        });

        Inertia::share(new InertiaProps);
    }
}
