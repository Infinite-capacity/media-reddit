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
            <button value='new'>New</button>
            <button value='hot'>Hot</button>
            <button value='top'>Top</button>
        </div>
    )
}