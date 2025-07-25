import { orders } from "../../assets/Database.jsx";
import { useState, useEffect } from "react";

const ViewOrder = ({ ordered, totalPrice }) => {
    return (
        <div className="container p-0">
            <div className="card text-light rounded-3 shadow-sm p-3 border-0" style={{ backgroundColor: '#343a40' }}>
                <div className="d-flex align-items-start justify-content-between">
                    {/* Avatar and Name */}
                    <div className="d-flex">
                        <div
                            className="rounded-circle bg-warning text-dark d-flex align-items-center justify-content-center"
                            style={{ width: '48px', height: '48px', fontWeight: 'bold' }}
                        >
                            T{ordered.tableId}
                        </div>
                        <div className="ms-3">
                            <h6 className="mb-1 fw-bold">Table {ordered.tableId}</h6>
                            <div className="text-danger fw-bold"><i class="fa-solid fa-people-group"></i> → {ordered.guest}</div>
                        </div>
                    </div>

                    {/* Status */}
                    <div className="d-flex flex-column align-items-between">
                        <div className={`badge mb-1 ${ordered.status === 'In Progress' ? 'bg-warning' : ordered.status === 'Ready' ? 'bg-primary' : 'bg-success'}`}
                        >
                            {ordered.status === 'In Progress' ? (
                                <i className="fa-solid fa-hourglass-start me-1"></i>
                            ) : ordered.status === 'Ready' ? (
                                <i className="fa-solid fa-check me-1"></i>
                            ) : (
                                <i className="fa-solid fa-check-double me-1"></i>
                            )}
                            {ordered.status}
                        </div>
                        <div
                            className={`badge mb-1 ${ordered.paymentStatus === 'Paid' ? 'bg-success' : 'bg-danger'}`}
                        >
                            {ordered.paymentStatus === 'Paid' ? (
                                <i className="fa-solid fa-check-double me-1"></i>
                            ) : (
                                <i className="fa-solid fa-hourglass-start me-1"></i>
                            )}
                            {ordered.paymentStatus}
                        </div>
                    </div>
                </div>

                <div className="d-flex justify-content-between mt-3 text-warning small">
                    <div>
                        {new Date(ordered.createdAt).toLocaleString('en-US', {
                            month: 'long',
                            day: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true,
                        })}
                    </div>
                    <div>{ordered.items?.length || 0} Items</div>
                </div>

                {/* Divider */}
                <hr className="my-2" style={{ height: '2px', backgroundColor: 'white', border: 'none' }} />
                {ordered.items?.map((item) => (
                    <div key={item.id} className="d-flex justify-content-between align-items-center">
                        <div>{item.name} × {item.orderItem.quantity}</div>
                        <div>$ {item.price * item.orderItem.quantity}</div>
                    </div>
                ))}
                <hr className="my-2" style={{ height: '2px', backgroundColor: 'white', border: 'none' }} />
                {/* Items */}
                {/* Total */}
                <div className="d-flex justify-content-between align-items-center fw-bold">
                    <div>Total</div>
                    <div>$ {totalPrice}</div>
                </div>
            </div>
        </div>
    );
};

export default ViewOrder;
