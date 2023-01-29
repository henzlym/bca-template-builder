/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import { dateI18n } from '@wordpress/date';
import { useMemo, useState } from '@wordpress/element';
import { Animate } from '@wordpress/components';
import { Fragment } from 'react';
import { useBlockProps } from '@wordpress/block-editor';

import { getAuthor, getCategories, getDate, getExcerpt, getThumbnail, getTitle } from '../../helpers';

import classnames from 'classnames';
/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit(props) {
    const { attributes, context } = props;
    const {
        "bca-template-builder/postSettings": templatePostSettings,
        isLoading,
        posts
    } = context;
    const {
        index,
    } = attributes;
    let {
        categorySettings,
        excerptSettings,
        metaSettings,
        readMoreSettings,
        thumbnailSettings,
        titleSettings
    } = templatePostSettings;
    const [post] = useState(posts[index]);
    let [isImageLoaded, setIsImageLoaded] = useState(false);

    let postTitle = getTitle(post);
    let thumbnail = getThumbnail(post, thumbnailSettings.size);
    let author = getAuthor(post);
    let categories = getCategories(post);
    let excerpt = getExcerpt(post);
    let date = getDate(post);
    let postClasses = [
        'bca-card',
        thumbnailSettings.alignment,
        isLoading ? 'is-loading' : ''
    ];
    let classes = classnames(postClasses);
    let blockProps = useBlockProps({
        className: classes
    });

    return (
        <div {...blockProps}>

            {thumbnail && thumbnailSettings.show && (
                <div className={`bca-card_thumbnail_container ${!isImageLoaded ? 'is-loading' : ''}`}>
                    <img className={`bca-card_thumbnail`} src={thumbnail} onLoad={(e) => {
                        setIsImageLoaded(true)
                    }} />
                </div>
            )}
            <div className={`bca-card_headline`}>

                {categories && categorySettings.show && (
                    <span className='bca-card_categories'>
                        {
                            categories.map((category) => {
                                return <a rel="category tag">{category}</a>
                            })
                        }
                    </span>
                )}
                <h2 className='bca-card_title' style={{ fontSize: titleSettings.fontSize }}>{postTitle}</h2>
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
                    <div className='bca-card_excerpt'>{excerpt}</div>
                )}
                {readMoreSettings.show && (
                    <div className='bca-card_read_more'>Read More</div>
                )}

            </div>
        </div>
    )
}

