import React, { useState } from 'react'
import { APP_URL } from '../config'
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {  useNavigate } from 'react-router-dom';
const EmployeeForm = () => {
  const navigate = useNavigate();
     const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    position: '',
    department: '',
    salary: '',
    // profilePicture: null
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      profilePicture: e.target.files[0]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const data = new FormData();
    for (let key in formData) {
      data.append(key, formData[key]);
    }
  
    try {
      const response = await axios.post(`${APP_URL}/registeremp`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      //store the employee id in localstorage
      localStorage.setItem('employeeId', response.data.employeeId);
      toast.success(response.data.message || 'Employee registered successfully!')

      setTimeout(() => {
        navigate('/attendance');
      }, 3000);
    } catch (error) {
      const errorMsg =
      error.response?.data?.message || 'Failed to register employee. Please try again.';
    toast.error(errorMsg)
    setTimeout(() => {
      navigate('/attendance');
    }, 3000);
    }
   
  };
  
  return (
    <div>
    <form onSubmit={handleSubmit} className='mt-3 mb-5'>
    <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} required />
    <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} required />
    <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
    <input type="tel" name="phone" placeholder="Phone" onChange={handleChange} />
    
    {/* Address Fields */}
    <input type="text" name="street" placeholder="Street" onChange={handleChange} />
    <input type="text" name="city" placeholder="City" onChange={handleChange} />
    <input type="text" name="state" placeholder="State" onChange={handleChange} />
    <input type="text" name="postalCode" placeholder="Postal Code" onChange={handleChange} />
    <input type="text" name="country" placeholder="Country" onChange={handleChange} />

    <input type="text" name="position" placeholder="Position" onChange={handleChange} required />
    <input type="text" name="department" placeholder="Department" onChange={handleChange} />
    <input type="number" name="salary" placeholder="Salary" onChange={handleChange} className='mb-2' /> <br />

    {/* Profile Picture Upload */}
    <input type="file" name="profilePicture" onChange={handleFileChange} accept="image/*" />

    <button type="submit" className="btn btn-primary btn-sm px-4 py-2 mt-2"style={{  width: '50%',borderRadius: '8px' }}>  Register Employee</button>

  </form>
  <ToastContainer/>
  </div>
  )
}

export default EmployeeForm