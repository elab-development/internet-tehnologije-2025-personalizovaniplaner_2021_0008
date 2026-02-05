
import React, {useState} from "react";
import "./slider.css";
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import { sliderData } from "../../utils/data";

const Slider = () => {
    const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  return (
    <>
        <div className="slider-section">
            <Carousel activeIndex={index} onSelect={handleSelect}>
                {
                    sliderData.map((item, index) => {
                        return (
                        <Carousel.Item key={index}>
                            <img src={item.image} alt="" className="img-fluid" />
                            <Carousel.Caption>
                            <h3 className="main-heading" dangerouslySetInnerHTML={{__html: item.heading}}></h3>
                            <p className="mt-3">
                                {item.title}
                            </p>
                            <Link to={item.link} className="btn primary-btn mt-4">
                                Shop Now
                            <i className="bi bi-arrow-right"></i></Link>
                            </Carousel.Caption>
                        </Carousel.Item>
                        );
                    })
                }
                
            </Carousel>
        </div>
    </>
  );
}

export default Slider
