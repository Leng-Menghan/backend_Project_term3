import React, { useEffect } from 'react';
import $ from 'jquery';
import 'datatables.net-bs5';
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
const OrderTable = () => {
    useEffect(() => {
        $('#example').DataTable();
    }, []);
    const handleClick = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire('Deleted!', 'Your item has been deleted.', 'success');
                // ✅ Add your delete logic here (e.g. API call)
            }
        });
    };
    return (
        <div className="container-fluid p-0">
            <Link to = "/Order/createOrder">
            <button className='btn btn-primary mb-3'>Create Order</button>
            </Link>
            <table id="example" class="table table-bordered text-start">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Guest</th>
                        <th>Table</th>
                        <th>Date</th>
                        <th>Payment</th>
                        <th>Status</th>
                        <th>Operation</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>2</td>
                        <td>Table 1</td>

                        <td>22-07-2025</td>
                        <td>30 $</td>
                        <td>Ready</td>
                        <td className="d-flex justify-content-center">
                            <button type="button" className="btn btn-outline-success btn-sm" data-bs-toggle="modal" data-bs-target={`#viewTableModal`}>
                                <i class="fa-solid fa-eye"></i>
                            </button>
                            <button type="button" className="btn btn-outline-warning btn-sm ms-2" data-bs-toggle="modal" data-bs-target={`#editTableModal`}>
                                <i class="fa-solid fa-pen"></i>
                            </button>
                            <button type="button" className="btn btn-outline-danger btn-sm ms-2" onClick={handleClick}>
                                <i class="fa-solid fa-trash-can"></i>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

    );

};

export default OrderTable;
