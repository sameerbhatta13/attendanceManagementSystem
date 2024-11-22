import React, { useEffect, useState } from 'react'
import '../styles/Navbar.css'
import { Link,NavLink, useNavigate } from 'react-router-dom'
import { isLoggedIn } from '../auth'



const Navbar = () => {
  const navigate =useNavigate()
  const [user,setUser]=useState()

  useEffect(() => {
    const loggedInUser = isLoggedIn()?.user;
    setUser(loggedInUser);
  }, []);
  
//handle logout
  const handleLogout = () => {
    localStorage.removeItem('user'); 
    setUser(null);  // Clear user state
    navigate('/signin');  // Redirect to login page
  };

  const handleDashboardNavigation = () => {
    if (user?.role === 'admin') {
      navigate('/admin/dashboard');
    } else if (user?.role === 'employee') {
      navigate('/user/dashboard');
    } else {
      navigate('/error');
    }
  };
 
 
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#"><b>Online Attendence Mangaement System</b></a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
              <NavLink className="nav-link active" to="/">Home </NavLink>  
              </li>
              <li className="nav-item">
              <a className="nav-link" href="#" onClick={handleDashboardNavigation}>Dashboard</a>
              </li>

              {user?.role==='employee' &&(
                <>
                 <li className="nav-item">
                <NavLink className="nav-link" to="/attendance" active="active">Attendance</NavLink>
              </li>
              <li className="nav-item"> 
              <NavLink className="nav-link" to="/leave" active="active">Leave</NavLink>
               
              </li>
              <li className="nav-item">
              <NavLink className="nav-link" to="/report" active="active">Report</NavLink>
              </li>
                </>

              )}
             
           
            </ul>
            <form className="d-flex me-1" role="search">
              {user?(
                <>
                <span className='navbar-text me-5'>
           welcome,<b>{user.username}</b>
                </span>
                <button  className='btn btn-danger' type='button' onClick={handleLogout}>logout</button>
                </>
              ):(
                <NavLink to="/signin">
                  <button className='btn btn-success me-2' type='button'>login</button>
                </NavLink>
              )
              }
              {/* <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" /> */}
        {/* <NavLink to="/signin">  <button className="btn btn-outline-success me-2" type="submit" >Login</button></NavLink>
              <button className="btn btn-outline-danger" type="submit">Logout</button> */}
            </form>
          </div>
        </div>
      </nav>
      



    </>
  )
}

export default Navbar