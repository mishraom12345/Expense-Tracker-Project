import { useContext, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import AuthContext from '../store/AuthContext';

function CompleteProfile() {
    //const authCtx = useContext(AuthContext)
    let token = localStorage.getItem('token')
    const nameRef = useRef()
    const photourlRef = useRef()
    const submitHandler = (e) => {
        e.preventDefault();

        var enteredName = nameRef.current.value;
        var enteredUrl = photourlRef.current.value;

    let url='https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCbUqvti92AIcJw4dvf-vjFT3Q7XGFgSRg';
        fetch(url,{
            method:"POST",
            body:JSON.stringify({
                idToken:token,
                displayName:enteredName,
                photoUrl:enteredUrl,
                returnSecureToken:true,
              }),
            headers:{
                'Content-Type':'application/json'
            }})
            .then(res=>{
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

    
  return (
   <div style={{margin:'12%',paddingBottom:'20%',}}>
    <Button variant="danger" type="submit" style={{justifyItems:'end',float:'right',marginBottom:'1%'}}>
        cancel
      </Button>
     <Form onSubmit={submitHandler}>
     {/* <Button variant="danger" type="submit" style={{justifyItems:'end',float:'right',marginBottom:'1%'}}>
        cancel
      </Button> */}
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Full Name</Form.Label>
        <Form.Control type="text" placeholder="Enter Name" ref={nameRef} />
        <Form.Text className="text-muted">
          We'll never share your Name with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Enter Photo Url</Form.Label>
        <Form.Control type="text" placeholder="photo url" ref={photourlRef} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out"  />
      </Form.Group>
      <Button variant="success" type="submit">
        Update
      </Button>
      
    </Form>
   </div>
  );
}

export default CompleteProfile;