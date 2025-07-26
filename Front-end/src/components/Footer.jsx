import { Link } from 'react-router-dom';
import { useAuth } from '../context/authContext';
const Footer = () => {
  const { auth } = useAuth();
  return (
    <footer className="bg-black text-white py-3 ">
      <div className="row">
        {auth?.role === 'Admin' ? (
          <>
            <div className="col-2 text-center">
              <Link to="/Dashboard" className="text-white">Dashboard</Link>
            </div>
            <div className="col-2 text-center">
              <Link to="/Menu" className="text-white">Menu</Link>
            </div>
            <div className="col-4 text-center">
              <Link to="/Order" className='d-flex align-items-center justify-content-center'>
                  <div className="text-white rounded-circle bg-warning d-flex align-items-center justify-content-center"
                    style={{ fontSize: '50px', width: '100px', height: '100px', position: 'absolute', transform: 'translateY(-20%)' }}
                  >
                    <i class="fa-solid fa-bell-concierge"></i>
                  </div>
                </Link>
            </div>
            <div className="col-2 text-center">
              <Link to="/Table" className="text-white">Table</Link>
            </div>
            <div className="col-2 text-center">
              <Link to="/User" className="text-white">User</Link>
            </div>
          </>
        ) :
          (
            <>
              <div className="col-4 text-center">
                <Link to="/Menu" className="text-white">Menu</Link>
              </div>
              <div className="col-4 text-center">
                <Link to="/Order" className='d-flex align-items-center justify-content-center'>
                  <div className="text-white rounded-circle bg-warning d-flex align-items-center justify-content-center"
                    style={{ fontSize: '50px', width: '100px', height: '100px', position: 'absolute', transform: 'translateY(-20%)' }}
                  >
                    <i class="fa-solid fa-bell-concierge"></i>
                  </div>
                </Link>
              </div>
              <div className="col-4 text-center">
                <Link to="/Table" className="text-white">Table</Link>
              </div>
            </>
          )
        }
      </div>
    </footer>
  );
};

export default Footer;
