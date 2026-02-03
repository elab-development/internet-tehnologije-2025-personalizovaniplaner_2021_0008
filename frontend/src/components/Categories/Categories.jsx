import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { categoriesData } from '../../utils/data';
import CategoryCard from '../Cards/CategoryCard';
import CustomSlider from '../CustomSlider/CustomSlider';

const Categories = () => {
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3, slidesToScroll: 1 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2, slidesToScroll: 1 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  };

  return (
    <section className='categories py-3 slick-slider bg-light'> 
      <Container>
        <Row>
          <Col md="12" className='mb-3'> 
            <h1 className='heading'>Top Categories</h1>
            <div className="text-center mt-2"> 
              <button className='bt primary-btn'>View All</button>
            </div>
          </Col>
          <Col md="12">
            <CustomSlider settings={settings}>
              {categoriesData.map((val, index) => (
                <CategoryCard val={val} key={index} />
              ))}
            </CustomSlider>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Categories;
