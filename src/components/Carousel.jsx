import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const isMobile = typeof window !== "undefined" ? window.innerWidth <= 464 : false;

const responsive = {
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
  tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1 }
};



const MyCarousel = ({ hazak, onImageClick }) => {

  return (
    <div className="carousel-wrapper">
      <Carousel
      autoPlay={isMobile ? false : 3000}
      pauseOnHover={true}
      responsive={responsive}
      infinite={true}
      arrows={!isMobile} 
      draggable={true}
    >
        
       {hazak.map((haz) => (
                <div key={haz.id} className='carousel-container'>
                  {console.log("full object: ", haz)}
                    <img 
                        src={haz.imgUrl} 
                        onClick={() => onImageClick(haz.id)} 
                        className="my-carousel-image" 
                    />
                    <p className='carousel-text'>{haz.name}</p>
                </div>
            ))}

      </Carousel>
    </div>
  );
};

export default MyCarousel;