import React from 'react';
import { isAuthenticated, logout } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
function Nav() {
    const navigate = useNavigate();
    const { auth } = useAuth();
    const handleLogout = () => {
        logout();
        navigate('/');
    }
        console.log(auth)
    return (
        <nav className="navbar bg-black p-3">
            <div className="w-100 d-flex justify-content-between">
                <a className="navbar-brand text-white">Cafe</a>
                <form className="d-flex" role="search" style={{ maxWidth: '600px', width: '100%' }}>
                    {/* <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-success" type="submit">Search</button> */}
                </form>
                <div className="d-flex align-items-center">
                    <div className="bg-white rounded d-flex align-items-center justify-content-center me-3 px-3" style={{ width: 'auto', height: '40px' }}>
                        {auth?.name || ''}
                    </div>
                    <div className="bg-warning rounded d-flex align-items-center justify-content-center me-3 px-3" style={{ width: 'auto', height: '40px' }}>
                        {auth?.role || ''}
                    </div>
                    <button className="btn btn-outline-light" onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </nav>
    );
}

export default Nav;