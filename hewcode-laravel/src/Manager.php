<?php

namespace Hewcode\Hewcode;

use Illuminate\Http\JsonResponse;

class Manager
{
    public function __construct(
        //
    ) {}

    public function shareWithResponse(string $key, string|null $identifier, array $data): void
    {
        $current = session()->get("hewcode.$key", []);

        if ($identifier === null) {
            $current[] = $data;
        } else {
            $current[$identifier] = $data;
        }

        session()->put("hewcode.$key", $current);
    }

    public function getSharedData(string $key): array
    {
        $data = session()->get("hewcode.$key", []);
        session()->forget("hewcode.$key");

        return $data;
    }

    public function sharedData(): array
    {
        return [
            'toasts' => $this->getSharedData('toasts'),
            'actions' => $this->getSharedData('actions'),
        ];
    }

    public function response(int $status = 200, mixed $data = null): JsonResponse
    {
        $payload = [];

        if ($data !== null) {
            $payload['data'] = $data;
        }

        $payload = array_merge($payload, $this->sharedData());

        return response()->json($payload, $status);
    }
}
