import MenuCard from "./menuCard.jsx";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/authContext.jsx";
import Swal from 'sweetalert2';
const Menu = () => {
    const { auth } = useAuth();
    const token = localStorage.getItem('token');
    const header = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const [menus, setMenus] = useState([]);
    const [category, setCategory] = useState('');
    const [icon, setIcon] = useState('');
    useEffect(() => {
        axios.get('http://localhost:3000/menu/getMenus', header).then((response) => {
            const sorted = response.data.sort((a, b) => b.id - a.id); 
            setMenus(sorted);
        });
    }, []);
    const handleCreateMenu = (event) => {
        event.preventDefault();
        const data = {
            category: category,
            icon: icon
        };
        axios.post('http://localhost:3000/menu/create', data, header)
            .then((response) => {
                setMenus([response.data, ...menus]);
            })
            .catch((error) => {
                Swal.fire({
                    icon: 'warning',
                    title: 'Create Menu Failed',
                    text: error.response.data.error,
                    confirmButtonText: 'OK'
                });
            });
        setCategory('');
        setIcon('');
    }
    return (
        <>
            <div className="px-3">
                {auth?.role === 'Admin' &&
                    <>
                        <div className="p-3">
                            <button type="button" className="btn btn-outline-primary " data-bs-toggle="modal" data-bs-target={`#createMenuModal`}>
                                <i className="fa-solid fa-square-plus"></i> Create Menu
                            </button>
                        </div>
                    </>
                }
                <div className="container-fluid d-flex flex-column p-0">
                    <div className="flex-grow-1 m-0 bg-gray-100 p-3">
                        <div className="row g-3">
                            {menus.map((menu) => (
                                <div
                                    key={menu.id}
                                    className="col-lg-12 d-flex justify-content-center"
                                >
                                    <MenuCard menu={menu} onDelete={(id) => setMenus(menus.filter(menu => menu.id !== id))} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal Create Menu*/}
            <div class="modal fade" id={`createMenuModal`} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby={`orderModalLabel`} aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content bg-dark">
                        <div class="modal-header">
                            <h5 className="modal-title text-warning" id="staticBackdropLabel">Create Menu</h5>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="menuNameInput" className="form-label text-white">Menu Name</label>
                                        <input
                                            type="text"
                                            id="menuNameInput"
                                            className="form-control"
                                            placeholder="Enter menu name"
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="menuIconInput" className="form-label text-white">Icon</label>
                                        <input
                                            type="text"
                                            id="menuIconInput"
                                            className="form-control"
                                            placeholder="Enter menu icon"
                                            value={icon}
                                            onChange={(e) => setIcon(e.target.value)}    
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-success" data-bs-dismiss="modal" onClick={handleCreateMenu}>Create</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Menu;
