import Order from './order.jsx';
import { useState, useEffect } from 'react';
// Input : ordered
// Output : onDelete(id), sendItemsList(itemsList)
const payment = ({ ordered, onDelete, sendItemsList }) => {
    const [itemsList, setItemsList] = useState([]);

    const handleDelete = (id) => {
        onDelete(id);
        console.log('Deleting item with id:', id);
    }
    const handleItemInfo = (id, quantity, total) => {
        setItemsList(prev => {
            const exists = prev.find(item => item.id === id);
            if (exists) {
                return prev.map(item =>
                    item.id === id ? { ...item, quantity, total } : item
                );
            } else {
                return [...prev, { id, quantity, total }];
            }
        });
    }
    const grandTotal = itemsList.reduce((total, item) => total + (item.total || 0), 0);
    useEffect(() => {
        sendItemsList(itemsList.filter(item => item.quantity > 0));
    }, [itemsList]);
    return (
        <div className="container rounded p-3 text-light" style={{ backgroundColor: '#212529' }} >
            <h5>Order Summary</h5>
            <div className="container-fluid p-0 mt-3 no-scrollbar" style={{ overflowY: 'auto', maxHeight: '350px' }}>
                {ordered.map((order) => (
                    <div className="rounded p-2 my-2" key={order.id} style={{ backgroundColor: '#343a40' }}>
                        <Order
                            item={order}
                            itemStatus={(id, newQty, newTotal) => handleItemInfo(id, newQty, newTotal)}
                            onDelete={(id) => handleDelete(id)} />
                    </div>
                ))}
            </div>
            <div className="d-flex justify-content-between align-items-center mt-4">
                <h4 className="me-auto">Total: {grandTotal.toFixed(2)} $</h4>
                <button className="btn btn-primary">Payment</button>
            </div>
        </div>
    );
}

export default payment;