import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUrl, updateSort, updateUrl } from './menuSlice';
import { selectQuery, getSuggestions, updateQuery, clearSuggestions, selectNsfw} from './searchSlice';
import Suggestion from './Suggestion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


//example search for subreddits
//https://www.reddit.com/subreddits/search.json?q=fun&include_over_18=on



export default function Search() {
    const dispatch = useDispatch();
    const url = useSelector(selectUrl);
    const query = useSelector(selectQuery);
    const nsfw = useSelector(selectNsfw);

    
    //dispatches url to container which extracts and compiles a list of media urls
    function handleSubmit(e) {
        e.preventDefault();
        //check for empty seach box
        if (query.length === 0) {
            return;
        }
        if(query.includes('r/')){
            try{
            dispatch(updateSort('new'));
            dispatch(updateUrl(query))
            .then(() => {
                dispatch(clearSuggestions());
                dispatch(updateQuery(''));
            })
            .catch((e) => {
                console.log(e);
            });
        } catch (e){
            console.error(e);
        }
        } else {
            window.alert("Please enter a valid subreddit including 'r/' ex: r/pics.");
            return;
        }
    }

    function handleChange(e) {
        e.preventDefault();
        dispatch(updateQuery(e.target.value));    
    }

    useEffect(()=>{
        setTimeout(()=>{
            if(query === ''){
                dispatch(clearSuggestions());
            }
        }, 400);
        if (query.length > 0){
            dispatch(getSuggestions(query + nsfw));
        }
    }, [query])

    return (
        <form onSubmit={handleSubmit} autoComplete='off'>
            <div className='searchInput'>
                <div className='inputTop'>
                <input 
                type='text' 
                id='search'
                name='search'
                placeholder='Enter a subreddit here'
                value={query}
                onChange={handleChange}
                />
                <button type='submit'><FontAwesomeIcon icon={faSearch}/></button>
                </div>
                <div className='suggestions'>
                    <Suggestion />
                </div>
            </div>
        </form>
    )
}