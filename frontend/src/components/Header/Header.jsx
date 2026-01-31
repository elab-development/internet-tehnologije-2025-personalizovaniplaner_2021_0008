import React from 'react'  
import '../Header/header.css'
import { Col, Container, Row, Dropdown, InputGroup, Form, ListGroup } from 'react-bootstrap'
import logo from '../../assets/temp_logo2.png' /*promenicemo posle*/

const Header = () => {
  return (
    <>
    <div className='top_header py-1'>
      <Container>
        <Row className = 'align-items-center'>
          <Col md = {6} sm = {6} xs = {6}>
            <p>
              Make your planner - pave your own way!
            </p>
          </Col>
          <Col md = {6} sm = {6} xs = {6}>
            <div className='text-end'>
              <Dropdown>
                <Dropdown.Toggle id="dropdown-menu-align-start" className='fw-bold text-white'>
                  English
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">English</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Serbian</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">German</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Col>
        </Row>
      </Container>
    </div>

    <header className='py-3 border-bottom'>
      <Container>
        <Row className='align-items-center'>
          <Col xl = {2} lg = {3} md = {6} sm = {5} xs = {5}>
              <img src={logo} className='img-fluid' alt='logo' style={{maxWidth: '80px'}}/>
          </Col>

          <Col xl = {5} lg = {4} className='d-none d-lg-block'>
              <div className='search_box'>
                <InputGroup>
                  <Form.Control
                    placeholder="Search for products"
                    aria-label="Search"
                    aria-describedby="basic-addon1"
                    type='search'
                    className='rounded-1 py-2'
                  />
                  <i class="bi bi-search-heart position-absolute"></i>
                </InputGroup>
              </div>
          </Col>

          <Col xl = {3} lg = {2} className='d-none d-lg-block'>
              <button type='button' className='btn secondary-btn'>
                <i class="bi bi-globe-europe-africa"></i> Location
              </button>
          </Col>

          <Col xl = {2} lg = {3} md = {6} sm = {7} xs = {7}>
            <ListGroup horizontal>

              <ListGroup.Item className='border-0'>
                <span className='d-flex align-items-center'>
                  <span className='position-relative'>
                    <i class="bi bi-person"></i>
                  </span>
                  <span className='ms-2 d-none d-sm-block body-text'>
                    Account
                  </span>
                </span>
              </ListGroup.Item>

              <ListGroup.Item className='border-0'>
                <span className='d-flex align-items-center'>
                  <span className='position-relative'>
                    <i class="bi bi-heart"></i>
                    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      3
                    <span class="visually-hidden">unread messages</span>
                    </span> 
                  </span>
                  <span className='ms-2 d-none d-sm-block body-text'>
                    Whishlist
                  </span>
                </span>
              </ListGroup.Item>
              
              <ListGroup.Item className='border-0'>
                <span className='d-flex align-items-center'>
                  <span className='position-relative'>
                    <i class="bi bi-bag-heart"></i>
                    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      9
                    <span class="visually-hidden">unread messages</span>
                    </span> 
                  </span>
                  <span className='ms-2 d-none d-sm-block body-text'>
                    Cart
                  </span>
                </span>
              </ListGroup.Item>

            </ListGroup>
          </Col>
        </Row>
      </Container>
    </header>
    </>
  )
}

export default Header