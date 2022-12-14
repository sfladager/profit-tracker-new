import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { useEffect, useState, useCallback } from 'react'


const AccPerfChart = ({ accountData }) => {

  const [ tradeData , setTradeData ] = useState([])
  const [ chartData , setChartData ] = useState([])

  const [errors, setErrors] = useState([])
 
  useEffect(() =>{
    setTradeData(accountData.trades)
  }, [accountData])

  useEffect(() => {
    const chart = []
    tradeData.map(trade => {
      if (trade.date_closed) {
        chart.push({
          date: trade.date_closed,
          profit: trade.net_return,
        })
      }
    })
    setChartData(chart)
  }, [tradeData])

  return (
    <>
      {tradeData && chartData ? 
        <>
          <ResponsiveContainer className="graph-container">
            <LineChart 
              width={500} 
              height={300} 
              data={chartData} 
              margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
            >
              <Line type="monotone" dataKey="$" stroke="#8884d8" />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </>
        :
        errors ? <p>Something went wrong! Try again later</p> : <p>Loading...</p>
      }
    </>
  )
}

export default AccPerfChart

