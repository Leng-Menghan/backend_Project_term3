import OrderCard from "./orderCard.jsx";

const ShowOrders = ({ ordered, onDelete, onStatusChange, onPaymentStatusChange}) => {
  return (
    <div className="row g-4">
      {ordered.map(order => (
        <div className="col-3" key={order.id}>
          <OrderCard order={order} onDelete={onDelete} onStatusChange={onStatusChange} onPaymentStatusChange={onPaymentStatusChange}/>
        </div>
      ))}
    </div>
  );
};

export default ShowOrders;