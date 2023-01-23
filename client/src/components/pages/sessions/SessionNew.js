import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { getToken, getPayload } from '../../../helpers/auth'

import SessionForm from './SessionForm'

// Bootstrap
import Container from 'react-bootstrap/Container'



const SessionNew = () => {

  // ! Navigation
  const navigate = useNavigate()

  // ! State
  const [ formFields, setFormFields ] = useState({
    session_date: '',
    session_rating: '',
    session_notes: '',
    session_trades: [],
    owner_of_session: getPayload().sub,
  })
  const [ trades, setTrades ] = useState([])
  const [ errors, setErrors ] = useState(null)

  // ! Executions

  //GET trade data to search for trades made during that session.
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/trades/', {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        })
        // console.log(data)
        setTrades(data)
      } catch (err) {
        console.log(err)
        setErrors(err.response.data)
      }
    }
    getData()
  }, [])

  // submit execution to database
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/sessions/', formFields, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      // console.log('SUCCESS', data)
      navigate('/sessions')
    } catch (err) {
      console.log(err.response.data)
      setErrors(err.response.data)
    }
  }
  // Select trades were opened on the day of the session
  useEffect(() => {
    const sessionTrades = []
    if (trades) {
      trades.map(trade => {
        if (trade.date_opened === formFields.session_date) {
          // console.log('trade match', trade)
          sessionTrades.push(trade.id)
        }
      }
      )
    }
    // console.log(sessionTrades)
    setFormFields({ ...formFields, session_trades: sessionTrades })
  }, [trades, formFields.session_date])

  return (
    <div className="trade-form-page">
      <Container className="trade-form-container mt-4">
        <SessionForm
          handleSubmit={handleSubmit} 
          formFields={formFields}
          setFormFields={setFormFields}
          errors={errors}
          setErrors={setErrors}
          formName="Add Session" 
        />
      </Container>
    </div>
  )
}

export default SessionNew