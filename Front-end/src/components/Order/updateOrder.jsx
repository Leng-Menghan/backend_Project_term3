import Menu from './CreateOrder/menu.jsx';
import Item from './CreateOrder/item.jsx';
import Payment from './CreateOrder/payment.jsx';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
const handleBack = () => {
    window.history.back();
}
function toLocalDate(dateInput) {
    const date = new Date(dateInput);
    return date.toLocaleDateString('en-CA');
}
const UpdateOrder = () => {
    const token = localStorage.getItem('token');
    const header = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const navigate = useNavigate();
    const { id } = useParams();
    const Today = toLocalDate(new Date());

    const [orderedItems, setOrderedItems] = useState([]);
    const [selectedMenu, setSelectedMenu] = useState([]);
    // For create Order
    const [itemsList, setItemsList] = useState([]);
    const [guest, setGuest] = useState(0);
    const [tableId, setTableId] = useState(0);
    const [amount, setAmount] = useState(0);
    const [paymentStatus, setPaymentStatus] = useState('');
    // For get
    const [oldGuest, setOldGuest] = useState(0);
    const [tables, setTables] = useState([]);
    const [menus, setMenus] = useState([]);
    const [tableSeats, setTableSeats] = useState([]);
    const [items, setItems] = useState([]);
    const handleUpdateOrder = async () => {
        const data = {
            guest: guest,
            tableId: tableId,
            items: itemsList,
            amount: amount,
            paymentStatus: paymentStatus
        };
        if (data.items.length === 0) {
            Swal.fire({
                icon: 'warning',
                title: 'Missing Information',
                text: 'Please select at least one item.',
                confirmButtonText: 'OK'
            });
            return;
        } else if (data.guest === 0) {
            Swal.fire({
                icon: 'warning',
                title: 'Missing Information',
                text: 'Please enter guest count.',
                confirmButtonText: 'OK'
            });
            return;
        } else if (data.tableId === 0) {
            Swal.fire({
                icon: 'warning',
                title: 'Missing Information',
                text: 'Please select a table.',
                confirmButtonText: 'OK'
            });
            return;
        }
        try {
            const response = await axios.put(`http://localhost:3000/order/${id}`, data, header);
            console.log('Order created:', response.data);
            navigate('/order');
            // Optional: reset form or navigate
        } catch (error) {
            console.error('Create order error:', error);
        }
    };
    useEffect(() => {
        axios.get(`http://localhost:3000/order/${id}`, header)
            .then(response => {
                setOrderedItems(
                    response.data.items.map(item => ({ ...item, quantity: item.orderItem.quantity }))
                );
                setOldGuest(response.data.guest);
                setGuest(response.data.guest);
                setTableId(response.data.tableId);
                setAmount(response.data.amount);
                setPaymentStatus(response.data.paymentStatus);
            })
        axios.get('http://localhost:3000/table/getTables', header)
            .then(response => {
                setTables(response.data);
            })
        axios.get('http://localhost:3000/menu/getMenus', header)
            .then(response => {
                setMenus(response.data);
            })
        axios.get('http://localhost:3000/item/getItems', header)
            .then(response => {
                setItems(response.data);
            })
        axios.get('http://localhost:3000/order/getOrders', header)
            .then(response => {
                const filtered = response.data.filter(order => {
                    const orderDate = toLocalDate(order.createdAt);
                    return orderDate === Today && (order.status === "In Progress" || order.status === "Ready")
                }
                );
                const aggregated = {};
                filtered.forEach(({ tableId, guest }) => {
                    if (aggregated[tableId]) {
                        aggregated[tableId].guest += guest;
                    } else {
                        aggregated[tableId] = { tableId: tableId, guest: guest };
                    }
                });
                const result = Object.values(aggregated);
                setTableSeats(result);
            })
    }, []);
    const handleAddToOrder = (item) => {
        const exists = orderedItems.find(order => order.id === item.id);
        if (!exists) {
            setOrderedItems([...orderedItems, { ...item, quantity: 1 }]);
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
                    <span className="text-warning fw-bold">Table:</span>
                    <div className="mx-3 d-flex align-items-center" style={{ width: '300px' }}>
                        <select
                            className="form-select"
                            onChange={(e) => setTableId(Number(e.target.value))}
                            value={tableId || ''}
                        >
                            <option disabled hidden value=''>Select Table</option>
                            {tables.map((table) => {
                                const guestCount = tableSeats.find(t => t.tableId === table.id)?.guest || 0;
                                const availableSeat = table.seat - guestCount + oldGuest;
                                return (
                                    <option
                                        key={table.id}
                                        value={table.id}
                                        disabled={availableSeat <= 0}
                                        className={availableSeat > 0 ? 'text-white bg-success' : 'text-white bg-danger'}
                                    >
                                        {table.name} - Available seat: {availableSeat}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <span className="text-warning fw-bold">Guest:</span>
                    <div className="mx-3 d-flex align-items-center">

                        <select
                            className="form-select"
                            value={guest}
                            onChange={(e) => setGuest(Number(e.target.value))}
                            disabled={!tableId} // disable until table is selected
                        >
                            <option disabled hidden value="">Select Guests</option>
                            {(() => {
                                const table = tables.find(t => t.id === tableId);
                                const guestCount = tableSeats.find(t => t.tableId === tableId)?.guest || 0;
                                const available = table ? (table.seat - guestCount + oldGuest) : 0;
                                console.log(available);
                                return [...Array(available).keys()].map(i => (
                                    <option key={i + 1} value={i + 1}>
                                        {i + 1}
                                    </option>
                                ));
                            })()}
                        </select>
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
                        amount={setAmount}
                        paymentStatus={setPaymentStatus}
                        isUpdate={true}
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
