<?php

namespace Hewcode\Hewcode\Concerns;

use Hewcode\Hewcode\Forms\Form;

trait HasForm
{
    use HasFormSchema;

    public function getForm(): Form
    {
        return Form::make()
            ->parent($this)
            ->record($record = $this->getRecord())
            ->model($record ?? $this->getModel())
            ->visible($this->isVisible())
            ->schema($this->getFormSchema())
            ->shareEvaluationParameters($this->getEvaluationParameters())
            ->submitUsing($this->action);
    }
}
