<?php

namespace Hewcode\Hewcode\Http\Controllers;

use Hewcode\Hewcode\Contracts\Discoverable;
use Hewcode\Hewcode\Contracts\MountsActions;
use Hewcode\Hewcode\Contracts\MountsComponents;
use Hewcode\Hewcode\Contracts\ResolvesRecord;
use Hewcode\Hewcode\Contracts\ResourceController;
use Hewcode\Hewcode\Support\Expose;
use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;
use ReflectionMethod;
use RuntimeException;
use Symfony\Component\HttpKernel\Exception\HttpException;
use function Hewcode\Hewcode\exposed;
use function Hewcode\Hewcode\generateComponentHash;

class HewcodeController extends Controller
{
    public function __invoke(Request $request): mixed
    {
        $request->validate([
            'component' => 'required|string',
            'call.name' => 'required|string',
            'call.params' => 'sometimes|array',
            'context.recordId' => 'sometimes|string',
            'context.recordIds' => 'sometimes|array',
            'route' => 'required|string',
            'hash' => 'required|string',
        ]);

        $component = $request->input('component');
        $routeName = $request->input('route');
        $callName = $request->input('call.name');
        $recordId = $request->input('context.recordId');
        $recordIds = $request->input('context.recordIds');

        if (! hash_equals($hash = generateComponentHash($component, $routeName), $request->input('hash'))) {
            abort(403, app()->environment('local') ? 'Invalid hash. Given ['.$request->input('hash').'], expected ['.$hash.']' : '');
        }

        $route = Route::getRoutes()->getByName($routeName);

        $controller = $route?->getController();
        $method = Str::parseCallback($route->action['uses'])[1];

        if (! $controller instanceof ResourceController) {
            if (app()->environment('local')) {
                throw new RuntimeException("Controller for route [$routeName] must implement ".ResourceController::class);
            }

            abort(403);
        }

        if (! $controller->canAccess($method)) {
            abort(403, app()->environment('local') ? 'Access denied' : '');
        }

        if (! method_exists($controller, $component)) {
            abort(404, app()->environment('local') ? "Component [$component] not found on controller ".get_class($controller) : '');
        }

        $component = $controller->{$component}();

        if ($component instanceof ResolvesRecord) {
            if ($recordId) {
                $component->resolveRecord($recordId);
            } elseif ($recordIds) {
                $actionArgs['records'] = $component->resolveRecords($recordIds);
            }
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

    protected function mountAction(Discoverable&MountsActions $component, string $action, array $args): mixed
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
}
