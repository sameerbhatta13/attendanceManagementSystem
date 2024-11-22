import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { APP_URL } from '../config';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const Report = () => {
  const [report, setReport] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReport = async () => {
      try {
        // Retrieve employeeId from localStorage
        const employeeId = localStorage.getItem('employeeId');
        if (!employeeId) {
          setError('Employee ID not found in local storage');
          return;
        }

        // Fetch report from backend
        const response = await axios.get(`${APP_URL}/generatedreport/${employeeId}`)
        setReport(response.data.report);
      } catch (err) {
        setError('Error fetching report');
      }
    };

    fetchReport();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  if (!report) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Employee Activity Report</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      {report ? (
        <div>
          <div className="card shadow mb-4">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">Attendance Records</h5>
            </div>
            <div className="card-body">
              {report.attendance.length > 0 ? (
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {report.attendance.map((record, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{new Date(record.date).toLocaleDateString()}</td>
                        <td>{record.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No attendance records found.</p>
              )}
            </div>
          </div>

          <div className="card shadow">
            <div className="card-header bg-success text-white">
              <h5 className="mb-0">Leave Requests</h5>
            </div>
            <div className="card-body">
              {report.leaveRequests.length > 0 ? (
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Start Date</th>
                      <th>End Date</th>
                      <th>Reason</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {report.leaveRequests.map((request, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{new Date(request.startDate).toLocaleDateString()}</td>
                        <td>{new Date(request.endDate).toLocaleDateString()}</td>
                        <td>{request.reason}</td>
                        <td>{request.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No leave requests found.</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default Report;
