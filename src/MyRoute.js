import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import MainLayout from './layout/MainLayout'
import Login from './pages/Login'
import Register from './pages/Register'
import HomePage from './components/HomePage'
import AdminDashboard from './components/AdminDashboard'
import UserDashboard from './components/UserDashboard'
import Attendance from './pages/Attendance'
import Leave from './pages/Leave'
import Report from './pages/Report'
import { isLoggedIn } from './auth'
import ErrorPage from './pages/ErrorPage'
import EmployeeForm from './pages/EmployeeForm'
import ProtectedRoute from './components/ProtectedRoute'
import Profile from './pages/Profile'
import AllEmployees from './adminController/AllEmployees'
const MyRoute = () => {
  const user = isLoggedIn()?.user
  return (
   
    <Router>
      <Routes>
        <Route path='/' element={<MainLayout />}>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/signin' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/admin/dashboard' element={ user.role === 'admin'?<AdminDashboard/>:<Navigate to="/error" />}/>
        <Route path='/user/dashboard' element={user.role === 'employee'?<UserDashboard/>:<Navigate to="/error" />}/>
        <Route path='/error' element={<ErrorPage/>}/>
        <Route path='/attendance' element={isLoggedIn()?<Attendance/>:<Navigate to='/error'/>}/>
        <Route path='/leave' element={isLoggedIn()?<Leave/>:<Navigate to='/error'/>}/>
        <Route path='/report' element={isLoggedIn()?<Report/>:<Navigate to='/error'/>}/>
        <Route path='/employeeform' element={<EmployeeForm/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/AllEmployees' element={<AllEmployees/>}/>
        <Route path='/updateEmployee/:id' element={<EmployeeForm/>}/>
        </Route>





      </Routes>


    </Router>
  )
}

export default MyRoute