import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

import { getToken, getPayload } from '../../../helpers/auth'

import ExecutionForm from './ExecutionForm'

// Bootstrap imports
import Container from 'react-bootstrap/Container'


const ExecutionEdit = () => {

  // ! Navigation
  const { TradeId, ExecutionId } = useParams()
  const navigate = useNavigate()

  // ! State
  const [ formFields, setFormFields ] = useState({
    date: '',
    time: '',
    action: '',
    quantity: '',
    price: '',
    trade: parseInt(TradeId),
    owner: 0,
  })

  const [ errors, setErrors ] = useState(null)

  // ! Executions
  useEffect(() => {
    const user = getPayload()
    setFormFields({ ...formFields, owner: user.sub })
  }, [])

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`/api/executions/${ExecutionId}/`, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        })
        // console.log(data)
        setFormFields(data)
      } catch (err) {
        console.log(err)
        setErrors(err.response.data)
      }
    }
    getData()
  }, [])


  // submit edit execution to database
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.put(`/api/executions/${ExecutionId}/`, formFields, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      // console.log('SUCCESS', data)
      navigate(`/trades/${TradeId}`)
    } catch (err) {
      console.log(err.response.data)
      setErrors(err.response.data)
    }
  }

  return (
    <div className="trade-form-page">
      <Container className="trade-form-container mt-4">
        <ExecutionForm
          handleSubmit={handleSubmit} 
          formFields={formFields}
          setFormFields={setFormFields}
          errors={errors}
          setErrors={setErrors}
          formName="Edit Execution" 
        />
      </Container>
    </div>
  )
}

export default ExecutionEdit