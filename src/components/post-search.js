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
    SearchControl
} from '@wordpress/components';
import { getThumbnail, restApiFetch } from '../helpers';
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
export default function PostSearch() {
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState('');

    const searchPosts = useCallback(
        useDebounce(() => {
            console.log(search);

            if (search == '' || search.length < 3) {
                return;
            }
            console.log(search);

            const query = {
                context:'edit',
                _embed:true,
                search: search,
            }
            const url = '/wp/v2/posts';

            restApiFetch(url, query, (results) => {
                if (results.length == 0) return;
                setPosts(results);
            });
        }, 500)
    );

    useEffect(
        () => {
            searchPosts();
        }, [search]
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
                            <SearchControl
                                value={search}
                                onChange={(term) => { setSearch(term) }}
                            />
                            <PostSearchResults {...{posts}}/>
                        </Fragment>
                    )
                }}
            />

        </Fragment>
    )
}