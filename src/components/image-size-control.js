/**
 * External dependencies
 */
import { pick } from 'lodash';

/**
 * Wordpress dependecies.
 *
 */
import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import {
    FontSizePicker,
    SelectControl
} from '@wordpress/components';
export default function ImageSizeSelectControl({ size, setSize }) {

    const { imageSizes } = useSelect(
        (select) => {
            const { getSettings } = select('core/block-editor');
            console.log(getSettings());
            return pick(getSettings(), ['imageSizes']);
        }
    );

    if (imageSizes.length == 0) {
        return null;
    }

    const imageSizeOptions = imageSizes.map((size) => {
        return { label: size.name, value: size.slug }
    });

    return (
        <SelectControl
            label="Image size"
            value={size}
            options={imageSizeOptions}
            onChange={setSize}
            __nextHasNoMarginBottom
        />
    );
};
const FontSizeControl = ({ value, fallbackFontSize = 16, onChange = null, withSlider = false, withReset = true }) => {

    const { fontSizes } = useSelect(
        (select) => {
            const { getSettings } = select('core/block-editor');
            console.log(getSettings());
            return pick(getSettings(), ['fontSizes']);
        }
    );

    if (fontSizes.length == 0) {
        return null;
    }


    return (
        <FontSizePicker
            fontSizes={fontSizes}
            value={value}
            fallbackFontSize={fallbackFontSize}
            onChange={onChange}
            withSlider={withSlider}
            withReset={withReset}
        />
    );
};
