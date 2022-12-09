import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

// Imports
import axios from 'axios'

// Bootstrap Components
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

const Register = () => {
  // ! Location Variables
  // useNavigate() executed returns back the function we need to use to navigate around our React App
  const navigate = useNavigate()

  // ! State
  const [ formFields, setFormFields ] = useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
    trades: [],
  })

  const [ error, setError ] = useState('')


  // ! Executions

  // Submitting the form
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/api/auth/register/', formFields)
      console.log('Registration successful')
      navigate('/dashboard')
    } catch (err) {
      console.log(err.response.data.message)
      setError(err.response.data.message)
    }
  }

  // Update formFields state when input changes
  const handleChange = (e) => {
    const updatedFormFields = { 
      ...formFields,
      [e.target.name]: e.target.value,
    }
    
    setFormFields(updatedFormFields)

    // Sets errors back to empty string 
    if (error) setError('')
  }


  return (
    <div className="auth-page">
      <Container className="mt-4">
        <Row className="auth-form-row">
          <Col lg={4}></Col>
          <Col className="auth-form" sm={10} lg={4}>
            <form className="auth-form" onSubmit={handleSubmit}>
              <h1 className="auth-form-title">Sign up with email</h1>
              {/* Username */}
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                onChange={handleChange}
                value={formFields.username}
                placeholder="Username"
                required
              />
              {/* Email */}
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                name="email" 
                onChange={handleChange} 
                value={formFields.email} 
                placeholder="Email Address"
                required
              />
              {/* Password */}
              <label htmlFor="password">Password</label>
              <input 
                type="password" 
                name="password" 
                onChange={handleChange} 
                value={formFields.password} 
                placeholder="Password" 
                required
              />
              {/* PasswordConfirmation */}
              <label htmlFor="password_confirmation">Confirm Password</label>
              <input 
                type="password" 
                name="password_confirmation" 
                onChange={handleChange} 
                value={formFields.password_confirmation}  
                placeholder="Confirm Password" 
                required
              />
              {/* Error Message */}
              {error && <small className='text-danger'>{error}</small>}
              {/* Submit */}
              <Button type="submit" className='button-blue'>Create account</Button>
            </form>
          </Col>
          <Col lg={4}></Col>
        </Row>
        <footer className="auth-footer">
          <p>Already have an account?
            <Link to="/login"><span className="sign-in">Sign in</span></Link>
          </p>
        </footer>
      </Container>
    </div>
  )
}

export default Register