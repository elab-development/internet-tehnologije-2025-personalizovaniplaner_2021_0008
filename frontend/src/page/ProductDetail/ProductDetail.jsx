import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Badge, Form } from 'react-bootstrap';
import { productData } from '../../utils/data';
import './ProductDetail.css';

const ProductDetail = ({ addToCart }) => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  //Stranica na vrhu prilikom učitavanja
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);

  //trazi proizvod po ID-u
  const product = productData.find(p => p.id === parseInt(productId));

  if (!product) {
    return (
      <section className="py-5">
        <Container>
          <div className="text-center">
            <h2 className="heading mb-4">Product Not Found</h2>
            <Button variant="dark" onClick={() => navigate('/')}>
              Back to Home
            </Button>
          </div>
        </Container>
      </section>
    );
  }

  const handleAddToCart = () => {
    if (addToCart) {
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    }
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0) setQuantity(value);
  };

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  const originalPrice = product.price;
  const discountedPrice = product.offerPrice || product.price;
  const discountPercent = product.offerPrice 
    ? Math.round(((product.price - product.offerPrice) / product.price) * 100)
    : 0;

  return (
    <section className="product-detail-section py-5">
      <Container>
        <Row className="mb-4">
          <Col md={6} className="product-image-col">
            <div className="product-image-container">
              <img 
                src={product.image} 
                alt={product.title}
                className="product-detail-image"
              />
              {product.offerPrice && (
                <Badge className="discount-badge" bg="danger">
                  -{discountPercent}%
                </Badge>
              )}
            </div>
          </Col>

          <Col md={6} className="product-info-col">
            <div className="product-info">
              <div className="mb-3">
                <span className="category-badge">{product.cat}</span>
              </div>

              <h1 className="heading mb-3">{product.title}</h1>

              {/* cena */}
              <div className="price-section mb-4">
                {product.offerPrice ? (
                  <>
                    <span className="original-price">
                      <i className="bi bi-currency-euro"></i>{originalPrice.toFixed(2)}
                    </span>
                    <span className="discounted-price ms-2">
                      <i className="bi bi-currency-euro"></i>{discountedPrice.toFixed(2)}
                    </span>
                  </>
                ) : (
                  <span className="current-price">
                    <i className="bi bi-currency-euro"></i>{discountedPrice.toFixed(2)}
                  </span>
                )}
              </div>

              {/*opis proizvoda*/}
              <div className="description-section mb-4">
                <h5 className="sub-heading mb-3">Product Details</h5>
                <p className="body-text mb-3">
                  {product.description || 'Opis proizvoda nije dostupan.'}
                  High-quality {product.title.toLowerCase()} perfect for your organization and productivity needs.
                  Made with premium materials to ensure durability and long-lasting use.
                </p>
                <ul className="body-text">
                  <li>Premium quality materials</li>
                  <li>Durable and long-lasting</li>
                  <li>Perfect for personal or professional use</li>
                  <li>Eco-friendly packaging</li>
                </ul>
              </div>

              {/* Quantity Selector */}
              <div className="quantity-section mb-4">
                <label className="sub-heading d-block mb-2">Quantity</label>
                <div className="quantity-controls">
                  <Button 
                    variant="outline-secondary" 
                    onClick={decreaseQuantity}
                    className="qty-btn"
                  >
                    <i className="bi bi-dash"></i>
                  </Button>
                  <Form.Control 
                    type="number"
                    value={quantity}
                    onChange={handleQuantityChange}
                    min="1"
                    className="qty-input"
                  />
                  <Button 
                    variant="outline-secondary" 
                    onClick={increaseQuantity}
                    className="qty-btn"
                  >
                    <i className="bi bi-plus"></i>
                  </Button>
                </div>
              </div>

              {/* Dugmad */}
              <div className="action-buttons mb-4">
                <Button 
                  variant="dark" 
                  size="lg"
                  onClick={handleAddToCart}
                  className="add-to-cart-btn w-100 mb-2"
                >
                  <i className="bi bi-cart-plus"></i> Add to Cart
                </Button>
                <Button 
                  variant="outline-dark" 
                  size="lg"
                  onClick={() => navigate('/')}
                  className="w-100"
                >
                  Continue Shopping
                </Button>
              </div>

              {addedToCart && (
                <div className="alert alert-success" role="alert">
                  ✓ Added to cart successfully!
                </div>
              )}

              {/* dodatne info */}
              <div className="additional-info">
                <div className="info-item">
                  <i className="bi bi-truck"></i>
                  <div>
                    <h6 className="sub-heading mb-0">Free Shipping</h6>
                    <p className="body-text mb-0">On orders over €30</p>
                  </div>
                </div>
                <div className="info-item">
                  <i className="bi bi-arrow-counterclockwise"></i>
                  <div>
                    <h6 className="sub-heading mb-0">Easy Returns</h6>
                    <p className="body-text mb-0">30-day return policy</p>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ProductDetail;
