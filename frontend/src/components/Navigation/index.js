import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <NavLink to="/signup">Sign Up</NavLink>
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
