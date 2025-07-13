import { Link, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import TableCard from "./tableCard.jsx";
import { tables } from "../../assets/Database.jsx";
const Table = () => {
  const [clickAll, setClickAll] = useState(false);
  const handleClickAll = () => { setClickAll(!clickAll) };
  return (
    <>
      <div className="px-3">
        <div className="p-3">
          <Link to="/Table/createTable">
            <button type="button" className="btn btn-outline-primary me-2">
              <i className="fa-solid fa-square-plus"></i> Create Table
            </button>
          </Link>
          <Link to="/Table">
            <button type="button" className={`btn me-2 ${clickAll ? "btn-primary" : "btn-outline-primary"}`} onClick={handleClickAll}>
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
      <TableCard table={table} />
    </div>
  ))}
</div>


          </div>
        </div>
      </div>
    </>)
};

export default Table;
