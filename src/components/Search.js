import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUrl } from '../features/menu/menuSlice';
import { updateUrl } from '../features/menu/menuSlice';
import { fetchMediaUrls } from '../features/media/container/containerSlice';

export default function Search() {
    const [query, setQuery] = useState('');
    const dispatch = useDispatch();
    const url = useSelector(selectUrl);

    useEffect(() => {
        dispatch(updateUrl(query));
    }, [query])

    function handleSubmit(e) {
        e.preventDefault();
        //check for empty seach box
        if (query.length === 0) {
            return;
        }
        dispatch(fetchMediaUrls(url));
    }

    return (
        <form onSubmit={handleSubmit}>
            <input 
            type='text' 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            />
            <button type='submit'>Search</button>
        </form>
    )
}