import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import { useEffect, useState } from 'react'


const AccPerfChart = ({ accountData }) => {

  const [ tradeData , setTradeData ] = useState([])
  const [ chartData , setChartData ] = useState([])

  const [errors, setErrors] = useState([])
 
  useEffect(() =>{

    setTradeData(accountData.trades)
  }, [accountData])

  useEffect(() => {
    const chart = []
    if (tradeData) {
      tradeData.map(trade => {
        
        if (trade.date_closed) {
          chart.push({
            date: trade.date_closed,
            profit: trade.net_return,
          })
        }
        setChartData(chart)
      })
    }
    

  }, [tradeData])

  return ( 
    <>
      {tradeData && chartData ? 
        <>
          <div className="graph-container">
            <LineChart
              className="graph-container"
              width={350}
              height={300}
              data={chartData}
              // margin={{
              //   top: 5,
              //   right: 30,
              //   left: 20,
              //   bottom: 5,
              // }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="profit" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </div>
        </>
        :
        errors ? <p>Something went wrong! Try again later</p> : <p>Loading...</p>
      }
    </>
  )
}

export default AccPerfChart

