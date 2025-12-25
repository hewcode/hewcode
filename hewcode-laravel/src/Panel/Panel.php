<?php

namespace Hewcode\Hewcode\Panel;

use Closure;
use Error;
use Hewcode\Hewcode\Hewcode;
use Hewcode\Hewcode\Panel\Controllers\PageController;
use Hewcode\Hewcode\Panel\Controllers\Resources\ResourceController;
use Hewcode\Hewcode\Panel\Controllers\ServeResourceController;
use Hewcode\Hewcode\Panel\Navigation\Navigation;
use Illuminate\Support\Facades\Route;

class Panel
{
    protected string $name;
    protected Navigation $navigation;
    protected ?Closure $navigationUsing = null;

    public function __construct(?string $name)
    {
        $this->name = $name ?? Hewcode::config()->getDefaultPanel();
        $this->navigation = app(Navigation::class, ['panel' => $this->name]);
    }

    public static function make(?string $name): self
    {
        return new self($name);
    }

    public function register(): void
    {
        $this->registerRoutes();
        $this->registerNavigation();
    }

    public function navigation(Closure $navigationUsing = null): self
    {
        $this->navigationUsing = $navigationUsing;

        return $this;
    }

    public function registerRoutes(): void
    {
        Route::middleware('web')->prefix('/'.$this->name)->name('hewcode.'.$this->name.'.')->group(function () {
            foreach (Hewcode::discovered($this->name) as $class) {
                try {
                    if (is_a($class, Resource::class, true)) {
                        /** @var \Hewcode\Hewcode\Panel\Resource $resource */
                        $resource = app($class);

                        /** @var ResourceController $pageController */
                        foreach ($resource->getPageControllers() as $pageController) {
                            $this->registerPage($pageController, ServeResourceController::class);
                        }
                    } else {
                        $this->registerPage($class);
                    }
                } catch (Error) {
                    //
                }
            }
        });
    }

    public function registerNavigation(): void
    {
        foreach (Hewcode::discovered($this->name) as $class) {
            if (is_a($class, Resource::class, true)) {
                /** @var \Hewcode\Hewcode\Panel\Resource $resource */
                $resource = app($class);

                /** @var ResourceController $controller */
                foreach ($resource->getPageControllers() as $controller) {
                    $controller->registerNavigation($this->navigation);
                }
            } else {
                /** @var PageController $controller */
                $controller = app($class);

                $controller->registerNavigation($this->navigation);
            }
        }
    }

    private function registerPage(string|ResourceController $controller, ?string $handler = null): void
    {
        $controller = is_object($controller) ? $controller : app($controller);

        $routePath = $controller->getRoutePath();
        $routeName = $controller->getRouteName();

        Route::get($routePath, $handler ?? $controller::class)->name($routeName);
    }

    public function getNavigation(): Navigation
    {
        if ($this->navigationUsing) {
            ($this->navigationUsing)($this->navigation);
        }

        return $this->navigation;
    }

    public function getName(): string
    {
        return $this->name;
    }
}
