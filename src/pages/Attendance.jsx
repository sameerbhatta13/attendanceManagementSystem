import React, { useEffect, useState } from 'react';
import { isLoggedIn } from '../auth';
import { Navigate, useNavigate } from 'react-router-dom';
import { APP_URL } from '../config';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const Attendance = () => {
  const [formData, setFormData] = useState({
    employeeId: '',
    status: 'present', // Default to 'present'
    checkInTime: '',
    checkOutTime: '',
  });

  const [userProfile, setUserProfile] = useState(null);
  const navigate=useNavigate()

  useEffect(() => {
    // Check if the user is logged in
    if (!isLoggedIn()) {
      return <Navigate to="/error" />;
    }

    // Fetch the profile data of the logged-in user
    const fetchProfile = async () => {
      try {
        const tokenData = JSON.parse(localStorage.getItem('jwt'));
        const token = tokenData?.token;

        if (!token) {
          throw new Error('No token found. Please log in.');
        }

        const response = await axios.get(`${APP_URL}/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Set the profile data and auto-fill the employeeId in the form
        setUserProfile(response.data);
        setFormData((prevData) => ({
          ...prevData,
          employeeId: response.data.employeeId
        }));
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast.error('Failed to fetch profile. Please log in again.');
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting attendance with data:", formData)
    try {
      const response = await axios.post(`${APP_URL}/markattendance`, formData);
      toast.success(response.data.message || 'Attendance marked successfully!');

      setFormData({
        employeeId: response.data.employeeId || '',
        status: 'present',
        checkInTime: '',
        checkOutTime: '',
      })

      const tokenData=JSON.parse(localStorage.getItem('jwt'))
      const role=tokenData?.role
      if(role==='admin'){
        setTimeout(() => navigate('/admin/dashboard'), 3000)
      } else{
        setTimeout(() => navigate('/user/dashboard'), 3000)
      }
    } catch (error) {
      console.error("Error occurred:", error.response || error);
      const errorMsg = error.response?.data?.error || 'Failed to mark attendance.';
      toast.error(errorMsg);
    }
  }

  // if (!userProfile) {
  //   return <p>Loading profile...</p>;
  // }

  //check the employee id 
  const isEmployeeRegistered = localStorage.getItem('employeeId');

  return (
    <div className="container my-5">
    <h2 className="text-center mb-4">Mark Attendance</h2>
    ({!isEmployeeRegistered &&
        <div className="d-flex justify-content-center mb-4">
          <p>
            Not registered yet?{' '}
            <a href="/employeeform" className="text-primary">
              Register Here
            </a>
          </p>
        </div>
      })
    <form onSubmit={handleSubmit} className="attendance-form shadow p-4 rounded bg-light">
      
      {/* Employee ID */}
      <div className="form-group mb-3">
        <label htmlFor="employeeId">Employee ID</label>
        <input
          type="text"
          id="employeeId"
          name="employeeId"
          className="form-control"
          placeholder="Employee ID"
          value={formData.employeeId}
          onChange={handleChange}
          required
          readOnly
        />
      </div>

      {/* Status */}
      <div className="form-group mb-3">
        <label htmlFor="status">Status</label>
        <select
          id="status"
          name="status"
          className="form-control"
          value={formData.status}
          onChange={handleChange}
          required
        >
          <option value="present">Present</option>
          <option value="absent">Absent</option>
          <option value="leave">Leave</option>
        </select>
      </div>

      {/* Check-In Time */}
      <div className="form-group mb-3">
        <label htmlFor="checkInTime">Check-In Time</label>
        <input
          type="datetime-local"
          id="checkInTime"
          name="checkInTime"
          className="form-control"
          value={formData.checkInTime}
          onChange={handleChange}
          required
        />
      </div>

      {/* Check-Out Time */}
      <div className="form-group mb-3">
        <label htmlFor="checkOutTime">Check-Out Time</label>
        <input
          type="datetime-local"
          id="checkOutTime"
          name="checkOutTime"
          className="form-control"
          value={formData.checkOutTime}
          onChange={handleChange}
        />
      </div>

      {/* Submit Button */}
      <div className="d-flex justify-content-center">
        <button type="submit" className="btn btn-primary px-5 py-2">
          Mark Attendance
        </button>
      </div>
    </form>

    <ToastContainer />
  </div>
  )
}

export default Attendance;






























