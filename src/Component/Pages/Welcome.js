import React, { useContext } from 'react'
import { Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from '../store/AuthContext'
const Welcome = () => {
  const authCtx =  useContext(AuthContext)
  const isLoggedIn = authCtx.isLoggedIn
  const history = useNavigate()
 
  const Varifyemail = () => {
    let token = localStorage.getItem("token");
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCbUqvti92AIcJw4dvf-vjFT3Q7XGFgSRg',{
      method:"POST",
      body:JSON.stringify({
        requestType:"VERIFY_EMAIL",
        idToken:token,
      }),
      headers:{
        'Content-Type':'application/json'
      }
    }).then((res)=>{
      if(res.ok){
          return res.json();
      }else{
          return res.json().then((data)=>{
              if(data && data.error && data.error.message){
                  let errMessage = "Authentication Failed, " + data.error.message;
                  throw new Error(errMessage);
              }
          })
      }
  }).then((data)=>{
    console.log(data);
  }).catch((err)=>{
    alert(err.message);
  })
  }

  const LogoutHandler = ()=>{
    authCtx.Logout()
    history('/')

  }
    return (
     <div>
      { <div>
       <h5> Welcome to Expense Tracker</h5>
      <p style={{textAlign:'right'}}>
      <Button variant="outline-danger" onClick={LogoutHandler}>Log Out</Button>
      <Button variant="outline-primary" onClick={Varifyemail}>varify email</Button>
      Your profile is incomplete 
      {<Link to='/completeprofile'>Complete now</Link>}
      </p>  
      <hr/>
      </div>}
     </div>
    )
  }
  
  export default Welcome;