import { useState, useEffect } from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom'

// Imports
import axios from 'axios'

import { getToken } from '../../helpers/auth'
import ImageUpload from '../../helpers/ImageUpload'

// Bootstrap Components
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

const Profile = () => {

  const navigate = useNavigate()

  // ! State
  // errors from axios request
  const [errors, setErrors] = useState(null)

  // Form fields to update
  const [ formFields, setFormFields ] = useState({
    email: '',
    username: '',
    first_name: '',
    last_name: '',
    profile_image: '',
    password: '',
    password_confirmation: '',
  })

  // Get user data from database
  useEffect(() => {
    const getProfile = async () => {
      try {
        const { data } = await axios.get('/api/auth/profile/edit/', {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        })
        setFormFields(data)
      } catch (err) {
        console.log(err.message)
        setErrors(err.message)
      }
    }
    getProfile()
  }, [])

  // ! Executions
  // updates state when a form field is updated
  const handleChange = (e) => {
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
      setFormFields(data)
      navigate('/dashboard')
    } catch (err) {
      console.log(err.message)
      setErrors(err.message)
    }
  }

  return (
    <main className="auth-page">
      <Container className="mt-4">
        {formFields ?
          <>
            <Row className="auth-form-row mb-2">
              <Col lg={4}></Col>
              <Col className="auth-form" sm={10} lg={4}>
                <form className="auth-form" onSubmit={handleSubmit}>
                  <h1 className="auth-form-title">Welcome {formFields.username}</h1>
                  {/* Profile Image */}
                  <ImageUpload
                    formFields={formFields}
                    setFormFields={setFormFields}
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
                  {/* <label htmlFor="password">Password</label>
                  <input 
                    type="password" 
                    name="password" 
                    onChange={handleChange} 
                    value={formFields.password}
                    placeholder="Password" 
                  /> */}
                  {/* Password */}
                  {/* <label htmlFor="password_confirmation">Password confirmation</label>
                  <input 
                    type="password" 
                    name="password_confirmation" 
                    onChange={handleChange} 
                    value={formFields.password_confirmation}
                    placeholder="Password confirmation" 
                  /> */}
                  {/* Error Message */}
                  {errors && <small className='text-danger'>{errors}</small>}
                  {/* Submit */}
                  <Button type="submit" className='button-blue mb-2'>Save</Button>
                </form>
              </Col>
              <Col lg={4}></Col>
            </Row>
          </>
          :
          errors ? <h2>{errors}</h2> : <h2>Loading</h2>
        }
      </Container>
    </main >
  )
}

export default Profile