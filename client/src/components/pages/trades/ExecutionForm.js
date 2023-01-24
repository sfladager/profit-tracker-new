import { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

import { getToken } from '../../../helpers/auth'

// Bootstrap imports
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

// Icons
import { ChevronLeft } from 'react-feather'

const ExecutionForm = ({ handleSubmit, formFields, setFormFields, errors, setErrors, formName }) => {

  // ! Navigation
  const { TradeId, ExecutionId } = useParams()
  
  const navigate = useNavigate()

  // ! State
  const [ execution, setExecution ] = useState([])
  const [ formModel, setFormModel ] = useState([])


  // ! Executions

  // Get values and add to formfields object 
  const handleChange = (e) => {
    // console.log(`${e.target.name} - ${e.target.value}`)
    setFormFields({ ...formFields, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '', message: '' })
  }

  const deleteExecution = async (e) => {
    try {
      await axios.delete(`/api/executions/${ExecutionId}/`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      navigate(`/trades/${TradeId}`)
    } catch (err) {
      console.log(err)
    }
  }



  return (
    <div className="trade-form-page">
      <Container className="mt-4">
        <div className="back-btn-container">
          <Link to={`/trades/${TradeId}`}>
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
              value={formFields.date}
              required
            />
            {/* time */}
            <label htmlFor="time">Time</label>
            <input
              type="time"
              name="time"
              className="trade-form-input"
              onChange={handleChange}
              value={formFields.time}
              placeholder="ex. 13:23:34"
              required
            />
            {/* action*/}
            <label htmlFor="action">Action</label>
            <select
              name="action"
              className="trade-form-input"
              onChange={handleChange}
              value={formFields.action}
            >
              <option value="Select action">Select action</option>
              <option value="buy">buy</option>
              <option value="sell">sell</option>
            </select>
            {/* Quantity */}
            <label htmlFor="quantity">Quantity</label>
            <input
              type="number"
              name="quantity"
              className="trade-form-input"
              onChange={handleChange}
              value={formFields.quantity}
              placeholder="ex. 100"
              required
            />
            {/* Price */}
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
            {formName === 'Edit Execution' ?
              <div className="edit-delete-btns">
                <Button type="submit" className="button-blue btn-50">{formName}</Button>
                <Button onClick={deleteExecution} className="button-red btn-50">delete</Button>
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

export default ExecutionForm