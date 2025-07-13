import { useState } from "react";
import { useEffect } from "react";
const Order = ({item, quantity, Totalprice, onDelete}) => {
    const price = item.price;
    const [Qty, setQty] = useState(1);
    const [total, setTotal] = useState(0);
    const minus = () => {
        setQty(Qty - 1)
        if (Qty === 1) {
            setQty(1)
        }
    };
    const plus = () => { setQty(Qty + 1) };
    const handleDelete = () => { 
        setQty(0);
        setTotal(0);
        Totalprice(item.id, 0);
        onDelete(item.id);
     };
    useEffect(() => {
        const totalPrice = Qty * price;
        setTotal(totalPrice);
        Totalprice(item.id, totalPrice);
        quantity(item.id, Qty);
    }, [Qty, price]);
    return (
        <>
            <div className="p-2">
                <div className="d-flex justify-content-between mb-2">
                    <h5>{item.name}</h5>
                    <button className="btn btn-sm btn-outline-danger" onClick={handleDelete}><i class="fa-solid fa-trash-can"></i></button>
                </div>
                <div className="d-flex justify-content-between">
                    <div className="d-flex align-items-center justify-content-center">{total} $</div>
                    <div className="qty bg-dark d-flex rounded">
                        <button className="btn btn-sm text-warning" style={{ width: '40px' }} onClick={minus}><i class="fa-solid fa-minus"></i></button>
                        <div className=" d-flex align-items-center justify-content-center" style={{ minWidth: '40px' }}>
                            <span className="fs-8 fw-bold text-light">{Qty}</span>
                        </div>
                        <button className="btn btn-sm text-warning" style={{ width: '40px' }} onClick={plus}><i class="fa-solid fa-plus"></i></button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Order;