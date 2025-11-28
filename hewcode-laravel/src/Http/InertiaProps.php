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
                'locale' => [
                    'lang' => $context->request->getLocale(),
                    'messages' => flattenLocaleArray(is_array(__('hewcode::hewcode')) ? __('hewcode::hewcode') : [], 'hewcode'),
                ],
                'csrfToken' => csrf_token(),
                'developerMode' => config('app.debug', false),
            ], Hewcode::sharedData()),
        ];
    }
}
