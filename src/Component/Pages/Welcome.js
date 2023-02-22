import React from 'react'
import { Link } from 'react-router-dom'
const Welcome = () => {
    return (
      <div>
        Welcome to Expense Tracker
      <p style={{textAlign:'right'}}>
      Your profile is incomplete 
      <Link to='/completeprofile'>Complete now</Link>
      </p>  
      <hr/>
      </div>
    )
  }
  
  export default Welcome;