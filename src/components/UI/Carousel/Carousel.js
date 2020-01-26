import React, { Component } from 'react';


import "react-responsive-carousel/lib/styles/carousel.min.css";

import { Carousel } from 'react-responsive-carousel';

const DemoCarousel = props => {

    return (
        <Carousel
        infiniteLoop={true}
        autoPlay={true}
        showThumbs={false}
        >
            {props.images.map(image => (
                <div key={image}>
                    <img src={image}  alt={`Imóvel na ${props.address}`}/>
                </div>

            ))}
        </Carousel>
    );

};

export default DemoCarousel;

{/* <FormControlLabel
          control={
          <Switch checked={checked} onChange={handleChange} />
        }
          label="Show"
        /> 
    
    
     <Fade right opposite when={show}>
                   <CardMedia
                        className={classes.media}
                        component="img"
                        image={images[imageShowing]}
                        alt={`Imóvel na ${props.address}`}
                        title={`Imóvel na ${props.address}`}
                    />
                </Fade>
    
    */}