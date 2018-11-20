import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Navbar, NavbarBrand, Nav } from 'reactstrap';

export default class TopBar extends Component {
  render() {
    return (
      <Navbar dark fixed expand="md" className="TopBar">
        <Container>
          <NavbarBrand href="/">Beau's</NavbarBrand>
          <Nav navbar>
            <NavLink exact to="/">Home</NavLink>
            <NavLink to="/beers">Our Beer</NavLink>
          </Nav>
        </Container>
			</Navbar>
    );
  }
}
