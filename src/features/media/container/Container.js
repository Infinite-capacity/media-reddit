import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectMediaUrls, selectIsLoading, selectAfter, loadMore } from './containerSlice';
import Card from '../../../components/Card';
import { selectUrl } from '../../menu/menuSlice';



export default function Container() {
    const mediaUrls = useSelector(selectMediaUrls); 
    const isLoading = useSelector(selectIsLoading);
    const newUrl = useSelector(selectUrl) + '?after=' +useSelector(selectAfter);
    const dispatch = useDispatch();
    
    const handleLoadClick = (e) => {
        e.preventDefault();
        dispatch(loadMore(newUrl));
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

