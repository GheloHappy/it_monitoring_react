import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Nav = () => {
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate('/login');
    }
    return (
        <div>
            <ul className="nav-ul">
                <li className='ml-5'><Link to="/">Home</Link></li>
                {
                    auth ?
                        <>
                            <li><Link to="/tablets">Tablets</Link></li>
                            <li><Link to="/laptops">Laptops</Link></li>
                            <li><Link to="/damages">Damages</Link></li>
                            <li className='is-pulled-right mr-5'> <Link onClick={logout} to="/login">Logout</Link> </li>
                        </>
                        : 
                        <>
                            <li className='is-pulled-right mr-5'><Link to="/register">SignUp</Link></li>
                            <li className='is-pulled-right'><Link to="/login">Login</Link></li>
                        </>
                }
            </ul>
        </div>
    );
}

export default Nav;