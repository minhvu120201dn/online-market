import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import 'bootstrap/dist/css/bootstrap.min.css';
import UserService from '../services/user.service';

function SignupButton(props) {
  const [show, setShow] = useState(false);

  const initialValues = {email:'',password:'',password2:'',first_name:'',middle_name:'',last_name:''}
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  }

  const validateForm = (values) => {
    const errors = {};
    var valid = true;
    const keys = ['email', 'password', 'password2', 'first_name', 'last_name', 'phonenumber', 'birth'];
    for (const key of keys) {
      if (!values[key]) {
        errors[key] = "This field is required.";
        valid = false;
      }
    }
    if (values.password !== values.password2) {
      errors.password2 = "Your passwords do not match.";
      valid = false;
    }
    setFormErrors(errors);
    return valid;
  }

  const handleSubmit = () => {
    // Perform signup logic here
    if (!validateForm(formValues)) {
      return;
    }
    // console.log(formValues)
    UserService.signup(formValues)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
      console.error(error);
    });

    // Reset form fields
    setFormValues(initialValues);

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
              <Form.Label>Email address <span style={{color:'red'}}>*</span></Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formValues.email}
                onChange={handleChange}
              />
            </Form.Group>
            <p style={{color:"red"}}>{formErrors.email}</p>

            <Form.Group controlId="formPassword" style={{marginTop:"1rem"}}>
              <Form.Label>Password <span style={{color:'red'}}>*</span></Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formValues.password}
                onChange={handleChange}
              />
            </Form.Group>
            <p style={{color:"red"}}>{formErrors.password}</p>

            <Form.Group controlId="formPassword2" style={{marginTop:"1rem"}}>
              <Form.Label>Confirm Password <span style={{color:'red'}}>*</span></Form.Label>
              <Form.Control
                type="password"
                name="password2"
                value={formValues.password2}
                onChange={handleChange}
              />
            </Form.Group>
            <p style={{color:"red"}}>{formErrors.password2}</p>

            <div className="row">
                <div className="col-md-4">
                    <Form.Group controlId="formPassword" style={{marginTop:"1rem"}}>
                        <Form.Label>First name <span style={{color:'red'}}>*</span></Form.Label>
                        <Form.Control
                            type="text"
                            name="first_name"
                            value={formValues.first_name}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <p style={{color:"red"}}>{formErrors.first_name}</p>
                </div>
                <div className="col-md-4">
                    <Form.Group controlId="formPassword" style={{marginTop:"1rem"}}>
                        <Form.Label>Middle name</Form.Label>
                        <Form.Control
                            type="text"
                            name="middle_name"
                            value={formValues.middle_name}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <p style={{color:"red"}}>{formErrors.middle_name}</p>
                </div>
                <div className="col-md-4">
                    <Form.Group controlId="formPassword" style={{marginTop:"1rem"}}>
                        <Form.Label>Last name <span style={{color:'red'}}>*</span></Form.Label>
                        <Form.Control
                            type="text"
                            name="last_name"
                            value={formValues.last_name}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <p style={{color:"red"}}>{formErrors.last_name}</p>
                </div>
            </div>

            <Form.Group>
                <Form.Label style={{marginTop:"1rem"}}>Avatar</Form.Label>
                <Form.Control
                    type="file"
                    name="avatar"
                    accept="image/jpeg,image/png,image/gif"
                    onChange={handleChange}
                />
            </Form.Group>
            <p style={{color:"red"}}>{formErrors.avatar}</p>

            <Form.Group>
                <Form.Label style={{marginTop:"1rem"}}>Phone number <span style={{color:'red'}}>*</span></Form.Label>
                <Form.Control
                    type="tel"
                    name="phonenumber"
                    value={formValues.phonenumber}
                    onChange={handleChange}
                />
            </Form.Group>
            <p style={{color:"red"}}>{formErrors.phonenumber}</p>

            <Form.Group>
                <Form.Label style={{marginTop:"1rem"}}>Birth date <span style={{color:'red'}}>*</span></Form.Label>
                <Form.Control
                    type="date"
                    name="birth"
                    value={formValues.birth}
                    onChange={handleChange}
                />
            </Form.Group>
          </Form>
          <p style={{color:"red"}}>{formErrors.birth}</p>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose} className="me-2">
                Close
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
                Sign up
            </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export { SignupButton };
