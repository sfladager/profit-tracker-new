import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { getToken } from '../../../helpers/auth'


// Bootstrap
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

// Icons
import { ChevronLeft } from 'react-feather'

const SessionForm = ({ handleSubmit, formFields, setFormFields, errors, setErrors, formName }) => {

  // Get values and add to formfields object 
  const handleChange = (e) => {
    // console.log(`${e.target.name} - ${e.target.value}`)
    setFormFields({ ...formFields, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '', message: '' })
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
            <label htmlFor="date">Date</label>
            <input
              type="date"
              name="date"
              className="trade-form-input"
              onChange={handleChange}
              value={formFields.session_date}
              // placeholder="yyy/mm/dd"
              required
            />
            {/* Rating */}
            <label htmlFor="quantity">Quantity</label>
            <input
              type="number"
              name="quantity"
              className="trade-form-input"
              onChange={handleChange}
              value={formFields.session_rating}
              placeholder="Pick a number 1 - 5 (5 being best)"
              required
            />
            {/* Notes */}
            <label htmlFor="price">Price</label>
            <input
              type="number"
              name="price"
              className="trade-form-input"
              onChange={handleChange}
              value={formFields.price}
              placeholder="ex. 23.48"
              required
            />
            <Button type="submit" className="button-blue">{formName}</Button>
          </form>
        </Container>
      </Container>
    </div>
  )
}

export default SessionForm