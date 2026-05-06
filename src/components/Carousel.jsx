import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';


const responsive = {
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
  tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1 }
};



const MyCarousel = ({ hazak, onImageClick }) => {

  return (
    <div className="carousel-wrapper">
      <Carousel
        responsive={responsive}
        infinite={true}
        draggable={true}
        pauseOnHover={true}
        autoPlay={typeof window !== "undefined" && window.innerWidth <= 464 ? false : true}
        autoPlaySpeed={3000}
        arrows={typeof window !== "undefined" && window.innerWidth > 464}
      >
        {hazak.map((haz) => (
          <div key={haz.id} className="carousel-container">
            <img
              src={haz.imgUrl}
              onClick={() => onImageClick(haz.id)}
              className="my-carousel-image"
              alt={haz.name}
            />
            <p className="carousel-text">{haz.name}</p>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default MyCarousel;