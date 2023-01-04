/**
 * External dependencies
 */
import { Fragment } from 'react';

/**
 * Wordpress dependecies.
 *
 */
import { __ } from '@wordpress/i18n';
import {
    BaseControl,
    Panel,
    PanelBody,
    RangeControl,
    __experimentalRadio as Radio,
    __experimentalRadioGroup as RadioGroup,
    __experimentalToggleGroupControl as ToggleGroupControl,
    __experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from '@wordpress/components';
/**
 * Internal dependencies
 */
import '../editor.scss';
import PostListOne from '../img/post-list-1.png';
import PostListTwo from '../img/post-list-2.png';
import PostFeatureOne from '../img/post-feature-1.png';
import PostFeatureTwo from '../img/post-feature-2.png';

const LayoutToggleGroupControl = ({ value, onChange }) => {
    return (
        <ToggleGroupControl
            label="Layouts:"
            onChange={onChange}
            value={value}
            isAdaptiveWidth={true}
            isBlock={true}
        >
            <ToggleGroupControlOption value="list" label="List" />
            <ToggleGroupControlOption value="columns" label="Columns" />
            <ToggleGroupControlOption value="featured" label="Featured" />
            <ToggleGroupControlOption value="slider" label="Slider" />
        </ToggleGroupControl>

    );
};
const PostListOptions = () => {
    return (
        <Fragment>
            <Radio value="1"><img src={PostListOne} /></Radio>
            <Radio value="2"><img src={PostListTwo} /></Radio>
        </Fragment>
    )
}
const PostFeatureOptions = () => {
    return (
        <Fragment>
            <Radio value="1"><img src={PostFeatureOne} /></Radio>
            <Radio value="2"><img src={PostFeatureTwo} /></Radio>
        </Fragment>
    )
}
const TemplateRadioSelect = ({ attributes, checked, setAttributes }) => {
    const { layout } = attributes;
    return (
        <BaseControl
            className="bca-template-select-control"
            label=""
        >
            <RadioGroup
                label="Templates:"
                onChange={(checked) => {
                    setAttributes({ template: checked })
                }}
                checked={checked}>
                {layout == 'list' && (
                    <PostListOptions />
                )}
                {layout == 'featured' && (
                    <PostFeatureOptions />
                )}
            </RadioGroup>
        </BaseControl>

    );
};
/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function PanelLayout({ attributes, setAttributes }) {
    const { columns, gridGap, layout, postSettings, template } = attributes;

    return (
        <Panel>
            <PanelBody title="Layout settings:">
                <LayoutToggleGroupControl
                    value={layout}
                    onChange={(value) => {
                        let newOptions = {
                            layout: value
                        }
                        if (value !== 'list') {
                            newOptions.postSettings = {
                                ...postSettings, 
                                thumbnailSettings: { 
                                    ...postSettings.thumbnailSettings,
                                    alignment: ''
                                }    
                            }
                        }
                        if (value == 'list') {
                            newOptions.postSettings = {
                                ...postSettings, 
                                thumbnailSettings: { 
                                    ...postSettings.thumbnailSettings,
                                    alignment: 'left'
                                }    
                            }
                        }
                        console.log(layout,value);
                        if (layout=='list'&&value=='columns') {
                            newOptions.postSettings = {
                                ...postSettings, 
                                thumbnailSettings: { 
                                    ...postSettings.thumbnailSettings,
                                    alignment: ''
                                }    
                            }
                        }
                        setAttributes(newOptions)
                    }} // onChange event callback
                />
                {layout == 'columns' && (
                    <Fragment>
                        <RangeControl
                            label="Columns"
                            allowReset={true}
                            initialPosition={3}
                            resetFallbackValue={3}
                            value={columns}
                            onChange={(columns) => setAttributes({ columns })}
                            min={2}
                            max={4}
                        />
                        <RangeControl
                            allowReset={true}
                            initialPosition={15}
                            label="Column gap"
                            resetFallbackValue={15}
                            step={5}
                            value={gridGap}
                            onChange={(gridGap) => setAttributes({ gridGap })}
                        />
                    </Fragment>
                )}
                {layout !== 'columns' && (
                    <TemplateRadioSelect // Element Tag for Gutenberg standard colour selector
                        attributes={attributes}
                        checked={template}
                        setAttributes={setAttributes} // onChange event callback
                    />
                )}
            </PanelBody>
        </Panel>
    );
}
