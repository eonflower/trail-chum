import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom'
import logoBrown from "../assets/trail-logo-brown.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

export default function NavBar(props) {
  const [collapsed, setCollapsed] = useState(false);
  const navRef = useRef(null);
  const toggleRef = useRef(null);

  const { logout } = props;

  const toggleNav = () => setCollapsed(!collapsed);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        navRef.current &&
        !navRef.current.contains(event.target) &&
        !toggleRef.current.contains(event.target)
      ) {
        setCollapsed(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <div className='nav-container'>
			<Link to="/" className='logo-link'>
				<img className="logo" src={logoBrown} />
			</Link>
      <button className="nav-toggle" onClick={toggleNav} ref={toggleRef}>
        <FontAwesomeIcon icon={faBars} />
      </button>
      <div className={`navbar ${collapsed ? 'open' : ''}`} ref={navRef}>
        <Link to="/trails" className='nav-links'>Trails</Link>
        <Link to="/logs" className='nav-links'>Logs</Link>
        <Link to="/post" className='nav-links'>Add Log</Link>
        <Link to="/account" className='account-link nav-links'>Account</Link>
        <button className='logout-btn nav-links' onClick={logout}>logout</button>
      </div>
    </div>
  );
}
