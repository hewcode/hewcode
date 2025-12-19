<?php

namespace Hewcode\Hewcode\Panel\Controllers;

class DashboardController extends PageController
{
    protected string $view = 'hewcode/dashboard';

    protected ?int $navigationSort = 0;

    public function getRoutePath(): string
    {
        return '/';
    }

    public function panels(): true
    {
        return true;
    }
}
