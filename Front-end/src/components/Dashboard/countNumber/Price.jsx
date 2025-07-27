const Price = ({price}) => {
    return (
        <div className="card text-light rounded-3 shadow-sm my-1 p-2 border-0" style={{ backgroundColor: '#dc3545' }}>
                <div className="d-flex">
                    <h5 className="mb-0 fw-bold ">💵 Income</h5>
                </div>
                <div className="text-light fw-semibold d-flex align-items-end justify-content-end">
                    <h5 className="mb-0 fw-bold ">$ {price.toFixed(2)}</h5>
                </div>
        </div>
    );
}

export default Price