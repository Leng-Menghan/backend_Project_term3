import { Link, Route, Routes, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import ShowTables from "./ShowTable.jsx";
import CreateTable from "./CRUD_model/createTable.jsx";
import axios from "axios";
import { useAuth } from "../../context/authContext.jsx";
import Swal from "sweetalert2";
const Table = () => {
  const location = useLocation();
  const { auth } = useAuth();
  const token = localStorage.getItem("token");
  const header = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const [tables, setTables] = useState([]);
  const [name, setName] = useState("");
  const [seat, setSeat] = useState(0);
  const fetchTables = async () => {
    await axios.get("http://localhost:3000/table/getTables", header)
      .then((response) => {
        setTables(response.data);
      });
  }
  useEffect(() => {
    fetchTables();
  }, [location.pathname]);
  const handleCreateTable = (event) => {
    event.preventDefault();
    const data = {
      status: "Available",
      name: name,
      seat: seat,
    };
    axios.post("http://localhost:3000/table/create", data, header)
      .then((response) => {
        setTables([...tables, response.data]);
      })
      .catch((error) => {
        Swal.fire({
          icon: 'warning',
          title: 'Create Table Failed',
          text: error.response.data.error,
          confirmButtonText: 'OK'
        });
      });
    setName("");
    setSeat(0);
  }
  return (
    <>
      <div className="px-3">
        <div className="p-3">
          {auth?.role === 'Admin' &&
            (
              <>
                <button type="button" className="btn btn-outline-primary " data-bs-toggle="modal" data-bs-target={`#createTableModal`}>
                  <i className="fa-solid fa-square-plus"></i> Create Table
                </button>
              </>
            )
          }
          <Link to="/table">
            <button type="button" className={`btn me-2 btn-outline-primary ms-2`}>
              <i class="fa-solid fa-border-all"></i> All
            </button>
          </Link>
          <Link to="/table/occupied">
            <button type="button" className="btn btn-outline-danger me-2">
              <i className="fa-solid fa-hourglass-start"></i> Occupied
            </button>
          </Link>
          <Link to="/table/available">
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
                onDelete={(id) => { setTables(tables.filter((table) => table.id !== id)) }}
                onEdit={(table) => { setTables(tables.map((t) => t.id === table.id ? table : t)) }} />} />
              <Route path="available" element={<ShowTables 
                tables={tables.filter((table) => table.status === "Available")} 
                onDelete={(id) => { setTables(tables.filter((table) => table.id !== id)) }}
                onEdit={(table) => { setTables(tables.map((t) => t.id === table.id ? table : t)) }}
                />} />
              <Route path="occupied" element={<ShowTables 
                tables={tables.filter((table) => table.status === "Occupied")} 
                onDelete={(id) => { setTables(tables.filter((table) => table.id !== id)) }}
                onEdit={(table) => { setTables(tables.map((t) => t.id === table.id ? table : t)) }}/>} />
            </Routes>
          </div>
        </div>
      </div>
      <CreateTable handleCreateTable={handleCreateTable} inputName={name} setName={setName} inputSeat={seat} setSeat={setSeat} />
    </>)
};

export default Table;
