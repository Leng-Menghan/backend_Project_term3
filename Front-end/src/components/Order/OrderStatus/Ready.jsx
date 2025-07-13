import OrderCard from "../orderCard.jsx";

const Ready = ({ordered, onDelete, onStatusChange}) => {
    return (
        <div className="row g-4">
            {ordered.map(order => (
                <div className="col-3" key={order.id}>
                    <OrderCard order={order} onDelete={onDelete} onStatusChange={onStatusChange}/>
                </div>
            ))}
        </div>
    );
};

export default Ready;
