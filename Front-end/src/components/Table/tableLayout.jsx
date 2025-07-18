import { Link, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import TableCard from "./tableCard.jsx";
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
            {/* <Routes>
              <Route path="/Table/createTable" />
              <Route path="/Table"  />
              <Route path="/Table/Available"  />
              <Route path="/Table/Occupied"  />
            </Routes> */}
            <div className="row g-3">
              {tables.map((table) => (
                <div
                  key={table.id}
                  className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 d-flex justify-content-center"
                >
                  <TableCard table={table} onStatusChange={(tableId, status) => setTables(tables.map((t) => (t.id === tableId ? { ...t, status } : t)))}/>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal Create Menu*/}
      <div class="modal fade" id={`createTableModal`} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby={`tableModalLabel`} aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content bg-dark">
            <div class="modal-header">
              <h5 className="modal-title text-warning" id="staticBackdropLabel">Create Table</h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="menuNameInput" className="form-label text-white">Table Name</label>
                    <input
                      type="text"
                      id="menuNameInput"
                      className="form-control"
                      placeholder="Enter table name"
                      value = {name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="menuIconInput" className="form-label text-white">Table seat</label>
                    <input
                      type="number"
                      id="menuIconInput"
                      className="form-control"
                      placeholder="Enter table seat"
                      value = {seat}
                      onChange={(e) => setSeat(e.target.value)}
                    />
                  </div>
                </form>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-success" data-bs-dismiss="modal" onClick={handleCreateTable}>Create</button>
            </div>
          </div>
        </div>
      </div>
    </>)
};

export default Table;
