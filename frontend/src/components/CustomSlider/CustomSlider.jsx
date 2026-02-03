import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CustomSlider = ({ settings, children }) => {
  return (
    <div className="custom-slider">
      <Slider {...settings}>
        {children}
      </Slider>
    </div>
  );
};

export default CustomSlider;