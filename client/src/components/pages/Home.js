
import { Link } from 'react-router-dom'

// Bootstrap imports
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'


const Home = () => {



  return (
    <div className="home-page">
      <Container className="hero-container">
        <div className="hero-title">
          <h1>Your Online Trading Journal</h1>
          <h4>Journal - Learn - Trade Smarter</h4>
          <div className="hero-btn">
            <Link to={'/register'}>
              <Button className="button-blue" variant="primary">Sign Up</Button>
            </Link>
          </div>
        </div>
        
      </Container>
    </div>  
  )
}

export default Home