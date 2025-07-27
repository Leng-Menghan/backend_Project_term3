import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
const CreateUser = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        role: '',
        gender: '',
        email: '',
        password: '',
        DOB: '',
        address: '',
        phoneNumber: '',
    });

    //   const token = localStorage.getItem("token");
    //   const header = {
    //     headers: {
    //       Authorization: `Bearer ${token}`
    //     }
    //   };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/user/register', formData)
            .then((response) => {
                navigate('/user');
                Swal.fire({
                    icon: 'success',
                    title: response.data.message,
                    text: 'User created successfully',
                    confirmButtonText: 'OK'
                });
            })
            .catch((error) => {
                Swal.fire({
                    icon: 'warning',
                    title: 'Register Failed',
                    text: error.response.data.error,
                    confirmButtonText: 'OK'
                });
            });
    };

    return (
        <>
            <div className="me-3">
                <button type="button" className="btn btn-outline-primary" onClick={() => navigate('/user')}>
                    <i className="fa-solid fa-arrow-left"></i> Back
                </button>
            </div>
            <div className="p-3 py-4 w-50 m-auto">

                <h2 className="mb-3">Create User</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">Name</span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter name"
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                    </div>

                    <div className="input-group mb-3 d-flex">
                        <span className="input-group-text">Role</span>
                        <select
                            className="form-select"
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                            required
                        >
                            <option value="" disabled>Select Role</option>
                            <option value="Staff">Staff</option>
                            <option value="Admin">Admin</option>
                        </select>

                        <span className="input-group-text ms-3">Gender</span>
                        <select
                            className="form-select"
                            value={formData.gender}
                            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                            required
                        >
                            <option value="" disabled>Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>


                    <div className="input-group mb-3">
                        <span className="input-group-text">Address</span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter address"
                            required
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        />
                    </div>

                    <div className="input-group mb-3">
                        <span className="input-group-text">Phone</span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter phone number"
                            required
                            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                        />
                    </div>

                    <div className="input-group mb-3">
                        <span className="input-group-text">Date of Birth</span>
                        <input
                            type="date"
                            className="form-control"
                            required
                            onChange={(e) => setFormData({ ...formData, DOB: e.target.value })}
                        />
                    </div>

                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Email"
                            required
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                        <span className="input-group-text">@</span>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            required
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>

                    <div className="d-flex justify-content-end">
                        <button type="submit" className="btn btn-warning fw-bold">
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default CreateUser;
