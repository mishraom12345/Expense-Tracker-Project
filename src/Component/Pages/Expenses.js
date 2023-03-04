import React, { useState } from 'react'
import { Form,Button } from 'react-bootstrap'
import { useEffect } from 'react'
import { expensesActions } from '../store/AuthReducer'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

function Expenses() {
    
    const expensedata = useSelector(state=>state.expense.expenses)
    console.log(expensedata)
    console.log('hari ')
    const [money ,setmoney]=useState('')
    const [des,setdes]=useState('')
    const [cat,setcat]= useState('')
    //const [expensedata,setExpensesData]= useState([])
    const dispatch = useDispatch()
  
    const expenses = {
      money:money,
      description:des,
      category:cat
    }
      
    //console.log(expenses) 
   
    const submitHandler = (e)=>{
       
        e.preventDefault()
         
      
    
  

     fetch(`https://expense-tracker-project-c7912-default-rtdb.firebaseio.com/Expenses/${localStorage.getItem('email')}.json`,{
      method:"POST",
      body:JSON.stringify(
       expenses
      ),
      headers:{
        'Content-Type':'application/json'
      }
    }).then((res)=>{
      if(res.ok){
          return res.json();
      }else{
          return res.json().then((data)=>{
              if(data && data.error && data.error.message){
                console.log(data)
                  let errMessage = "Authentication Failed, " + data.error.message;
                  throw new Error(errMessage);
              }
          })
      }
  }).then((data)=>{
    //setExpensesData((data) => [...data, expenses]);
    const hari =  [...data, expenses]
    console.log(hari)
    dispatch(expensesActions.setexpenses(hari))
    
    //alert('passward reset link send plz chechk email')
    //console.log(data);
  }).catch((err)=>{
    alert(err.message);
  })

  //setExpensesData('')
  
  
    }


    const  getSavedData= ()=>{
      fetch(`https://expense-tracker-project-c7912-default-rtdb.firebaseio.com/Expenses/${localStorage.getItem('email')}.json`
          
           ).then((res)=>{
             if(res.ok){
               //console.log(res)
               
               console.log('run ho gaya hai')
 
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
           //alert('passward reset link send plz chechk email')
           console.log(data)

           const myarr = []
            let sum = 0
            console.log(data)
           for (let i in data){
            myarr.push({
              id:i,
              money:data[i].money,
              description:data[i].description,
              category:data[i].category,


            })
           }
             
          
          
           
           //setExpensesData(myarr)
           dispatch(expensesActions.setexpenses(myarr))
           
           //console.log(expensedata)
        
       // console.log(renderdata)
        //console.log(myarr)  
         }).catch((err)=>{
           alert(err.message);
         })
 
 
     } 
     
    
 
     useEffect(() => {
         getSavedData();
        
       }, []);
      
       const totalMoney =expensedata.reduce((accumulator, current) => parseInt(accumulator) + parseInt(current.money), 0);
       console.log(expensedata)
       console.log(totalMoney)

       // console.log(`Total money: ${totalMoney}`);
      
       const deletehandler = (id)=>{
        
        fetch(`https://expense-tracker-project-c7912-default-rtdb.firebaseio.com/Expenses/${localStorage.getItem('email')}/${id}.json`,{
          method:"DELETE",
          
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
       getSavedData()
        //setExpensesData((data) => [...data, expenses]);
        //alert('passward reset link send plz chechk email')
        //console.log(data);
      }).catch((err)=>{
        alert(err.message);
      })
    
      
      
        }

        const Edithandler = (item)=>{
          
            setmoney(item.money)
            setdes(item.description)
            setcat(item.category)
            deletehandler(item.id)
        }

       
  return (
    <div style={{ }}>
       <Form style={{width:'50%',alignContent:'center', margin:'auto',border:'1x',boxShadow:'5px',background:'Card'}} onSubmit = {submitHandler}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Money</Form.Label>
        <Form.Control type="number" placeholder="Enter Amount" defaultValue={money} onChange = {(e)=>{setmoney(e.target.value)}} />
        <Form.Text className="text-muted">
         
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Description</Form.Label>
        <Form.Control type="text" placeholder="Description" defaultValue={des} onChange={(e)=>{setdes(e.target.value)}}/>
      </Form.Group>
      <Form.Label>Category</Form.Label>
      <Form.Select aria-label="Default select example" defaultValue={cat} onChange={(e)=>{setcat(e.target.value)}}>
      <option>Open this select menu</option>
      <option value="Food">Food</option>
      <option value="Shoping">Shopping</option>
      <option value="Petrol">Petrol</option>
    </Form.Select>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Add Expense
      </Button>
      {totalMoney>=10000&&<Button variant='danger'>Active premium Button</Button>}
      
    </Form>
    <h3>Total money ={totalMoney} </h3>

    
  
    <hr/>
    <div>
    {
      
      expensedata.map((item,index)=>(
         
        <div key = {index} style={{marginLeft:'20%'}}>
          
          <p>amount:-{item.money}{'      '}
          description:-- {item.description}{'     '}
        {'  '}  category:-- {item.category}</p>
        <Button variant='success'onClick={()=>deletehandler(item.id)}>Delete</Button>{'  '}
      
        <Button onClick={()=>Edithandler(item)}>Edit</Button>
          <hr/> 
         
          
        </div>

       
         

      ))
    }
      
    </div>
   
    </div>
  )
}

export default Expenses
