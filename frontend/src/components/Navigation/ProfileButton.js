import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const currUser = useSelector(state => {
        return state.session.user
    });
    const [showMenu, setShowMenu] = useState(false);



    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
    };

    return (
        <>
            <div onClick={openMenu} className='user-pic'>
                {currUser.firstName.slice(0,1)}
            </div>
            {showMenu && (
                <div className="profile-dropdown">
                    <p>{user.username}</p>
                    <hr></hr>
                    <p>{user.email}</p>
                    <hr></hr>
                    <button onClick={logout}>Log Out</button>
                </div>
            )
            }
        </>
    );
}

export default ProfileButton;
