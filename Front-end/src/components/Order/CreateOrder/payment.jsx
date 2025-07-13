import { menus, items as originalItems } from '../../../assets/Database.jsx';
import Order from './order.jsx';
import { useState, useEffect } from 'react';

const payment = ({ ordered, onDelete, onItemsChange }) => {
    const [totals, setTotals] = useState({});
    const [itemsList, setItemsList] = useState([]);
    const orders = Object.values(ordered);
    const handleTotalUpdate = (id, newTotal) => {
        setTotals(prev => ({ ...prev, [id]: newTotal }));
    };
    const grandTotal = Object.values(totals).reduce((a, b) => a + b, 0);
    const handleDelete = (id) => {
        onDelete(id);
    }
    const handleItemInfo = (id, quantity) => {
        setItemsList(prev => {
        const exists = prev.find(item => item.id === id);
        if (exists) {
            return prev.map(item => 
                item.id === id ? { ...item, quantity } : item
            );
        } else {
            return [...prev, { id, quantity }];
        }
    })}
    useEffect(() => {
        if (typeof onItemsChange === 'function') {
            onItemsChange(itemsList);
        }
    }, [itemsList, onItemsChange]);
    return (
        <div className="container rounded p-3 text-light" style={{ backgroundColor: '#212529'}} >
            <h5>Order Summary</h5>
            <div className="container-fluid p-0 mt-3 no-scrollbar" style={{overflowY: 'auto', maxHeight: '350px'}}>
                {orders.map((order) => (
                    <div className="rounded p-2 my-2" key={order.id} style={{ backgroundColor: '#343a40' }}>
                        <Order 
                            item={order} 
                            quantity={(id, newQty) => handleItemInfo(id, newQty)}
                            Totalprice={(id, newTotal) => handleTotalUpdate(id, newTotal)} 
                            onDelete={(id) => handleDelete(id)}/>
                    </div>
                ))}
            </div>
            <div className="d-flex justify-content-between align-items-center mt-4">
                <h4 className="me-auto">Total: {grandTotal} $</h4>
                <button className="btn btn-primary">Payment</button>
            </div>
        </div>
    );
}

export default payment;