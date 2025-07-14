import Menu from './CreateOrder/menu.jsx';
import Item from './CreateOrder/item.jsx';
import Payment from './CreateOrder/payment.jsx';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const handleBack = () => {
    window.history.back();
}

const UpdateOrder = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [orderedItems, setOrderedItems] = useState([]);
    const [selectedMenu, setSelectedMenu] = useState([]);
// For create Order
    const [itemsList, setItemsList] = useState([]);
    const [guest, setGuest] = useState(0);
    const [tableId, setTableId] = useState(0);
// For get
    const [tables, setTables] = useState([]);
    const [menus, setMenus] = useState([]);
    const [items, setItems] = useState([]);
    const handleUpdateOrder = async () => {
        const data = {
            guest: guest,
            tableId: tableId,
            items: itemsList
        };
        try {
            const response = await axios.put(`http://localhost:3000/order/${id}`, data);
            console.log('Order created:', response.data);
            navigate('/order');
            // Optional: reset form or navigate
        } catch (error) {
            console.error('Create order error:', error);
        }
    };
    useEffect(() => {
        axios.get(`http://localhost:3000/order/${id}`)
            .then(response => {
            setOrderedItems(
                response.data.items.map(item => ({...item,quantity: item.orderItem.quantity }))
            );
            setGuest(response.data.guest);
            setTableId(response.data.tableId);
        })
        axios.get('http://localhost:3000/table/getTables')
            .then(response => {
            setTables(response.data);
        })
        axios.get('http://localhost:3000/menu/getMenus')
            .then(response => {
            setMenus(response.data);
        })
        axios.get('http://localhost:3000/item/getItems')
            .then(response => {
            setItems(response.data);
        })
    }, []);
    const handleAddToOrder = (item) => {
        const exists = orderedItems.find(order => order.id === item.id);
        if (!exists) {
            setOrderedItems([...orderedItems, item]);
        }
    };

    const filteredItems = selectedMenu ? items.filter(item => item.menuId === selectedMenu.id) : [];

    return (
        <div className="container-fluid p-3">
            {/* Top Bar */}
            <div className="d-flex px-3">
                <div className="me-3">
                    <button type="button" className="btn btn-outline-primary" onClick={handleBack}>
                        <i className="fa-solid fa-arrow-left"></i> Back
                    </button>
                </div>
                <form className="d-flex bg-success rounded p-2">
                    <div className="mx-3 d-flex align-items-center" style={{ width: '300px' }}>
                        <select className="form-select" onChange={(e) => setTableId(e.target.value)} value={tableId}>
                            <option selected disabled hidden>Select Table</option>
                            {tables.map((table) => (
                                <option key={table.id} value={table.id} className={table.status === 'Available' ? 'text-success' : 'text-warning'}>
                                    {table.name} - Available seat: {table.seat}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mx-3 d-flex align-items-center">
                        <input type="number" className="form-control" placeholder="Number of Guest" onChange={(e) => setGuest(e.target.value)} value={guest}/>
                    </div>
                </form>
            </div>

            {/* Content */}
            <div className="row mt-3 p-3">
                {/* Left Sidebar (Order Summary) */}
                <div className="col-3">
                    <Payment
                        ordered={orderedItems}
                        onDelete={(id) => setOrderedItems(prev => prev.filter(item => item.id !== id))}
                        sendItemsList={setItemsList}
                    />
                    <button onClick={handleUpdateOrder} className="btn btn-success w-100 mt-3">
                        <i className="fa-solid fa-arrow-right"> Update</i>
                    </button>
                </div>

                {/* Right Content (Menu + Items) */}
                <div className="col-9">
                    <div className="p-3 rounded" style={{ backgroundColor: '#212529' }}>
                        <div className="p-3 shadow-sm pt-0">
                            <div className="text-center">
                                <h2 className="mb-4 text-light mt-0">Menu</h2>
                            </div>
                            <div className="container-fluid p-0">
                                <div className="row g-3">
                                    {menus.map((menu, index) => (
                                        <div
                                            className="col-3"
                                            key={index}
                                            onClick={() => setSelectedMenu(menu)}
                                        >
                                            <div className={`menu-item rounded p-2 ${selectedMenu?.id === menu.id ? 'bg-warning text-white' : 'bg-light'}`}>
                                                <Menu menu={menu} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <hr className="my-2" style={{ height: '1px', backgroundColor: 'white', border: 'none' }} />

                        <div className="p-3">
                            <div className="container-fluid p-0">
                                <div className="row g-3">
                                    {filteredItems.map((item, index) => (
                                        <div
                                            className="col-3"
                                            key={index}
                                            onClick={() => handleAddToOrder(item)}
                                        >
                                            <div className={`rounded p-1 ${orderedItems.find(order => order.id === item.id) ? 'bg-warning text-warning' : ''}`}>
                                                <Item item={item} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateOrder;
