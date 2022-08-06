import React,{ useState } from "react";
import { useLocation } from 'react-router';
import { Button, Container, Form } from 'react-bootstrap';
import axios from 'axios';

const Confimation = () => {
const [shown,setShown] = useState(false);
const [email,setEmail] = useState('')
const query = useLocation();
const token = query.pathname.split('/');
const confirm = async() =>{
    await axios.put(`http://localhost:5000/user/user-verification/${token[3]}`).then((res) => {
console.log("hbjbjb",res)
   }).catch(err => {
    console.log("err",err.response.data.message);
    setShown((prev) => !prev);
   });
}
const handlesubmit = async() => {
    await axios.post('http://localhost:5000/user/email-verification',{ email }).then((res) => {
        setShown((prev) => !prev);
           }).catch(err => {
            console.log("err",err.response.data.message);
           });
}
    return(
        <Container>
        <h5> Hi </h5>
        <Button onClick={confirm}>Confimation</Button>
        {shown && (
        <>
        <Form className= 'login-form' onSubmit={handlesubmit}>
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" name= 'email' placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}/>   
        <Button variant="primary" type="submit"> Submit </Button>
        </Form>
        </>
        )}
        </Container>
    )
}

export default Confimation;