<?php

namespace Hewcode\Hewcode\Lists;

use Attribute;

#[Attribute(Attribute::TARGET_METHOD)]
class Expose
{
    public function __construct(public ?string $key = null)
    {
    }
}