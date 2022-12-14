import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

import { getToken, getPayload } from '../../../helpers/auth'

import TradeForm from './TradeForm'

const TradeEdit = () => {
  // ! Navigation
  const { TradeId } = useParams()
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

  // ! Executions
  useEffect(() => {
    const user = getPayload()
    setFormFields({ ...formFields, owner_of_trade: user.sub })
  }, [])

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`/api/trades/${TradeId}/`, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        })
        console.log(data)
        setFormFields(data)
      } catch (err) {
        console.log(err)
        setErrors(err.response.data)
      }
    }
    getData()
  }, [])


  // submit edit trade to database
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.put(`/api/trades/${TradeId}/`, formFields, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      console.log('SUCCESS', data)
      navigate(`/trades/${TradeId}`)
    } catch (err) {
      console.log(err.response.data)
      setErrors(err.response.data)
    }
  }

  return (
    <div className="trade-form-page">
      <TradeForm
        handleSubmit={handleSubmit} 
        formFields={formFields}
        setFormFields={setFormFields}
        errors={errors}
        setErrors={setErrors}
        formName="Edit Trade" 
      />
    </div>
  )
}

export default TradeEdit