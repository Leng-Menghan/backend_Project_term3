import { Link, Route, Routes } from "react-router-dom";
import CreateOrder from "./CreateOrder/createOrder.jsx";
import OrderLayout from "./orderLayout.jsx";
import UpdateOrder from "./updateOrder.jsx";
const Order = () => {
  return (
    <Routes>
      <Route path="/*" element={<OrderLayout />} />
      <Route path="createOrder" element={<CreateOrder />} />
      <Route path="updateOrder/:id" element={<UpdateOrder />} />
    </Routes>
  );
};


export default Order;
