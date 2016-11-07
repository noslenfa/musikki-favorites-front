import React, {Component} from 'react';
import Carousel from 'react-bootstrap/lib/Carousel';
import CarouselCaption from 'react-bootstrap/lib/CarouselCaption';
import CarouselItem from 'react-bootstrap/lib/CarouselItem';

class CarouselMusikki extends Component {
  constructor(props){
		super(props);
	}
  render() {
    const carouselInfo = [
      {id: 1, imgCarouselUrl: './app/images/carousel_01.png', slideLabel: 'SEARCH', slideText: 'Make some searches for your favorite artists!'},
      {id: 2, imgCarouselUrl: './app/images/carousel_02.png', slideLabel: 'FAVORITES', slideText: 'Check your favorite artists!'}
    ];
    const carouselList = carouselInfo.map((item) =>
          <CarouselItem key={item.id}>
            <img className="carousel-img-musikki" src={item.imgCarouselUrl} />
            <CarouselCaption>
              <h3>{item.slideLabel}</h3>
              <p>{item.slideText}</p>
            </CarouselCaption>
          </CarouselItem>);
    return (
      <div>
        <Carousel>
          {carouselList}
        </Carousel>
      </div>
    );
  }
}

export default CarouselMusikki;
