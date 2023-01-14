import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

import { getToken } from '../../../helpers/auth'
import { Scrollbar } from 'react-scrollbars-custom'
import ChartWidget from '../../charts/ChartWidget'
import TickerInfo from '../../../helpers/TickerInfo'

// Bootstrap imports
import Button from 'react-bootstrap/Button'

// icons
import { PlusSquare, ChevronLeft } from 'react-feather'

const TradeSingle = () => {
  // ! State
  const [trade, setTrade] = useState(null)
  const [executions, setExecutions] = useState(null)
  const [errors, setErrors] = useState(null)

  const { TradeId } = useParams()
  const navigate = useNavigate()

  // ! Execution
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`/api/trades/${TradeId}/`, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        })
        setExecutions(data.executions)
        setTrade(data)
      } catch (err) {
        console.log(err.response.data['detail'])
        setErrors(err.response.data['detail'])
      }
    }
    getData()
  }, [TradeId])

  return (
    <div className="trade-single-page">
      <div className="trade-page-container mt-4">
        <div className="back-btn-container">
          <Link to={'/trades'}>
            <ChevronLeft className="back-btn" />
          </Link>
        </div>
        <div className="trade-recap-container">
          <div className="trade-info-side">
            {trade ? 
              <>
                <div className="trade-heading-box">
                  <div className="trade-heading-box-top">
                    <TickerInfo
                      trade={trade}
                    />
                    <p className="symbol">{trade.symbol}</p>
                  </div>
                  <div className="trade-status-box">
                    <h1>Trade Stats</h1>
                    <Link to={`/trades/${TradeId}/edit`}>
                      <Button className="edit-btn ">Edit</Button>
                    </Link>
                    {trade.date_closed ? 
                      trade.net_return > 0 ? <p className="status win">Win</p> : <p className="status loss">Loss</p> 
                      :
                      <p className="status open">Open</p>
                    }
                  </div>
                </div>
                <div className="trade-stats-box">
                  <div className="single-stat">
                    <p>Date Opened:</p>
                    <p>{trade.date_opened}</p>
                  </div>
                  <div className="single-stat">
                    <p>Date Closed:</p>
                    <p>{trade.date_closed}</p>
                  </div>
                  <div className="single-stat">
                    <p>Asset Class:</p>
                    <p>{trade.asset_class}</p>
                  </div>
                  <div className="single-stat">
                    <p>Trade type:</p>
                    <p>{trade.trade_type}</p>
                  </div>
                  <div className="single-stat">
                    <p>Trade side:</p>
                    <p>{trade.side}</p>
                  </div>
                  <div className="single-stat">
                    <p>Timeframe:</p>
                    <p>{trade.timeframe}</p>
                  </div>
                  <div className="single-stat">
                    <p>Target:</p>
                    <p>${trade.target}</p>
                  </div>
                  <div className="single-stat">
                    <p>Stoploss:</p>
                    <p>${trade.stoploss}</p>
                  </div>
                  <div className="single-stat">
                    <p>expected R:</p>
                    <p>{trade.expected_r}</p>
                  </div>
                  <div className="single-stat">
                    <p>Avg buy price:</p>
                    <p>${trade.avg_buy_price}</p>
                  </div>
                  <div className="single-stat">
                    <p>Avg sell price:</p>
                    <p>${trade.avg_sell_price}</p>
                  </div>
                  <div className="single-stat">
                    <p>Total cost:</p>
                    <p>${trade.total_cost}</p>
                  </div>
                  <div className="single-stat">
                    <p>Gross return:</p>
                    <p>${trade.gross_return}</p>
                  </div>
                  <div className="single-stat">
                    <p>Net return:</p>
                    <p>${trade.net_return}</p>
                  </div>
                  <div className="single-stat">
                    <p>Return %:</p>
                    <p>{trade.percent_return}</p>
                  </div>
                  <div className="single-stat">
                    <p>Net R:</p>
                    <p>{trade.net_R}</p>
                  </div>
                  <div className="single-stat">
                    <p>Total commisions:</p>
                    <p>${trade.total_commission}</p>
                  </div>
                </div>
              </>
              :
              errors ? <p>{errors}</p> : <p>Loading...</p>
            }
            <div className="execution-list">
              <div className="execution-title-box">
                <h3>Executions</h3>
                <Link className="add-btn" to={`/trades/${TradeId}/execution/add`}>
                  <PlusSquare className="add-btn" />
                </Link>
              </div>
              <Scrollbar className="scrollbar"  style={{ height: 200 }} >
                {executions ? 
                  executions.sort((a, b) => a.date > b.date ? -1 : 1).map(execution => {
                    const { id, action, date, time, quantity, price } = execution
                    return (
                      <Link className="execution-link" key={id} to={`/trades/${TradeId}/execution/${id}`}>
                        <div className="execution-box">
                          <div className="execution-box-top">
                            <p>Date: <span>{date}</span></p>
                            <p>Price: <span>{price}</span></p>
                          </div>
                          <div className="execution-box-bottom">
                            <div className="execution-box-left">
                              <p>Time: <span>{time}</span></p>
                              <p>Quantity: <span>{quantity}</span></p>
                            </div>
                            {action === 'buy' ? <p className="status win">Buy</p> : <p className="status loss">Sell</p>}
                          </div>
                        </div>
                      </Link>
                      
                    )
                  })
                  :
                  errors ? <p>{errors}</p> : <p>Loading...</p>
                }
              </Scrollbar>
            </div>
          </div>
          <div className="trade-info-large">
            {trade ? 
              <>
                <div className="trade-chart">
                  <ChartWidget
                    trade={trade}
                  />
                </div>
                <div className="trade-info-small">
                  <h3>Mistakes:</h3>
                  {trade.mistakes ? <p>{trade.mistakes}</p> : <p>No comments</p>}
                </div>
                <div className="trade-info-small">
                  <h3>Setup:</h3>
                  {trade.setup ? <p>{trade.setup}</p> : <p>No comments</p>}
                </div>
                <div className="trade-info-small">
                  <h3>Notes:</h3>
                  {trade.notes ? <p>{trade.notes}</p> : <p>No comments</p>}
                </div>
              </>
              :
              errors ? <p>Failed to load. {errors}</p> : <p>Loading...</p>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default TradeSingle