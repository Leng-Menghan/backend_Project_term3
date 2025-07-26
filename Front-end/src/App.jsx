import Nav from './components/Nav.jsx'
import Dashboard from './components/Dashboard/Dashboard.jsx'
import { Routes, Route, useLocation } from 'react-router-dom';
import Footer from './components/Footer.jsx'
import Table from './components/Table/tableLayout.jsx'
import Menu from './components/Menu/menuLayout.jsx'
import Order from './components/Order/order.jsx'
import Login from './components/Authentication/Login.jsx'
import HeroPOS from './components/Authentication/HeroPOS.jsx';
import UserLayout from './components/User/userLayout.jsx';
import ProtectedRoute from './ProtectedRoute/protectedRoute.jsx';

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/" || location.pathname === "/login";

  return (
    <div className="d-flex flex-column vh-100 overflow-x-hidden min-vw-100">
      {/* Render Nav only if NOT login page */}
      {!isLoginPage && <Nav />}
      <div className="flex-grow-1 fixed-height-screen">
        <Routes>
          <Route path="/" index element={<HeroPOS />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/table/*" element={
            <ProtectedRoute>
              <Table />
            </ProtectedRoute>
          } />
          <Route path="/menu" element={
            <ProtectedRoute>
              <Menu />
            </ProtectedRoute>
          } />
          <Route path="/order/*" element={
            <ProtectedRoute>
              <Order />
            </ProtectedRoute>
          } />
          <Route path="/user/*" element={
            <ProtectedRoute>
              <UserLayout />
            </ProtectedRoute>
          } />
        </Routes>
      </div>

      {/* Render Footer only if NOT login page */}
      {!isLoginPage && <Footer />}
    </div>
  );
}

export default App;
