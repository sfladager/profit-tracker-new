import { useState, useEffect } from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom'

// Imports
import axios from 'axios'

import { getToken } from '../../helpers/auth'

// Bootstrap Components
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

const Profile = () => {

  // ! State
  // profileData is variable used to store save profile data to populate form
  const [profileData, setProfileData] = useState(null)
  // errors from axios request
  const [errors, setErrors] = useState(false)

  //error to displat data on page
  const [ error, setError ] = useState('')

  // Form fields to update
  const [ formFields, setFormFields ] = useState({
    email: '',
    username: '',
    first_name: '',
    last_name: '',
    profile_image: '',
    password: '',
  })

  // Get user data from database
  useEffect(() => {
    const getProfile = async () => {
      try {
        const { data } = await axios.get('/api/auth/profile/', {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        })
        setFormFields(data)
      } catch (err) {
        console.log(err)
        setErrors(true)
      }
    }
    getProfile()
  }, [])

  // ! Executions
  // updates state when a form field is updated
  const handleChange = (e) => {
    console.log(formFields)
    setFormFields({ ...formFields, [e.target.name]: e.target.value })
  }

  // submits data to update user infor
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.put('/api/auth/profile/', formFields, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      console.log(data)
      setFormFields(data)
      //navigate('/dashboard')
    } catch (err) {
      setError(err.response.data.message)
    }
  }

  return (
    <main className="auth-page">
      <Container className="mt-4">
        {formFields ?
          <>
            <Row className="auth-form-row">
              <Col lg={4}></Col>
              <Col className="auth-form" sm={10} lg={4}>
                <form className="auth-form" onSubmit={handleSubmit}>
                  <h1 className="auth-form-title">{formFields.username}</h1>
                  {/* Profile Image */}
                  <div className="profile-image">
                    <img src={formFields.profile_image} alt="User profile image" />
                  </div>
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
                  {/* Username */}
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    name="username"
                    onChange={handleChange}
                    value={formFields.username}
                    placeholder="Username"
                  />
                  {/* First name */}
                  <label htmlFor="first_name">First name</label>
                  <input
                    type="text"
                    name="first_name"
                    onChange={handleChange}
                    value={formFields.first_name}
                    placeholder="First name"
                  />
                  {/* Last name */}
                  <label htmlFor="last_name">Last name</label>
                  <input
                    type="text"
                    name="last_name"
                    onChange={handleChange}
                    value={formFields.last_name}
                    placeholder="Last name"
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
                  {/* Error Message */}
                  {error && <small className='text-danger'>{error}</small>}
                  {/* Submit */}
                  <Button type="submit" className='button-blue'>Save</Button>
                </form>
              </Col>
              <Col lg={4}></Col>
            </Row>
            <footer className="auth-footer">
              <p>Need to create an account?
                <Link type="submit" to="/register"><span className="sign-in">Sign up</span></Link>
              </p>
            </footer>
          </>
          :
          <>
            errors ? <h2>Something went wrong! Please try again later!</h2> : <h2>Loading</h2>
          </>
        }
      </Container>
    </main >
  )
}

export default Profile