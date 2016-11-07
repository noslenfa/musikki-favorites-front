import React, {Component} from "react";
import Carousel from "react-bootstrap/lib/Carousel";
import CarouselCaption from "react-bootstrap/lib/CarouselCaption";
import CarouselItem from "react-bootstrap/lib/CarouselItem";
import {carouselInfo} from "../constants/Constants";

class CarouselMusikki extends Component {
  constructor(props){
		super(props);
	}
  render() {
    return (
      <div>
        <Carousel>
          {carouselInfo.map((item) =>
          <CarouselItem key={item.id}>
            <img className="carousel-img-musikki" src={item.imgCarouselUrl} />
            <CarouselCaption>
              <h3>{item.slideLabel}</h3>
              <p>{item.slideText}</p>
            </CarouselCaption>
          </CarouselItem>)}
        </Carousel>
      </div>
    );
  }
}

export default CarouselMusikki;
