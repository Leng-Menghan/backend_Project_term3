const Item = ({itemQty}) => {
    return (
        <div className="card text-light rounded-3 shadow-sm p-3 border-0" style={{ backgroundColor: '#343a40' }}>
                <div className="d-flex">
                    <h5 className="mb-0 fw-bold ">🔢 Item</h5>
                </div>
                <div className="text-warning fw-semibold d-flex align-items-end justify-content-end">
                    <h5 className="mb-0 fw-bold ">{itemQty}</h5>
                </div>
        </div>
    );
}

export default Item