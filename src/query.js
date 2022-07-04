/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import { useEffect, useState } from '@wordpress/element';
import { addQueryArgs } from '@wordpress/url';

import {
    Spinner
} from '@wordpress/components';

import Template from './template';
/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function PostQuery(props) {

    const { attributes } = props;
    const { query:{ categories, _embed, per_page, tags, types, order, orderby } = {} } = attributes;
    const [ posts, setPosts ] = useState(null);
    const [ isLoading, setIsLoading ] = useState('is-loading');

    useEffect( () => {
        const query = {
            ...(categories.length>0 && {categories:categories}),
            ...(tags.length>0 && {tags:tags}),
            context:'edit',
            _embed, 
            per_page, 
            order, 
            orderby,
        }

        const path = addQueryArgs( `/wp/v2/${types}`, query );
        
        setIsLoading( true );

        apiFetch( { path: path } ).then( ( posts ) => {
            
            if (posts.length == 0) return;

            setPosts( posts );
            setIsLoading( false );

        } );
    },[
        categories,
        per_page, 
        order, 
        orderby,
        tags,
        types
    ]);

    return (
        <Template { ...{attributes,posts,isLoading} } />

    );
}
