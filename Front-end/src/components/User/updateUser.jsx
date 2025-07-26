import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
const UpdateUser = () => {
    const navigate = useNavigate();
    const { id } = useParams();
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

    const token = localStorage.getItem("token");
    const header = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    useEffect(() => {
        axios.get('http://localhost:3000/user/' + id, header)
            .then((response) => {
                setFormData({
                    name: response.data.name,
                    role: response.data.role,
                    gender: response.data.gender,
                    email: response.data.email,
                    password: response.data.password,
                    DOB: response.data.DOB,
                    address: response.data.address,
                    phoneNumber: response.data.phoneNumber,
                });
            });
    }, []);
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put('http://localhost:3000/user/' + id, formData, header)
            .then((response) => {
                navigate('/user');
            })
            .catch((error) => {
                console.error("Error creating user:", error);
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
                <h2 className="mb-3">Update User</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">Name</span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>

                    <div className="input-group mb-3 d-flex">
                        <span className="input-group-text">Role</span>
                        <select className="form-select" value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })}>
                            <option disabled selected>Open this select Role</option>
                            <option value="Admin">Admin</option>
                            <option value="Staff">Staff</option>
                        </select>

                        <span className="input-group-text ms-3">Gender</span>
                        <select className="form-select" value={formData.gender} onChange={(e) => setFormData({ ...formData, gender: e.target.value })}>
                            <option disabled selected>Open this select Gender</option>
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
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        />
                    </div>

                    <div className="input-group mb-3">
                        <span className="input-group-text">Phone</span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter phone number"
                            value={formData.phoneNumber}
                            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                        />
                    </div>

                    <div className="input-group mb-3">
                        <span className="input-group-text">Date of Birth</span>
                        <input
                            type="date"
                            className="form-control"
                            value={formData.DOB}
                            onChange={(e) => setFormData({ ...formData, DOB: e.target.value })}
                        />
                    </div>

                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                        <span className="input-group-text">@</span>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            disabled
                        />
                    </div>

                    <div className="d-flex justify-content-end">
                        <button type="submit" className="btn btn-warning fw-bold">
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default UpdateUser;
