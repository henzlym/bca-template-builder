/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import { useEffect, useState } from '@wordpress/element';
import { addQueryArgs } from '@wordpress/url';
import { useDispatch, useSelect, dispatch, register, select } from '@wordpress/data';
import { store as core } from '@wordpress/core-data';
import { store as editor } from '@wordpress/editor';

import {
    Spinner
} from '@wordpress/components';

import Template from './template';
const queried = select( editor ).getEditedPostAttribute( 'queriedPosts' ) || [];

const logCheckColor = 'color: orange;';
const logSuccessColor = 'color: #00d061;';
/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function PostQuery({attributes, clientId, setAttributes}) {
    
    const { query:{ categories, _embed, per_page, tags, types, order, orderby } = {} } = attributes;
    const queriedPosts = select( editor ).getEditedPostAttribute( 'queriedPosts' ) || queried;
    const excludedPosts = select( editor ).getEditedPostAttribute( clientId ) || [];
    const [ checkedExcludes, setCheckedExcludes ] = useState(0);
    const posts = useSelect( ( select ) => {

        const query = {
            ...(categories.length>0 && {categories:categories}),
            ...(tags.length>0 && {tags:tags}),
            context:'edit',
            _embed, 
            per_page: excludedPosts.length + per_page, 
            order, 
            orderby,
        }

        const entities = select( core ).getEntityRecords( 'postType', 'post', query );
        
        return entities
        
    }, [
        excludedPosts,
        categories,
        per_page, 
        order, 
        orderby,
        tags,
        types
    ] );

    useEffect( () => {
        const updatedQueriedPosts = posts !== null ? [...new Set([...queriedPosts,...posts.map( post => post.id )])] : [...new Set([...queriedPosts])];
        dispatch( editor ).editPost({ queriedPosts: updatedQueriedPosts });
        if (!checkedExcludes) {
            dispatch( editor ).editPost({ [clientId]:queriedPosts });
            setCheckedExcludes(1)
        }
    },[queriedPosts]);
    
    
    if (posts == null || !checkedExcludes) {
        return null
    }

    
    return posts.filter( post => !excludedPosts.includes(post.id) ).map( (post) => <li>{post.title.raw}</li>);
}
