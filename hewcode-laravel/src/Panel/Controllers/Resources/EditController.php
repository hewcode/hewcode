<?php

namespace Hewcode\Hewcode\Panel\Controllers\Resources;

class EditController extends FormController
{
    public function getRoutePathSuffix(): string
    {
        return '/{id}/edit';
    }

    public function getRouteNameSuffix(): string
    {
        return '.edit';
    }

    public function getControllerNamePrefix(): string
    {
        return 'Edit';
    }
}
