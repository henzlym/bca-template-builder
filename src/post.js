/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import { get } from 'lodash';
import { dateI18n } from '@wordpress/date';
import { useEffect, useMemo, useState } from '@wordpress/element';
import { Animate } from '@wordpress/components';
import { Fragment } from 'react';

const getAuthor = (post) => {
    const author = (typeof post._embedded['author'] !== 'undefined') ? post._embedded['author']['0'] : false;
    if (author !== false) {
        author.avatar = false;
        if (typeof post._embedded['author']['0'].avatar_urls['48'] !== 'undefined') {
            author.avatar = post._embedded['author']['0'].avatar_urls['48'];
        } else if (typeof post._embedded['author']['0'].avatar_urls['24'] !== 'undefined') {
            author.avatar = post._embedded['author']['0'].avatar_urls['24'];
        } else if (typeof post._embedded['author']['0'].avatar_urls['96'] !== 'undefined') {
            author.avatar = post._embedded['author']['0'].avatar_urls['96'];
        }
    }
    return author;
};
const getThumbnail = (post, size = 'thumbnail') => {
    const image = (typeof post._embedded['wp:featuredmedia'] !== 'undefined') ? post._embedded['wp:featuredmedia']['0'] : false;
    if (!image) return image;
    return get(image, ['media_details', 'sizes', size, 'source_url']);
}

const getCategories = (post) => {
    const terms = (typeof post._embedded['wp:term'] !== 'undefined') ? post._embedded['wp:term']['0'] : false;
    if (!terms) return terms;
    return terms.map((term) => {
        return term.name;
    })
}

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Post({ attributes, post, isLoading }) {
    const { postSettings } = attributes
    const {
        date,
        excerpt: { rendered: excerpt },
        title: { raw: title }
    } = post;
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    const thumbnail = useMemo(() => {
        return getThumbnail(post, postSettings.thumbnailSize);
    }, [postSettings.thumbnailSize, post.featured_media]);
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

    return (
        <div className={`bca-card ${postSettings.thumbnailAlignment} ${isLoading ? 'is-loading' : ''}`}>


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
                            </Fragment>
                        )}

                    </div>
                )}
            </Animate>
        </div>
    )
}

