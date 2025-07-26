import React from "react";
import { useNavigate } from "react-router-dom";

const HeroPOS = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/login", { replace: true });
  }
  return (
    <section className="min-vh-100 d-flex align-items-center justify-content-center bg-dark text-white text-center">
      <div className="container">
        <h1 className="display-3 fw-bold text-warning mb-4 glow-text">Welcome to POS</h1>
        <p className="lead mb-4">
          Manage your sales efficiently and effectively with our intuitive POS platform.
        </p>
        <button className="btn btn-warning text-dark btn-lg px-5 fw-semibold" onClick={handleClick}>
          Start
        </button>
      </div>
    </section>
  );
};

export default HeroPOS;
