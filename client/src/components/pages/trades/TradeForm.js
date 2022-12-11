import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import { getToken } from '../../../helpers/auth'

// Bootstrap imports
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'



const TradeForm = ({ handleSubmit, formFields, setFormFields, errors, setErrors, formName }) => {

  // ! State
  const [ tradeModel, setTradeModel ] = useState([])
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
    const getData = async () => {
      try {
        const data  = await axios.get('/api/trades/',  {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        })
        console.log(data)
        setTradeModel(data)
      } catch (err) {
        console.log(err)
      }
    }
    const getForm = async () => {
      try {
        const data  = await axios.get('/api/trades/form/',  {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        })
        console.log(data)
        setFormModel(data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
    getForm()
  }, [])



  return (
    <div className="trade-form-page">
      <Container className="trade-form-container mt-4">
        <div className="back-btn-container">
          <Link to={'/trades'}>
            <button className="back-btn">Back</button>
          </Link>
        </div>
        <h1>{formName}</h1>
        <form onSubmit={handleSubmit}>
          <Container>
            {/* Date opened */}
            <label htmlFor="date-opened">Date opened <span className="required">*</span></label>
            <input
              type="date"
              name="date-opened"
              className="trade-form-input"
              onChange={handleChange}
              value={formFields.date_opened}
              // placeholder="yyy/mm/dd"
              required
            />
            {/* Date closed */}
            <label htmlFor="date-closed">Date closed</label>
            <input
              type="date"
              name="date-closed"
              className="trade-form-input"
              onChange={handleChange}
              value={formFields.date_closed}
              // placeholder="yyy/mm/dd"
            />
            {/* Asset class */}
            <label htmlFor="asset-class">Asset class</label>
            <input
              type="text"
              name="asset-class"
              className="trade-form-input"
              onChange={handleChange}
              value={formFields.asset_class}
              placeholder="Asset class"
              required
            />
            {/* Symbol */}
            <label htmlFor="symbol">Symbol</label>
            <input
              type="text"
              name="symbol"
              className="trade-form-input"
              onChange={handleChange}
              value={formFields.symbol}
              placeholder="Symbol"
              required
            />
          </Container>

        </form>
      </Container>
    </div>
  )
}

export default TradeForm