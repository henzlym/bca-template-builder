/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { 
	AlignmentToolbar,
    BlockControls,
	BlockContextProvider,
	useBlockProps, 
	useInnerBlocksProps
} from '@wordpress/block-editor';
import { Dropdown, DropdownMenu, Toolbar, ToolbarGroup, ToolbarButton, ToolbarItem } from '@wordpress/components';
import {
    edit,
    pullRight,
    alignNone
} from '@wordpress/icons';
import { useEffect, useMemo, useRef, useState } from '@wordpress/element';
import { AsyncModeProvider, useDispatch, useSelect, dispatch, register, select } from '@wordpress/data';

import { Fragment } from 'react';
/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

import Inspector from './inspector';
import PostQuery from './query';

function PostEditToolbar() {
    return (
        <Toolbar label="Edit Post">
            <ToolbarGroup>
				<ToolbarItem>
					{ ( toolbarItemHTMLProps ) => (
						<Dropdown
							icon={ edit }
							toggleProps={ toolbarItemHTMLProps }
							label={ 'Edit post' }
							controls={ [] }
						/>
					) }
				</ToolbarItem>
            </ToolbarGroup>
        </Toolbar>
    );
}
/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit( props ) {
	const [selectedPost, setSelectedPost] = useState(false);
	const { attributes, clientId, setAttributes } = props;

    return (
		<div { ...useBlockProps() }>
            <Inspector { ...{attributes, clientId, setAttributes} } />
            <PostQuery { ...{attributes, clientId, setAttributes} }/>
        </div>

	);
}
