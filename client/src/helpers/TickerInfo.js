import { useState, useEffect } from 'react'
import axios from 'axios'

const TickerInfo = ({ trade }) => {

  // ! State 
  const [ ticker, setTicker ] = useState()
  const [ errors, setErrors ] = useState(null)

  // ! Execution
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`https://api.polygon.io/v3/reference/tickers?ticker=${trade.symbol}&active=true&apiKey=mppVPsDvMBxhhGzvflwpDYRJ3RS3Xcch/`)

        setTicker(data.results)
      } catch (err) {
        console.log(err)
        setErrors(err)
      }
    }
    if (trade.asset_class === 'stocks') getData()
  }, [])

  useEffect(() => {
    if (ticker ) {
      // console.log('ticker FULL', ticker)
      // console.log('ticker', ticker[0].name)
    }
  }, [ticker])
  

  return (
    <>
      {ticker ?
        <>
          <h3>{ticker[0].name}</h3>
        </>
        :
        <>
          <h3>{errors}</h3>
        </>
      }
    </>
    
  )
}

export default TickerInfo