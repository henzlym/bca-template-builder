/**
 * Wordpress dependecies.
 *
 */
import { __ } from '@wordpress/i18n';
import { useDebounce } from '@wordpress/compose';
import { useCallback, useEffect, useMemo, useState } from '@wordpress/element';
import { dateI18n } from '@wordpress/date';
import {
    Button,
    Dropdown,
    TextControl
} from '@wordpress/components';
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
export default function PostEdit({ post, index, attributes, setAttributes }) {
    const [Post, setPost] = useState(false);
    const {
        date,
        excerpt: { rendered: excerpt },
        title: { raw: title }
    } = Post;
    const { posts } = attributes;
    const updatePost = ( update ) => {
        console.log(Post);
        console.log(update);
        console.log({...Post, update});
        // setPost( { Post:{...Post, update} } )
    }

    useEffect(
        () => {
            console.log(Post);

            // let updatedPost = {
            //     id:Post.id,
            //     index:index,
            //     title:title
            // }

            // let postExists = posts.filter( post => post.index == index );
            // if ( postExists.length == 0 ) {
            //     posts.push( updatedPost )
            //     setAttributes( { posts:[ ...posts ] } );
                
            // } else {
            //     let currentPost = posts.filter( selectedPost => selectedPost.index !== index );
            //     currentPost.push( updatedPost )
            //     setAttributes( { posts:[ ...currentPost ] } );
            // }
    
        },[title]
    )
    return (
        <Fragment>
            <Dropdown
                className="bca-card_dropdown"
                contentClassName="bca-card_modal"
                headerTitle="Search posts"
                position="top right"
                renderToggle={({ isOpen, onToggle }) => (
                    <Button
                        variant="primary"
                        onClick={onToggle}
                        aria-expanded={isOpen}
                    >
                        Edit
                    </Button>
                )}
                renderContent={() => {
                    return (
                        <Fragment>
                            <TextControl
                                label="Title"
                                value={ title }
                                onChange={ ( title ) => { updatePost( {title:title} ) } }
                            />
                            {/* <ImageSizeSelectControl 
                                value={postSettings.thumbnailSize}
                                setSize={(newSize) => {
                                    setAttributes({ postSettings: { ...postSettings, thumbnailSize: newSize } })
                                }}
                            /> */}
                        </Fragment>
                    )
                }}
            />

        </Fragment>
    )
}