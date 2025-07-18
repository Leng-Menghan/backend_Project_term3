import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
const TableCard = ({ table, onStatusChange }) => {
  const [status, setStatus] = useState(true);
  const handleStatusChange = (tableId) => {
    setStatus(!status);
    const currStatus = status ? "Available" : "Occupied";
    axios.put(`http://localhost:3000/table/updateStatus/${tableId}`, { status: currStatus })
      .then(() => {
        onStatusChange(tableId, currStatus);
      })
  }
  return (
    <div className="card bg-dark text-white p-3" style={{ width: '15rem', borderRadius: '0.5rem' }}>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h6 className="mb-0">
          Table <span className="fw-bold">→ {table.id}</span>
        </h6>
        <span className={`badge ${table.status === 'Available' ? 'bg-success' : 'bg-danger'} py-1 px-2`} onClick={() => handleStatusChange(table.id)}
          style={{ cursor: 'pointer' }}
          >{table.status}</span>
      </div>

      <div className="d-flex flex-column align-items-center">
        <div
          className="rounded-circle bg-warning d-flex justify-content-center align-items-center"
          style={{ width: '3rem', height: '3rem', fontWeight: 'bold', fontSize: '1.5rem' }}
        >
            🍽️
        </div>
        <p className="mt-2 mb-0">
          Seats: <span className="fw-bold">{table.seat}</span>
        </p>
      </div>
    </div>
  );
};

export default TableCard;
