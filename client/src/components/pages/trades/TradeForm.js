import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import { getToken } from '../../../helpers/auth'

// Bootstrap imports
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'

// Icons
import { ChevronLeft } from 'react-feather'



const TradeForm = ({ handleSubmit, formFields, setFormFields, errors, setErrors, formName }) => {

  // ! State
  const [ tradeModel, setTradeModel ] = useState([])
  const [ formModel, setFormOptions ] = useState([])


  // ! Executions

  // Get values and add to formfields object 
  const handleChange = (e) => {
    // console.log(`${e.target.name} - ${e.target.value}`)
    setFormFields({ ...formFields, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '', message: '' })
  }

  // Get data from trades to populate categories ang tags dropdowns
  useEffect(() => {
    const getData = async () => {
      try {
        const { data }  = await axios.get('/api/trades/',  {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        })
        setTradeModel(data)
      } catch (err) {
        console.log(err)
      }
    }
    const getForm = async () => {
      try {
        const { data }  = await axios.get('/api/trades/form/',  {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        })
        setFormOptions(data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
    getForm()
  }, [])

  const deleteExecution = async (e) => {
    try {
      await axios.delete(`/api/trades/${TradeId}`, {
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
      <Container className="trade-form-container mt-4">
        <div className="back-btn-container">
          <Link to={'/trades'}>
            <ChevronLeft className="back-btn" />
          </Link>
        </div>
        <Container className="trade-form-container">
          <h1>{formName}</h1>
          <form className="trade-form" onSubmit={handleSubmit}>
            {/* Date opened */}
            <label htmlFor="date_opened">Date opened <span className="required">*</span></label>
            <input
              type="date"
              name="date_opened"
              className="trade-form-input"
              onChange={handleChange}
              value={formFields.date_opened}
              required
            />
            {/* Dropdown selectors class */}
            {formModel && formModel.map((data, i)=> {
              
              return (
                <>
                  <label key={i} htmlFor={data.name}>{data.name.includes('_') ? 
                    data.name.charAt(0).toUpperCase() + data.name.slice(1).replace('_', ' ') 
                    :  
                    data.name.charAt(0).toUpperCase() + data.name.slice(1)}
                  </label>
                  <select 
                    name={data.name} 
                    className="trade-form-input" 
                    onChange={handleChange}
                    value={formFields.item}
                  >
                    {data.choices && data.choices.map((item, i) => {
                      return (
                        <option key={i} value={item[0]}>{item[1]}</option>
                      )
                    })}
                  </select>
                </>
              )
            })}
            {/* Symbol */}
            <label htmlFor="symbol">Symbol</label>
            <input
              type="text"
              name="symbol"
              className="trade-form-input"
              onChange={handleChange}
              value={formFields.symbol}
              placeholder="Ex. AAPL"
              required
            />
            {/* Target */}
            <label htmlFor="target">Target</label>
            <input
              type="number"
              name="target"
              className="trade-form-input"
              onChange={handleChange}
              value={formFields.target}
              placeholder="Ex. 45.75"
            />
            {/* Stoploss */}
            <label htmlFor="stoploss">Stoploss</label>
            <input
              type="text"
              name="stoploss"
              className="trade-form-input"
              onChange={handleChange}
              value={formFields.stoploss}
              placeholder="Ex. 45.00"
            />
            {/* Expected R */}
            <label htmlFor="expected_r">Expected R</label>
            <input
              type="text"
              name="expected_r"
              className="trade-form-input"
              onChange={handleChange}
              value={formFields.expected_r}
              placeholder="Ex. 2.0"
            />
            {/* Setup */}
            <label htmlFor="setup">Setup</label>
            <input
              type="text"
              name="setup"
              className="trade-form-input"
              onChange={handleChange}
              value={formFields.setup}
              placeholder="Ex. Dip buy"
            />
            {/* Mistakes */}
            <label htmlFor="mistakes">Mistakes</label>
            <input
              type="text"
              name="mistakes"
              className="trade-form-input"
              onChange={handleChange}
              value={formFields.mistakes}
              placeholder="Ex. Didn't follow plan"
            />
            {/* Notes */}
            <label htmlFor="notes">Notes</label>
            <textarea 
              name="notes"
              className="trade-form-input"
              rows="10"
              onChange={handleChange}
              value={formFields.notes}
              placeholder="Add some notes about the trade"
            ></textarea>
            {formName === 'Edit Trade' ?
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

export default TradeForm