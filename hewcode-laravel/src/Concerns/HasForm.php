<?php

namespace Hewcode\Hewcode\Concerns;

use Hewcode\Hewcode\Forms\Form;
use Hewcode\Hewcode\Forms\FormDefinition;

trait HasForm
{
    use HasFormSchema;

    public function getForm(): Form
    {
        $form = $this->getFormDefinition()?->create() ?? Form::make();

        if (! empty($schema = $this->getFormSchema())) {
            $form->schema($schema);
        }

        return $form
            ->parent($this)
            ->record($record = $this->getRecord())
            ->model($record ?? $this->getModel())
            ->visible($this->isVisible())
            ->shareEvaluationParameters($this->getEvaluationParameters())
            ->submitUsing($this->action);
    }

    protected function getFormDefinition(): ?FormDefinition
    {
        return null;
    }
}
