import React, { Component } from "react";

import HeaderMusikki from "./common/HeaderMusikki";
import FooterMusikki from "./common/FooterMusikki";
import CarouselMusikki from "./others/CarouselMusikki";

class HomeMusikki extends Component {

  constructor(props) {
    super(props);
    this.state = {
      authenticatedUser: ""
   };
  }

  //get username if there's info about user is loggedIn in localStorage
  componentWillMount() {
      if(JSON.parse(localStorage.getItem("loggedIn"))) {
        this.setState({authenticatedUser: JSON.parse(localStorage.getItem("authenticatedUser"))});
      }
  }

  render() {
    return (
      <div>
        <HeaderMusikki loggedIn={JSON.parse(localStorage.getItem("loggedIn"))} username={this.state.authenticatedUser}/>
        <CarouselMusikki />
        <FooterMusikki />
      </div>
    );
  }
}

export default HomeMusikki;
