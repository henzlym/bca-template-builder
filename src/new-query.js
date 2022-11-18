/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import { useCallback, useEffect, useMemo, useState } from '@wordpress/element';
import { addQueryArgs } from '@wordpress/url';
import { useDispatch, useSelect, dispatch, register, select } from '@wordpress/data';
import { store as core } from '@wordpress/core-data';
import { store as editor } from '@wordpress/editor';

import {
    Spinner
} from '@wordpress/components';

import Template from './template';
import './store';

const logCheckColor = 'color: orange;';
const logSuccessColor = 'color: #00d061;';

function getFeaturedPosts(clientId, postQuery) {
    return useMemo(() => {
        const { categories, _embed, per_page, tags, types, order, orderby } = postQuery;
        const [checkedExcludes, setCheckedExcludes] = useState(0);
        const queriedPosts = select('featured-posts').getQueriedPosts() || [];
        const excludedPosts = select('featured-posts').getExcludedPosts(clientId);
        const {posts,updatedQueriedPosts} = useSelect((select) => {

            const query = {
                ...(categories.length > 0 && { categories: categories }),
                ...(tags.length > 0 && { tags: tags }),
                context: 'edit',
                _embed,
                per_page: excludedPosts.length + per_page,
                order,
                orderby,
            }

            const entities = select(core).getEntityRecords('postType', 'post', query);
            const updatedQueriedPosts = entities !== null ? [...new Set([...queriedPosts, ...entities.map(post => post.id)])] : [...new Set([...queriedPosts])];
            
            return {
                posts:entities,
                updatedQueriedPosts:updatedQueriedPosts
            };

        }, [
            excludedPosts,
            categories,
            per_page,
            order,
            orderby,
            tags,
            types
        ]);
        
        useEffect(() => {
            dispatch('featured-posts').setQueriedPosts(updatedQueriedPosts)
            if (!checkedExcludes) {
                dispatch('featured-posts').setExcludedPosts(clientId, queriedPosts);
                setCheckedExcludes(1)
            }
        }, [queriedPosts]);
        
        if (posts==null||!checkedExcludes) {
            return null;
        }
        
        return posts.filter( post => !excludedPosts.includes(post.id) )
    
    });
}

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function PostQuery({ attributes:{query}, clientId, setAttributes }) {

    const posts = getFeaturedPosts(clientId, query);

    if (posts == null) {
        return null
    }

    return posts.map( (post) => <li>{post.title.raw}</li>);
}