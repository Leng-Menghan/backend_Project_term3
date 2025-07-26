import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setToken } from "../../utils/auth";
import { useAuth } from "../../context/authContext";
import Swal from 'sweetalert2';
const Login = () => {
  const { setAuth, auth } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    // implement your login logic here
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/user/login", { email, password });
      if (res.data.token) {
        setToken(res.data.token);
        setAuth(res.data.user);
        navigate("/dashboard", { replace: true });
      } else {
        Swal.fire({
          icon: 'warning',
          title: 'Login Failed',
          text: 'Please check your email and password.',
          confirmButtonText: 'OK'
        });
      }
    } catch (err) {
      Swal.fire({
          icon: 'warning',
          title: 'Login Failed',
          text: 'Please check your email and password.',
          confirmButtonText: 'OK'
        });
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark text-white">
      <form onSubmit={handleSubmit} className="bg-black p-5 rounded shadow w-100" style={{ maxWidth: "400px" }}>
        <h2 className="mb-4 text-warning text-center">Sign In</h2>

        <div className="mb-3">
          <label htmlFor="email" className="form-label text-secondary">
            Employee Email
          </label>
          <input
            type="email"
            className="form-control bg-dark text-white border-secondary"
            id="email"
            name="email"
            placeholder="Enter employee email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="form-label text-secondary">
            Password
          </label>
          <input
            type="password"
            className="form-control bg-dark text-white border-secondary"
            id="password"
            name="password"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Role Selection Buttons
        <div className="mb-4 d-flex justify-content-between">
          <button
            type="button"
            onClick={() => handleRoleSelect("admin")}
            className={`btn ${formData.role === "admin" ? "btn-warning" : "btn-outline-warning"} w-50 me-2`}
          >
            Admin
          </button>
          <button
            type="button"
            onClick={() => handleRoleSelect("staff")}
            className={`btn ${formData.role === "staff" ? "btn-warning" : "btn-outline-warning"} w-50`}
          >
            Staff
          </button>
        </div> */}

        <button type="submit" className="btn btn-warning w-100 fw-bold">
          Sign in
        </button>
      </form>
    </div>
  );
};

export default Login;
