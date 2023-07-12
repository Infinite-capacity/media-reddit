import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectMediaUrls, selectIsLoading, selectAfter, loadMore } from './containerSlice';
import Card from '../../../components/Card';
import { selectSort, selectUrl } from '../../menu/menuSlice';



export default function Container() {
    const mediaUrls = useSelector(selectMediaUrls); 
    const isLoading = useSelector(selectIsLoading);
    const sort = useSelector(selectSort);
    const after = useSelector(selectAfter);
    const url = useSelector(selectUrl);
    let newUrl = '';
    if(sort.includes('top')){
        newUrl = url + '&after=' + after; 
    } else {
        newUrl = url + '?after=' + after;
    }
    const dispatch = useDispatch();
    
    const handleLoadClick = (e) => {
        e.preventDefault();
        dispatch(loadMore(newUrl));
        console.log(`newUrl: ${newUrl}`)
    }


    return (
        <div>
            <div className='picture-box'>
                {isLoading ?
                <div className="lds-ring"><div></div><div></div><div></div><div></div></div>  
                :mediaUrls.map((entry) => (
                    <Card key={entry.id} url={entry.url} />
                ))
                }
            </div>
            {mediaUrls.length > 0 && !isLoading &&
                <div className='loading-button'>
                <button  onClick={handleLoadClick}>Load More</button>
                </div>
            }
        </div>
    )
}

