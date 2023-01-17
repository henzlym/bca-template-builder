<?php

/**
 * Builds a string of HTML attributes from an array of data. 
 *
 * @since 1.0.0
 *
 * @param array  $attributes An associative array of attributes and their values.
 * @param string $seperator  Optional. The character used to separate the attribute and value. Default '='.
 * @param bool   $quotes     Optional. Whether to add quotes around the attribute value. Default true.
 *
 * @return string The resulting string of attributes and their values.
 */
function bca_build_attributes($attributes, $seperator = '=', $quotes = true)
{
    $attr_string = '';

    foreach ($attributes as $attr => $value) {
        $attr_string .= ' ' . $attr . $seperator . '"' . $value . '"';
    }

    if (!$quotes) {
        $attr_string = str_replace('"', '', $attr_string);
    }

    return trim($attr_string);
}
