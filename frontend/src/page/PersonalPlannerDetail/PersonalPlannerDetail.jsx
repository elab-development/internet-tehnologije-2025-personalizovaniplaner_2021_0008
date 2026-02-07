import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Row, Col, Button, Badge, Form, Alert, ProgressBar, Card } from 'react-bootstrap';
import { productData } from '../../utils/data';
import '../ProductDetail/ProductDetail.css';
import { useAuth } from '../../auth/AuthContext';

const PersonalPlannerDetail = ({ addToCart }) => {
  const { productSlug } = useParams();
  const navigate = useNavigate();
  const {user} = useAuth();

  const [step, setStep] = useState(1);
  const [personalization, setPersonalization] = useState({
    text: '',
    font: 'Serif',
    color: '#000000',
  });
  const [selectedPages, setSelectedPages] = useState([]);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productSlug, step]);

  const numericId = parseInt(productSlug.split('-').pop());
  const product = productData.find(p => p.id === numericId);


  const pages = productData.filter(p => p.cat === 'Pages' && p.availableInStock > 0);
  const stationery = productData.filter(p => p.cat === 'Stationery' && p.availableInStock > 0);

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

  const goNext = () => setStep(prev => Math.min(3, prev + 1));
  const goBack = () => setStep(prev => Math.max(1, prev - 1));

  const updateSelection = (setList, sourceList, itemId, qty) => {
    const safeQty = Number.isNaN(qty) ? 0 : Math.max(0, qty);
    setList(prev => {
      const existing = prev.find(p => p.id === itemId);
      if (existing) {
        return safeQty === 0
          ? prev.filter(p => p.id !== itemId)
          : prev.map(p => (p.id === itemId ? { ...p, qty: safeQty } : p));
      } else if (safeQty > 0) {
        const product = sourceList.find(p => p.id === itemId);
        return product ? [...prev, { ...product, qty: safeQty }] : prev;
      }
      return prev;
    });
  };

  const updatePageQty = (productId, qty) => {
    updateSelection(setSelectedPages, pages, productId, qty);
  };

  const updateAddonQty = (productId, qty) => {
    updateSelection(setSelectedAddons, stationery, productId, qty);
  };

  const handleAddToCart = () => {
    if (!addToCart) return;


    const plannerItem = {
      ...product,
      id: `planner-${product.id}-${Date.now()}`,
      title: `${product.title} (Personalized)`,
      personalization,
    };
    addToCart(plannerItem);

    selectedPages.forEach(p => {
      const pageItem = {
        ...p,
        id: `pages-${p.id}-${Date.now()}`,
        quantity: p.qty,
      };
      for (let i = 0; i < p.qty; i++) {
        addToCart(pageItem);
      }
    });


    selectedAddons.forEach(a => {
      const addonItem = {
        ...a,
        id: `addon-${a.id}-${Date.now()}`,
      };
      for (let i = 0; i < a.qty; i++) {
        addToCart(addonItem);
      }
    });

    const hasPages = selectedPages.length > 0;
    const hasAddons = selectedAddons.length > 0;

    if (hasPages && hasAddons) {
      setMessage('Planner, pages and add-ons added to cart');
    } else if (hasPages) {
      setMessage('Planner and pages added to cart');
    } else if (hasAddons) {
      setMessage('Planner and add-ons added to cart');
    } else {
      setMessage('Planner added to cart');
    }

    setTimeout(() => navigate('/'), 2000);
  };

  const progressValue = step === 1 ? 33 : step === 2 ? 66 : 100;

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
                  Sale
                </Badge>
              )}
            </div>
          </Col>

          <Col md={6} className="product-info-col">
            <div className="product-info">
              <div className="mb-3">
                <span className="category-badge">{product.cat}</span>
              </div>

              <h1 className="heading mb-2">{product.title}</h1>

              <p className="small-text mb-3">Type: {product.type}</p>

              <div className="price-section mb-4">
                <span className="current-price">
                  <i className="bi bi-currency-euro"></i>
                  {(product.offerPrice || product.price).toFixed(2)}
                </span>
              </div>

              <ProgressBar now={progressValue} className="mb-3" />
              <div className="sub-heading mb-3">Step {step} of 3</div>

              {step === 1 && (
                <div className="mb-4">
                  <h5 className="sub-heading mb-3">Personalization</h5>
                  <Form.Group className="mb-3">
                    <Form.Label className="body-text">Text</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter text"
                      value={personalization.text}
                      onChange={(e) =>
                        setPersonalization(prev => ({ ...prev, text: e.target.value }))
                      }
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="body-text">Font</Form.Label>
                    <Form.Select
                      value={personalization.font}
                      onChange={(e) =>
                        setPersonalization(prev => ({ ...prev, font: e.target.value }))
                      }
                    >
                      <option value="Serif">Serif</option>
                      <option value="Sans-serif">Sans-serif</option>
                      <option value="Monospace">Monospace</option>
                      <option value="Cursive">Cursive</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label className="body-text">Text Color</Form.Label>
                    <Form.Control
                      type="color"
                      value={personalization.color}
                      onChange={(e) =>
                        setPersonalization(prev => ({ ...prev, color: e.target.value }))
                      }
                    />
                  </Form.Group>

                
                  <h5 className="sub-heading mb-3">Planner Specifications</h5>
                  <div className="bg-light p-3 rounded">
                    {product.color && (
                      <div className="mb-2">
                        <span className="body-text fw-bold">Color:</span>
                        <span className="body-text ms-2">{product.color}</span>
                      </div>
                    )}
                    {product.matherial && (
                      <div className="mb-2">
                        <span className="body-text fw-bold">Material:</span>
                        <span className="body-text ms-2">{product.matherial}</span>
                      </div>
                    )}
                    {product.metalColor && (
                      <div className="mb-2">
                        <span className="body-text fw-bold">Metal Color:</span>
                        <span className="body-text ms-2">{product.metalColor}</span>
                      </div>
                    )}
                    {product.lining && (
                      <div className="mb-2">
                        <span className="body-text fw-bold">Lining:</span>
                        <span className="body-text ms-2">{product.lining}</span>
                      </div>
                    )}
                    {product.pockets && (
                      <div className="mb-0">
                        <span className="body-text fw-bold">Pockets:</span>
                        <span className="body-text ms-2">{product.pockets}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

            
              {step === 2 && (
                <div className="mb-4">
                  <h5 className="sub-heading mb-3">Choose Pages</h5>
                  {pages.length > 0 ? (
                    <Row className="g-3">
                      {pages.map(p => {
                        const selectedQty = selectedPages.find(sp => sp.id === p.id)?.qty || 0;
                        return (
                          <Col xs={12} sm={6} key={p.id}>
                            <Card className={`h-100 ${selectedQty > 0 ? 'border-dark border-2' : ''}`}>
                              <Card.Img 
                                variant="top" 
                                src={p.image} 
                                style={{ height: '150px', objectFit: 'cover' }}
                              />
                              <Card.Body className="d-flex flex-column">
                                <Card.Title className="sub-heading">{p.title}</Card.Title>
                                <Card.Text className="body-text mb-3">
                                  €{p.price.toFixed(2)}
                                </Card.Text>
                                <div className="mt-auto d-flex align-items-center gap-2">
                                  <Button
                                    variant="outline-secondary"
                                    size="sm"
                                    onClick={() => updatePageQty(p.id, Math.max(0, selectedQty - 1))}
                                  >
                                    <i className="bi bi-dash"></i>
                                  </Button>
                                  <Form.Control
                                    type="number"
                                    min="0"
                                    value={selectedQty}
                                    onChange={(e) => updatePageQty(p.id, parseInt(e.target.value, 10))}
                                    style={{ maxWidth: '60px', textAlign: 'center' }}
                                  />
                                  <Button
                                    variant="outline-secondary"
                                    size="sm"
                                    onClick={() => updatePageQty(p.id, selectedQty + 1)}
                                  >
                                    <i className="bi bi-plus"></i>
                                  </Button>
                                </div>
                              </Card.Body>
                            </Card>
                          </Col>
                        );
                      })}
                    </Row>
                  ) : (
                    <p className="body-text">No pages available</p>
                  )}
                </div>
              )}

              {step === 3 && (
                <div className="mb-4">
                  <h5 className="sub-heading mb-3">Add-ons</h5>
                  {stationery.length > 0 ? (
                    <Row className="g-3">
                      {stationery.map(a => {
                        const selectedQty = selectedAddons.find(sa => sa.id === a.id)?.qty || 0;
                        return (
                          <Col xs={12} sm={6} key={a.id}>
                            <Card className={`h-100 ${selectedQty > 0 ? 'border-dark border-2' : ''}`}>
                              <Card.Img 
                                variant="top" 
                                src={a.image} 
                                style={{ height: '150px', objectFit: 'cover' }}
                              />
                              <Card.Body className="d-flex flex-column">
                                <Card.Title className="sub-heading">{a.title}</Card.Title>
                                <Card.Text className="body-text mb-3">
                                  €{a.price.toFixed(2)}
                                </Card.Text>
                                <div className="mt-auto d-flex align-items-center gap-2">
                                  <Button
                                    variant="outline-secondary"
                                    size="sm"
                                    onClick={() => updateAddonQty(a.id, Math.max(0, selectedQty - 1))}
                                  >
                                    <i className="bi bi-dash"></i>
                                  </Button>
                                  <Form.Control
                                    type="number"
                                    min="0"
                                    value={selectedQty}
                                    onChange={(e) => updateAddonQty(a.id, parseInt(e.target.value, 10))}
                                    style={{ maxWidth: '60px', textAlign: 'center' }}
                                  />
                                  <Button
                                    variant="outline-secondary"
                                    size="sm"
                                    onClick={() => updateAddonQty(a.id, selectedQty + 1)}
                                  >
                                    <i className="bi bi-plus"></i>
                                  </Button>
                                </div>
                              </Card.Body>
                            </Card>
                          </Col>
                        );
                      })}
                    </Row>
                  ) : (
                    <p className="body-text">No add-ons available</p>
                  )}
                </div>
              )}

              <div className="action-buttons mb-3">
                <div className="d-flex gap-2">
                  <Button
                    variant="outline-dark"
                    onClick={goBack}
                    disabled={step === 1}
                    className="w-100"
                  >
                    Back
                  </Button>
                  {step < 3 && user?.role !== 'admin' ? (
                    <Button
                      variant="dark"
                      onClick={goNext}
                      className="w-100"
                    >
                      Next
                    </Button>
                  ) : user?.role !== 'admin' ? (
                    <Button
                      variant="dark"
                      onClick={handleAddToCart}
                      className="w-100"
                    >
                      Add Planner to Cart
                    </Button>
                  ): null }
                </div>
              </div>

              {message && (
                <Alert variant="success" className="mb-0">
                  {message}
                </Alert>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default PersonalPlannerDetail;