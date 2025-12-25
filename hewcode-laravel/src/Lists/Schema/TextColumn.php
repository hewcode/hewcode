<?php

namespace Hewcode\Hewcode\Lists\Schema;

use Carbon\Carbon;
use DateTimeInterface;
use Hewcode\Hewcode\Hewcode;

class TextColumn extends Column
{
    /**
     * Format the column value as a date using the configured date format.
     */
    public function date(?string $format = null, bool $relative = false): static
    {
        return $this->formatStateUsing(
            $this->formatDate($format ?? Hewcode::config()->getDateFormat(), $relative)
        );
    }

    /**
     * Format the column value as a datetime using the configured datetime format.
     */
    public function datetime(?string $format = null, bool $relative = false): static
    {
        return $this->formatStateUsing(
            $this->formatDate($format ?? Hewcode::config()->getDatetimeFormat(), $relative)
        );
    }

    /**
     * Limit the column value to a specified number of characters.
     */
    public function limit(int $length = 50, string $end = '...'): static
    {
        return $this->formatStateUsing(function ($value) use ($length, $end) {
            if ($value === null) {
                return null;
            }

            $value = (string) $value;

            if (mb_strlen($value) <= $length) {
                return $value;
            }

            return mb_substr($value, 0, $length) . $end;
        });
    }

    /**
     * Create a closure for formatting date/datetime values.
     * This can be reused by third-party developers in different contexts.
     *
     * @param string $format The format string to use
     * @param bool $relative Whether to use relative time format
     * @return \Closure
     */
    protected function formatDate(string $format, bool $relative): \Closure
    {
        return function ($value) use ($format, $relative) {
            if ($value === null) {
                return null;
            }

            $carbonDate = null;

            if ($value instanceof DateTimeInterface) {
                $carbonDate = Carbon::instance($value);
            } elseif (is_string($value)) {
                try {
                    $carbonDate = Carbon::parse($value);
                } catch (\Exception $e) {
                    return $value;
                }
            }

            if ($carbonDate === null) {
                return $value;
            }

            return $relative ? $carbonDate->diffForHumans() : $carbonDate->format($format);
        };
    }
}
