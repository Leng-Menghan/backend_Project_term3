import GuestGraph from "./guestGraph.jsx";
import Income from "./Income.jsx";
import Item from "./countNumber/Item.jsx";
import Guest from "./countNumber/Guest.jsx";
import Order from "./countNumber/Order.jsx";
import Price from "./countNumber/Price.jsx";
import TopSell from "./topSell.jsx";
import axios from "axios";
import { useEffect, useState } from "react";

// Format any ISO string or Date to "YYYY-MM-DD" in local time
function toLocalDate(dateInput) {
  const date = new Date(dateInput);
  return date.toLocaleDateString('en-CA');
}

function Dashboard() {
    const token = localStorage.getItem('token');
    const header = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const today = toLocalDate(new Date());

  // Get first and last day of current month
  const year = Number(today.slice(0, 4));
  const month = Number(today.slice(5, 7)) - 1;
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const start = toLocalDate(firstDay);
  const end = toLocalDate(lastDay);

  const [itemQty, setItemQty] = useState(0);
  const [guestQty, setGuestQty] = useState(0);
  const [orderQty, setOrderQty] = useState(0);
  const [date, setDate] = useState(today);
  const [price, setPrice] = useState(0);
  const [orderItem, setOrderItem] = useState([]);

  const [labels, setLabels] = useState([]);
  const [dataPointsIncome, setDataPointsIncome] = useState([]);
  const [dataPointsGuest, setDataPointGuest] = useState([]);
  const [startDate, setStartDate] = useState(start);
  const [endDate, setEndDate] = useState(end);

  useEffect(() => {
    axios.get('http://localhost:3000/order/getOrders', header)
      .then(response => {
        const orders = response.data;

        // Filter orders for selected local date
        const filtered = orders.filter(order =>
          toLocalDate(order.createdAt) === date
        );

        setOrderQty(filtered.length);
        setGuestQty(filtered.reduce((sum, order) => sum + (Number(order.guest) || 0), 0));
        setPrice(filtered.reduce((sum, order) => sum + (order.paymentStatus === 'Paid' ? Number(order.amount) : 0), 0));

        // Filter orders by range
        const filteredByRange = orders.filter(order => {
          const localDate = toLocalDate(order.createdAt);
          return localDate >= startDate && localDate <= endDate;
        });

        const groupedAmounts = {};
        const groupedGuests = {};

        filteredByRange.forEach(order => {
          const localDate = toLocalDate(order.createdAt);
          groupedAmounts[localDate] = (groupedAmounts[localDate] || 0) + (order.paymentStatus === 'Paid' ? Number(order.amount) : 0);
          groupedGuests[localDate] = (groupedGuests[localDate] || 0) + (Number(order.guest) || 0);
        });

        const sortedDates = Object.keys(groupedAmounts).sort();
        setLabels(sortedDates);
        setDataPointsIncome(sortedDates.map(d => groupedAmounts[d]));
        setDataPointGuest(sortedDates.map(d => groupedGuests[d]));
      })
      .catch(err => console.error('Failed to fetch orders:', err));

    axios.get('http://localhost:3000/orderItem/getOrderItems', header)
      .then(response => {
        const filtered = response.data.filter(item =>
          toLocalDate(item.createdAt) === date
        );

        const aggregated = {};
        filtered.forEach(({ item, quantity }) => {
          if (aggregated[item.id]) {
            aggregated[item.id].quantity += quantity;
          } else {
            aggregated[item.id] = { id: item.id, name: item.name, quantity };
          }
        });

        const top8 = Object.values(aggregated)
          .sort((a, b) => b.quantity - a.quantity)
          .slice(0, 8);

        setOrderItem(top8);
        setItemQty(filtered.reduce((sum, item) => sum + (item.quantity || 0), 0));
      })
      .catch(err => console.error('Failed to fetch items:', err));
  }, [date, startDate, endDate]);

  return (
    <div className="container-fluid p-0">
      <div className="row p-0 m-3">
        {/* Left Panel */}
        <div className="col-8 rounded  p-3">
          <div className="row d-flex justify-content-between align-items-center mb-3">
            <div className="col-8">
              <h3 className="fw-bold">Dashboard</h3>
            </div>
            <div className="col-4 d-flex align-items-center">
              <label htmlFor="selectedDate" className="form-label me-2 mb-0 fw-bold w-50">Select Date</label>
              <input
                type="date"
                className="form-control"
                id="selectedDate"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>

          <div className="p-3 bg-dark text-white rounded mb-3">
            <h3>Overview</h3>
            <hr className="my-2 mb-3" style={{ height: '1px', backgroundColor: 'white', border: 'none' }} />
            <div className="row">
              <div className="col-3"><Item itemQty={itemQty} /></div>
              <div className="col-3"><Guest guestQty={guestQty} /></div>
              <div className="col-3"><Order orderQty={orderQty} /></div>
              <div className="col-3"><Price price={price} /></div>
            </div>
          </div>

          <div className="p-3 bg-dark text-white rounded">
            <h3>Top Sell</h3>
            <hr className="my-2 mb-3" style={{ height: '1px', backgroundColor: 'white', border: 'none' }} />
            <div className="row">
              {orderItem.map(item => (
                <div className="col-3" key={item.id}>
                  <TopSell name={item.name} quantity={item.quantity} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="col-4 p-3 rounded bg-dark">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <input
              type="date"
              className="form-control"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <span className="fw-bold me-2 ms-2 text-white">to</span>
            <input
              type="date"
              className="form-control"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <Income labels={labels} dataPoints={dataPointsIncome} />
          <GuestGraph labels={labels} dataPoints={dataPointsGuest} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
