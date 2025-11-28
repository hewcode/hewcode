<?php

namespace Hewcode\Hewcode;

use Illuminate\Http\JsonResponse;

class Manager
{
    public function __construct(
        //
    ) {}

    public function sharedData(): array
    {
        $toasts = session()->get('hewcode.toasts', []);
        session()->forget('hewcode.toasts');

        return [
            'toasts' => $toasts,
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
