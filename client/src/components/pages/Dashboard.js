import { useState, useEffect } from 'react'

import axios from 'axios'

// Bootstrap imports
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { Filter } from 'react-feather'

import { getToken } from '../../helpers/auth'





const Dashboard = () => {

  // ! State
  const [ stats, setStats ] = useState([])
  const [ erros, setErrors ] = useState(null)

  // ! Executions
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/auth/profile/', {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        })
        console.log(data.trades)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [])

  return (
    <Container className="dashboard-container">
      <Row className="quotes">
        <div className="tradingview-widget-container">
          <div className="tradingview-widget-container__widget"></div>
          <div className="tradingview-widget-copyright"> by TradingView</div>
        </div>
      </Row>
      <Row className="account-info-container mt-4">
        <div className="title-box">
          <p>Account Performance</p>
          <Filter />
        </div>
      </Row>
    </Container>
  )
}
export default Dashboard