/**
 * WordPress dependencies
 */
import { addQueryArgs } from '@wordpress/url';
import apiFetch from '@wordpress/api-fetch';
import { createReduxStore, register, select, dispatch } from '@wordpress/data';
import { store as core } from '@wordpress/core-data';
import { arrayRemoveDuplicates } from './helpers'
const DEFAULT_STATE = {
    posts: [],
    blocks: {}
};

const actions = {
    setPosts(id, posts, postIds) {
        return {
            type: 'SET_POSTS',
            id,
            posts,
            postIds
        };
    },
    deletePosts(id) {
        const { blocks, posts } = select('bca/posts').getState();
        
        if (typeof blocks[id] == 'undefined') {
            return;
        }

        let updatedBlocks = { ...blocks };
        let postsToDelete = updatedBlocks[id].map(post => post.id);
        let updatedPosts = [...posts.filter(post => !postsToDelete.includes(post))];

        delete updatedBlocks[id];

        return {
            type: 'DELETE_POSTS',
            posts: updatedPosts,
            blocks: updatedBlocks
        }

    },
    queryPosts(id, query) {
        return {
            type: 'FETCH_POSTS',
            id,
            query,
        };
    }
};

const store = createReduxStore('bca/posts', {
    reducer(state = DEFAULT_STATE, action) {
        switch (action.type) {
            case 'SET_POSTS':
                return {
                    ...state,
                    posts: [...new Set([...state.posts, ...action.postIds])],
                    blocks: {
                        ...state.blocks,
                        [action.id]: [...new Set( [...action.posts] ) ]
                    },
                };
            case 'DELETE_POSTS':
                return {
                    ...state,
                    posts: [...action.posts],
                    blocks: { ...action.blocks },
                };
        }

        return state;
    },

    actions,

    selectors: {
        getState(state) {
            return state;
        },
        getPosts(state, id) {
            const posts = state.blocks[id] || [];
            return posts;
        },
        getQueriedPosts(state) {
            return state.posts;
        },
        getBlocks(state){
            return state.blocks
        }
    },

    controls: {
        FETCH_POSTS(action) {

            const { query } = action;

            const path = addQueryArgs(
                '/wp/v2/posts',
                {
                    ...query,
                }
            );

            const entities = apiFetch({ path });

            return entities;

        }
    },

    resolvers: {
        *getPosts(id, query) {
            // const queriedPosts = yield select('bca/posts').getQueriedPosts() || [];
            let postQuery = {...query};
            let blocks = yield select('bca/posts').getBlocks();
            let queriedPosts = [];
            if( Object.keys(blocks).length ){
                blocks = Object.entries(blocks).filter( ([clientId, posts]) => {
                    if (id !== clientId) {
                        console.log(clientId, posts);
                        queriedPosts.push( ...posts.map( post => post.id ) );
                    }
                } );
                postQuery.exclude = queriedPosts.length ? [...queriedPosts] : [];
            }

            
            let posts = yield actions.queryPosts(id, postQuery);
            let postIds = posts.length ? posts.map(post => post.id) : [];
            

            yield actions.setPosts(id, posts, postIds);
            console.log(posts);
            return posts;
        }
    },
});

register(store);

let currentCount = wp.data.select('core/editor').getBlockCount();
let unssubscribe = wp.data.subscribe( () => {
    const { blocks } = select('bca/posts').getState();
    let newCount = wp.data.select('core/editor').getBlockCount();
    let removedBlocks = newCount < currentCount;
    currentCount = newCount;
    let removedBlocked = false;
    
    if (removedBlocks) {
        let blockIds = Object.keys(blocks);
        if (!removedBlocked) {
            blockIds.forEach( id => {
                let block = wp.data.select('core/editor').getBlocksByClientId(id);
                if (block[0] == null) {
                    dispatch('bca/posts').deletePosts(id);
                }
            });
            removedBlocked = true;
        }
    }
});