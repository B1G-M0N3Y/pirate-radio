import React from 'react';
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import SignupFormModal from '../SignupFormModal';

function Navigation({ isLoaded }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  const signInDemoUser = async () => {
    await dispatch(sessionActions.login({credential: 'demo-user', password: 'demouser'}))
  }

  let sessionLinks;

  if (sessionUser?.id) {
    sessionLinks = (
      <>
        <li>
          <div className='link'>
            <NavLink className='nav-link add-song-butt' exact to="/songs/new">Add a Song</NavLink>
          </div>
        </li>
        <ProfileButton user={sessionUser} />
      </>
    );
  } else {
    sessionLinks = (
      <>
        <button onClick={() => signInDemoUser()} className='login-button'>Demo User</button>
        <LoginFormModal />
        <SignupFormModal text="Sign Up" styling='signup-button'/>
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
          <div className='butts'>
            {isLoaded && sessionLinks}
          </div>
        </div>

      </ul>
    </div>
  );
}

export default Navigation;
