import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateUrl } from '../features/menu/menuSlice';

export default function Search() {
    const [query, setQuery] = useState();
    const dispatch = useDispatch();

    function handleSubmit(e) {
        e.preventDefault();
        //check for empty seach box
        if (query.length === 0) {
            return;
        }
        dispatch(updateUrl(e.target.value));
    }

    return (
        <form onSubmit={handleSubmit}>
            <input 
            type='text' 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            />
            <button>Search</button>
        </form>
    )
}