import React, {Component} from "react";
import Nav from "react-bootstrap/lib/Nav";
import Navbar from "react-bootstrap/lib/Navbar";
import NavbarHeader from "react-bootstrap/lib/NavbarHeader";
import NavbarBrand from "react-bootstrap/lib/NavbarBrand";
import NavbarToggle from "react-bootstrap/lib/NavbarToggle";
import NavbarCollapse from "react-bootstrap/lib/NavbarCollapse";
import NavItem from "react-bootstrap/lib/NavItem";
import MenuItem from "react-bootstrap/lib/MenuItem";
import LinkContainer from "react-router-bootstrap/lib/LinkContainer";
import {logoUrl} from "../constants/Constants";

class NavBarMusikki extends Component {
  constructor(props){
		super(props);
	}

  updatedLoggedIn() {
    localStorage.setItem("loggedIn", JSON.stringify(false));
  }

  render() {
    return (
      <div>
        <Navbar fluid collapseOnSelect className="navbar-musikki">
          <NavbarHeader>
            <NavbarBrand>
              <a href="/"><img src={logoUrl}/></a>
            </NavbarBrand>
            <NavbarToggle />
          </NavbarHeader>
          <NavbarCollapse>
            {!this.props.loggedIn ?
            <Nav pullRight>
              <LinkContainer to="register">
                <NavItem>REGISTER<div className="icon fa fa-pencil-square-o navbar-symbol"></div></NavItem>
              </LinkContainer>
              <LinkContainer to="login">
                <NavItem>LOGIN<div className="icon fa fa-sign-in navbar-symbol"></div></NavItem>
              </LinkContainer>
            </Nav> :
            <Nav pullRight>
              <NavItem><strong>Welcome</strong> {this.props.username}</NavItem>
              <LinkContainer to="/">
                <NavItem onClick={this.updatedLoggedIn.bind(this)}>LOGOUT<div className="icon fa fa-sign-out navbar-symbol"></div></NavItem>
              </LinkContainer>
            </Nav> }
          </NavbarCollapse>
        </Navbar>
      </div>
    );
  }
}

export default NavBarMusikki;
