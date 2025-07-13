import { useState } from "react";
const Item = ({ item }) => {
    const [Qty, setQty] = useState(0);
    const minus = () => {
        setQty(Qty - 1)
        if (Qty === 0) {
            setQty(0)
        }
    };
    const plus = () => { setQty(Qty + 1) };
    return (
        <div
      className="card text-light rounded-3 shadow-sm p-3 border-0"
      style={{ backgroundColor: '#343a40', cursor: 'pointer' }}
    >
      <div className="d-flex align-items-center justify-content-between">
        {/* Item Name */}
        <h5 className="mb-0 fw-bold">{item.name}</h5>

        {/* Price */}
        <div className="text-warning fw-semibold">
          ${item.price}
        </div>
      </div>
    </div>
    );
};

export default Item;
