import React from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import logo from '../assets/logo.svg';
import { useState } from 'react';
import { useAppSelector } from '../hooks';
import { Close } from './icons/Close';
import { Menu } from './icons/Menu';

export const NavBar = () => {
    const history = useHistory();
    const { logged } = useAppSelector((state) => state.auth);
    const handleRegister = () => {
        history.replace('/auth/register');
    };

    // const handleLogout = () => {
    //     history.replace('/login');
    // };

    const handleLogin = () => {
        history.replace('/login');
    };

    const [clicked, setClicked] = useState(false);
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
                    <div
                        className={
                            logged ? 'navbar__user logged' : 'navbar__user'
                        }
                    >
                        Welcome, <span>Joseph</span>
                    </div>
                    <div className="navbar__menu-icon" onClick={handleMenu}>
                        {clicked ? <Close /> : <Menu />}
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
                            <div className="navbar__auth">Logout</div>
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
