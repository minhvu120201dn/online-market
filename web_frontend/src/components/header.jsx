import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { SearchIcon, BellIcon, PenIcon, ChatIcon, Logo } from './commons/icons';
import { LoginButton } from './login';

function Header() {
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
          <Button variant="success" className="me-5"><PenIcon/> Post</Button>
          <Button variant="info" className="me-2"><ChatIcon/> Chat</Button>
          <Button variant="warning" className="me-2"><BellIcon/> Notifications</Button>
          <LoginButton variant="danger" className="me-1">Login</LoginButton>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;