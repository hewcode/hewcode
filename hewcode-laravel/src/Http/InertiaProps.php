<?php

namespace Hewcode\Hewcode\Http;

use Inertia\ProvidesInertiaProperties;
use Inertia\RenderContext;
use function Hewcode\Hewcode\flattenLocaleArray;

class InertiaProps implements ProvidesInertiaProperties
{
    public function toInertiaProperties(RenderContext $context): iterable
    {
        return [
            'hewcode' => [
                'locale' => [
                    'lang' => $context->request->getLocale(),
                    'messages' => flattenLocaleArray(is_array(__('hewcode::hewcode')) ? __('hewcode::hewcode') : [], 'hewcode'),
                ],
                'csrfToken' => csrf_token(),
                'developerMode' => config('app.debug', false),
            ],
        ];
    }
}
