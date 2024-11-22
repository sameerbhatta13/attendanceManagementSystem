import React, { useEffect, useState } from 'react'
import '../styles/Login.css';
import { APP_URL } from '../config';
import { Link, NavLink, useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate=useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    role: 'employee'
  });


  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    try {
      const response = await fetch(`http://localhost:8000/api/postUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        // alert(data.message);
        navigate('/signin')
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Network or server error:", error);
      alert("An error occurred while registering. Check console for details.");
    }
  };

 



  return (

    <form onSubmit={handleSubmit} className='mt-4' style={{ backgroundColor: '#f0f0f0',marginBottom:'30px' }}>
      <h1><b className='text-info'>Register Here</b></h1>
      <div className="mt-4 mb-3">
        <label htmlFor="username" className="form-label">User Name</label>
        <input
          type="text"
          className="form-control"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email address</label>
        <input
          type="email"
          className="form-control"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="phone" className="form-label">Phone Number</label>
        <input
          type="text"
          className="form-control"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input
          type="password"
          className="form-control"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="role" className="form-label">Role</label>
        <select
          className="form-select"
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
        >
          <option value="employee">Employee</option>
          <option value="admin">Admin</option>
        </select>
      </div>

     <button type="submit" className="btn btn-primary">Submit</button>

      <p style={{ marginTop: '20px' }}>
        Already have an account? <Link to="/signin">Login here</Link>
      </p>

    </form>

  );
};

export default Register;
