// src/pages/ErrorPage.js
import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px', marginBottom:'200px' }}>
      <h1>Access Denied</h1>
      <p>You need to log in to view this page.</p>
      <Link to="/signin" className="btn btn-primary">Go to Login</Link>
    </div>
  );
};

export default ErrorPage;
