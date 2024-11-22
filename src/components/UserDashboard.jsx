// UserDashboard.js
import React from 'react'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

const UserDashboard = () => {
  return (
    <div className="container-fluid bg-light">
    <div className="container pt-5">
      <h2 className="text-center mb-5">User Dashboard</h2>
      <div className="d-flex justify-content-around flex-wrap" style={{ marginBottom: "10rem" }}>
       
        <div className="card shadow-sm text-center mb-3" style={{ width: "18rem" }}>
          <div className="card-body">
            <h5 className="card-title"> My Attendance</h5>
            <p className="card-text">Track your attendance records.</p>
            <Link to="/attendance" className="btn btn-primary btn-sm">View Attendance</Link>
          </div>
        </div>

        <div className="card shadow-sm text-center mb-3" style={{ width: "18rem" }}>
          <div className="card-body">
            <h5 className="card-title">Apply for Leave</h5>
            <p className="card-text">Request leaves quickly and easily.</p>
            <Link to="/leave" className="btn btn-success btn-sm">Apply for Leave</Link>
          </div>
        </div>

 
        <div className="card shadow-sm text-center mb-3" style={{ width: "18rem" }}>
          <div className="card-body">
            <h5 className="card-title">My Reports</h5>
            <p className="card-text">Access your attendance and leave reports.</p>
            <Link to="/report" className="btn btn-info btn-sm">View Reports</Link>
          </div>
        </div>

        <div className="card shadow-sm text-center mb-3" style={{ width: "18rem" }}>
          <div className="card-body">
            <h5 className="card-title">View Profile</h5>
            <p className="card-text">Check personal information.</p>
            <Link to="/profile" className="btn btn-warning btn-sm">View Profile</Link>
          </div>
      </div>
    </div>
  </div>
  </div>
  );
};

export default UserDashboard;
