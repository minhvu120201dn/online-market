import axios from 'axios';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import 'bootstrap/dist/css/bootstrap.min.css';

function SignupButton(props) {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [firstname, setFirstname] = useState('');
  const [middlename, setMiddlename] = useState('');
  const [lastname, setLastname] = useState('');
  const [avatar, setAvatar] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [birth, setBirth] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSignup = () => {
    // Perform signup logic here
    const uploadData = new FormData();
    uploadData.append('email', email);
    uploadData.append('password', password);
    uploadData.append('first_name', firstname);
    uploadData.append('middle_name', middlename);
    uploadData.append('last_name', lastname);
    uploadData.append('avatar', avatar);
    uploadData.append('phonenumber', phonenumber);
    uploadData.append('birth', birth);
    axios.post('http://localhost:8000/auth/signup/', uploadData)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
      console.error(error);
    });

    // Reset form fields
    setEmail('');
    setPassword('');
    setPassword2('');
    setFirstname('');
    setMiddlename('');
    setLastname('');
    setAvatar(null);
    setPhonenumber('');
    setBirth('');

    // Close the modal
    handleClose();
  };

  return (
    <>
      <Button variant={props.variant} onClick={handleShow}>
        Sign Up
      </Button>

      <Modal show={show} onHide={handleClose} className='modal-lg'>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formPassword" style={{marginTop:"1rem"}}>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formPassword2" style={{marginTop:"1rem"}}>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
              />
            </Form.Group>

            <div className="row">
                <div className="col-md-4">
                    <Form.Group controlId="formPassword" style={{marginTop:"1rem"}}>
                        <Form.Label>First name</Form.Label>
                        <Form.Control
                            type="text"
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                        />
                    </Form.Group>
                </div>
                <div className="col-md-4">
                    <Form.Group controlId="formPassword" style={{marginTop:"1rem"}}>
                        <Form.Label>Middle name</Form.Label>
                        <Form.Control
                            type="text"
                            value={middlename}
                            onChange={(e) => setMiddlename(e.target.value)}
                        />
                    </Form.Group>
                </div>
                <div className="col-md-4">
                    <Form.Group controlId="formPassword" style={{marginTop:"1rem"}}>
                        <Form.Label>Last name</Form.Label>
                        <Form.Control
                            type="text"
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                        />
                    </Form.Group>
                </div>
            </div>

            <Form.Group>
                <Form.Label style={{marginTop:"1rem"}}>Avatar</Form.Label>
                <Form.Control
                    type="file"
                    id="avatar"
                    accept="image/jpeg,image/png,image/gif"
                    onChange={(e) => setAvatar(e.target.files[0])}
                />
            </Form.Group>

            <Form.Group>
                <Form.Label style={{marginTop:"1rem"}}>Phone number</Form.Label>
                <Form.Control
                    type="tel"
                    value={phonenumber}
                    onChange={(e) => setPhonenumber(e.target.value)}
                />
            </Form.Group>

            <Form.Group>
                <Form.Label style={{marginTop:"1rem"}}>Birth date</Form.Label>
                <Form.Control
                    type="date"
                    value={birth}
                    onChange={(e) => setBirth(e.target.value)}
                />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose} className="me-2">
                Close
            </Button>
            <Button variant="primary" onClick={handleSignup}>
                Sign up
            </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export { SignupButton };
