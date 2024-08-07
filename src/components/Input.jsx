import React from 'react'
import './Input.css'

const Input = ({onSearch}) => {

  
    return (
      <div className="main-search">
        <input className="for-input"
          type="text"
          placeholder="Type here..."
        />
        <button className="btn-click">Search</button>
      </div>
    );
  };
export default Input;