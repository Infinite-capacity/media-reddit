import React from "react";
import { useDispatch } from "react-redux";
import { toggleNsfw } from '../features/menu/searchSlice';




export default function ToggleSwitch() {
    const dispatch = useDispatch();

    const handleClick = ()=> {
      dispatch(toggleNsfw());
    }

    return (
      <div className='toggle-container'>
          <h5>NSFW</h5>
          <label className="switch">
          <input type="checkbox" onClick={handleClick}/>
          <span className="slider round"></span>
          </label>
      </div>
    )
}