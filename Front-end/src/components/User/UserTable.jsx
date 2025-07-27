import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { Link, Route, Routes } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import CreateUser from './createUser.jsx';
const UserTable = () => {
    const token = localStorage.getItem('token');
    const header = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);

    // Fetch orders only once
    useEffect(() => {
        axios.get('http://localhost:3000/user/getUsers', header).then((response) => {
            setUsers(response.data.filter((user) => user.role !== 'Admin'));
            setFilteredUsers(response.data.filter((user) => user.role !== 'Admin')); // Set both at the same time
        });
    }, []);

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:3000/user/${id}`, header).then(() => {
                    const updated = users.filter((user) => user.id !== id && user.role !== 'Admin');
                    setUsers(updated);
                    setFilteredUsers(updated);
                });
                Swal.fire('Deleted!', 'User has been deleted.', 'success');
            }
        });
    };

    const customStyles = {
        table: {
            style: { border: '1px solid #ddd', tableLayout: 'auto' },
        },
        rows: {
            style: { borderBottom: '1px solid #ddd' },
        },
        headCells: {
            style: {
                fontSize: '1rem',
                fontWeight: 'bold',
                borderRight: '1px solid #ddd',
                padding: '8px 12px',
                whiteSpace: 'nowrap',
            },
        },
        cells: {
            style: {
                fontSize: '0.8rem',
                borderRight: '1px solid #ddd',
                padding: '8px 12px',
                whiteSpace: 'nowrap',
            },
        },
    };

    const columns = [
        {
            name: 'No',
            selector: (_, index) => index + 1,
            width: '50px',
        },
        {
            name: 'Name',
            selector: (row) => row.name,
            sortable: true,
            minWidth: '130px',
        },
        {
            name: 'Role',
            selector: (row) => row.role,
            sortable: true,
            width: '80px',
        },
        {
            name: 'DOB',
            selector: (row) => new Date(row.DOB).toLocaleString('en-US', {
                month: 'long',
                day: '2-digit',
                year: 'numeric',
            }),
            sortable: true,
            width: '160px',
        },
        {
            name: 'Gender',
            selector: (row) => row.gender,
            sortable: true,
            width: '100px',
        },
        {
            id: 'date',
            name: 'Created At',
            selector: (row) =>
                new Date(row.createdAt).toLocaleString('en-US', {
                    month: 'long',
                    day: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                }),
            minWidth: '120px',
            sortable: true,
        },
        {
            name: 'Address',
            selector: (row) => row.address,
            sortable: true,
            width: '150px',
            center: true,
        },
        {
            name: 'Phone Number',
            selector: (row) => row.phoneNumber,
            sortable: true,
            minWidth: '100px',
        },
        {
            name: 'Email',
            selector: (row) => row.email,
            sortable: true,
            minWidth: '200px',
            center: true
        },
        // {
        //     name: 'Password',
        //     selector: (row) => decryptPassword(row.password),
        //     sortable: true,
        //     minWidth: '120px',
        //     center: true
        // },
        {
            name: 'Actions',
            cell: (row) => (
                <div className="d-flex justify-content-center">
                    <Link to={`/User/updateUser/${row.id}`}>
                        <button className="btn btn-outline-warning btn-sm me-2">
                            <i className="fa-solid fa-pen" />
                        </button>
                    </Link>
                    <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(row.id)}>
                        <i className="fa-solid fa-trash-can" />
                    </button>
                </div>

            ),
            width: '100px',
            center: true
        },
    ];

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();

        const filtered = users.filter((user) => {
            const name = user.name?.toString().toLowerCase() || '';
            const role = user.role?.toString().toLowerCase() || '';
            const gender = user.gender?.toString().toLowerCase() || '';
            const address = user.address?.toString().toLowerCase() || '';
            const phoneNumber = user.phoneNumber?.toString().toLowerCase() || '';
            const email = user.email?.toString().toLowerCase() || '';
            const createdAt = new Date(user.createdAt).toLocaleString('en-US').toLowerCase();
            const DOB = new Date(user.DOB).toLocaleString('en-US').toLowerCase();
            return (
                name.includes(value) ||
                role.includes(value) ||
                gender.includes(value) ||
                address.includes(value) ||
                phoneNumber.includes(value) ||
                email.includes(value) ||
                createdAt.includes(value) ||
                DOB.includes(value)
            );
        });

        setFilteredUsers(filtered);
    };

    return (
        <>
            <Link to="/user/createUser">
                <button type="button" className="btn btn-outline-primary me-2">
                    <i className="fa-solid fa-square-plus"></i> Create User
                </button>
            </Link>
            <DataTable
                customStyles={customStyles}
                columns={columns}
                data={filteredUsers}
                pagination
                highlightOnHover
                responsive
                striped
                dense
                defaultSortFieldId='date'
                defaultSortAsc={false}
                persistTableHead
                subHeader
                subHeaderComponent={
                    <input
                        type="text"
                        placeholder="Search orders..."
                        className="form-control w-25"
                        onChange={handleSearch}
                    />
                }
            />

        </>
    );
};

export default UserTable;
