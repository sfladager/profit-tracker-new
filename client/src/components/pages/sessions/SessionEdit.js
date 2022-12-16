import { useEffect, useState } from 'react'
import { useNavigate,useParams, Link } from 'react-router-dom'
import axios from 'axios'
import { getToken, getPayload } from '../../../helpers/auth'

import SessionForm from './SessionForm'

// Bootstrap
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'



const SessionNew = () => {

  // ! Navigation
  // ! Location Variables
  const { SessionId } = useParams()
  const navigate = useNavigate()

  // ! State
  const [ formFields, setFormFields ] = useState({
    session_date: '',
    session_rating: '',
    session_notes: '',
    owner_of_session: 0,
  })

  const [ errors, setErrors ] = useState(null)

  // ! Executions

  useEffect(() => {
    const user = getPayload()
    setFormFields({ ...formFields, owner_of_session: user.sub })
  }, [])

  // GET session data
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`/api/sessions/${SessionId}`, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        })
        // console.log(data)
        setFormFields(data)
      } catch (err) {
        console.log(err)
        setErrors(err)
      }
    }
    getData()
  }, [SessionId])


  // send updates to database
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.put(`/api/sessions/${SessionId}/`, formFields, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      console.log('SUCCESS', data)
      navigate('/sessions/')
    } catch (err) {
      console.log(err)
      setErrors(err)
    }
  }

  return (
    <div className="trade-form-page">
      <Container className="trade-form-container mt-4">
        <SessionForm
          handleSubmit={handleSubmit} 
          formFields={formFields}
          setFormFields={setFormFields}
          errors={errors}
          setErrors={setErrors}
          formName="Edit Session" 
        />
      </Container>
    </div>
  )
}

export default SessionNew