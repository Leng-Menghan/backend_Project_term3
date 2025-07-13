import { Link, Route, Routes } from "react-router-dom";
import Inprogress from './OrderStatus/Inprogress.jsx';
import Ready from "./OrderStatus/Ready.jsx";
import OrderCard from "./orderCard.jsx";
// import {orders} from "../../assets/Database.jsx";
import axios from "axios";
import { useState, useEffect } from "react";
const OrderLayout = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3000/order/getOrders')
      .then(response => {
        setOrders(response.data || []);
      })
  }, []);
  return (
    <>
      <div className="px-3">
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
            <button type="button" className="btn btn-outline-success me-2">
              <i className="fa-solid fa-check-double"></i> Ready
            </button>
          </Link>
        </div>
        <div className="container-fluid d-flex flex-column p-0">
          <div className="flex-grow-1 m-0 bg-gray-100 p-3">
            <Routes>
              <Route index element={
                <div className="row g-4">
                  {orders.map(order => (
                    <div className="col-3" key={order.id}>
                      <OrderCard order={order} onDelete={id => setOrders(orders.filter(order => order.id !== id))} onStatusChange={(id, newStatus) => setOrders(orders.map(order => order.id === id ? { ...order, status: newStatus } : order))}/>
                    </div>
                  ))}

                </div>
              } />
              <Route path="/inProgress" element={<Inprogress ordered={orders.filter(order => order.status === 'In Progress')} onDelete={id => setOrders(orders.filter(order => order.id !== id))} onStatusChange={(id, newStatus) => setOrders(orders.map(order => order.id === id ? { ...order, status: newStatus } : order))}/>}/>
              <Route path="/ready" element={<Ready ordered={orders.filter(order => order.status === 'Ready')} onDelete={id => setOrders(orders.filter(order => order.id !== id))} onStatusChange={(id, newStatus) => setOrders(orders.map(order => order.id === id ? { ...order, status: newStatus } : order))}/>} />
            </Routes>
          </div>
        </div>
      </div>
    </>)
};

export default OrderLayout; 
