import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Nav = () => {
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    const location = useLocation();
    
    const logout = () => {
        localStorage.clear();
        navigate('/login');
    }
    return (
        <nav id="nav" className='navbar is-fixed-top' role="navigation" aria-label="main navigation">
            <div className="navbar-menu">
                <div className="navbar-start">
                    {
                        auth ?
                        <>
                            <Link to="/" id="nav-item" className={`navbar-item has-text-white ml-5 ${location.pathname === '/' ? 'is-active' : ''}`}>Home</Link>
                            <Link to="/tablets" id="nav-item" className={`navbar-item has-text-white ml-5 ${location.pathname.startsWith('/tablets') ? 'is-active' : ''}`}>Tablets</Link>
                            <Link to="/laptops" id="nav-item" className={`navbar-item has-text-white ml-5 ${location.pathname === '/laptops' ? 'is-active' : ''}`}>Laptops</Link>
                            <Link to="/requests" id="nav-item" className={`navbar-item has-text-white ml-5 ${location.pathname === '/requests' ? 'is-active' : ''}`}>Requests</Link>
                            <Link to="/inventory" id="nav-item" className={`navbar-item has-text-white ml-5 ${location.pathname === '/inventory' ? 'is-active' : ''}`}>Inventory</Link>
                            <Link to="/damages" id="nav-item" className={`navbar-item has-text-white ml-5 ${location.pathname === '/damages' ? 'is-active' : ''}`}>Damages</Link>
                            <Link to="/history" id="nav-item" className={`navbar-item has-text-white ml-5 ${location.pathname === '/history' ? 'is-active' : ''}`}>History</Link>
                        </>
                        :
                        <>
                            <Link to="/" id="nav-item" className={`navbar-item has-text-white ${location.pathname === '/' ? 'is-active' : ''}`}>Home</Link>
                        </>
                    }       
                </div>
            </div>
            <div className="navbar-end">
                <div className='navbar-item'>
                    {
                        auth ?
                            <>
                                <div className="buttons">
                                    <Link onClick={logout} to="/login" className="button is-danger mr-3 is-medium">Logout</Link>
                                </div>
                            </>
                            :
                            <>
                                <div className="buttons">
                                    <Link to="/register" className="button is-primary mr-3 is-medium">SignUp</Link>
                                    <Link to="/login" className="button is-light mr-3 is-medium">Login</Link>
                                </div>
                            </>
                    }
                </div> 
            </div>
        </nav>

    );
}

export default Nav;