// Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; // Make sure to update this file

const Sidebar = ({ username }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="avatar">{username[0]?.toUpperCase() || ''}</div>
        <h2 className="greeting">Welcome, {username}!</h2>
      </div>
      <ul className="sidebar-menu">
        <li className="sidebar-item">
          <Link to="/" className="sidebar-link">Home</Link>
        </li>
        <li className="sidebar-item">
          <Link to="/about" className="sidebar-link">About</Link>
        </li>
        <li className="sidebar-item">
          <Link to="/contact" className="sidebar-link">Contact</Link>
        </li>
        <li className="sidebar-item">
          <Link to="/settings" className="sidebar-link">Settings</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
