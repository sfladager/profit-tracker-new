
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
          <div className="login-instructions">
            <p>Login with the following information below if you want to explore a demo account with existing trade information, or create your own account and add your own trades.</p>
            <p>To start with a new account, add a trade first, then add your executions, and then create a session to journal the trade.</p>
            <h2>Login info:</h2>
            <p>email: demo@yahoo.com</p>
            <p>password: TestPass123!</p>
          </div>
        </div>
        
      </Container>
    </div>  
  )
}

export default Home