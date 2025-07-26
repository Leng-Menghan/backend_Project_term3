import React, { useState, useEffect } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import CreateUser from './createUser.jsx';
import UserTable from './UserTable.jsx';
import UpdateUser from './updateUser.jsx';
const UserLayout = () => {
    return (
        <>
            <div className="container-fluid p-0">
                <div className="px-3">
                    <div className="p-3">
                        <Routes>
                            <Route path="/createUser" element={<CreateUser />} />
                            <Route path="/updateUser/:id" element={<UpdateUser />} />
                            <Route path="/*" element={<UserTable />} />
                        </Routes>
                    </div>
                </div>
            </div>

        </>
    );
};

export default UserLayout;
