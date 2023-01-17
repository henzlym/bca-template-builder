/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import { get } from 'lodash';
import { dateI18n } from '@wordpress/date';
import { useEffect, useMemo, useRef, useState } from '@wordpress/element';
import { Animate } from '@wordpress/components';
import { Fragment, useCallback } from 'react';
import { PostEdit } from '../components';
import { getAuthor, getThumbnail, getCategories } from '../helpers'
/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Post({ attributes, index, isLoading, post:initialPost, setAttributes }) {
    const isInitialMount = useRef(true);
    const [post, setPost] = useState(initialPost);
    const { posts, postSettings } = attributes;
    const {
        date,
        id,
        excerpt: { rendered: excerpt },
        title: { raw: title }
    } = post;
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    const thumbnail = useMemo(() => {
        let editedPost = posts.filter( post => post.index == index );
        let selectedThumbnailSize = postSettings.thumbnailSize;
        if (editedPost.length>0) {
            selectedThumbnailSize = editedPost[0].thumbnailSize;
        }
        // console.log(selectedThumbnailSize);
        return getThumbnail(post, selectedThumbnailSize);
    }, [postSettings.thumbnailSize, post.thumbnailSize, postSettings.showThumbnail]);
    const author = useMemo(() => {
        return getAuthor(post);
    }, [post.author]);
    const categories = useMemo(() => {
        return getCategories(post);
    }, [post.categories]);

    const strippedExcerpt = useMemo(() => {
        if (!excerpt) return '';
        const document = new window.DOMParser().parseFromString(
            excerpt,
            'text/html'
        );
        return document.body.textContent || document.body.innerText || '';
    }, [excerpt]);

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

    useEffect(()=>{

        let editedPost = posts.filter( post => post.index == index );
        if ( editedPost.length > 0 ) {
            editedPost = editedPost[0];
            setPost( { ...post,...editedPost  } );
        }

        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }


    },[title,post.thumbnailSize]);

    if (index==0) {
        // console.log(post);
       
    }
    return (
        <div className={`bca-card ${postSettings.thumbnailAlignment} ${isLoading ? 'is-loading' : ''}`}>

            <PostEdit {...{ title, thumbnailSize, updatePost }}/>

            <Animate type={`${!isImageLoaded || isLoading ? 'loading' : ''}`}>
                {({ className }) => (
                    <Fragment>
                        {thumbnail && postSettings.showThumbnail && (
                            <div className={`bca-card_thumbnail_container ${!isImageLoaded ? 'is-loading' : ''} ${className}`}>
                                <img className={`bca-card_thumbnail`} src={thumbnail} onLoad={(e) => {
                                    setIsImageLoaded(true)
                                }} />
                            </div>
                        )}
                    </Fragment>
                )}
            </Animate>


            <Animate type={`${isLoading ? 'loading' : ''}`}>
                {({ className }) => (
                    <div className={`bca-card_headline ${className}`}>

                        {!isLoading && (
                            <Fragment>
                                {categories && postSettings.showCategories && (
                                    <span className='bca-card_categories'>
                                        {
                                            categories.map((category) => {
                                                return <a rel="category tag">{category}</a>
                                            })
                                        }
                                    </span>
                                )}
                                <h2 className='bca-card_title' style={{ fontSize: postSettings.titleFontSize }}>{title}</h2>
                                <div className='bca-card_byline stacked'>
                                    {author !== false && postSettings.showAuthor && (
                                        <address className='bca-card_author'>
                                            {!postSettings.showAuthorIcon && (
                                                <span className='bca-card_author_prefix'>By</span>
                                            )}
                                            <a href={author.link} rel="author">
                                                {postSettings.showAuthorIcon && (
                                                    <img className='bca-card_author_avatar' src={author.avatar} />
                                                )}
                                                <span className='bca-card_author_name'>{author.name}</span>
                                            </a>
                                        </address>
                                    )}
                                    {postSettings.showDate && (
                                        <time>{dateI18n('F j, Y', date)}</time>
                                    )}
                                </div>
                                {postSettings.showExcerpt && (
                                    <div className='bca-card_excerpt'>{strippedExcerpt}</div>
                                )}
                                {postSettings.readMoreSettings && (
                                    <div className='bca-card_read_more'>Read More</div>
                                )}
                            </Fragment>
                        )}

                    </div>
                )}
            </Animate>
        </div>
    )
}

