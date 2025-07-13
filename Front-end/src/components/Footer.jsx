import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <footer className="bg-black text-white py-3 ">
      <div className="row">
        <div className="col-2 text-center">
          <Link to="/Dashboard" className="text-white">Dashboard</Link>
        </div>
        <div className="col-2 text-center">
          <Link to="/Menu" className="text-white">Menu</Link>
        </div>
        <div className="col-4 text-center bg-warning">
          <Link to="/Order" className="text-white">Order</Link>
        </div>
        <div className="col-2 text-center">
          <Link to="/Item" className="text-white">Item</Link>
        </div>
        <div className="col-2 text-center">
          <Link to="/Table" className="text-white">Table</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
