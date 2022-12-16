import { useState, useEffect } from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { getToken } from '../../../helpers/auth'
import TextEditor from '../../editor/TextEditor'

// Bootstrap
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'

// Icons
import { ChevronLeft } from 'react-feather'

const SessionForm = ({ handleSubmit, formFields, setFormFields, errors, setErrors, formName }) => {

  // ! Navigation
  const { SessionId } = useParams()
  const navigate = useNavigate()

  // Get values and add to formfields object 
  const handleChange = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '', message: '' })
  }
  const [ error, setError ] = useState(null)
  
  const deleteSession = async (e) => {
    try {
      await axios.delete(`/api/sessions/${SessionId}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      navigate('/sessions/')
    } catch (err) {
      console.log(err)
    }
  }


  return (
    <div className="trade-form-page">
      <Container className="mt-4">
        <div className="back-btn-container">
          <Link to={'/sessions'}>
            <ChevronLeft className="back-btn" />
          </Link>
        </div>
        <Container className="trade-form-container">
          <h1>{formName}</h1> 
          <form className="trade-form" onSubmit={handleSubmit}>
            {/* Date */}
            <label htmlFor="session_date">Date</label>
            <input
              type="date"
              name="session_date"
              className="trade-form-input"
              onChange={handleChange}
              value={formFields.session_date}
              // placeholder="yyy/mm/dd"
              required
            />
            {/* Rating */}
            <label htmlFor="session_rating">Rating</label>
            <input
              type="number"
              name="session_rating"
              className="trade-form-input"
              onChange={handleChange}
              value={formFields.session_rating}
              placeholder="Pick a number 1 - 5 (5 being best)"
              required
            />
            {/* Notes */}
            <label htmlFor="session_notes">Notes</label>
            <TextEditor
              formFields={formFields}
              setFormFields={setFormFields}
            />
            {errors ? <p>{errors.session_trades}</p> : ''}
            {formName === 'Edit Session' ?
              <div className="edit-delete-btns">
                <Button type="submit" className="button-blue btn-50">{formName}</Button>
                <Button onClick={deleteSession} className="button-red btn-50">delete</Button>
              </div>
              :
              <Button type="submit" className="button-blue">{formName}</Button>
            }
          </form>
        </Container>
      </Container>
    </div>
  )
}

export default SessionForm