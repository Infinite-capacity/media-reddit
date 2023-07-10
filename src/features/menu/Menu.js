import Search from './Search';
import React, { useEffect, useState } from "react";
import { selectSub, updateSort, updateUrl, selectUrl, selectSort } from "./menuSlice";
import { useDispatch, useSelector } from 'react-redux';
import { fetchMediaUrls } from '../media/container/containerSlice';
import ToggleSwitch from '../../components/ToggleSwitch';

export default function Menu() {
    const dispatch = useDispatch();
    const url = useSelector(selectUrl);
    const sub = useSelector(selectSub);
    const sort = useSelector(selectSort);
    const [showOptions, setShowOptions] = useState(false);

    useEffect(()=>{
        if(url) dispatch(fetchMediaUrls(url));
    }, [url, dispatch])

    useEffect(()=>{
        const topButton = document.getElementById('top');
        const hotButton = document.getElementById('hot');
        const newButton = document.getElementById('new');
        if(sub){
            switch (true) {
                case sort === 'new':
                newButton.style['border'] = '1px solid #ADE8F4';
                hotButton.style['border'] = 'none';
                topButton.style['border'] = 'none';
                break;
                case sort === 'hot':
                newButton.style['border'] = 'none';
                hotButton.style['border'] = '1px solid #ADE8F4';
                topButton.style['border'] = 'none';
                break;
                case sort.includes('top/?t='):
                newButton.style['border'] = 'none';
                hotButton.style['border'] = 'none';
                topButton.style['border'] = '1px solid #ADE8F4';
                break;
                default:
                    break;
            }
        }
        
    }, [sort, sub])

    const handleSortClick = (e) => {
        e.preventDefault();
        dispatch(updateSort(e.target.value));

        dispatch(updateUrl(sub));
        setShowOptions(false);
    }

    const topClick = (e) => {
        e.preventDefault();
        setShowOptions(true);
    }

    const handleTopSortChange = (e) => {
        e.preventDefault();
        dispatch(updateSort(e.target.value));
        dispatch(updateUrl(sub));
    }

    return (
        <div className="menu">
            <div className='searchBar'>
                <div className="titleContainer">
                <h1>Reddit <span id='imagesHeader'>Images</span></h1>
                {sub && <h5>{sub}</h5>}
                </div>
                <Search />
                <ToggleSwitch />
                {/* <div className='toggle-container'>
                <h5>NSFW</h5>
                <label className="switch">
                <input type="checkbox"/>
                <span className="slider round"></span>
                </label>
                </div> */}
            </div>
            <div className='buttonsBar'>
                <div className='buttonsContainer'>
                    <button value='new' onClick={handleSortClick} id="new">New</button>
                    <button value='hot'onClick={handleSortClick}id="hot">Hot</button>
                    <button onClick={topClick} id="top">Top</button>
                    {showOptions &&
                        <select  onChange={handleTopSortChange} >
                            <option value="top/?t=day">Day</option>
                            <option value="top/?t=week">Week</option>
                            <option value="top/?t=month">Month</option>
                            <option value="top/?t=year">Year</option>
                            <option value="top/?t=all">All-Time</option>
                        </select>
                    }
                </div>
            </div>
        </div>

    )
}