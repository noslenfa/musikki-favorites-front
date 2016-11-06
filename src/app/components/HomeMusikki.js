import React, { Component } from 'react';
import NavBarMusikki from './NavBarMusikki';
import CarouselMusikki from './CarouselMusikki';

class HomeMusikki extends Component {

  render() {
    return (
      <div>
        <NavBarMusikki />
        <CarouselMusikki />
      </div>
    );
  }
}

export default HomeMusikki;
