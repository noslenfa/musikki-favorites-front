import React, {Component} from 'react';
import Nav from 'react-bootstrap/lib/Nav';
import Navbar from 'react-bootstrap/lib/Navbar';
import NavbarHeader from 'react-bootstrap/lib/NavbarHeader';
import NavbarBrand from 'react-bootstrap/lib/NavbarBrand';
import NavbarToggle from 'react-bootstrap/lib/NavbarToggle';
import NavbarCollapse from 'react-bootstrap/lib/NavbarCollapse';
import NavItem from 'react-bootstrap/lib/NavItem';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';

class NavBarMusikki extends Component {
  constructor(props){
		super(props);
    this.state = {loggedIn: false};
	}

  render() {
    const logoUrl = './app/images/musikki.svg'
    return (
      <div>
        <Navbar fluid collapseOnSelect className="navbar-musikki">
          <NavbarHeader>
            <NavbarBrand>
              <a href="#"><img src={logoUrl}/></a>
            </NavbarBrand>
            <NavbarToggle />
          </NavbarHeader>
          <NavbarCollapse>
            {!this.state.loggedIn ?
            <Nav pullRight>
              <LinkContainer to="register">
                <NavItem>REGISTER</NavItem>
              </LinkContainer>
              <LinkContainer to="login">
                <NavItem>LOGIN</NavItem>
              </LinkContainer>
            </Nav> :
            <Nav pullRight>
              <LinkContainer to="/">
                <NavItem>LOGOUT</NavItem>
              </LinkContainer>
            </Nav> }
          </NavbarCollapse>
        </Navbar>
      </div>
    );
  }
}

export default NavBarMusikki;
