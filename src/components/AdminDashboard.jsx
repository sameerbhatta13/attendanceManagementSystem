// AdminDashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminDashboard = () => {
  return (
    <div className="container-fluid bg-light ">
    <div className="container t-5 ">
      <h2 className="text-center mb-4 mt-4">Admin Dashboard</h2>
      <div className="row mb-5">

        <div className="col-md-6 mb-4">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <h5 className="card-title">View All Employees</h5>
              <p className="card-text">Register a new employee to the system.</p>
              <Link to="/AllEmployees" className="btn btn-info ">View</Link>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <h5 className="card-title">View All Attendance</h5>
              <p className="card-text">Monitor attendance records for all employees.</p>
              <Link to="/view-attendance" className="btn btn-success">View Attendance</Link>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <h5 className="card-title">Manage Leave Requests</h5>
              <p className="card-text">Approve or reject employee leave requests.</p>
              <Link to="/manage-leaves" className="btn btn-warning">Manage Leaves</Link>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <h5 className="card-title">Generate Reports</h5>
              <p className="card-text">Generate attendance and leave reports.</p>
              <Link to="/generate-reports" className="btn btn-info">Generate Reports</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AdminDashboard;
