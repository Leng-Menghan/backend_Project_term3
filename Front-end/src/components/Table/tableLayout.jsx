import { Link, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import ShowTables from "./ShowTable.jsx";
import CreateTable from "./CRUD_model/createTable.jsx";
import axios from "axios";
const Table = () => {
  const [tables, setTables] = useState([]);
  const [name, setName] = useState("");
  const [seat, setSeat] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:3000/table/getTables").then((response) => {
      setTables(response.data);
    });
  }, []);
  const handleCreateTable = (event) => {
    event.preventDefault();
    const data = {
      status: "Available",
      name: name,
      seat: seat,
    };
    axios.post("http://localhost:3000/table/create", data).then((response) => {
      setTables([...tables, response.data]);
    });
    setName("");
    setSeat(0);
  }
  return (
    <>
      <div className="px-3">
        <div className="p-3">
          <button type="button" className="btn btn-outline-primary " data-bs-toggle="modal" data-bs-target={`#createTableModal`}>
            <i className="fa-solid fa-square-plus"></i> Create Table
          </button>
          <Link to="/Table">
            <button type="button" className={`btn me-2 btn-outline-primary ms-2`}>
              <i class="fa-solid fa-border-all"></i> All
            </button>
          </Link>
          <Link to="/Table/Occupied">
            <button type="button" className="btn btn-outline-warning me-2">
              <i className="fa-solid fa-hourglass-start"></i> Occupied
            </button>
          </Link>
          <Link to="/Table/Available">
            <button type="button" className="btn btn-outline-success me-2">
              <i className="fa-solid fa-check-double"></i> Available
            </button>
          </Link>
        </div>
        <div className="container-fluid d-flex flex-column p-0">
          <div className="flex-grow-1 m-0 bg-gray-100 p-3">
            <Routes>
              <Route index element={<ShowTables 
                tables={tables} 
                onDelete = {(id) => {setTables(tables.filter((table) => table.id !== id))}}
                onEdit = {(table) => {setTables(tables.map((t) => t.id === table.id ? table : t))}}/>} />
              <Route path="Available" element={<ShowTables tables={tables.filter((table) => table.status === "Available")} />} />
              <Route path="Occupied" element={<ShowTables tables={tables.filter((table) => table.status === "Occupied")} />} />
            </Routes>
          </div>
        </div>
      </div>
      <CreateTable handleCreateTable={handleCreateTable} inputName={name} setName={setName} inputSeat={seat} setSeat={setSeat} />
    </>)
};

export default Table;
