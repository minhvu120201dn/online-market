import React, { useState, useEffect, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import 'bootstrap/dist/css/bootstrap.min.css';
import { SignupButton } from './signup';
import UserService from '../services/user.service';
import { UserContext } from '../contexts/user.context';

function SigninButton(props) {
  const { setUser } = useContext(UserContext);

  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState();

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleSignin = () => {
    // Send data to server
    UserService.signin(email, password)
      .then(res => {
        setUser(res.data);
        // Reset form fields
        setEmail('');
        setPassword('');
        // Close the modal
        handleClose();
      })
      .catch(err => {
        setError(err.response.data);
      });;
  };
  
  // useEffect(() => {
  //   console.log(user);
  // })

  return (
    <>
      <Button variant={props.variant} className={props.className} onClick={handleShow}>
        {props.children}
      </Button>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sign In</Modal.Title>
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
          <p style={{color:"red"}}>{error}</p>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <SignupButton variant="primary" onClick={handleClose}>
            Sign up
          </SignupButton>
          <div className="ml-auto">
            <Button variant="secondary" onClick={handleClose} className="me-2">
                Close
            </Button>
            <Button variant="danger" onClick={handleSignin}>
                Sign In
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SigninButton;
