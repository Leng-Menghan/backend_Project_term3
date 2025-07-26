import React from 'react';
import ViewOrder from './viewOrder.jsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
const OrderCard = ({ order, onDelete, onStatusChange, onPaymentStatusChange }) => {
    const token = localStorage.getItem('token');
    const header = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const navigate = useNavigate();
  const calTotal = () => {
    let total = 0;
    order.items.forEach((item) => {
      total += item.price * item.orderItem.quantity;
    });
    return total;
  }
  const handleStatusChange = (orderId, newStatus) => {
    axios.put(`http://localhost:3000/order/updateStatus/${orderId}`, { status: newStatus }, header)
      .then(() => {
        onStatusChange(orderId, newStatus);
      })
      .catch((error) => {
        console.error('Error updating order status:', error);
      });
  }
  const handlePaymentStatusChange = (orderId, newStatus) => {
    axios.put(`http://localhost:3000/order/updatePaymentStatus/${orderId}`, { paymentStatus: newStatus }, header)
      .then(() => {
        onPaymentStatusChange(orderId, newStatus);
      })
      .catch((error) => {
        console.error('Error updating order status:', error);
      });
  }
const handleDelete = (id) => {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
  }).then((result) => {
    if (result.isConfirmed) {
      axios.delete(`http://localhost:3000/order/${id}`, header).then(() => {
        onDelete(id);
      });
      Swal.fire('Deleted!', 'Your order has been deleted.', 'success');
    }
  });
};
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
          <button type="button" className="btn btn-outline-warning btn-sm" onClick={() => navigate(`/Order/updateOrder/${order.id}`)}>
            Edit
          </button>

          <button
            type="button"
            className="btn btn-outline-danger btn-sm"
            onClick={() => handleDelete(order.id)}
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

  </div>
);
};

export default OrderCard;
