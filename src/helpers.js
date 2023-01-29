import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';
import { get } from 'lodash';

export function restApiFetch(url, query = {}, callback = null) {

    if (callback == null || typeof callback !== 'function') {
        return false;
    }

    const path = addQueryArgs( url, query );

    apiFetch( { path: path } ).then( ( results ) => {
        
        callback( results );

    } );

}

export function getAuthor (post){
    const author = get(post, '_embedded.author.0', false);
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
    return get(post, '_embedded.wp:featuredmedia.0.media_details.sizes.' + size + '.source_url', false);
}

export function getCategories(post){
    const terms = get(post, '_embedded.wp:term.0', false);
    if (!terms) return terms;
    return terms.map((term) => {
        return term.name;
    })
}
export function getExcerpt(post){
    let excerpt = get( post, 'excerpt.rendered', '');
    if (!excerpt) return '';
    return decodeHTMLEntities( excerpt );
}
export function getTitle(post){
    let title = get(post, 'title.raw', '');
    return decodeHTMLEntities( title );
}
export function getDate(post){
    return get(post, 'date', '');
}
export function arrayRemoveDuplicates( array ){
    return [...new Set(array)]
}
function decodeHTMLEntities(str) {
    let document = new window.DOMParser().parseFromString(
        str,
        'text/html'
    );
    return document.body.textContent || document.body.innerText || '';
}