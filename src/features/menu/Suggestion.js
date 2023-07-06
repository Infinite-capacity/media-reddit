import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearSuggestions, selectSuggestions, updateQuery } from './searchSlice';
import { updateSort, updateUrl } from './menuSlice';

export default function Suggestion() {
    const suggestions = useSelector(selectSuggestions);
    const dispatch = useDispatch();

    function handleClick(e) {
        e.preventDefault();
        dispatch(updateSort('new'));
        dispatch(updateQuery(e.target.innerText));
        dispatch(updateUrl(e.target.innerText));
        dispatch(updateQuery(''));
        dispatch(clearSuggestions());
        
    }

    if(suggestions.length > 0){
        return (
            <ul className="has-suggestions">
                {suggestions.map((sub) => (
                    <li key={sub.id} onClick={handleClick}>{sub.url}</li>
                ))}
            </ul>
        )
    }
}