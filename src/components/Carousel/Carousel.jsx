import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './Carousel.css';

import kep1 from "../../assets/parkolohaz.jpg";
import kep2 from "../../assets/varosliget.jpg";
import kep3 from "../../assets/veszpremes.jpg";

const responsive = {
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
  tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1 }
};

const MyCarousel = ({ onImageClick }) => {
  return (
    <div className="carousel-wrapper">
      <Carousel
        autoPlay={3000}
        pauseOnHover={true}
        responsive={responsive}
        infinite={true}
      >
        <div className='carousel-container'>
          <div className="carousel-image-container"  >
            <img src={kep1} alt="Parkoló 1" className="my-carousel-image" onClick={() => onImageClick(1)} style={{ cursor: 'pointer' }} />
          </div>
          <p className='carousel-text'>Kecskemét</p>

        </div>

        <div className='carousel-container'>
          <div className="carousel-image-container" >
            <img src={kep2} alt="Parkoló 2" className="my-carousel-image" onClick={() => onImageClick(2)} style={{ cursor: 'pointer' }} />
          </div>
          <p className='carousel-text'>Városliget</p>
        </div>

        <div className='carousel-container'>
          <div className="carousel-image-container"  >
            <img src={kep3} alt="Parkoló 3" className="my-carousel-image" onClick={() => onImageClick(3)} style={{ cursor: 'pointer' }} />
          </div>
          <p className='carousel-text'>Veszprém</p>
        </div>

      </Carousel>
    </div>
  );
};

export default MyCarousel;