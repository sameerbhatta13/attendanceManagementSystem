import React from 'react'
import '../styles/Footer.css'
const Footer = () => {
  return (
    <>
     <footer className="footer">
      <div className="container">
        <div className="row">
          {/* Footer Links */}
          <div className="col-md-4">
            <h5>Employee Attendance Management System</h5>
            <p>Managing attendance efficiently and effortlessly.</p>
          </div>
          <div className="col-md-4 footer-links">
            <ul>
              <li><a href="#about">About</a></li>
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#contact">Contact Us</a></li>
            </ul>
          </div>
          <div className="col-md-4">
            <p>&copy; {new Date().getFullYear()} Employee Attendance System. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
    </>
  )
}

export default Footer