import React from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import logo from '../assets/logo.svg';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/Redux';
import { CloseIcon } from './icons/CloseIcon';
import { MenuIcon } from './icons/MenuIcon';
import { LogoutIcon } from './icons/LogoutIcon';
import { logout } from '../redux/auth/authAction';
import { UserIcon } from './icons/UserIcon';

export const NavBar = () => {
    const history = useHistory();
    const dispatch = useAppDispatch();
    const { logged, username } = useAppSelector(state => state.auth);
    const [clicked, setClicked] = useState(false);

    const handleRegister = () => {
        history.replace('/auth/register');
        setClicked(false);
    };

    const handleLogout = () => {
        dispatch(logout());
        history.replace('/auth/login');
    };

    const handleLogin = () => {
        history.replace('/auth/login');
        setClicked(false);
    };

    const handleMenu = () => {
        setClicked(!clicked);
    };
    return (
        <header className="header">
            <div className="header__container">
                <div className="header__logo">
                    <Link to="/">
                        <img src={logo} alt="logo" />
                    </Link>
                </div>
                <nav className="navbar">
                    <div className="navbar__menu-icon" onClick={handleMenu}>
                        {clicked ? <CloseIcon /> : <MenuIcon />}
                    </div>
                    <div
                        onClick={handleMenu}
                        className={
                            clicked
                                ? 'navbar__overlay active'
                                : 'navbar__overlay'
                        }
                    ></div>
                    <div
                        className={
                            clicked
                                ? 'navbar__collapse active'
                                : 'navbar__collapse'
                        }
                    >
                        <div className="navbar__links">
                            <NavLink activeClassName="active" to="/">
                                Home
                            </NavLink>
                            <NavLink activeClassName="active" to="/products">
                                Products
                            </NavLink>
                        </div>
                        {logged ? (
                            <div className="navbar__auth">
                                <div
                                    className={
                                        logged
                                            ? 'navbar__auth--user logged'
                                            : 'navbar__auth--user user'
                                    }
                                >
                                   <UserIcon /> <span>{username}</span>
                                </div>
                                <button
                                    className="navbar__btn btn navbar__btn--logout"
                                    onClick={handleLogout}
                                >
                                    Log Out <LogoutIcon />
                                </button>
                            </div>
                        ) : (
                            <div className="navbar__auth">
                                <button
                                    className="navbar__btn btn navbar__btn--signin"
                                    onClick={handleLogin}
                                >
                                    Sign In
                                </button>
                                <button
                                    className="navbar__btn btn navbar__btn--signup"
                                    onClick={handleRegister}
                                >
                                    Sign Up
                                </button>
                            </div>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    );
};
