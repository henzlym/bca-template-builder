/**
 * Wordpress dependecies.
 *
 */
import { __ } from '@wordpress/i18n';
import {
    Panel,
    PanelBody,
    ToggleControl,
    __experimentalToggleGroupControl as ToggleGroupControl,
    __experimentalToggleGroupControlOptionIcon as ToggleGroupControlOptionIcon
} from '@wordpress/components';
import {
    pullLeft,
    pullRight,
    alignNone
} from '@wordpress/icons';

import { ImageSizeSelectControl, FontSizeControl, PostAuthorControls } from '../components';

export default function PostPanel({layout, postSettings, onChange}) {
    const { categorySettings, excerptSettings, metaSettings, readMoreSettings, titleSettings, thumbnailSettings } = postSettings
    return (
        <Panel>
            <PanelBody title="Post thumbnail settings:" initialOpen={false} >
                <ToggleControl
                    label="Show post thumbnail"
                    checked={thumbnailSettings.show}
                    onChange={(value) => {
                        onChange({ thumbnailSettings:{...thumbnailSettings,...{show:value}} });
                    }}
                />

                {layout == 'list' && (
                    <ToggleGroupControl
                        label={'Thumbnail alignment'}
                        onChange={(value) => {
                            onChange({ thumbnailSettings:{...thumbnailSettings,...{alignment:value}} });
                        }}
                        value={thumbnailSettings.alignment}>
                        <ToggleGroupControlOptionIcon value="left" aria-label="Left" icon={pullLeft} showTooltip={true} />
                        <ToggleGroupControlOptionIcon value="" aria-label="None" icon={alignNone} showTooltip={true} />
                        <ToggleGroupControlOptionIcon value="right" aria-label="Right" icon={pullRight} showTooltip={true} />
                    </ToggleGroupControl>
                )}

                <ImageSizeSelectControl
                    size={thumbnailSettings.size}
                    setSize={(value) => {
                        onChange({ thumbnailSettings:{...thumbnailSettings,...{size:value}} });
                    }}
                />
            </PanelBody>
            <PanelBody title="Post title settings:" initialOpen={false}>
                <FontSizeControl
                    value={titleSettings.fontSize}
                    fallbackFontSize={22}
                    onChange={(value) => {
                        onChange({ titleSettings:{...titleSettings,...{fontSize:value}} });
                    }}
                    withSlider={false}
                    withReset={true}
                />
            </PanelBody>
            <PanelBody title="Post content settings:" initialOpen={false}>
                <ToggleControl
                    label="Display excerpt"
                    checked={excerptSettings.show}
                    onChange={(value) => {
                        onChange({ excerptSettings:{...excerptSettings,...{show:value}} });
                    }}
                />
            </PanelBody>
            <PanelBody title="Post meta settings:" initialOpen={false}>
                <PostAuthorControls {...{ postSettings, onChange }} />
                <ToggleControl
                    label="Display date"
                    checked={metaSettings.date.show}
                    onChange={(value) => {
                        onChange({ metaSettings:{...metaSettings,date:{show:value}} });
                    }}
                />
                <ToggleControl
                    label="Display categories"
                    checked={categorySettings.show}
                    onChange={(value) => {
                        onChange({ categorySettings:{...categorySettings,...{show:value}} });
                    }}
                />
                <ToggleControl
                    label="Display read more"
                    checked={readMoreSettings.show}
                    onChange={(value) => {
                        onChange({ readMoreSettings:{...readMoreSettings,...{show:value}} });
                    }}
                />
            </PanelBody>
        </Panel>
    )
}