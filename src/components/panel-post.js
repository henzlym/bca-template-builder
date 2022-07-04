/**
 * External dependencies
 */
import { pick } from 'lodash';
import { Fragment } from 'react';

/**
 * Wordpress dependecies.
 *
 */
import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import {
    FontSizePicker,
    Panel,
    PanelBody,
    SelectControl,
    ToggleControl,
    __experimentalToggleGroupControl as ToggleGroupControl,
    __experimentalToggleGroupControlOptionIcon as ToggleGroupControlOptionIcon
} from '@wordpress/components';
import {
    pullLeft,
    pullRight,
    alignNone
} from '@wordpress/icons';
const ImageSizeSelectControl = ({ size, setSize }) => {

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
const PostAuthorControls = (props) => {
    const { attributes: { postSettings }, setAttributes } = props;
    return (
        <Fragment>
            <ToggleControl
                label="Display author"
                checked={postSettings.showAuthor}
                onChange={(checked) => {
                    setAttributes({ postSettings: { ...postSettings, showAuthor: checked } });
                }}
            />
            {postSettings.showAuthor && (
                <ToggleControl
                    label="Display author icon"
                    checked={postSettings.showAuthorIcon}
                    onChange={(checked) => {
                        setAttributes({ postSettings: { ...postSettings, showAuthorIcon: checked } });
                    }}
                />
            )}
        </Fragment>
    )
}
export default function PostPanel({ attributes, setAttributes }) {
    const { layout, postSettings } = attributes;
    return (
        <Panel>
            <PanelBody title="Post thumbnail settings:" initialOpen={false} >
                <ToggleControl
                    label="Show post thumbnail"
                    checked={postSettings.showThumbnail}
                    onChange={(checked) => {
                        setAttributes({ postSettings: { ...postSettings, showThumbnail: checked } });
                    }}
                />

                {layout == 'list' && (
                    <ToggleGroupControl
                        label={'Thumbnail alignment'}
                        onChange={(alignment) => {
                            setAttributes({ postSettings: { ...postSettings, thumbnailAlignment: alignment } })
                        }}
                        value={postSettings.thumbnailAlignment}>
                        <ToggleGroupControlOptionIcon value="left" aria-label="Left" icon={pullLeft} showTooltip={true} />
                        <ToggleGroupControlOptionIcon value="" aria-label="None" icon={alignNone} showTooltip={true} />
                        <ToggleGroupControlOptionIcon value="right" aria-label="Right" icon={pullRight} showTooltip={true} />
                    </ToggleGroupControl>
                )}

                <ImageSizeSelectControl
                    value={postSettings.thumbnailSize}
                    setSize={(newSize) => {
                        setAttributes({ postSettings: { ...postSettings, thumbnailSize: newSize } })
                    }}
                />
            </PanelBody>
            <PanelBody title="Post title settings:" initialOpen={false}>
                <FontSizeControl
                    value={postSettings.titleFontSize}
                    fallbackFontSize={22}
                    onChange={(fontSize) => {
                        setAttributes({ postSettings: { ...postSettings, titleFontSize: fontSize } });
                    }}
                    withSlider={false}
                    withReset={true}
                />
            </PanelBody>
            <PanelBody title="Post content settings:" initialOpen={false}>
                <ToggleControl
                    label="Display excerpt"
                    checked={postSettings.showExcerpt}
                    onChange={(checked) => {
                        setAttributes({ postSettings: { ...postSettings, showExcerpt: checked } });
                    }}
                />
            </PanelBody>
            <PanelBody title="Post meta settings:" initialOpen={false}>
                <PostAuthorControls {...{ attributes, setAttributes }} />
                <ToggleControl
                    label="Display date"
                    checked={postSettings.showDate}
                    onChange={(checked) => {
                        setAttributes({ postSettings: { ...postSettings, showDate: checked } });
                    }}
                />
                <ToggleControl
                    label="Display categories"
                    checked={postSettings.showCategories}
                    onChange={(checked) => {
                        setAttributes({ postSettings: { ...postSettings, showCategories: checked } });
                    }}
                />
            </PanelBody>
        </Panel>
    )
}