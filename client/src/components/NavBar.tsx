import { useState } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { FiX as CloseIcon } from 'react-icons/fi';
import { FiMenu as MenuIcon } from 'react-icons/fi';
import { FiLogOut as LogoutIcon } from 'react-icons/fi';
import { FaUserAstronaut as UserIcon } from 'react-icons/fa';
import logo from '../assets/logo.svg';
import { useAppDispatch, useAppSelector } from '../hooks/Redux';
import { logout } from '../redux/auth/authAction';

export const NavBar = () => {
    const history = useHistory();
    const dispatch = useAppDispatch();
    const { username } = useAppSelector(state => state.auth);
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
            <div className="header__container mh-auto">
                <div className="header__logo">
                    <Link to="/">
                        <img src={logo} alt="logo" />
                    </Link>
                </div>
                <nav className="navbar text-base">
                    <div className="navbar__menu-icon" onClick={handleMenu}>
                        {clicked ? <CloseIcon /> : <MenuIcon />}
                    </div>
                    <div
                        onClick={handleMenu}
                        className='navbar__overlay'
                    ></div>
                    <div
                        className={
                            clicked
                                ? 'navbar__collapse active'
                                : 'navbar__collapse'
                        }
                    >
                        <div className="navbar__links">
                            <NavLink exact activeClassName="active" to="/">
                                Home
                            </NavLink>
                            <NavLink activeClassName="active" to="/products">
                                Products
                            </NavLink>
                        </div>
                        {!!username ? (
                            <div className="navbar__auth">
                                <div
                                    className={
                                        !!username
                                            ? 'navbar__auth--user logged'
                                            : 'navbar__auth--user user'
                                    }
                                >
                                   <UserIcon /> <span>{username}</span>
                                </div>
                                <button
                                    className="btn__navbar btn btn__logout"
                                    onClick={handleLogout}
                                >
                                    Log Out <LogoutIcon />
                                </button>
                            </div>
                        ) : (
                            <div className="navbar__auth">
                                <button
                                    className="btn__navbar btn btn__signin btn--small text-sm"
                                    onClick={handleLogin}
                                >
                                    Sign In
                                </button>
                                <button
                                    className="btn__navbar btn btn__signup btn--small text-sm"
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