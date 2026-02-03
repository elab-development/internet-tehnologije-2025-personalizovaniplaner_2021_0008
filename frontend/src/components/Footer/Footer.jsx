import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { paymentIcons, siteLogo } from "../../utils/data";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        
        <Row className="footer-top">
          <Col md={4} className="footer-section text-md-start text-center">
            <img src={siteLogo} alt="Build A Planner Logo" className="footer-logo" />
          </Col>

          <Col md={4} className="footer-section text-center">
            <div className="footer-links">
              <a href="/about" className="footer-nav-link">ABOUT</a>
              <a href="/home" className="footer-nav-link">HOME</a>
              <a href="/shop" className="footer-nav-link">SHOP</a>
            </div>
          </Col>

          <Col md={4} className="footer-section text-center">
            <div className="footer-contact">
              <h5 className="footer-title">CONTACT</h5>
              <p className="footer-text">Email: support@planeri.rs</p>
              <p className="footer-text">Telefon: +381 64 123 4567</p>
            </div>
          </Col>
        </Row>

        
        <hr className="footer-divider" />

        
        <Row className="footer-bottom align-items-center justify-content-between">
          <Col md={4} className="text-md-start text-center">
            <small className="footer-legal">
              &copy; 2026 Personalizovani Planeri
            </small>
            <span className="footer-separator">|</span>
            <a href="/terms" className="footer-link">Terms of Service</a>
          </Col>

          <Col md={4} className="text-center">
            <div className="footer-payment">
              {paymentIcons.map((icon) => (
                <img
                  key={icon.id}
                  src={icon.image}
                  alt={icon.title}
                  className="payment-icon"
                />
              ))}
            </div>
          </Col>

          <Col md={4} className="text-md-end text-center">
            <a href="#top" className="footer-button">Back to top ↑</a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
