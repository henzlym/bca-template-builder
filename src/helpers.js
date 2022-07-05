import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';
import { get } from 'lodash';

export function restApiFetch(url, query = {}, callback = null) {
    console.log(callback);
    if (callback == null || typeof callback !== 'function') {
        return false;
    }

    const path = addQueryArgs( url, query );

    apiFetch( { path: path } ).then( ( results ) => {
        
        callback( results );

    } );

}

export function getAuthor (post){
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
export function getThumbnail(post, size = 'thumbnail'){
    const image = (typeof post._embedded['wp:featuredmedia'] !== 'undefined') ? post._embedded['wp:featuredmedia']['0'] : false;
    if (!image) return image;
    return get(image, ['media_details', 'sizes', size, 'source_url']);
}

export function getCategories(post){
    const terms = (typeof post._embedded['wp:term'] !== 'undefined') ? post._embedded['wp:term']['0'] : false;
    if (!terms) return terms;
    return terms.map((term) => {
        return term.name;
    })
}