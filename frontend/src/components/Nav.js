import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
    return (
        <div>
            <ul className="nav-ul">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/tablets">Tablets</Link></li>
                <li><Link to="/laptops">Laptops</Link></li>
                <li><Link to="/damages">Damages</Link></li>
                <li><Link to="/logout">Logout</Link></li>
                <li><Link to="/register">Register</Link></li>
            </ul>
        </div>
    );
}

export default Nav;