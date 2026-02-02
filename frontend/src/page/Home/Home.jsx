import React from 'react';
import Slider from '../../components/Slider/Slider';
import { Col, Container, Row } from 'react-bootstrap';
import { featureData } from '../../utils/data';
import './Home.css';
 
const Home = () => {
  return (
    <>
      <Slider />
      <section className="py-5">
        <Container>
          <Row>
          {
            featureData.map((val, index)=>{
              return (
                <Col md={6} lg={3} sm={6} key={index} >
                  <div className="d-flex align-items-start">
                    <div className="mb-3 ms-3">
                      <img 
                        style={{ width: "120px", height: "120px", padding:"20px", objectFit: "cover", borderRadius: "50%" }}
                        src={val.image}
                        alt={val.title}
                      />
                      </div>
                      <div className="text">
                        <h3 className="sub-heading mb-1"> {val.title}</h3>
                        <p className="body-text"> {val.text}</p>
                      </div>
                  </div>
                </Col>
              )
            })
          }
          </Row>
        </Container>
      </section>
  
    </>
  )
}
 
export default Home

