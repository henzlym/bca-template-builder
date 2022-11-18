/**
 * WordPress dependencies
 */
import { addQueryArgs } from '@wordpress/url';
import apiFetch from '@wordpress/api-fetch';
import { createReduxStore, register, select, useSelect } from '@wordpress/data';
import { store as core } from '@wordpress/core-data';

const DEFAULT_STATE = {
    excludedPosts: {},
    posts: [],
    queriedPosts: null,
};

const actions = {
    setPosts(posts) {
        return {
            type: 'SET_POSTS',
            posts
        };
    },
    setQueriedPosts(queriedPosts) {
        return {
            type: 'SET_QUERIED_POSTS',
            queriedPosts
        }
    },
    setExcludedPosts(id, posts) {
        return {
            type: 'SET_EXCLUDED_POSTS',
            id,
            posts
        }
    },
    fetchPosts(clientId, query) {
        return {
            type: 'FETCH_POSTS',
            clientId,
            query,
        };
    }
};

const store = createReduxStore('featured-posts', {
    reducer(state = DEFAULT_STATE, action) {
        switch (action.type) {
            case 'SET_POSTS':
                return {
                    ...state,
                    posts: [...action.posts],
                };
            case 'SET_QUERIED_POSTS':
                return {
                    ...state,
                    queriedPosts: [...action.queriedPosts],
                };
            case 'SET_EXCLUDED_POSTS':
                return {
                    ...state,
                    excludedPosts: {
                        ...state.excludedPosts,
                        [action.id]: action.posts,
                    },
                };
        }

        return state;
    },

    actions,

    selectors: {
        getState(state) {
            return state;
        },
        getPosts(state) {
            const { posts } = state;
            return posts;
        },
        getQueriedPosts(state) {
            const { queriedPosts } = state;
            return queriedPosts;
        },
        getExcludedPosts(state, id) {
            const excludedPosts = state.excludedPosts[id] || [];
            return excludedPosts;
        }
    },

    controls: {
        FETCH_POSTS(action) {

            const { categories, _embed, per_page, tags, types, order, orderby } = action.query;

            const excludedPosts = select('featured-posts').getExcludedPosts(action.clientId)

            const query = {
                ...(categories.length > 0 && { categories: categories }),
                ...(tags.length > 0 && { tags: tags }),
                context: 'edit',
                _embed,
                per_page: excludedPosts.length + per_page,
                order,
                orderby,
            }

            const path = addQueryArgs(
                '/wp/v2/posts',
                {
                    ...query,
                }
            );

            const entities = apiFetch({ path });

            return entities

        }
    },

    resolvers: {
        *getPosts(clientId, query) {
            const posts = yield actions.fetchPosts(clientId, query);
            return actions.setPosts(posts);
        }
    },
});

register(store);