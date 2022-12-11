import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { getToken } from '../../../helpers/auth'

import TradeForm from './TradeForm'

// Bootstrap
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

const TradeNew = () => {

  // ! Navigation
  const navigate = useNavigate()

  // ! State
  const [ formFields, setFormFields ] = useState({
    date_opened: '',
    date_closed: '',
    asset_class: '',
    trade_type: '',
    side: '',
    symbol: '',
    timeframe: '',
    target: '',
    stoploss: '',
    expected_r: '',
    setup: '',
    mistakes: '',
    notes: '',
    owner_of_trade: '',
  })

  const [ errors, setErrors ] = useState(null)

  // ! Execution
  // submit trade to database
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/trades/', formFields, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      console.log('SUCCESS', data)
      // navigate(`/blogs/${data._id}`)
    } catch (err) {
      console.log(err.response.data)
      setErrors(err.response.data)
    }
  }

  return (
    <main className="trade-form-page">
      <TradeForm
        handleSubmit={handleSubmit} 
        formFields={formFields}
        setFormFields={setFormFields}
        errors={errors}
        setErrors={setErrors}
        formName="Add Trade" 
      />
    </main>
  )
}

export default TradeNew