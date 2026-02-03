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
    slidesToShow: 9,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 7, slidesToScroll: 5, infinite: true, dots: false },
      },
      {
        breakpoint: 900,
        settings: { slidesToShow: 5, slidesToScroll: 5, infinite: true, dots: true },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 3, slidesToScroll: 3, dots: true },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 2, slidesToScroll: 2, dots: true },
      },
    ],
  };

  return (
    <section className='categories py-5 slick-slider bg-light'>
      <Container>
        <Row>
          <Col md="12" className='mb-4'>
            <div className='d-flex justify-content-between align-items-center'>
              <h1 className='heading'>Top Categories</h1>
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