import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      className="p-3 shadow-lg"
      style={{ background: "linear-gradient(90deg, #343a40, #495057)" }}
    >
      <Navbar.Brand as={Link} to="/" className="font-weight-bold text-warning">
        <span className="mr-2">⚙️</span> {/* Simple icon using emoji */}
        Employee Management
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/" className="text-light mx-2">
            Employee List
          </Nav.Link>
          <Nav.Link as={Link} to="/add" className="text-light mx-2">
            Add Employee
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
