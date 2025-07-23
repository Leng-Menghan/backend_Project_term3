import GuestPerWeek from "./guestPerWeek";
import Income from "./Income.jsx";
import Item from "./countNumber/Item.jsx";
import Guest from "./countNumber/Guest.jsx";
import Order from "./countNumber/Order.jsx";
import Price from "./countNumber/Price.jsx";
import TopSell from "./topSell.jsx";
import axios from "axios";
import { useEffect, useState } from "react";

function Dashboard() {
  // Get today's date in "YYYY-MM-DD" format (local time)
  const Today = new Date().toISOString().split('T')[0];

  // Helper to format Date object to "YYYY-MM-DD" in local time
  function formatDateLocal(date) {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0'); // month 1-12
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  // Calculate first and last day of current month (local time)
  const year = Number(Today.slice(0, 4));
  const month = Number(Today.slice(5, 7)) - 1;

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  // Format for date inputs
  const start = formatDateLocal(firstDay);
  const end = formatDateLocal(lastDay);

  // State
  const [itemQty, setItemQty] = useState(0);
  const [guestQty, setGuestQty] = useState(0);
  const [orderQty, setOrderQty] = useState(0);
  const [date, setDate] = useState(Today);
  const [price, setPrice] = useState(0);
  const [orderItem, setOrderItem] = useState([]);

  const [labels, setLabels] = useState([]);
  const [dataPointsIncome, setDataPointsIncome] = useState([]);
  const [dataPointsGuest, setDataPointGuest] = useState([]);
  const [startDate, setStartDate] = useState(start);
  const [endDate, setEndDate] = useState(end);

  // Fetch data when date or range changes
  useEffect(() => {
  axios.get('http://localhost:3000/order/getOrders')
    .then(response => {
      const orders = response.data;

      // Filter orders by selected date (full day)
      const filtered = orders.filter(order =>
        order.createdAt?.startsWith(date)
      );

      setOrderQty(filtered.length);
      setGuestQty(filtered.reduce((sum, order) => sum + (Number(order.guest) || 0), 0));
      setPrice(filtered.reduce((sum, order) => sum + (order.paymentStatus === 'Paid' ? Number(order.amount) : 0), 0));

      // Filter orders by date range (startDate to endDate)
      const filteredByRange = orders.filter(order => {
        const orderDate = order.createdAt?.split('T')[0];
        return orderDate >= startDate && orderDate <= endDate;
      });

      // Group amounts and guests by date string
      const groupedAmounts = {};
      const groupedGuests = {};

      filteredByRange.forEach(order => {
        const orderDate = order.createdAt?.split('T')[0];
        if (!groupedAmounts[orderDate]) groupedAmounts[orderDate] = 0;
        if (!groupedGuests[orderDate]) groupedGuests[orderDate] = 0;

        groupedAmounts[orderDate] += order.paymentStatus === 'Paid' ? Number(order.amount) : 0;
        groupedGuests[orderDate] += Number(order.guest) || 0;
      });

      // Sort dates
      const sortedDates = Object.keys(groupedAmounts).sort();

      // Prepare data arrays for charts
      const incomeData = sortedDates.map(date => groupedAmounts[date]);
      const guestData = sortedDates.map(date => groupedGuests[date]);

      setLabels(sortedDates);
      setDataPointsIncome(incomeData);
      setDataPointGuest(guestData);
    })
    .catch(err => console.error('Failed to fetch orders:', err));

  axios.get('http://localhost:3000/orderItem/getOrderItems')
    .then(response => {
      const filtered = response.data.filter(item =>
        item.createdAt?.startsWith(date)
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
        {/* Left panel */}
        <div className="col-8 rounded bg-warning p-3">
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
                name="selectedDate"
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

        {/* Right panel */}
        <div className="col-4 p-3 rounded bg-dark">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <input
              type="date"
              className="form-control"
              id="startDate"
              name="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <span className="fw-bold me-2 ms-2 text-white">to</span>
            <input
              type="date"
              className="form-control"
              id="endDate"
              name="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <Income labels={labels} dataPoints={dataPointsIncome} />
          <GuestPerWeek labels={labels} dataPoints={dataPointsGuest} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
