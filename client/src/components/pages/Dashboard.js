import { useState, useEffect } from 'react'
import axios from 'axios'

import { getToken } from '../../helpers/auth'
import OpenTrades from '../../helpers/OpenTrades'
import AccPerfChart from '../charts/AccPerfChart'

// Bootstrap imports
import Container from 'react-bootstrap/Container'

const Dashboard = () => {

  // ! State
  const  [ accountData, setAccountData ] = useState([])
  const [ stats, setStats ] = useState([])
  const [ errors, setErrors ] = useState(null)

  // ! Executions
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/auth/profile/', {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        })
        setAccountData(data)
      } catch (err) {
        console.log(err)
        setErrors(err)
      }
    }
    getData()
  }, [])

  return (
    <Container className="dashboard-container">
      <div className="account-info-container mt-4">
        <div className="title-box">
          <p>Account Performance</p>
        </div>
        <div className="account-info-stats-container">
          <div className="main-stats-container mt-2">
            {accountData ? 
              <>
                <div className="single-stat">
                  <p>Total Return:</p>
                  <p>{accountData.total_return ? `$ ${accountData.total_return}` : 'No trades added yet!'}</p>
                </div>
                <div className="single-stat">
                  <p>Avg return per trade:</p>
                  <p>{accountData.avg_return_per_trade ? `$ ${accountData.avg_return_per_trade}` : 'No trades added yet!'}</p>
                </div>
                <div className="single-stat">
                  <p>Win ratio:</p>
                  <p>{accountData.win_ratio ? `${accountData.win_ratio}%` : 'No trades added yet!'}</p>
                </div>
                <div className="single-stat">
                  <p>Total trades:</p>
                  <p>{accountData.total_trades ? accountData.total_trades : 'No trades added yet!'}</p>
                </div>
              </>
              :
              errors ? <p>Something went wrong!</p> : <p>Loading...</p>
            }
          </div>
          {accountData ?
            <>
              <div className="account-info-chart">
                <AccPerfChart
                  accountData={accountData}
                />
              </div>
            </>
            :
            errors ? <p>{errors}</p> : <p>Loading...</p>
          }
        </div>
      </div>
      <OpenTrades />
    </Container>
  )
}
export default Dashboard