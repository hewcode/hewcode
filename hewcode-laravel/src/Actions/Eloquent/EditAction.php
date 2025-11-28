<?php

namespace Hewcode\Hewcode\Actions\Eloquent;

use Hewcode\Hewcode\Actions\Action;
use Closure;
use Hewcode\Hewcode\Toasts\Toast;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class EditAction extends Action
{
    public function setUp(): void
    {
        parent::setUp();

        $this->color('primary');
        $this->label(__('hewcode::hewcode.actions.edit'));
        $this->action($this->getDefaultAction());
    }

    public static function make(string $name = 'edit'): static
    {
        return (new static())->name($name);
    }

    protected function getDefaultAction(): Closure
    {
        return function (array $data, Model $record, Action $action) {
            return DB::transaction(function () use ($data, $record, $action) {
                Toast::make()
                    ->success()
                    ->send();

                $action->close();

                $record->update($data);

                return $record;
            });
        };
    }
}
