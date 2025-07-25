import React from 'react';
import ViewOrder from './viewOrder.jsx';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
const OrderCard = ({ order, onDelete, onStatusChange, onPaymentStatusChange }) => {
  const calTotal = () => {
    let total = 0;
    order.items.forEach((item) => {
      total += item.price * item.orderItem.quantity;
    });
    return total;
  }
  const handleStatusChange = (orderId, newStatus) => {
    axios.put(`http://localhost:3000/order/updateStatus/${orderId}`, { status: newStatus })
      .then(() => {
        onStatusChange(orderId, newStatus);
      })
      .catch((error) => {
        console.error('Error updating order status:', error);
      });
  }
  const handlePaymentStatusChange = (orderId, newStatus) => {
    axios.put(`http://localhost:3000/order/updatePaymentStatus/${orderId}`, { paymentStatus: newStatus })
      .then(() => {
        onPaymentStatusChange(orderId, newStatus);
      })
      .catch((error) => {
        console.error('Error updating order status:', error);
      });
  }
  const handleDelete = (orderId) => {
    axios.delete(`http://localhost:3000/order/${orderId}`)
      .then(() => {
        onDelete(orderId);
      })
      .catch((error) => {
        console.error('Error deleting order:', error);
      });
  }
  return (
    <div className="card text-light rounded-3 shadow-sm p-3 border-0" style={{ backgroundColor: '#212529' }}>
      <div className="d-flex align-items-start justify-content-between">
        {/* Avatar and Name */}
        <div className="d-flex">
          <div
            className="rounded-circle bg-warning text-dark d-flex align-items-center justify-content-center"
            style={{ width: '48px', height: '48px', fontWeight: 'bold' }}
          >
            T{order.tableId}
          </div>
          <div className="ms-3">
            <h6 className="mb-1 fw-bold">Table {order.tableId}</h6>
            <div className="text-danger fw-bold"><i class="fa-solid fa-people-group"></i> → {order.guest}</div>
          </div>
        </div>

        {/* Status */}
        <div className="text-end d-flex flex-column">
          <div className={`badge mb-1 ${order.status === 'In Progress' ? 'bg-warning' : order.status === 'Ready' ? 'bg-primary' : 'bg-success'}`}
            onClick={() => handleStatusChange(
              order.id,
              order.status === 'In Progress'
                ? 'Ready'
                : order.status === 'Ready'
                  ? 'Completed'
                  : 'Completed' // or keep it as 'Completed' if already completed
            )}

            style={{ cursor: 'pointer' }}
          >
            {order.status === 'In Progress' ? (
              <i className="fa-solid fa-hourglass-start me-1"></i>
            ) : order.status === 'Ready' ? (
              <i className="fa-solid fa-check me-1"></i>
            ) : (
              <i className="fa-solid fa-check-double me-1"></i>
            )}
            {order.status}
          </div>
          <div
            className={`badge mb-1 ${order.paymentStatus === 'Paid' ? 'bg-success' : 'bg-danger'}`}
            onClick={() => {
              if (order.paymentStatus !== 'Paid') {
                handlePaymentStatusChange(order.id, 'Paid');
              }
            }}
            style={{ cursor: 'pointer' }}
          >
            {order.paymentStatus === 'Paid' ? (
              <i className="fa-solid fa-check-double me-1"></i>
            ) : (
              <i className="fa-solid fa-hourglass-start me-1"></i>
            )}
            {order.paymentStatus}
          </div>

        </div>
      </div>

      <div className="d-flex justify-content-between mt-3 text-warning small">
        <div>
          {new Date(order.createdAt).toLocaleString('en-US', {
            month: 'long',
            day: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          })}
        </div>
        <div>{order.items?.length || 0} Items</div>
      </div>

      {/* Divider */}
      <hr className="my-2" style={{ height: '2px', backgroundColor: 'white', border: 'none' }} />

      {/* Total */}
      <div className="d-flex justify-content-between align-items-center fw-bold">
        <div>Total</div>
        <div>$ {calTotal()?.toFixed(2)}</div>
      </div>

      {/* Buttons */}
      <div className="d-flex justify-content-end gap-2 mt-3">
        <button type="button" className="btn btn-outline-primary btn-sm " data-bs-toggle="modal" data-bs-target={`#orderModal${order.id}`}>
          View
        </button>
        {(order.status !== 'Completed' && order.status !== 'Ready') && (
          <>
            <Link to={`updateOrder/${order.id}`}>
              <button type="button" className="btn btn-outline-warning btn-sm">
                Edit
              </button>
            </Link>
            <button
              type="button"
              className="btn btn-outline-danger btn-sm"
              data-bs-toggle="modal"
              data-bs-target={`#deleteModal${order.id}`}
            >
              Delete
            </button>
          </>
        )}

      </div>

      {/* Modal View Order */}
      <div class="modal fade" id={`orderModal${order.id}`} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby={`orderModalLabel${order.id}`} aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content bg-dark">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">Order Details</h5>
            </div>
            <div class="modal-body">
              <ViewOrder ordered={order} totalPrice={calTotal().toFixed(2)} />
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal delete  */}
      <div class="modal fade" id={`deleteModal${order.id}`} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby={`deleteOrderModalLabel${order.id}`} aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content bg-dark">
            <div class="modal-body">
              <p>Are you sure you want to delete this order?</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
              <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={() => handleDelete(order.id)}>Confrim</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
