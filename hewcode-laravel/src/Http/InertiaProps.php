<?php

namespace Hewcode\Hewcode\Http;

use Hewcode\Hewcode\Hewcode;
use Inertia\ProvidesInertiaProperties;
use Inertia\RenderContext;
use function Hewcode\Hewcode\flattenLocaleArray;

class InertiaProps implements ProvidesInertiaProperties
{
    public function toInertiaProperties(RenderContext $context): iterable
    {
        return [
            'hewcode' => array_merge([
                'name' => config('app.name'),
                'locale' => [
                    'lang' => $context->request->getLocale(),
                    'messages' => flattenLocaleArray(is_array(__('hewcode::hewcode')) ? __('hewcode::hewcode') : [], 'hewcode'),
                ],
                'csrfToken' => csrf_token(),
                'developerMode' => config('app.debug', false),
                'auth' => [
                    'user' => $context->request->user(),
                ],
                'sidebarOpen' => ! $context->request->hasCookie('sidebar_state') || $context->request->cookie('sidebar_state') === 'true',
            ], Hewcode::sharedData()),
        ];
    }
}
