import axios from "axios";
import Swal from 'sweetalert2';
import { useState, useEffect } from "react";
import { useAuth } from "../../context/authContext";
const itemCard = ({ item, onDelete }) => {
    const { auth } = useAuth();
    const token = localStorage.getItem('token');
    const header = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const [curItem, setCurItem] = useState(item);
    const [name, setName] = useState(item.name);
    const [price, setPrice] = useState(item.price);
    const handleEditItem = (event) => {
        const data = {
            name: name,
            price: price,
        }
        axios.put('http://localhost:3000/item/' + curItem.id, data, header)
        .then((response) => {
            setCurItem(response.data);
        })
        setName('');
    };
    const handleDeleteItem = () => {
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
                axios.delete('http://localhost:3000/item/' + curItem.id, header).then((response) => {
                    onDelete(curItem.id);
                })
                Swal.fire('Deleted!', 'Your menu has been deleted.', 'success');
            }
        });
    };
    return (
        <>
            <div
                className="card text-light rounded-3 shadow-sm p-3 border-0 bg-dark"
                style={{ cursor: 'pointer' }}
            >
                <div className="d-flex align-items-center justify-content-between flex-column">
                    <div className="d-flex justify-content-start w-100">
                        <h5 className="mb-0 fw-bold">{curItem.name}</h5>
                    </div>
                    <div className="d-flex justify-content-between gap-2 mt-3 w-100">
                        <div className="text-warning fw-semibold"> $ {curItem.price}</div>
                        <div>
                            {auth.role === 'Admin' && (
                                <>
                                    <button type="button" className="btn btn-outline-warning btn-sm" data-bs-toggle="modal" data-bs-target={`#editItemModal${curItem.id}`}>
                                        <i class="fa-solid fa-pen"></i>
                                    </button>
                                    <button type="button" className="btn btn-outline-danger btn-sm ms-2" onClick={() => handleDeleteItem()}>
                                        <i class="fa-solid fa-trash-can"></i>
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>


            {/* Modal edit item */}
            <div
                className="modal fade"
                id={`editItemModal${curItem.id}`}
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex="-1"
                aria-labelledby={`editItemModalLabel${curItem.id}`}
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content bg-dark">
                        <div className="modal-header">
                            <h5 className="modal-title text-warning" id={`editItemModalLabel${curItem.id}`}>
                                Edit Item {curItem.name}
                            </h5>
                            <button
                                type="button"
                                className="btn-close btn-close-white"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor={`editItemNameInput${curItem.id}`} className="form-label text-white">
                                        Item Name
                                    </label>
                                    <input
                                        type="text"
                                        id={`editItemNameInput${curItem.id}`}
                                        className="form-control"
                                        placeholder="Enter item name"
                                        onChange={(e) => setName(e.target.value)}
                                        value={name}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor={`editItemPriceInput${curItem.id}`} className="form-label text-white">
                                        Price
                                    </label>
                                    <input
                                        type="text"
                                        id={`editItemPriceInput${curItem.id}`}
                                        className="form-control"
                                        placeholder="Enter item price"
                                        onChange={(e) => setPrice(e.target.value)}
                                        value={price}
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={handleEditItem}>
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default itemCard