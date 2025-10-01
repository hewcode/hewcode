<?php

namespace Hewcode\Hewcode\Actions;

class BulkAction extends Action
{
    public function name(string $name): static
    {
        parent::name($name);

        $this->name = 'bulk-' . $this->name;

        return $this;
    }

    public function execute(array $args = []): mixed
    {
        if ($this->action) {
            // For bulk actions, we expect records to be passed in args
            $records = $args['records'] ?? collect();

            // Convert array of IDs to Collection if needed
            if (is_array($records) && !empty($records) && is_numeric($records[0] ?? null)) {
                // This is handled in InteractsWithActions trait
                $records = $args['records'];
            }

            return $this->evaluate($this->action, array_merge(['records' => $records], $args));
        }

        return null;
    }
}
