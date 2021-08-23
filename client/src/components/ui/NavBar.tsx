import React from 'react'
import { Link, NavLink, useHistory } from 'react-router-dom'

export const NavBar = () => {
    const history = useHistory();
    const handleLogout = () => {
        history.replace('/login');
    }
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link className="navbar-logo" to="/">
                    Logo
                </Link>
                <div className="navbar-links">
                    <NavLink to="/products/add">
                        Add Products
                    </NavLink>
                </div>
                <div className="navbar-menu">
                    <span>Welcome, Joseph</span>
                    <button className="btn" onClick={handleLogout}>
                        Sign In
                    </button>
                </div>
            </div>
        </nav>
    )
}
