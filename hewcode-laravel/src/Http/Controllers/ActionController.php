<?php

namespace Hewcode\Hewcode\Http\Controllers;

use Hewcode\Hewcode\Contracts\MountsActions;
use Hewcode\Hewcode\Contracts\ResolvesRecord;
use Hewcode\Hewcode\Contracts\ResourceController;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;
use RuntimeException;
use function Hewcode\Hewcode\generateComponentHash;

class ActionController extends Controller
{
    public function handle(Request $request): JsonResponse
    {
        $request->validate([
            'component' => 'required|string',
            'action.name' => 'required|string',
            'action.args' => 'sometimes|array',
            'action.recordId' => 'sometimes',
            'action.recordIds' => 'sometimes|array',
            'route' => 'required|string',
            'hash' => 'required|string',
        ]);

        $component = $request->input('component');
        $actionName = $request->input('action.name');
        $actionArgs = $request->input('action.args', []);
        $recordId = $request->input('action.recordId');
        $recordIds = $request->input('action.recordIds');
        $routeName = $request->input('route');

        // Validate component hash
        $expectedHash = generateComponentHash($component, $routeName);
        if (!hash_equals($expectedHash, $request->input('hash'))) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid component hash',
            ], 403);
        }

        $route = Route::getRoutes()->getByName($routeName);

        $controller = $route?->getController();
        $method = Str::parseCallback($route->action['uses'])[1];

        if (! $controller instanceof ResourceController) {
            if (app()->environment('local')) {
                throw new RuntimeException("Controller for route [$routeName] must implement ".ResourceController::class);
            }

            return response()->json([
                'success' => false,
            ], 403);
        }

        if (! $controller->canAccess($method)) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized',
            ], 403);
        }

        if (! method_exists($controller, $component)) {
            return response()->json([
                'success' => false,
                'message' => 'Component not found on controller',
            ], 404);
        }

        $component = $controller->{$component}();

        if (! $component instanceof MountsActions) {
            return response()->json([
                'success' => false,
                'message' => 'Component does not mount actions',
            ], 400);
        }

        if ($component instanceof ResolvesRecord) {
            if ($recordId) {
                $component->resolveRecord($recordId);
            } elseif ($recordIds) {
                $actionArgs['records'] = $component->resolveRecords($recordIds);
            }
        }

        // Use dependency injection to resolve method parameters
        $result = $component->mountAction($actionName, $actionArgs);

        return response()->json([
            'success' => true,
            'result' => $result,
        ]);
    }
}
