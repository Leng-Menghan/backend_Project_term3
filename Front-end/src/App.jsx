import Nav from './components/Nav.jsx'
import Dashboard from './components/Dashboard/Dashboard.jsx'
import { Routes, Route } from 'react-router-dom';
import Footer from './components/Footer.jsx'
import Table from './components/Table/Table.jsx'
import Order from './components/Order/order.jsx'
function App() {
  return (
    <div className="d-flex flex-column vh-100 overflow-x-hidden min-vw-100 ">
      <Nav />
      <div className="flex-grow-1 fixed-height-screen">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/table" element={<Table />} />
          <Route path="/order/*" element={<Order />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
