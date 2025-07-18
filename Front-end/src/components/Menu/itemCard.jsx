import axios from "axios";
import { useState, useEffect } from "react";
const itemCard = ({item, onDelete}) => {
    const [curItem, setCurItem] = useState(item);
    const [name, setName] = useState(item.name);
    const [price, setPrice] = useState(item.price);
    const handleEditItem = (event) => { 
        const data = {
            name: name,
            price: price,
        }
        axios.put('http://localhost:3000/item/' + curItem.id, data).then((response) => {
            setCurItem(response.data);
        })
    };
    const handleDeleteItem = () => {
        axios.delete('http://localhost:3000/item/' + curItem.id).then((response) => {
            onDelete(curItem.id);
        })
    }
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
                            <button type="button" className="btn btn-outline-warning btn-sm" data-bs-toggle="modal" data-bs-target={`#editItemModal${curItem.id}`}>
                                <i class="fa-solid fa-pen"></i>
                            </button>
                            <button type="button" className="btn btn-outline-danger btn-sm ms-2" data-bs-toggle="modal" data-bs-target={`#deleteItemModal${curItem.id}`}>
                                <i class="fa-solid fa-trash-can"></i>
                            </button>
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

            {/* Modal delete item */}
            <div
                className="modal fade"
                id={`deleteItemModal${curItem.id}`}
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex="-1"
                aria-labelledby={`deleteItemModalLabel${curItem.id}`}
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content bg-dark">
                        <div className="modal-body">
                            <p className="text-white">
                                Are you sure you want to delete Item {curItem.name}?
                            </p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">
                                Cancel
                            </button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleDeleteItem}>
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default itemCard