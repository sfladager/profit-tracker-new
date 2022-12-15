import { useState, useEffect, useCallback } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { Scrollbar } from 'react-scrollbars-custom'
import { getToken } from '../../../helpers/auth'


// Bootstrap imports
import Container from 'react-bootstrap/Container'

// icons
import { PlusSquare } from 'react-feather'

const Trades = () => {

  // ! Navigation

  // ! State
  const [ trades, setTrades ] = useState([])
  const [ filteredTrades, setFilteredTrades ] = useState([])
  const [ errors, setErrors ] = useState(null)
  const [ selectedSetup, setSelectedSetup ] = useState([])
  const [ search, setSearch ] = useState([])
  const [ setups, setSetups ] = useState([])


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

  useEffect(() => {
    getSetups()
    setFilteredTrades(trades)
  }, [trades])

  // Creates new array with setups and removes duplicates
  const getSetups = () => {
    const filterSetups = [ ...new Set(trades.map(trade => trade.setup))].sort()
    setSetups(filterSetups)
  }

  // takes input from search bar
  const handleSearchInput = (e) => {
    e.preventDefault()
    // setFilteredTrades({ ...filteredTrades, symbol: e.target.value })
    setSearch(e.target.value)
  }

  // Dropdown change function to set filter query
  const handleSetupChange = (e) => {
    // setFilteredTrades({ ...filteredTrades, setup: e.target.value })
    setSelectedSetup(e.target.value)
  }

  const searchFilter = () => {
    const regex = new RegExp(search, 'i')
    const filter = trades.filter(trade => {
      return regex.test(trade.symbol) && (selectedSetup === trade.setup || selectedSetup === 'all')
    })
    setFilteredTrades(filter)
  }
  
  useEffect(() => {
    searchFilter()
  }, [selectedSetup, search])

 

  return (
    <div className="trades-list-page">
      <div className="trades-filter-container">
        <input onChange={handleSearchInput} className="search-input" placeholder="Search by symbol" />
        <select onChange={handleSetupChange} className="filter-by-setup">
          <option id="all" value="all">All</option>
          {setups ?
            setups.map((setup, i) => {
              return (
                <option key={i} value={setup}>{setup}</option>
              )
            })
            :
            <p>Loading</p>
          }
        </select>
      </div>
      <div className="trades-title-container">
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
            <p>Status</p>
            <p>Open date</p>
            <p>Symbol</p>
            <p>Side</p>
            <p>Return $</p>
            <p>Return %</p>
            <p>Setup</p>
          </div>
          {trades && filteredTrades ?
            filteredTrades.sort((a, b) => a.date_opened > b.date_opened ? -1 : 1).map(trade => {
              const { id, symbol, side, setup } = trade
              
              return (
                <Link className="trade-list-link" key={id}  to={`/trades/${id}`}>
                  <div className="trade-list-row">
                    {trade.date_closed ?
                      trade.net_return > 0 ? <p className="status win">Win</p> : <p className="status loss">Loss</p>
                      :
                      <p className="status open">Open</p>
                    }
                    <div className="trade-list-col"><p>{trade.date_opened}</p></div>
                    <div className="trade-list-col"><p>{symbol}</p></div>
                    <div className="trade-list-col"><p>{side}</p></div>
                    <div className="trade-list-col"><p>${trade.date_closed ? trade.net_return : '--'}</p></div>
                    <div className="trade-list-col"><p>{trade.date_closed ? trade.percent_return : '--'}%</p></div>
                    <div className="trade-list-col setup"><p>{setup}</p></div>
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