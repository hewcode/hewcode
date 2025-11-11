<?php

namespace Hewcode\Hewcode\Forms\Schema;

class DateTimePicker extends Field
{
    protected bool $withTime = true;
    protected bool $withDate = true;
    protected ?string $format = null;

    protected function setUp(): void
    {
        parent::setUp();

        $this->formatStateUsing(function ($state) {
            if ($state === null) {
                return null;
            }

            if ($this->withDate && $this->withTime) {
                return date('Y-m-d H:i:s', strtotime($state));
            }

            if ($this->withTime) {
                return date('H:i:s', strtotime($state));
            }

            return date('Y-m-d', strtotime($state));
        });
    }

    public function withTime(bool $withTime = true): static
    {
        $this->withTime = $withTime;
        return $this;
    }

    public function withDate(bool $withDate = true): static
    {
        $this->withDate = $withDate;
        return $this;
    }

    public function format(string $format): static
    {
        $this->format = $format;
        return $this;
    }

    protected function getFieldType(): string
    {
        return match (true) {
            $this->withTime && $this->withDate => 'datetime-picker',
            $this->withTime => 'time-picker',
            default => 'date-picker',
        };
    }

    protected function getFieldSpecificData(): array
    {
        return [
            'withTime' => $this->withTime,
            'withDate' => $this->withDate,
            'format' => $this->format,
        ];
    }
}
