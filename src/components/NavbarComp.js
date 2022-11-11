import React, { Component } from 'react'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import Createpage from './createpage';
import Readpage from './readpage';
import Updatepage from './updatepage';
import Deletepage from './deletepage';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  BrowserRouter
} from "react-router-dom";

export default class NavbarComp extends Component {
  render() {
    return (
    <Router>
      <div>
        
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>CRUD App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to={'/create'}>Create</Nav.Link>
              <Nav.Link as={Link} to={'/read'}>Read</Nav.Link>
              <Nav.Link as={Link} to={'/update'}>Update</Nav.Link>
              <Nav.Link as={Link} to={'/delete'}>Delete</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        <Route path='' element={<Createpage />} />
        <Route path="create" element={<Createpage />} />
        <Route path="read" element={<Readpage />} />
        <Route path="update" element={<Updatepage />} />
        <Route path="delete" element={<Deletepage />} />
      </Routes>

      </div>
    </Router>
    )
  }
}
