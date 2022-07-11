
/**
 * Wordpress dependecies.
 *
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import './editor.scss';
import { PanelLayout, PanelPost, PanelQuery } from './panels';
/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Inspector({ attributes, setAttributes }) {
    const {
        layout,
        postSettings,
    } = attributes;

    return (
        <InspectorControls key="setting">
            <PanelLayout {...{ attributes, setAttributes }} />
            <PanelQuery {...{ attributes, setAttributes }} />
            <PanelPost {...{ layout, postSettings }} onChange={ (value) => {
                setAttributes({ postSettings:{...postSettings,...value}})
            }} />
        </InspectorControls>
    );
}
