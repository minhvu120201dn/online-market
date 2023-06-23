import { useContext, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';

import { SearchIcon, BellIcon, PenIcon, ChatIcon, Logo } from '../commons/icons';
import SigninButton from './signin';
import { UserContext } from '../contexts/user.context';

function Header() {
  const { user, setUser } = useContext(UserContext);

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/"><Logo width="100" height="100"/></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
          </Nav>
          <Form className="d-flex me-2">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me"
              style={{ width: '450px' }}
              aria-label="Search"
            />
            <Button variant="outline-success" className="me-4"><SearchIcon/></Button>
          </Form>
          { !user ?
          <SigninButton variant="success" className="me-5"><PenIcon/> Post</SigninButton> :
          <Button variant="success" className="me-5"><PenIcon/> Post</Button>
          }
          <Button variant="info" className="me-2"><ChatIcon/> Chat</Button>
          <Button variant="warning" className="me-2"><BellIcon/> Notifications</Button>
          { !user ?
          <SigninButton variant="danger" className="me-1">Sign In</SigninButton> :
          <Dropdown>
            <Dropdown.Toggle variant="danger">
              { user.first_name+' '+user.middle_name+' '+user.last_name }
            </Dropdown.Toggle>

            <Dropdown.Menu style={{right:"auto",transform:"translateX(-40%)"}}>
              <Dropdown.Item href="#">Profile</Dropdown.Item>
              <Dropdown.Item onClick={() => {setUser()}}>Sign out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;