import axios from 'axios';
import React, { useState, createContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import 'bootstrap/dist/css/bootstrap.min.css';
import { SignupButton } from './signup';

const UserContext = createContext();

function LoginButton(props) {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLogin = () => {
    // Perform login logic here
    axios.post('http://localhost:8000/auth/login/', {
      email: email,
      password: password
    })
      .then(response => {
        console.log(response.data);
        setUser(response.data);
      })
      .catch(error => {
        console.error(error);
    });

    // Reset form fields
    setEmail('');
    setPassword('');

    // Close the modal
    handleClose();
  };

  return (
    <UserContext.Provider value={{user}}>
      <Button variant={props.variant} onClick={handleShow}>
        Log In
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formPassword" style={{marginTop:"1rem"}}>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <SignupButton variant="primary" onClick={handleClose}>
            Sign up
          </SignupButton>
          <div className="ml-auto">
            <Button variant="secondary" onClick={handleClose} className="me-2">
                Close
            </Button>
            <Button variant="danger" onClick={handleLogin}>
                Log In
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </UserContext.Provider>
  );
}

export { UserContext, LoginButton };
