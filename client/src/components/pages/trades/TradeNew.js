import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { getToken, getPayload } from '../../../helpers/auth'

import TradeForm from './TradeForm'

const TradeNew = () => {

  // ! Navigation
  const navigate = useNavigate()

  // ! State
  const [ formFields, setFormFields ] = useState({
    date_opened: '',
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
    owner_of_trade: 0,
  })

  const [ errors, setErrors ] = useState(null)

  useEffect(() => {
    const user = getPayload()
    setFormFields({ ...formFields, owner_of_trade: user.sub })
  }, [])


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
      navigate(`/trades/${data.id}`)
    } catch (err) {
      console.log(err)
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
        formName="Add Trade" 
      />
    </div>
  )
}

export default TradeNew