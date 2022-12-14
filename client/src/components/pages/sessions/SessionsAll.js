import { useEffect, useState } from 'react'
import { Link, useParams, request } from 'react-router-dom'
import axios from 'axios'
import { getToken } from '../../../helpers/auth'
import parse from 'html-react-parser'

import { Scrollbar } from 'react-scrollbars-custom'

// Bootstrap
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

// Icons
import { PlusSquare } from 'react-feather'

const SessionsAll = () => {
  // ! Navigation
  
  const { SessionId } = useParams()

  // ! State
  const [ sessionsList, setSessionsList ] = useState([])
  const [ sessionData, setSessionData ] = useState({})

  const [ errors, setErrors ] = useState(null)

  // ! Executions
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/sessions/', {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        })
        console.log(data)
        setSessionsList(data)
      } catch (err) {
        console.log(err)
        setErrors(err.response.data)
      }
    }
    getData()
  }, [])

  // Get session from database
  const getSession = async (e) => {
    console.log(e.target.id)
    try {
      const { data } = await axios.get(`api/sessions/${e.target.id}/`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      console.log('SUCCESS', data)
      setSessionData(data)
    } catch (err) {
      console.log(err.response.data)
      setErrors(err.response.data)
    }
  }

  return (
    
    <div className="sessions-page-container">

      <div className="session-list-view">
        <div className="session-list-heading">
          <h1>Trading Sessions</h1>
          <Link to={'/sessions/single/add'}>
            <PlusSquare className="add-btn" />
          </Link>
        </div>
        <Scrollbar>
          {sessionsList ?
            sessionsList.sort((a, b) => a.session_date > b.session_date ? -1 : 1).map(session => {
              return (
                  
                <div onClick={getSession} id={session.id}  key={session.id} className="session-tile">
                  <div className="date-box">
                    <p>Date:</p>
                    <p className="session-date">{session.session_date}</p>
                  </div>
                  {session.session_rating === 3 ? 
                    <p className="rating-p open">{session.session_rating}</p> 
                    : 
                    session.session_rating > 3 ? 
                      <p className="rating-p win">{session.session_rating}</p> 
                      :
                      <p className="rating-p loss">{session.session_rating}</p> 
                  }
                  
                </div>

              )
            })
            :
            errors ? <p>Something went wrong, try again later.</p> : <p>Loading...</p>
          }
        </Scrollbar>
      </div>
      <div className="session-main-view">
        {sessionData ? 
          <>
            <div className="sesion-main-heading">
              <p>Session Date: <span>{sessionData.session_date}</span></p>
              <p>Session rating: <span>{sessionData.session_rating}</span></p>
              <Link to={`/sessions/${sessionData.id}/edit`}>
                <Button className="edit-btn">Edit</Button>
              </Link>
            </div>
            <div className="sesion-stats">
              <p>SESSION STATS GO HERE</p>
            </div>
            <div className="session-main-body">
              <p className="session-notes-title">Notes:</p>
              <p>{sessionData.session_notes && parse(sessionData.session_notes) }</p>
            </div>
          </>
          :
          errors ? <p>Something went wrong! Try again later</p> : <p>Loading...</p>
        }
      </div>

    </div>

  )
}

export default SessionsAll