const editTable = ({tableId, tableName, tableSeat, setSeat, setName, handleEditTable, fixedName}) => {
    return (
        <div
            className="modal fade"
            id={`editTableModal${tableId}`}
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex="-1"
            aria-labelledby={`editTableModalLabel${tableId}`}
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content bg-dark">
                    <div className="modal-header">
                        <h5 className="modal-title text-warning" id={`editTableModalLabel${tableId}`}>
                            Edit Table {fixedName}
                        </h5>
                        <button
                            type="button"
                            className="btn-close btn-close-white"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        />
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label htmlFor={`editTableNameInput${tableId}`} className="form-label text-white">
                                    Table Name
                                </label>
                                <input
                                    type="text"
                                    id={`editTableNameInput${tableId}`}
                                    className="form-control"
                                    placeholder="Enter table name"
                                    onChange={(e) => setName(e.target.value)}
                                    value={tableName}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor={`editTablePriceInput${tableId}`} className="form-label text-white">
                                    Seat
                                </label>
                                <input
                                    type="text"
                                    id={`editTablePriceInput${tableId}`}
                                    className="form-control"
                                    placeholder="Enter table price"
                                    onChange={(e) => setSeat(e.target.value)}
                                    value={tableSeat}
                                />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={handleEditTable}>
                            Update
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default editTable