import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import SignupFormModal from '../SignupFormModal';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  console.log('and the lucky user is', sessionUser)

  let sessionLinks;

  if (sessionUser?.id) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <SignupFormModal />
      </>
    );
  }

  return (
    <div className='navbar'>
      <ul className='link-list'>

        <div className='left'>
          <li>
            <div className='link'>
              <NavLink className='nav-link' exact to="/">
                <img src="https://upload.wikimedia.org/wikipedia/commons/0/01/Pirate_ship.svg"></img>
              </NavLink>
            </div>
          </li>
          <li>
            <div className='link'>
              <NavLink className='nav-link' exact to="/songs">Music</NavLink>
            </div>
          </li>
        </div>

        <div className='right'>
          <li>
            <div className='link'>
              <NavLink className='nav-link' exact to="/songs/new">Add a Song</NavLink>
            </div>
          </li>
          <div className='butts'>
          {isLoaded && sessionLinks}
          </div>
        </div>

      </ul>
    </div>
  );
}

export default Navigation;
