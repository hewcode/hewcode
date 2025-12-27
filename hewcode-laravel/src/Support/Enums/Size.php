<?php

namespace Hewcode\Hewcode\Support\Enums;

/**
 * Size enum for consistent sizing across components.
 *
 * Useful for icon sizes and other component sizing needs.
 */
enum Size: string
{
    case SMALL = 'sm';
    case DEFAULT = 'default';
    case LARGE = 'lg';
    case ICON = 'icon';

    /**
     * Alias for SMALL.
     */
    public static function sm(): self
    {
        return self::SMALL;
    }

    /**
     * Alias for LARGE.
     */
    public static function lg(): self
    {
        return self::LARGE;
    }

    /**
     * Get all size values.
     *
     * @return array<string>
     */
    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }

    /**
     * Convert Size enum to string value.
     */
    public function toString(): string
    {
        return $this->value;
    }
}
