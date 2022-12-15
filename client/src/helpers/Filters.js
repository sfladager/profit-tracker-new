import { useState, useEffect } from 'react'

const Filters = ({ trades }) => {

  // ! State
  const [ filterByText, setFilterByText ] = useState([])
  const [ search, setSearch ] = useState([])

  // ! Executions
  // takes input from search bar
  const handleSearchInput = (e) => {
    e.preventDefault()
    setSearch(e.target.value)
  }

  const SearchFilter = () => {
    const regex = new RegExp(search, 'i')
    const selectedTrades = trades.filter(trade => {
      return regex.test(trade.symbol)
    })
    setFilterByText(selectedTrades)    
  }

  useEffect(() => {
    SearchFilter()
  }, [search])

  return (
    <div className="trades-filter-container">
      <input onChange={handleSearchInput} className="search-input" placeholder="Search..." />
    </div>
    
  )
}

export default Filters