const Order = ({orderQty}) => {
    return (
        <div className="card text-light rounded-3 shadow-sm my-1 p-2 border-0" style={{ backgroundColor: '#fd7e14' }}>
                <div className="d-flex">
                    <h5 className="mb-0 fw-bold ">🧾 Order</h5>
                </div>
                <div className="text-light fw-semibold d-flex align-items-end justify-content-end">
                    <h5 className="mb-0 fw-bold ">× {orderQty}</h5>
                </div>
        </div>
    );
}

export default Order