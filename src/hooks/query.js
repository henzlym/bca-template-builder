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
 
 // import Template from './template';
 // import './store';
 // const queried = select(editor).getEditedPostAttribute('queriedPosts') || [];
 
 /**
  * The edit function describes the structure of your block in the context of the
  * editor. This represents what the editor will render when the block is used.
  *
  * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
  *
  * @return {WPElement} Element to render.
  */
 export default function PostQuery({ attributes, clientId, setAttributes }) {
 
     const { query } = attributes;
     const { categories, _embed, per_page, tags, types, order, orderby } = query;
     const [checkedDuplicates, setDuplicateCheck] = useState(false);
     const { posts, queriedPosts } = useSelect((select) => {
 
         const queried = select(editor).getEditedPostAttribute('queriedPosts') || { all: [], blocks: {} };
         const excludes = queried.blocks[clientId] || queried.all;
 
         const postQuery = {
             ...(categories.length > 0 && { categories: categories }),
             ...(tags.length > 0 && { tags: tags }),
             ...(excludes.length > 0 && { exclude: excludes }),
             context: 'edit',
             _embed,
             per_page,
             order,
             orderby,
         }
 
 
         const entities = select(core).getEntityRecords('postType', 'post', postQuery) || [];
 
         return { posts: entities, queriedPosts: queried }
 
     }, [
         categories,
         per_page,
         order,
         orderby,
         tags,
         types
     ]);
 
     useEffect(() => {
         if (posts == null) return;
 
         dispatch(editor).editPost({
             queriedPosts: {
                 all: [...new Set([...posts.map(post => post.id)])],
                 blocks: {
                     [clientId]: []
                 }
             }
         });
 
     }, [
         categories,
         per_page,
         order,
         orderby,
         tags,
         types
     ]);
 
     useEffect(() => {
         if (posts == null) return;
         dispatch(editor).editPost({
             queriedPosts: {
                 all: [...new Set([...queriedPosts.all, ...posts.map(post => post.id)])],
                 blocks: {
                     ...queriedPosts.blocks,
                     [clientId]: [...queriedPosts.all]
                 }
             }
         });
 
         setDuplicateCheck(true);
 
     }, [checkedDuplicates]);
 
     if (posts == null || posts.length == 0) {
         return []
     }
 
 
 
 
     return (
         <ul>
             {posts.map((post) => {
                 return <li>{post.id}: {post.title.raw}</li>
             })}
         </ul>
     );
 }
 