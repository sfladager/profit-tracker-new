import { useEffect, useState } from 'react'
import { useFetcher, Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { getToken } from '../../../helpers/auth'


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

  // Get sessoin from database
  const getSession = async (e) => {
    try {
      const { data }  = await axios.get('/api/sessions/', {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      console.log('SUCCESS', data)
      console.log('ID', data.id)
      // setSessionData(data)
    } catch (err) {
      console.log(err.response.data)
      setErrors(err.response.data)
    }
  }

  // useEffect(() => {
  //   sessionsList.map(session => {
  //     if (document.body.classList.contains('rating-p')) {
  //       if (session.session_rating > 3) {
  //         return document.body.classList.add('green')
  //       }
  //     }
  //   })
  // }, [sessionsList])

  return (
    
    <div className="sessions-page-container">

      <div className="session-list-view">
        <div className="session-list-heading">
          <h1>Trading Sessions</h1>
          <Link to={'/sessions/single/add'}>
            <PlusSquare className="add-session-btn" />
          </Link>
        </div>
        {sessionsList ?
          sessionsList.map(session => {
            return (
              <div key={session.id} onClick={getSession} className="session-tile">
                <div className="date-box">
                  <p>Date:</p>
                  <p className="session-date">{session.session_date}</p>
                </div>
                <p className="rating-p">{session.session_rating}</p>
              </div>
            )
          })
          :
          errors ? <p>Something went wrong, try again later.</p> : <p>Loading...</p>
        }
      </div>
      <div className="session-main-view">
        <div className="sesion-main-heading">
          <p>Session Date:</p>
          <p>Session rating:</p>
          <Button className="edit-btn">Edit</Button>
        </div>
        <div className="sesion-stats">
          <p>SESSION STATS GO HERE</p>
        </div>
        <div className="session-main-body">
          <p>Notes:</p>
          <p>Editor notes goes here</p>
        </div>
      </div>

    </div>

  )
}

export default SessionsAll