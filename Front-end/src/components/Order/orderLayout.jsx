import { Link, Route, Routes } from "react-router-dom";
import ShowOrders from './showOrder.jsx';
import OrderTable from '../AllOrder/OrderTable.jsx';
import axios from "axios";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/authContext";
function toLocalDate(dateInput) {
  const date = new Date(dateInput);
  return date.toLocaleDateString('en-CA');
}
const OrderLayout = () => {
    const { auth } = useAuth();
  const token = localStorage.getItem('token');
  const header = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const today = toLocalDate(new Date());
    axios.get('http://localhost:3000/order/getOrders', header)
      .then(response => {
        const filtered = response.data.filter(order => {
          const orderDate = toLocalDate(order.createdAt);
          return orderDate === today;
        }
        ) || [];
        // Sort descending by createdAt
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setOrders(filtered);
      })
  }, []);


  return (
    <>
      <div className="px-3">
        {auth?.role === 'Admin' ?
          (
            <>
              <div className="p-3">
                <OrderTable />
              </div>
            </>
          )
          :
          (
            <>
              <div className="p-3">
                <Link to="/Order/createOrder">
                  <button type="button" className="btn btn-outline-primary me-2">
                    <i className="fa-solid fa-square-plus"></i> Create Order
                  </button>
                </Link>
                <Link to="/Order">
                  <button type="button" className="btn btn-outline-primary me-2">
                    <i class="fa-solid fa-border-all"></i> All
                  </button>
                </Link>
                <Link to="/Order/inProgress">
                  <button type="button" className="btn btn-outline-warning me-2">
                    <i className="fa-solid fa-hourglass-start"></i> In Progress
                  </button>
                </Link>
                <Link to="/Order/ready">
                  <button type="button" className="btn btn-outline-primary me-2">
                    <i class="fa-solid fa-check"></i> Ready
                  </button>
                </Link>
                <Link to="/Order/completed">
                  <button type="button" className="btn btn-outline-success me-2">
                    <i className="fa-solid fa-check-double"></i> Completed
                  </button>
                </Link>
              </div>
              <div className="container-fluid d-flex flex-column p-0">
                <div className="flex-grow-1 m-0 bg-gray-100 p-3">
                  <Routes>
                    <Route index element={<ShowOrders
                      ordered={orders}
                      onDelete={id => setOrders(orders.filter(order => order.id !== id))}
                      onStatusChange={(id, newStatus) => setOrders(orders.map(order => order.id === id ? { ...order, status: newStatus } : order))}
                      onPaymentStatusChange={(id, newStatus) => setOrders(orders.map(order => order.id === id ? { ...order, paymentStatus: newStatus } : order))}
                    />} />
                    <Route path="/inProgress" element={<ShowOrders
                      ordered={orders.filter(order => order.status === 'In Progress')}
                      onDelete={id => setOrders(orders.filter(order => order.id !== id))}
                      onStatusChange={(id, newStatus) => setOrders(orders.map(order => order.id === id ? { ...order, status: newStatus } : order))}
                      onPaymentStatusChange={(id, newStatus) => setOrders(orders.map(order => order.id === id ? { ...order, paymentStatus: newStatus } : order))} />} />
                    <Route path="/ready" element={<ShowOrders
                      ordered={orders.filter(order => order.status === 'Ready')}
                      onDelete={id => setOrders(orders.filter(order => order.id !== id))}
                      onStatusChange={(id, newStatus) => setOrders(orders.map(order => order.id === id ? { ...order, status: newStatus } : order))}
                      onPaymentStatusChange={(id, newStatus) => setOrders(orders.map(order => order.id === id ? { ...order, paymentStatus: newStatus } : order))} />} />
                    <Route path="/completed" element={<ShowOrders
                      ordered={orders.filter(order => order.status === 'Completed')}
                      onDelete={id => setOrders(orders.filter(order => order.id !== id))}
                      onStatusChange={(id, newStatus) => setOrders(orders.map(order => order.id === id ? { ...order, status: newStatus } : order))}
                      onPaymentStatusChange={(id, newStatus) => setOrders(orders.map(order => order.id === id ? { ...order, paymentStatus: newStatus } : order))} />} />
                  </Routes>
                </div>
              </div>
            </>
          )
        }
      </div>
    </>)
};

export default OrderLayout; 
