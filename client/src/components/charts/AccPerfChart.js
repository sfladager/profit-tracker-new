import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useEffect, useState } from 'react'


const AccPerfChart = ({ accountData }) => {

  const [ tradeData , setTradeData ] = useState([])
  const [ chartData , setChartData ] = useState([])
  const [ accountValue, setAccountValue ] = useState(0)

  const [errors, setErrors] = useState([])
 
  // Sets trade data to state
  useEffect(() =>{
    setTradeData(accountData.trades)
  }, [accountData])

  // Loops through tradeData creating an array of objects to be used for the line graph.
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
      })
    }
    // Sorts the objects by date
    if (chart) {
      chart.sort((a, b) => a.date > b.date ? 1 : -1)
    }
    setChartData(chart)
  }, [tradeData])

  // Creates a new object to store the cumulative account value based on each trade. Calculations are run on the backend.
  useEffect(() => {
    const value = []
    if (accountData.account_value) {
      accountData.account_value.map((num, i) => {
        value.push({
          id: i + 1,
          totalValue: num,
        })
      })
    }
    setAccountValue(value)
  }, [accountData.account_value])

  return ( 
    <>
      {tradeData && chartData ? 
        <>
          <div className="graph-title"><h6>Account Value Evolution</h6></div>
          <div className="graph-container">
            <ResponsiveContainer width="100%" height="100%" >
              <LineChart
                className="graph-container"
                width={window.innerWidth}
                height={250}
                data={accountValue}
                backgroundColor={'#00ff00'}
                wrapperStyle={{ backgroundColor: '#00ff00' }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="id" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="totalValue" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </>
        :
        errors ? <p>{errors}</p> : <p>Loading...</p>
      }
    </>
  )
}

export default AccPerfChart

