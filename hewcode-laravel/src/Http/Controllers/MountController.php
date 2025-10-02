<?php

namespace Hewcode\Hewcode\Http\Controllers;

use Hewcode\Hewcode\Contracts\Discoverable;
use Hewcode\Hewcode\Contracts\MountsActions;
use Hewcode\Hewcode\Contracts\ResolvesRecord;
use Hewcode\Hewcode\Contracts\ResourceController;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;
use RuntimeException;
use Symfony\Component\HttpKernel\Exception\HttpException;
use function Hewcode\Hewcode\generateComponentHash;

class MountController extends Controller
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

        if (! hash_equals(generateComponentHash($component, $routeName), $request->input('hash'))) {
            abort(403);
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
            abort(403);
        }

        if (! method_exists($controller, $component)) {
            abort(404);
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

        throw new HttpException(400);
    }

    protected function mountAction(Discoverable&MountsActions $component, string $action, array $args): mixed
    {
        return $component->mountAction($action, $args);
    }
}
