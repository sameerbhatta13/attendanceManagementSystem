import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { authenticate, isAuthenticated, signin } from '../auth';

const Login = () => {
  const navigate = useNavigate()
  const { user } = isAuthenticated() || {}
  const [values, setValues] = useState({
    email: '',
    password: '',
    error: '',
    redirectTo: false
  })

  const { email, password, error, redirectTo } = values

  // Handling the input
  const handlechange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await signin({ email, password })
     
      if (data?.error) {
          setValues({ ...values, error: data.error })
        } else {
          localStorage.setItem('user', JSON.stringify(data.user));
          authenticate(data, () => {
            setValues({ ...values, redirectTo: true })
          })
        }
      }
     catch (err) {
      setValues({ ...values, error: 'something went wrong' })
    }
  }
  useEffect(() => {
    if (redirectTo) {
      const dashboard = user?.role === "admin" ? '/admin/dashboard' : '/user/dashboard';
      navigate(dashboard);
    }
  }, [redirectTo, navigate, user]);

  // Show error message
  const showError = () => (
    error ? <div className='alert alert-danger'>{error}</div> : null
  )



  return (
    <div className="container my-5">
      <div className="row d-flex justify-content-center">
        <div className="col-md-5 shadow p-3">
          <form onSubmit={handleSubmit}>
            {showError()}
            <div className="mb-2">
              <h3><u>Login</u></h3>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                className="form-control"
                onChange={handlechange('email')}
                value={email}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                className="form-control"
                onChange={handlechange('password')}
                value={password}
              />
            </div>
            <button type="submit" className="btn btn-primary" >Signin</button>
          </form>
          <div className="mt-3 text-center">
            <p>Not registered? <Link to="/register">Register Now</Link></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;
