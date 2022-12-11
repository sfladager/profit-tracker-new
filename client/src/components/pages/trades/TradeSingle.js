import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import { getToken } from '../../../helpers/auth'

// Bootstrap imports
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

const TradeSingle = () => {

  return (
    <div className="trade-form-page">
      <Container className="trade-form-container mt-4">
        <div className="back-btn-container">
          <Link to={'/trades'}>
            <button className="back-btn">Back</button>
          </Link>
        </div>
      </Container>
    </div>
  )
}

export default TradeSingle