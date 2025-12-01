<?php

namespace Hewcode\Hewcode\Http\Controllers;

use Hewcode\Hewcode\Contracts\HasRecord;
use Hewcode\Hewcode\Contracts\MountsActions;
use Hewcode\Hewcode\Contracts\MountsComponents;
use Hewcode\Hewcode\Contracts\ResolvesRecords;
use Hewcode\Hewcode\Contracts\HasVisibility;
use Hewcode\Hewcode\Support\Container;
use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Http\Request;
use Illuminate\Pipeline\Pipeline;
use Illuminate\Routing\Controller;
use Illuminate\Routing\Route as RoutingRoute;
use Illuminate\Support\Facades\Route;
use Symfony\Component\HttpKernel\Exception\HttpException;
use function Hewcode\Hewcode\exposed;
use function Hewcode\Hewcode\generateComponentHash;

class HewcodeController extends Controller
{
    public function __invoke(Request $request): mixed
    {
        $request->validate([
            'call.name' => 'required|string',
            'call.params' => 'sometimes|array',
            'context.recordId' => 'sometimes|string',
            'context.recordIds' => 'sometimes|array',
            'context.model' => 'sometimes|string',
            'seal.component' => 'required|string',
            'seal.route' => 'required|string',
            'seal.hash' => 'required|string',
            'seal.timestamp' => 'required|integer',
            'seal.nonce' => 'required|string',
        ]);

        $componentName = $request->input('seal.component');
        $routeName = $request->input('seal.route');
        $callName = $request->input('call.name');
        $recordId = $request->input('context.recordId');
        $recordIds = $request->input('context.recordIds');
        $model = $request->input('context.model');

        // Check seal expiration (1 hour)
        $maxAge = 3600;
        $timestamp = $request->input('seal.timestamp');
        if (time() - $timestamp > $maxAge) {
            abort(419, app()->environment('local') ? 'Seal expired' : '');
        }

        // Verify seal hash
        $seal = generateComponentHash(
            $componentName,
            $routeName,
            $timestamp,
            $request->input('seal.nonce')
        );

        if (! hash_equals($seal['hash'], $request->input('seal.hash'))) {
            abort(419, app()->environment('local') ? 'Invalid seal. Given ['.$request->input('seal.hash').'], expected ['.$seal['hash'].']' : '');
        }

        $route = Route::getRoutes()->getByName($routeName);

        if ($route) {
            $this->applyRouteMiddleware($request, $route);
        }

        $controller = $route?->getController();

        if (! method_exists($controller, $componentName)) {
            abort(404, app()->environment('local') ? "Component [$componentName] not found on controller ".get_class($controller) : '');
        }

        /** @var Container $component */
        $component = $controller->{$componentName}();

        if (! $component instanceof Container) {
            abort(500, app()->environment('local') ? "Component [$componentName] on controller ".get_class($controller)." must return an instance of ".Container::class : '');
        }

        $component
            ->name($componentName)
            ->route($routeName);

        $component->prepare();

        if (! $component instanceof HasVisibility || ! $component->isVisible()) {
            abort(403, app()->environment('local') ? 'Access denied' : '');
        }

        if ($component instanceof ResolvesRecords) {
            if ($recordId) {
                $record = $component->resolveRecord($recordId);

                if ($component instanceof HasRecord) {
                    $component->record($record);
                }
            } elseif ($recordIds) {
                $actionArgs['records'] = $component->resolveRecords($recordIds);
            }
        }

        if (! $recordId && ! $recordIds && $model) {
            $modelClass = Relation::getMorphedModel($model) ?? $model;

            $component->model($modelClass);
        }

        if ($callName === 'mountAction') {
            if (! $component instanceof MountsActions) {
                abort(400);
            }

            $data = $request->validate([
                'call.params.name' => 'required|string',
                'call.params.args' => 'sometimes|array',
            ]);

            $actionName = $data['call']['params']['name'];
            $actionArgs = $data['call']['params']['args'] ?? [];

            // remove componentName. prefix from actionName if present
            if (str_starts_with($actionName, $componentName.'.')) {
                $actionName = substr($actionName, strlen($componentName) + 1);
            }

            return $this->mountAction($component, $actionName, $actionArgs);
        }

        if ($callName === 'mountComponent') {
            if (! $component instanceof MountsComponents) {
                abort(400);
            }

            $request->validate([
                'call.params' => 'required|array',
                'call.params.0' => 'required|string',
            ]);

            $params = $request->input('call.params');

            $path = $params[0];
            $pathParts = explode('.', $path);

            if (count($pathParts) === 3) {
                $type = $pathParts[0];
                $subComponentName = $pathParts[1];
                $method = $pathParts[2];
                $args = collect($params)->slice(1)->values()->all();

                $subComponent = $component->getComponent($type, $subComponentName);

                if (! $subComponent) {
                    throw new HttpException(400);
                }

                if (! method_exists($subComponent, $method)) {
                    throw new HttpException(400);
                }

                if (! exposed($subComponent, $method)) {
                    throw new HttpException(400);
                }

                return $this->primitiveToJsonResponse(
                    $subComponent->{$method}(...$args)
                );
            } elseif (count($pathParts) === 1) {
                $method = $pathParts[0];
                $args = collect($params)->slice(1)->values()->all();

                if (! method_exists($component, $method)) {
                    throw new HttpException(400);
                }

                if (! exposed($component, $method)) {
                    throw new HttpException(400);
                }

                return $this->primitiveToJsonResponse(
                    $component->{$method}(...$args)
                );
            }

            throw new HttpException(400);
        }

        throw new HttpException(400);
    }

    protected function mountAction(MountsActions $component, string $action, array $args): mixed
    {
        return $component->mountAction($action, $args);
    }

    protected function primitiveToJsonResponse(mixed $response): mixed
    {
        if (is_array($response) || $response instanceof Arrayable) {
            return response()->json($response);
        }

        if (is_bool($response) || is_int($response) || is_float($response) || is_string($response) || $response === null) {
            return response()->json($response);
        }

        return $response;
    }

    protected function applyRouteMiddleware(Request $request, RoutingRoute $route): void
    {
        $appliedMiddleware = app()->shouldSkipMiddleware() ? [] : Route::gatherRouteMiddleware($request->route());

        $routeMiddleware = app()->shouldSkipMiddleware() ? [] : Route::gatherRouteMiddleware($route);

        $middleware = array_diff($routeMiddleware, $appliedMiddleware);

        if (empty($middleware)) {
            return;
        }

        app(Pipeline::class)
            ->send($request)
            ->through($middleware)
            ->then(fn ($request) => new \Illuminate\Http\Response());
    }
}
