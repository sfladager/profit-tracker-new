import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { Scrollbar } from 'react-scrollbars-custom'

// Bootstrap imports
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

import { getToken } from '../../../helpers/auth'

// icons
import { PlusSquare, ChevronLeft } from 'react-feather'

const Trades = () => {

  // ! Navigation
  const { TradeId } = useParams()

  // ! State
  const [ trades, setTrades ] = useState([])
  const [ errors, setErrors ] = useState(null)

  // ! Executions
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/trades/', {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        })
        console.log(data)
        setTrades(data)
      } catch (err) {
        console.log(err)
        setErrors(err.response.data)
      }
    }
    getData()
  }, [])



  return (
    <div className="trades-list-page">
      <Container className="trades-metrics-container mt-1"></Container>
      <Container className="trades-filter-container mt-2"></Container>
      <div className="trades-title-container mt-1">
        <div className="trades-page-title-box">
          <h3>Trades</h3>
          <Link className="add-btn" to={'/trades/trade/add'}>
            <PlusSquare className="add-btn" />
          </Link>
        </div>
      </div>
      <div className="trades-list-container">
        <Scrollbar className="scrollbar"  style={{ height: 600 }}>
          <div className="trades-page-title-heading">
            <p>status</p>
            <p>open date</p>
            <p>Symbol</p>
            <p>Side</p>
            <p>Return $</p>
            <p>Return %</p>
            <p>Setup</p>
          </div>
          {trades ?
            trades.map(trade => {
              const { id, symbol, side, setup } = trade
              
              return (
                <Link className="trade-list-link" key={id}  to={`/trades/${id}`}>
                  <div className="trade-list-row">
                    {trade.date_closed ?
                      trade.net_return > 0 ? <p className="status win">Win</p> : <p className="status loss">Loss</p>
                      :
                      <p className="status open">Open</p>
                    }
                    <div className="trade-list-col">{trade.date_opened}</div>
                    <div className="trade-list-col">{symbol}</div>
                    <div className="trade-list-col">{side}</div>
                    <div className="trade-list-col">$ {trade.net_return}</div>
                    <div className="trade-list-col">{trade.percent_return} %</div>
                    <div className="trade-list-col">{setup}</div>
                  </div>
                </Link>
                
              )
            })
            :
            errors ? <h2>Something went wrong! Please try again later!</h2> : <h2>Loading</h2>
          }
        </Scrollbar>
      </div>
    </div>
  )
}

export default Trades