import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

import { getToken } from '../../../helpers/auth'

// Bootstrap imports
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

const ExecutionForm = ({ handleSubmit, formFields, setFormFields, errors, setErrors, formName }) => {

  // ! Navigation
  const { TradeId } = useParams()

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

  // Get data from blogs to populate categories ang tags dropdowns
  useEffect(() => {
    // const getData = async () => {
    //   try {
    //     const data  = await axios.post('/api/executions/',  formFields, {
    //       headers: {
    //         Authorization: `Bearer ${getToken()}`,
    //       },
    //     })
    //     console.log(data)
        
    //   } catch (err) {
    //     console.log(err)
    //   }
    // }
    // const getForm = async () => {
    //   try {
    //     const data  = await axios.get('/api/trades/form/',  {
    //       headers: {
    //         Authorization: `Bearer ${getToken()}`,
    //       },
    //     })
    //     console.log(data)
    //     setFormModel(data)
    //   } catch (err) {
    //     console.log(err)
    //   }
    // }
    // getForm()
  }, [])



  return (
    <div className="trade-form-page">
      <Container className="trade-form-container mt-4">
        <div className="back-btn-container">
          <Link to={`/trades/${TradeId}`}>
            <button className="back-btn">Back</button>
          </Link>
        </div>
        <h1>{formName}</h1>
        <form onSubmit={handleSubmit}>
          <Container>
            {/* Date */}
            <label htmlFor="date">Date</label>
            <input
              type="date"
              name="date"
              className="trade-form-input"
              onChange={handleChange}
              value={formFields.date}
              // placeholder="yyy/mm/dd"
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
            <button type="submit">{formName}</button>
          </Container>
        </form>
      </Container>
    </div>
  )
}

export default ExecutionForm