import apiFetch from '@wordpress/api-fetch';
import { useSelect } from '@wordpress/data';
import { useEffect, useState } from '@wordpress/element';

export default function restApiFetch({ url, query = {}, callback = null }) {

    if (callback == null || typeof callback !== 'function') {
        return false;
    }

    const path = addQueryArgs( url, query );

    apiFetch( { path: path } ).then( ( results ) => {
        
        callback( results );

    } );

}