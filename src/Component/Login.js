import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form } from 'react-bootstrap';
import {login} from '../Store/Action/authAction';
import { Navigate } from 'react-router'

function Login() {
    const [input ,setInput] = useState({});
    const dispatch = useDispatch();
    const selector = useSelector((state) => state.auth);
    const handleChange =(e) =>{
        setInput({...input,[e.target.name]: e.target.value});
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(login(input));
    }

    if(selector.isAuthenticated) {
      return  <Navigate to={'/dashboard'} />
    }

  return (
      <div className="login-container">
    <Form className="login-form">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" name= 'email' placeholder="Enter email" onChange={handleChange}/>
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword" onChange={handleChange}>
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" name= 'password' placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="button" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
    </div>
  );
}

export default Login;