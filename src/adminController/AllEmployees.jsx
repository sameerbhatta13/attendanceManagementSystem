import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { APP_URL } from '../config';
import { Link } from 'react-router-dom';

const AllEmployees = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(`${APP_URL}/allemployees`);
        setEmployees(response.data);
      } catch (err) {
        console.error('Failed to fetch employees', err);
      }
    };
    fetchEmployees();
  }, []);

  const handleDelete = async (employeeId) => {
    try {
      await axios.delete(`${APP_URL}/deleteemployee/${employeeId}`);
      setEmployees(employees.filter(employee => employee._id !== employeeId));
    } catch (err) {
      console.error('Error deleting employee:', err);
    }
  };

  return (
    <div className="container my-4">
    <h2 className="text-center mb-4">Employee List</h2>

    {/* Loop through and display employee data in separate cards */}
    <div className="row">
      {employees.map(employee => (
        <div className="col-md-4 mb-4" key={employee._id}>
          <div className="card shadow-sm">
            <img
              src={employee.profilePicture ? `http://localhost:8000/${employee.profilePicture}` : 'https://via.placeholder.com/150'}
              className="card-img-top"
              alt="Profile"
              style={{ height: '200px', objectFit: 'cover' }}
            />
            <div className="card-body">
              <h5 className="card-title">{employee.firstName} {employee.lastName}</h5>
              <p className="card-text">
                <strong>Email:</strong> {employee.email} <br />
                <strong>Phone:</strong> {employee.phone} <br />
                <strong>Position:</strong> {employee.position} <br />
                <strong>Department:</strong> {employee.department} <br />
                <strong>Salary:</strong> {employee.salary} <br />
                <strong>Address:</strong> {employee.address.street}, {employee.address.city}, {employee.address.state}
              </p>
              <div className="d-flex justify-content-center gap-2 mt-2">
                  <Link to={`/updateemployee/${employee._id}`} className="btn btn-warning">
                    Update
                  </Link>
                  <button className="btn btn-danger" onClick={() => handleDelete(employee._id)}>
                    Delete
                  </button>
                </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>

  );
};

export default AllEmployees;
