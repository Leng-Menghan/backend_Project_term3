import React from 'react';

function Nav() {
    return (
        <nav className="navbar bg-black py-3">
            <div className="w-100 d-flex justify-content-between">
                <a className="navbar-brand text-white">Cafe</a>
                <form className="d-flex" role="search" style={{ maxWidth: '600px', width: '100%' }}>
                    {/* <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-success" type="submit">Search</button> */}
                </form>
                <div className="d-flex align-items-center">
                    <button className="btn btn-outline-light me-2">Login</button>
                    <button className="btn btn-outline-light">Sign Up</button>
                </div>
            </div>
        </nav>
    );
}

export default Nav;