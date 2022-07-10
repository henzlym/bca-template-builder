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
// import { PostEdit } from '../components';
import {
    BlockContextProvider,
    useBlockProps,
    useInnerBlocksProps
} from '@wordpress/block-editor';
import { InspectorControls } from '@wordpress/block-editor';
import { getAuthor, getThumbnail, getCategories } from '../../helpers';
import PostPanel from './inspector';
/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({ attributes, context, setAttributes }) {
    const {
        categorySettings,
        excerptSettings,
        edits,
        index,
        metaSettings,
        thumbnailSettings,
        titleFontSize
    } = attributes;
    const { 
        "bca-template-builder/query":query,
        isLoading, 
        posts,
        layout
    } = context;
    const isInitialMount = useRef(true);
    const [post, setPost] = useState(posts[index]);
    const {
        date,
        id,
        excerpt: { rendered: excerpt },
        title: { raw: title }
    } = post;
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    const thumbnail = useMemo(() => {
        let selectedThumbnailSize = thumbnailSettings.size;
        return getThumbnail(post, selectedThumbnailSize);
    }, [thumbnailSettings.size]);
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

    // useEffect(() => {

    //     let editedPost = posts.filter(post => post.index == index);
    //     if (editedPost.length > 0) {
    //         editedPost = editedPost[0];
    //         setPost({ ...post, ...editedPost });
    //     }

    //     if (isInitialMount.current) {
    //         isInitialMount.current = false;
    //         return;
    //     }


    // }, [title, post.thumbnailSize]);

    if (index == 0) {
        console.log(post);
    }

    let blockProps = useBlockProps({
        className:`bca-card ${thumbnailSettings.alignment} ${isLoading ? 'is-loading' : ''}`
    });
    return (
        <div {...blockProps}>

            <PostEdit {...{ attributes, setAttributes }} />
            <InspectorControls>
                <PostPanel {...{ attributes, setAttributes, context }} />
            </InspectorControls>
            <Animate type={`${!isImageLoaded || isLoading ? 'loading' : ''}`}>
                {({ className }) => (
                    <Fragment>
                        {thumbnail && thumbnailSettings.show && (
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
                                {categories && categorySettings.show && (
                                    <span className='bca-card_categories'>
                                        {
                                            categories.map((category) => {
                                                return <a rel="category tag">{category}</a>
                                            })
                                        }
                                    </span>
                                )}
                                <h2 className='bca-card_title' style={{ fontSize: titleFontSize }}>{title}</h2>
                                <div className='bca-card_byline stacked'>
                                    {author !== false && metaSettings.author.show && (
                                        <address className='bca-card_author'>
                                            {!metaSettings.author.showIcon && (
                                                <span className='bca-card_author_prefix'>By</span>
                                            )}
                                            <a href={author.link} rel="author">
                                                {metaSettings.author.showIcon && (
                                                    <img className='bca-card_author_avatar' src={author.avatar} />
                                                )}
                                                <span className='bca-card_author_name'>{author.name}</span>
                                            </a>
                                        </address>
                                    )}
                                    {metaSettings.date.show && (
                                        <time>{dateI18n('F j, Y', date)}</time>
                                    )}
                                </div>
                                {excerptSettings.show && (
                                    <div className='bca-card_excerpt'>{strippedExcerpt}</div>
                                )}
                            </Fragment>
                        )}

                    </div>
                )}
            </Animate>
        </div>
    )
}

