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

import classnames from 'classnames';

import {
    Spinner
} from '@wordpress/components';

import Template from './template';
import Post from './components/post';
// import './store';
// let queried = select(editor).getEditedPostAttribute('queriedPosts') || [];

/**
 * A component for fetching and displaying posts from the WordPress API.
 * 
 * @param {Object} props - The component's props.
 * @param {Object} props.attributes - The component's attributes.
 * @param {string} props.clientId - The component's client ID.
 * @param {Function} props.setAttributes - A function to set the component's attributes.
 * 
 * @returns {React.Element} - The component's JSX.
 */
export default function PostQuery({ attributes, clientId, setAttributes }) {

    // State variable to track if the data is currently loading.
    let isLoading = false;
    // Destructuring the attributes object to make it easier to work with.
    let { layout, query, template, textAlignment } = attributes;
    // Destructuring the query object to make it easier to work with.
    let { categories, _embed, per_page, tags, types, offset, order, orderby } = query;
    // Use the useSelect hook to fetch post data from the WordPress API based on the parameters passed in attributes.query.
    let { posts } = useSelect((select) => {

        // Creating the post query object to be passed to the API.
        let postQuery = {
            ...(categories.length > 0 && { categories: categories }),
            ...(tags.length > 0 && { tags: tags }),
            context: 'edit',
            _embed,
            per_page,
            order,
            orderby,
            offset
        }

        // Using the select function from the core state to get post data for the given post types, categories, tags, and other parameters specified in query.
        let entities = select(core).getEntityRecords('postType', types, postQuery) || [];
        return { posts: entities }

    }, [
        categories,
        per_page,
        order,
        orderby,
        offset,
        tags,
        types
    ]);

    // If the posts data is null or empty, return an empty array.
    if (posts == null || posts.length == 0) {
        return []
    }

    // Creating an array of classes based on the attributes.template, attributes.layout, attributes.textAlignment, isLoading.
    let templateClasses = [
        `template-${template}`,
        layout,
        textAlignment,
        isLoading,
        (layout == 'columns') ? `columns-${columns}` : ''
    ];
    
    // Using the classnames library to generate a string of classes.
    let classes = classnames( templateClasses );

    // return <Template { ...{attributes, posts, isLoading, setAttributes} } />
        
    // Return a div element with the class name derived from above and the component iterates through the post data and renders a Post component for each post, passing in attributes, isLoading, and post as props.
    return (
        <div className={classes}>
            {posts.map((post) => {
                return <Post {...{attributes, isLoading, post}}/>
            })}
        </div>
    )
}

