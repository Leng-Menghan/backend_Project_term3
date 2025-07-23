import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import EditTable from './CRUD_model/editTable.jsx';
import DeleteTable from './CRUD_model/deleteTable.jsx';
const TableCard = ({ table, onDelete }) => {
  const [currTable, setCurrTable] = useState(table);
  const [name, setName] = useState(currTable.name);
  const [seat, setSeat] = useState(currTable.seat);
  
  const handleEditTable = () => {
    axios.put(`http://localhost:3000/table/${currTable.id}`, { name, seat })
      .then((response) => {
        setCurrTable(response.data);
      })
  }
  const handleDeleteTable = () => {
    axios.delete(`http://localhost:3000/table/${currTable.id}`)
    onDelete(currTable.id);
  }
  return (
    <div className="card bg-dark text-white p-3" style={{ width: '15rem', borderRadius: '0.5rem' }}>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h6 className="mb-0">
          Table <span className="fw-bold">→ {currTable.name}</span>
        </h6>
        <span className={`badge ${currTable.status === 'Available' ? 'bg-success' : 'bg-danger'} py-1 px-2`}>{currTable.status}</span>
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
      <hr className="my-2" style={{ height: '1px', backgroundColor: 'white', border: 'none' }} />
      <div className="d-flex justify-content-center">
        <button type="button" className="btn btn-outline-success btn-sm" data-bs-toggle="modal" data-bs-target={`#viewTableModal`}>
          <i class="fa-solid fa-eye"></i>
        </button>
        <button type="button" className="btn btn-outline-warning btn-sm ms-2" data-bs-toggle="modal" data-bs-target={`#editTableModal${currTable.id}`}>
          <i class="fa-solid fa-pen"></i>
        </button>
        <button type="button" className="btn btn-outline-danger btn-sm ms-2" data-bs-toggle="modal" data-bs-target={`#deleteTableModal${currTable.id}`}>
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>
      <DeleteTable tableId={currTable.id} tableName = {currTable.name} handleDeleteTable={handleDeleteTable}/>
      <EditTable tableId={currTable.id} tableName={name} tableSeat={seat} setSeat={setSeat} setName={setName} handleEditTable={handleEditTable} fixedName={currTable.name}/>
    </div>
  );
};

export default TableCard;
