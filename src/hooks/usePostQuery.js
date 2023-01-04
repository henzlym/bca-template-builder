import { useEffect, useState } from '@wordpress/element';
import { useDispatch, useSelect, dispatch, register, select } from '@wordpress/data';

function getSavedValue(key, initialValue) {
    const savedValue = JSON.parse(localStorage.getItem(key));
    if (savedValue) return savedValue
    
}
export default function usePostQuery( query, initialValue) {
    const [posts,setPosts] = useState()
    
    return [posts,setPosts]
}