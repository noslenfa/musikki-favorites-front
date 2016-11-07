import React, { Component } from "react";
import NavBarMusikki from "./NavBarMusikki";
import CarouselMusikki from "./CarouselMusikki";
import FooterMusikki from "./FooterMusikki";

class HomeMusikki extends Component {

  render() {
    return (
      <div>
        <NavBarMusikki />
        <CarouselMusikki />
        <FooterMusikki />
      </div>
    );
  }
}

export default HomeMusikki;
