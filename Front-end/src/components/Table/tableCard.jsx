import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditTable from './CRUD_model/editTable.jsx';
import { useAuth } from '../../context/authContext.jsx';
import Swal from 'sweetalert2';
function toLocalDate(dateInput) {
  const date = new Date(dateInput);
  return date.toLocaleDateString('en-CA');
}
const TableCard = ({ table, onDelete }) => {
  const { auth } = useAuth();
  const [currTable, setCurrTable] = useState(table);
  const [name, setName] = useState(table.name);
  const [seat, setSeat] = useState(table.seat);
  const [seated, setSeated] = useState(0);
  const Today = toLocalDate(new Date());
  const token = localStorage.getItem('token');
  const header = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  useEffect(() => {

    const fetchAndUpdateStatus = async () => {
      try {
        const response = await axios.get('http://localhost:3000/order/getOrders', header);
        const orders = response.data;

        const filtered = orders.filter(order => {
          const orderDate = toLocalDate(order.createdAt);
          return orderDate === Today && (order.status === "In Progress" || order.status === "Ready");
        }
        );

        // Count total guests for this specific table
        const guestCount = filtered
          .filter(order => order.tableId === currTable.id)
          .reduce((total, order) => total + order.guest, 0);
        setSeated(guestCount);
        const availableSeat = currTable.seat - guestCount;
        const newStatus = availableSeat <= 0 ? 'Occupied' : 'Available';

        // Only update if status has changed
        if (newStatus !== currTable.status) {
          await axios.put(`http://localhost:3000/table/updateStatus/${currTable.id}`, { status: newStatus }, header);
          setCurrTable(prev => ({ ...prev, status: newStatus }));
        }
      } catch (error) {
        console.error('Failed to update table status:', error);
      }
    };

    fetchAndUpdateStatus();
  }, [Today, currTable.id, currTable.seat, currTable.status]);

  const handleEditTable = async () => {
    if (name === '') {
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Name',
        text: 'Name cannot be empty.',
        confirmButtonText: 'OK'
      });
      return;
    }else if(seat <= 0){
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Seat',
        text: 'Seat must be greater than 0.',
        confirmButtonText: 'OK'
      });
      return;
    }
    const response = await axios.put(`http://localhost:3000/table/${currTable.id}`, { name, seat }, header);
    setCurrTable(response.data);
  };

  const handleDeleteTable = () => {
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
        axios.delete(`http://localhost:3000/table/${currTable.id}`, header).then(() => {
          onDelete(currTable.id);
          Swal.fire('Deleted!', 'Your table has been deleted.', 'success');
        });

      }
    });
  };

  return (
    <div className="card bg-dark text-white p-3 w-100" style={{ borderRadius: '0.5rem' }}>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h6 className="mb-0">
          Table <span className="fw-bold">→ {currTable.name}</span>
        </h6>
        <span className={`badge ${currTable.status === 'Available' ? 'bg-success' : 'bg-danger'} py-1 px-2`}>
          {currTable.status}
        </span>
      </div>

      <div className="d-flex flex-column align-items-center">
        <div
          className="rounded-circle bg-warning d-flex justify-content-center align-items-center"
          style={{ width: '3rem', height: '3rem', fontWeight: 'bold', fontSize: '1.5rem' }}
        >
          🍽️
        </div>
        <p className="mt-2 mb-0">
          Seats: <span className="fw-bold">{currTable.seat}</span>
        </p>

      </div>
      <p className={`mt-2 mb-1 p-1 rounded text-center ${seated === currTable.seat ? 'bg-danger' : 'bg-success'}`}>
        Available Seats: <span className="fw-bold">{currTable.seat - seated}</span>
      </p>

      {auth?.role === 'Admin' && (
        <>
          <hr className="my-2" style={{ height: '1px', backgroundColor: 'white', border: 'none' }} />
          <div className="d-flex justify-content-center">
            <button type="button" className="btn btn-outline-warning btn-sm ms-2" data-bs-toggle="modal" data-bs-target={`#editTableModal${currTable.id}`}>
              <i className="fa-solid fa-pen"></i>
            </button>
            <button type="button" className="btn btn-outline-danger btn-sm ms-2" onClick={handleDeleteTable}>
              <i className="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </>
      )}
      <EditTable
        tableId={currTable.id}
        tableName={name}
        tableSeat={seat}
        setSeat={setSeat}
        setName={setName}
        handleEditTable={handleEditTable}
        fixedName={currTable.name}
      />
    </div>
  );
};

export default TableCard;
