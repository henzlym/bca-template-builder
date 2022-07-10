/**
 * Wordpress dependecies.
 *
 */
import { __ } from '@wordpress/i18n';
import { useDebounce } from '@wordpress/compose';
import { useCallback, useEffect, useMemo, useRef, useState } from '@wordpress/element';
import { dateI18n } from '@wordpress/date';
import {
    Button,
    Dropdown,
    TextControl
} from '@wordpress/components';
import {
    edit,
    pullRight,
    alignNone
} from '@wordpress/icons';
import { getThumbnail, restApiFetch } from '../helpers';
import { ImageSizeSelectControl } from '../components';
import { Fragment } from 'react';

function PostSearchResults({ posts }) {
    if (posts.length == 0) {
        return null;
    }

    return posts.map((post, i) => {

        const {
            date,
            excerpt: { rendered: excerpt },
            title: { raw: title }
        } = post;

        const thumbnail = useMemo(() => {
            return getThumbnail(post, 'thumbnail');
        }, [post.featured_media]);

        return (
            <Button className='block-editor-link-control__search-item is-entity'>
                <span className="block-editor-link-control__search-item-thumbnail">
                    <img src={thumbnail} />
                </span>
                <span className="block-editor-link-control__search-item-header">
                    <span className="block-editor-link-control__search-item-title">
                        {title}
                    </span>
                    <time className="block-editor-link-control__search-item-info">{dateI18n('F j, Y', date)}</time>
                </span>
            </Button>
        )
    });
}
export default function PostEdit({ post, index, attributes, setAttributes, setPost }) {
    const {
        date,
        excerpt: { rendered: excerpt },
        title: { raw: title, rendered }
    } = post;
    const { posts, postSettings } = attributes;
    
    const updatePost = ( update ) => {
        let updatedPost = {
            id:post.id,
            index:index,
            ...update
        }

        let postExists = posts.filter( post => post.index == index );
        if ( postExists.length == 0 ) {
            posts.push( updatedPost )
            setAttributes( { posts:[ ...posts ] } );
            
        } else {
            let currentPost = posts.filter( selectedPost => selectedPost.index !== index );
            currentPost.push( {...postExists[0],...updatedPost} )
            setAttributes( { posts:[ ...currentPost ] } );
        }

        setPost( {...post, ...update} );
    }
    const hasSelectedThumbnailSize = typeof post.thumbnailSize !== 'undefined' ? post.thumbnailSize : postSettings.thumbnailSize;

    return (
        <Fragment>
            <Dropdown
                className="bca-card_dropdown"
                contentClassName="bca-card_modal"
                headerTitle="Search posts"
                position="top right"
                renderToggle={({ isOpen, onToggle }) => (
                    <Button
                        className='bca-card_edit'
                        isSmall={true}
                        variant="tertiary"
                        onClick={onToggle}
                        showTooltip={true}
                        aria-expanded={isOpen}
                        icon={ edit } label={ 'Edit' } iconSize={ 24 } 
                    >
                    </Button>
                )}
                renderContent={() => {
                    return (
                        <Fragment>
                            <TextControl
                                label="Title"
                                value={ title }
                                onChange={ ( title ) => { updatePost( {title:{raw:title,rendered}} ) } }
                            />
                            <ImageSizeSelectControl 
                                size={hasSelectedThumbnailSize}
                                setSize={(newSize) => {
                                    updatePost( {thumbnailSize:newSize} )
                                }}
                            />
                        </Fragment>
                    )
                }}
            />

        </Fragment>
    )
}