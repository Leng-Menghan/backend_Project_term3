import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import ViewOrder from '../Order/viewOrder';
const OrderTable = () => {
      const token = localStorage.getItem('token');
      const header = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
    const [tables, setTables] = useState([]);
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);

    // Fetch orders only once
    useEffect(() => {
        axios.get('http://localhost:3000/order/getOrders', header).then((response) => {
            setOrders(response.data);
            setFilteredOrders(response.data); // Set both at the same time
        });
        axios.get('http://localhost:3000/table/getTables', header).then((response) => {
            setTables(response.data);
        });
    }, []);

    const handleStatusChange = (orderId, newStatus) => {
        axios.put(`http://localhost:3000/order/updateStatus/${orderId}`, { status: newStatus }, header)
            .then(() => {
                const updated = orders.map((order) => {
                    if (order.id === orderId) {
                        return { ...order, status: newStatus };
                    }
                    return order;
                });
                setOrders(updated);
                setFilteredOrders(updated);
            })
            .catch((error) => {
                console.error('Error updating order status:', error);
            });
    }
    const handlePaymentStatusChange = (orderId, newStatus) => {
        axios.put(`http://localhost:3000/order/updatePaymentStatus/${orderId}`, { paymentStatus: newStatus }, header)
            .then(() => {
                const updated = orders.map((order) => {
                    if (order.id === orderId) {
                        return { ...order, paymentStatus: newStatus };
                    }
                    return order;
                });
                setOrders(updated);
                setFilteredOrders(updated);
            })
            .catch((error) => {
                console.error('Error updating order status:', error);
            });
    }
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
                axios.delete(`http://localhost:3000/order/${id}`, header).then(() => {
                    const updated = orders.filter((order) => order.id !== id);
                    setOrders(updated);
                    setFilteredOrders(updated);
                });
                Swal.fire('Deleted!', 'Your order has been deleted.', 'success');
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
                fontSize: '1rem',
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
            width: '80px',
        },
        {
            name: 'Guest',
            selector: (row) => row.guest,
            sortable: true,
            minWidth: '120px',
        },
        {
            name: 'Table',
            selector: (row) => {
                const found = tables.find((table) => table.id === row.tableId);
                return found ? found.name : 'Table deleted'; // Fallback in case not found
            },
            sortable: true,
            minWidth: '100px',
        },
        {
            id: 'date',
            name: 'Date',
            selector: (row) =>
                new Date(row.createdAt).toLocaleString('en-US', {
                    month: 'long',
                    day: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                }),
            minWidth: '180px',
            sortable: true,
            
        },
        {
            name: 'Payment',
            selector: (row) => row.paymentStatus,
            cell: (row) => (
                <span className={`badge mb-1 ${row.paymentStatus === 'Paid' ? 'bg-success' : 'bg-danger'}`}
                    onClick={() => {
                        handlePaymentStatusChange(row.id, row.paymentStatus === 'Paid' ? 'Unpaid' : 'Paid');
                    }}
                    style={{ cursor: 'pointer' }}>
                    {row.paymentStatus === 'Paid' ? (
                        <i className="fa-solid fa-check-double me-1"></i>
                    ) : (
                        <i className="fa-solid fa-hourglass-start me-1"></i>
                    )}
                    {row.paymentStatus}
                </span>
            ),
            sortable: true,
            minWidth: '130px',
            center: true,
        },
        {
            name: 'Amount',
            selector: (row) => `$${row.amount}`,
            sortable: true,
            width: '120px',
        },
        {
            name: 'Status',
            cell: (row) => (
                <span
                    className={`badge mb-1 p-2 ${row.status === 'In Progress'
                        ? 'bg-warning text-dark'
                        : row.status === 'Ready'
                            ? 'bg-primary'
                            : 'bg-success'
                        }`}


                    onClick={() => handleStatusChange(
                        row.id,
                        row.status === 'In Progress'
                            ? 'Ready'
                            : row.status === 'Ready'
                                ? 'Completed'
                                : row.status === 'Completed' ? 'In Progress' : row.status // or keep it as 'Completed' if already completed
                    )}

                    style={{ cursor: 'pointer' }}
                >
                    {row.status === 'In Progress' ? (
                        <i className="fa-solid fa-hourglass-start me-1" />
                    ) : row.status === 'Ready' ? (
                        <i className="fa-solid fa-check me-1" />
                    ) : (
                        <i className="fa-solid fa-check-double me-1" />
                    )}
                    {row.status}
                </span>
            ),
            sortable: true,
            minWidth: '120px',
            center: true
        },
        {
            name: 'Actions',
            cell: (row) => (
                <div className="d-flex justify-content-center">
                    <button className="btn btn-outline-success btn-sm me-2" data-bs-toggle="modal" data-bs-target={`#orderModal${row.id}`}>
                        <i className="fa-solid fa-eye" />
                    </button>
                    <Link to={`/Order/updateOrder/${row.id}`}>
                        <button className="btn btn-outline-warning btn-sm me-2">
                            <i className="fa-solid fa-pen" />
                        </button>
                    </Link>
                    <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(row.id)}>
                        <i className="fa-solid fa-trash-can" />
                    </button>
                    <div class="modal fade" id={`orderModal${row.id}`} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby={`orderModalLabel${row.id}`} aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content bg-dark">
                                <div class="modal-header">
                                    <h5 className="modal-title text-white" id="staticBackdropLabel">Order Details</h5>
                                </div>
                                <div class="modal-body">
                                    <ViewOrder ordered={row} totalPrice={row.amount} />
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            ),
            minWidth: '140px',
            center: true
        },
    ];

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();

        const filtered = orders.filter((order) => {
            const guest = order.guest?.toString().toLowerCase() || '';
            const status = order.status?.toString().toLowerCase() || '';
            const payment = order.paymentStatus?.toString().toLowerCase() || '';
            const tableId = order.tableId?.toString().toLowerCase() || '';
            const amount = order.amount?.toString().toLowerCase() || '';
            const createdAt = new Date(order.createdAt).toLocaleString('en-US').toLowerCase();

            return (
                guest.includes(value) ||
                status.includes(value) ||
                payment.includes(value) ||
                tableId.includes(value) ||
                amount.includes(value) ||
                createdAt.includes(value)
            );
        });

        setFilteredOrders(filtered);
    };

    return (
        <>
            <div className="container-fluid p-0">
                <Link to="/Order/createOrder">
                    <button type="button" className="btn btn-outline-primary me-2">
                        <i className="fa-solid fa-square-plus"></i> Create Order
                    </button>
                </Link>

                <DataTable
                    customStyles={customStyles}
                    columns={columns}
                    data={filteredOrders}
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
            </div>

        </>
    );
};

export default OrderTable;
