const deleteTable = ({tableId, tableName, handleDeleteTable}) => {
    return (
        <div
            className="modal fade"
            id={`deleteTableModal${tableId}`}
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex="-1"
            aria-labelledby={`deleteTableModalLabel${tableId}`}
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content bg-dark">
                    <div className="modal-body">
                        <p className="text-white">
                            Are you sure you want to delete table {tableName}?
                        </p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal">
                            Cancel
                        </button>
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleDeleteTable}>
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default deleteTable