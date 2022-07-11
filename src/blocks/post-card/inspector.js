
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
import { PanelPost } from '../../panels';
/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Inspector({ layout, postSettings, onChange }) {
    return (
        <InspectorControls key="setting">
            <PanelPost {...{ layout, postSettings, onChange }} />
        </InspectorControls>
    );
}