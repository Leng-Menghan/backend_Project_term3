const createTableModel = ({inputName, inputSeat, handleCreateTable, setSeat, setName}) => {
    return (
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
                      value={inputName}
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
                      value={inputSeat}
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
    )
}

export default createTableModel