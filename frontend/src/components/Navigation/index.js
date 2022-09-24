import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <div className='link'>
          <NavLink to="/login">Log In</NavLink>
        </div>
        <div className='link'>
          <NavLink to="/signup">Sign Up</NavLink>
        </div>
      </>
    );
  }

  return (
    <div className='navbar'>
      <ul className ='link-list'>
        <li>
          <div className='link'>
            <NavLink className='nav-link' exact to="/">Home</NavLink>
          </div>
        </li>
        <li>
          <div className='link'>
            <NavLink className='nav-link' exact to="/songs">Music</NavLink>
          </div>
        </li>
        <li>
          <div className='link'>
            <NavLink className='nav-link' exact to="/songs">Add a Song</NavLink>
          </div>
        </li>
        {isLoaded && sessionLinks}
      </ul>
    </div>
  );
}

export default Navigation;
