import React from 'react';
import ItemCard from './itemCard.jsx';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useAuth } from '../../context/authContext.jsx';
const MenuCard = ({ menu, onDelete }) => {
    const { auth } = useAuth();
      const token = localStorage.getItem('token');
      const header = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
    // Item
    const [items, setItems] = useState([]);
    const [price, setPrice] = useState(0);
    const [name, setName] = useState('');
    // Menu
    const [curMenu, setCurMenu] = useState(menu);
    const [category, setCategory] = useState(menu.category);
    const [icon, setIcon] = useState(menu.icon);
    useEffect(() => {
        axios.get('http://localhost:3000/item/menu/' + curMenu.id, header).then((response) => {
            setItems(response.data);
        });
    }, [])
    const handleCreateItem = (event) => {
        event.preventDefault();
        const data = {
            name: name,
            price: price,
            menuId: curMenu.id
        }
        axios.post('http://localhost:3000/item/create', data, header).then((response) => {
            setItems([...items, response.data]);
        })
        setName('');
        setPrice(0);
    }
    const handleUpdateMenu = (event) => {
        event.preventDefault();
        const data = {
            category: category,
            icon: icon
        }
        axios.put('http://localhost:3000/menu/' + curMenu.id, data, header).then((response) => {
            setCurMenu(response.data);
        })
    }

    const handleDeleteMenu = () => {
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
                axios.delete('http://localhost:3000/menu/' + curMenu.id, header).then((response) => {
                    onDelete(curMenu.id);
                })
                Swal.fire('Deleted!', 'Your menu has been deleted.', 'success');
            }
        });
    };
    return (
        <div className="card bg-dark text-warning p-3 w-100" >
            <div className='p-3 rounded' style={{ backgroundColor: '#343a40' }}>
                <div className="d-flex align-items-center justify-content-between">
                    <h3>{curMenu.icon} {curMenu.category}</h3>
                    <div className="d-flex">
                        {auth?.role === 'Admin' && (
                            <>
                               <button type="button" className="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target={`#addItemModal${curMenu.id}`}>
                            <i class="fa-solid fa-square-plus" style={{ marginRight: '8px' }}></i>Add item
                        </button>
                        <button type="button" className="btn btn-outline-warning btn-sm ms-2" data-bs-toggle="modal" data-bs-target={`#editMenuModal${curMenu.id}`}>
                            <i class="fa-solid fa-pen"></i>
                        </button>
                        <button type="button" className="btn btn-outline-danger btn-sm ms-2" onClick={handleDeleteMenu}>
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                            </>
                        )}
                    </div>
                </div>
                <hr className="my-2" style={{ height: '1px', backgroundColor: 'white', border: 'none' }} />
                <div className="row">
                    {items.map((item) => (
                        <div className="col-2">
                            <ItemCard key={item.id} item={item} onDelete={(id) => setItems(items.filter((item) => item.id !== id))} />
                        </div>
                    ))}
                </div>
            </div>
            {/* Modal Add Item */}
            <div className="modal fade" id={`addItemModal${curMenu.id}`} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby={`addItemModalLabel${curMenu.id}`} aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content bg-dark">
                        <div className="modal-header">
                            <h5 className="modal-title text-warning" id={`addItemModalLabel${curMenu.id}`}>Add Item to " Menu {curMenu.category} "</h5>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor={`itemNameInput${curMenu.id}`} className="form-label text-white">Item Name</label>
                                    <input type="text" id={`itemNameInput${curMenu.id}`} className="form-control" placeholder="Enter item name" onChange={(e) => setName(e.target.value)} value={name} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor={`itemPriceInput${curMenu.id}`} className="form-label text-white">Price</label>
                                    <input type="number" id={`itemPriceInput${curMenu.id}`} className="form-control" placeholder="Enter item price" onChange={(e) => setPrice(e.target.value)} value={price} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={handleCreateItem}>Add Item</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Edit Menu */}
            <div className="modal fade" id={`editMenuModal${curMenu.id}`} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby={`editMenuModalLabel${curMenu.id}`} aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content bg-dark">
                        <div className="modal-header">
                            <h5 className="modal-title text-warning" id={`editMenuModalLabel${curMenu.id}`}>Edit " Menu {curMenu.category} "</h5>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor={`editMenuNameInput${curMenu.id}`} className="form-label text-white" >Menu Name</label>
                                    <input type="text" id={`editMenuNameInput${curMenu.id}`} className="form-control" placeholder="Enter menu name" value={category} onChange={(e) => setCategory(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor={`editMenuIconInput${curMenu.id}`} className="form-label text-white">Icon</label>
                                    <input type="text" id={`editMenuIconInput${curMenu.id}`} className="form-control" placeholder="Enter menu icon" value={icon} onChange={(e) => setIcon(e.target.value)} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={handleUpdateMenu}>Update</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default MenuCard;
