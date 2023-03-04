import React, { useContext } from 'react'
import { Button } from 'react-bootstrap'
import { confirmAlert } from 'react-confirm-alert'
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from '../store/AuthContext'
import { Form } from 'react-bootstrap'
import Expenses from './Expenses'

import { useDispatch } from 'react-redux'
import { authAction } from '../store/AuthReducer'
import { darkAction } from '../store/AuthReducer'
import { useSelector } from 'react-redux'


const Welcome = () => {
  const downloaddata = useSelector(state=>state.expense.expenses)
  //console.log(expensedata)
  const dark = useSelector(state=>state.dark.showDarkTheme)
  const dispatch = useDispatch()
    const idToken = useSelector(state=>state.idToken)
  // const authCtx =  useContext(AuthContext)
  // const isLoggedIn = authCtx.isLoggedIn
  const history = useNavigate()
 
  const Varifyemail = () => {
    let token = localStorage.getItem("idToken");
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
    dispatch(authAction.Logout())
    history('/')
   

  }

  const darkhandler = ()=>{
    dispatch(darkAction.showDark())
  }

  // <a id='a1' download='file1.text'> download expenses</a>
  // const mycsv = (row)=>{
  //   return row.map(r=>r.join(",").join("/n"))
  // } 
  //  const a1 = document.getElementById('a1')
  //  const blob1 = new Blob(['ggcg' ],{type:'text'})
  //  a1.href = URL.createObjectURL(blob1)
    return (
      
     <div>
       <div>
       <h5> Welcome to Expense Tracker</h5>
       <a id='a1' download='file1.csv'> download expenses</a>
       
      <p style={{textAlign:'right'}}>
      <Button variant="outline-dark" onClick={darkhandler}>{dark?'light Theme': 'dark theme'}</Button>
      {<Button variant="outline-danger" onClick={LogoutHandler}>Log Out</Button>}
      <Button variant="outline-primary" onClick={Varifyemail} style={{margin:'3px'}}>varify email</Button>
      Your profile is incomplete 
      {<Button variant='outline-primary'><Link to='/completeprofile'>Complete now</Link></Button>}
      </p>  
      <hr/>
     
      </div>
      <Expenses />
     </div>
    )
  }
  
  export default Welcome;