import React, { useState } from 'react'  
import '../Header/header.css'
import { Col, Container, Row, Dropdown, InputGroup, Form, ListGroup, Offcanvas, Navbar, Nav, Button, NavDropdown} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo/logo_build_a_planner.png' 
import Cart from '../Cart/Cart'
import CategoryList from './CategoryList'
import {useAuth} from '../../auth/AuthContext'

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

const { user } = useAuth();

  return (
    <>
    <div className='top_header py-1'>
      <Container>
        <Row className = 'align-items-center'>
          <Col md = {6} sm = {6} xs = {6}>
            <p className='text-white'>
              Make your planner - pave your own way!
            </p>
          </Col>
          <Col md = {6} sm = {6} xs = {6}>
            <div className='text-end'>
              <span><i className="bi bi-journal-richtext text-white fs-4"></i></span>
            </div>
          </Col>
        </Row>
      </Container>
    </div>

    <header className='py-3 border-bottom'>
      <Container>
        <Row className='align-items-center'>
          <Col xl = {2} lg = {3} md = {6} sm = {5} xs = {5}>
              <Link to='/' className='d-inline-block'>
                <img src={logo} className='img-fluid' alt='logo' style={{maxWidth: '80px'}}/>
              </Link>
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
              <button type='button' className='btn secondary-btn' disabled={true} onHover = 'false'>
                <i class="bi bi-globe-europe-africa"></i> Location: RS
              </button>
          </Col>

          <Col xl = {2} lg = {3} md = {6} sm = {7} xs = {7}>
            <ListGroup horizontal className='justify-content-end'>

              <ListGroup.Item className='border-0'>
                <Link
                  to = {user ? '/profile' : '/login'}
                  className='text-decoration-none text-clr'
                  >
                <span className='d-flex align-items-center'>
                  <span className='position-relative'>
                    <i class="bi bi-person"></i>
                  </span>
                  <span className='ms-2 d-none d-sm-block body-text'>
                    Account
                  </span>
                </span>
                </Link>
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
                  <Nav.Link as={Link} to="/">Home</Nav.Link>
                  
                  

                  <NavDropdown
                    className='dropdown-fullwidth'
                    title="Shop"
                    id={`collapsible-nav-dropdown`}
                    show = {dropDownShow === 1 ? true : false}
                    onMouseEnter={()=> handleDropDown('in', 1)}
                    onMouseLeave={()=> handleDropDown('out', 0)}
                    onClick={()=> handleDropDown('click', 1)}

                  >
                    <Row>
                      <Col lg={3} xs={12} xl={3} className="mb-2 mb-lg-0 border-end last-col">
                        <Link to="/" className="dropdown-item primary-text sub-heading mb-1">
                          All Planners
                        </Link>
                        <Link to="/" className='dropdown-item'>
                          Regular Planners
                        </Link>  
                        <Link to="/" className='dropdown-item'>
                          Personalized Planners
                        </Link>
                      </Col>
                      <Col lg={3} xs={12} xl={3} className="mb-2 mb-lg-0 border-end last-col">
                        <Link to="/" className="dropdown-item primary-text sub-heading mb-1">
                          Planner Pages
                        </Link>
                        <Link to="/" className='dropdown-item'>
                          Daily pages
                        </Link>  
                        <Link to="/" className='dropdown-item'>
                          Calendar pages
                        </Link>
                        <Link to="/" className='dropdown-item'>
                          Trackers
                        </Link>
                      </Col>
                      <Col lg={3} xs={12} xl={3} className="mb-2 mb-lg-0 border-end last-col">
                        <Link to="/" className="dropdown-item primary-text sub-heading mb-1">
                          Stationery
                        </Link>
                        <Link to="/" className='dropdown-item'>
                          Planner separators
                        </Link>  
                        <Link to="/" className='dropdown-item'>
                          Pens
                        </Link>
                        <Link to="/" className='dropdown-item'>
                          Pockets
                        </Link>
                      </Col>
                      <Col lg={3} xs={12} xl={3} className="mb-2 mb-lg-0 border-end last-col">
                        <Link to="/" className="dropdown-item primary-text sub-heading mb-1">
                          Special collections
                        </Link>
                        <Link to="/" className='dropdown-item'>
                          Valentine's Day
                        </Link>
                      </Col>
                    </Row>

                  </NavDropdown>

                  <Nav.Link as={Link} to="/about">About Us</Nav.Link>
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