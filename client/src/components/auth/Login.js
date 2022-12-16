import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

// Imports
import axios from 'axios'

import { setToken } from '../../helpers/auth'

// Bootstrap Components
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'


const Login = () => {


  // ! Location Variables
  const navigate = useNavigate()

  // ! State
  const [ formFields, setFormFields ] = useState({
    email: '',
    password: '',
  })

  const [ errors, setErrors ] = useState('')

  // ! Executions
  const handleChange = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/auth/login/', formFields)
      setToken(data.token)
      navigate('/dashboard')
    } catch (err) {
      setErrors(err.message)
    }
  }


  return (
    <div className="auth-page">
      <Container className="mt-4">
        <Row className="auth-form-row">
          <Col lg={4}></Col>
          <Col className="auth-form" sm={10} lg={4}>
            <form className="auth-form" onSubmit={handleSubmit}>
              <h1 className="auth-form-title">Sign in</h1>
              {/* Email */}
              <label htmlFor="email">Email <span>*</span></label>
              <input 
                type="email" 
                name="email" 
                onChange={handleChange} 
                value={formFields.email} 
                placeholder="Email Address"
                required
              />
              {/* Password */}
              <label htmlFor="password">Password <span>*</span></label>
              <input 
                type="password" 
                name="password" 
                onChange={handleChange} 
                value={formFields.password} 
                placeholder="Password" 
                required
              />
              {/* Error Message */}
              {errors && <small className='text-danger'>{errors}</small>}
              {/* Submit */}
              <Button type="submit" className='button-blue'>Sign In</Button>
            </form>
          </Col>
          <Col lg={4}></Col>
        </Row>
        <footer className="auth-footer">
          <p>Need to create an account?
            <Link type="submit" to="/register"><span className="sign-in">Sign up</span></Link>
          </p>
        </footer>
      </Container>
    </div>
  )
}

export default Login