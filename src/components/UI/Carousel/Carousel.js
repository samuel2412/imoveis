import React from 'react';


import "react-responsive-carousel/lib/styles/carousel.min.css";

import { Carousel } from 'react-responsive-carousel';

const DemoCarousel = props => {

    return (
        <Carousel
        infiniteLoop={true}
        showThumbs={false}
        >
            {props.images.map(image => (
                <div key={image}>
                    <img src={image} style={{maxHeight: 300}} alt={`Imóvel na ${props.address}`}/>
                </div>

            ))}
        </Carousel>
    );

};

export default DemoCarousel;
