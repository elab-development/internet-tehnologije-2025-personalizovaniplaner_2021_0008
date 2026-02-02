import React, { useState } from 'react'  
import '../Header/header.css'
import { Col, Container, Row, Dropdown, InputGroup, Form, ListGroup, Offcanvas, Navbar, Nav, Button, NavDropdown} from 'react-bootstrap'
import logo from '../../assets/temp_logo2.png' /*promenicemo posle*/
import Cart from '../Cart/Cart'
import CategoryList from './CategoryList'

const Header = () => {

  const [cartBox, setCartBox] = useState(false)
  const [showNavBar, setShowNavBar] = useState(false)
  const [dropDownShow, setDropDownShow] = useState(0)

 const handleDropDown = (type, id) => {
  if (window.innerWidth >= 1199) {
    type === 'in' ? setDropDownShow(id) : setDropDownShow(0)
  }

  if (type === 'click') {
    dropDownShow ? setDropDownShow(0) : setDropDownShow(id)
  }
}

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
            <ListGroup horizontal className='justify-content-end'>

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
              
              <ListGroup.Item className='border-0'
              onClick={() => setCartBox(true)}
              >
                <span className='d-flex align-items-center'>
                  <span className='position-relative'>
                    <i class="bi bi-bag-heart"></i>
                    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      6
                    <span class="visually-hidden">unread messages</span>
                    </span> 
                  </span>
                  <span className='ms-2 d-none d-sm-block body-text'>
                    Cart
                  </span>
                </span>
              </ListGroup.Item>
              <ListGroup.Item className='border-0 d-block d-lg-none'>
              <i className='bi bi-list h4'
              onClick={() => setShowNavBar(true)}
              aria-controls={`offcanvasNavbar-expand-lg`}
              >

              </i>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </header>

    <div className='menu'>
      <Container>
        <Row>
          <Navbar expand='lg' className="p-0">
          <Container fluid>
            
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-lg`}
              aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
              placement="start"
              show = {showNavBar}
            >
              <Offcanvas.Header className='justify-content-between border-bottom'>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
                  <img src={logo} alt="logo" className='img-fluid' style={{maxWidth: '230px'}} />
                </Offcanvas.Title>
                <button 
                className='btn secondary-btn position-absolute top-0 end-0 m-3'
                onClick={() => setShowNavBar(false)}
                >
                  <i className='bi bi-x-lg'></i>
                </button>
              </Offcanvas.Header>
              <Offcanvas.Body className='align-items-center'>
                <div className='d-block d-lg-none'>
                <div className='search_box mt-2'>
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
                <button className='btn btn-light rounded-1 w-100 mb-3'>
                  <i className='bi bi-geo-alt me-2'>Location</i>
                </button>
                </div>
                <div className='category_list'>
                  <CategoryList />
                </div>

                <Nav className="justify-content-start flex-grow-1 pe-3">
                  <Nav.Link href="#action1">Home</Nav.Link>
                  <Nav.Link href="#action2">About us</Nav.Link>
                  <Nav.Link href="#action2">Shop</Nav.Link>

                  <NavDropdown
                    className='dropdown-fullwidth'
                    title="Departments"
                    id={`collapsible-nav-dropdown`}
                    show = {dropDownShow === 1 ? true : false}
                    onMouseEnter={()=> handleDropDown('in', 1)}
                    onMouseLeave={()=> handleDropDown('out', 0)}
                    onClick={()=> handleDropDown('click', 1)}

                  >
                    <Row>
                      <Col lg={3} xs={12} xl={3} className="mb-2 mb-lg-0 border-end last-col">
                        <h6 className='primary-text sub-heading mb-1 ms-2'>
                          All Planners
                        </h6>
                        <a className='dropdown-item' href="#">
                          Planners
                        </a>  
                        <a className='dropdown-item' href="#">
                          Personalized Planners
                        </a>
                      </Col>
                      <Col lg={3} xs={12} xl={3} className="mb-2 mb-lg-0 border-end last-col">
                        <h6 className='primary-text sub-heading mb-1 ms-2'>
                          Writing Tools
                        </h6>
                        <a className='dropdown-item' href="#">
                          Fine Pens
                        </a>  
                        <a className='dropdown-item' href="#">
                          Markers
                        </a>
                        <a className='dropdown-item' href="#">
                          Highlighters
                        </a>
                        <a className='dropdown-item' href="#">
                          Calligraphy
                        </a>
                      </Col>
                      <Col lg={3} xs={12} xl={3} className="mb-2 mb-lg-0 border-end last-col">
                        <h6 className='primary-text sub-heading mb-1 ms-2'>
                          Stickers and Decor
                        </h6>
                        <a className='dropdown-item' href="#">
                          Cute
                        </a>  
                        <a className='dropdown-item' href="#">
                          Natural
                        </a>
                        <a className='dropdown-item' href="#">
                          Goth
                        </a>
                      </Col>
                      <Col lg={3} xs={12} xl={3} className="mb-2 mb-lg-0 border-end last-col">
                        <h6 className='primary-text sub-heading mb-1 ms-2'>
                          Gifts
                        </h6>
                        <a className='dropdown-item' href="#">
                          Valentine
                        </a>  
                        <a className='dropdown-item' href="#">
                          Birthday
                        </a>
                        <a className='dropdown-item' href="#">
                          Christmas
                        </a>
                        <a className='dropdown-item' href="#">
                          Helloween
                        </a>
                      </Col>
                    </Row>

                   {/* <NavDropdown.Item href="#action3">
                      Action
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action4">
                      Another action
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5">
                      Something 
                    </NavDropdown.Item>*/}
                  </NavDropdown>

                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
        </Row>
      </Container>
    </div>

  <Cart show = {cartBox} setCartBox = {setCartBox}/>

    </>
  )
}

export default Header