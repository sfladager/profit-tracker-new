import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { Scrollbar } from 'react-scrollbars-custom'
import { getToken } from './auth'

const OpenTrades = () => {

  // ! State
  const [ trades, setTrades ] = useState([])
  const [ errors, setErrors ] = useState(null)
  const [ openTrades, setOpenTrades ] = useState([])

  // ! Executions
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/trades/', {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        })
        setTrades(data)
      } catch (err) {
        console.log(err)
        setErrors(err.message)
      }
    }
    getData()
  }, [])

  const getOpenTrades = () => {
    const open = []
    trades.filter(trade => {
      if (!trade.date_closed) {
        open.push(trade)
      }
    })
    // console.log('OPEN', open)
    setOpenTrades(open)
  }

  useEffect(() => {
    getOpenTrades()
  }, [trades])

  return (
    <div className="trades-list-container">
      <Scrollbar className="scrollbar"  style={{ height: 250 }}>
        <div className="open-trades-title">
          <h6>Open trades</h6>
        </div>
        <div className="open-trades-title-heading">
          <p>Open date</p>
          <p>Symbol</p>
          <p>Side</p>
          <p>Setup</p>
        </div>
        {openTrades ?
          openTrades.sort((a, b) => a.date_opened > b.date_opened ? -1 : 1).map(trade => {
            const { id, symbol, side, setup } = trade
            
            return (
              <Link className="trade-list-link" key={id}  to={`/trades/${id}`}>
                <div className="open-trades-row">
                  <div className="open-trades-col"><p>{trade.date_opened}</p></div>
                  <div className="open-trades-col"><p>{symbol}</p></div>
                  <div className="open-trades-col"><p>{side}</p></div>
                  <div className="open-trades-col setup"><p>{setup}</p></div>
                </div>
              </Link>
            )
          })
          :
          errors ? <h2>{errors}</h2> : <h2>Loading</h2>
        }
      </Scrollbar>
    </div>
  )
}

export default OpenTrades