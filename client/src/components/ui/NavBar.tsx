import React from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { Menu, X as Close } from 'react-feather';
import logo from '../../assets/logo.svg';
import { useState } from 'react';

export const NavBar = () => {
    const history = useHistory();
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
    }
    return (
        <header className="header">
            <div className="header__container">
                <div className="header__logo">
                    <Link to="/">
                        <img src={logo} alt="logo" style={{ height: '48px' }} />
                    </Link>
                </div>
                <nav className="navbar">
                    <div className="navbar__user">
                        Welcome, <span>Joseph</span>
                    </div>
                    <div className="navbar__menu-icon" onClick={handleMenu}>{clicked ? <Close /> : <Menu />}</div>
                    <div className={clicked ? 'navbar__collapse active' : 'navbar__collapse'}>
                        <div></div>
                        <div className="navbar__links">
                            <NavLink to="/products/add">Home</NavLink>
                            <NavLink to="/products/add">Add Products</NavLink>
                        </div>
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
                    </div>
                </nav>
            </div>
        </header>
    );
};
