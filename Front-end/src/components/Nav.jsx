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
                <a className="navbar-brand text-warning rounded d-flex align-items-center justify-content-center" style={{ width: '100px' }}>
                    Cafe <img src="../../logo/logo.png" alt="" style={{width: '35px', height: '35px'}}/>
                </a>

                <div className="d-flex rounded bg-white p-2 me-3" >
                    <div className="run-container">
                        <h4 className="run-word m-0">Welcome to Cafe Order Management System </h4>
                    </div>
                </div>
                <div className="d-flex align-items-center justify-content-end p-0">
                    <div className="bg-white rounded d-flex align-items-center justify-content-center me-3 px-3" style={{ width: '150px', height: '40px' }}>
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