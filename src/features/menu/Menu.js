import { Button } from "bootstrap";
import Search from "../../components/Search";
import React from "react";
import { updateSort } from "./menuSlice";
import { useDispatch } from 'react-redux';

export default function Menu() {
    const dispatch = useDispatch();
    const handleSortClick = (e) => {
        e.preventDefault();
        dispatch(updateSort(e.target.value)); 
    }

    return (
        <div className="menu">
            <h1>Media Reddit</h1>
            <Search />
            <button value='new' onClick={handleSortClick}>New</button>
            <button value='hot'onClick={handleSortClick}>Hot</button>
            <button value='top'onClick={handleSortClick}>Top</button>
        </div>
    )
}