import React, { useState } from "react";
import { Container, Row, Col, Button, Form, ListGroup, Alert } from "react-bootstrap";
import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import './checkout.css';

const Checkout = () => {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    paymentMethod: '',
  });

  const freeDeliveryThreshold = 40;
  const totalPrice = getTotalPrice();
  const hasFreeDelivery = totalPrice >= freeDeliveryThreshold;
  const deliveryFee = hasFreeDelivery ? 0 : 5;
  const finalPrice = totalPrice + deliveryFee;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user || !token) {
      setError('You must be logged in to place an order');
      return;
    }

    if (cartItems.length === 0) {
      setError('Your cart is empty');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:8000/api/porudzbine', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          cartItems: cartItems.map(item => ({
            id: parseInt(item.id) || parseInt(item.productId),
            title: item.title,
            price: parseFloat(item.price),
            offerPrice: item.offerPrice ? parseFloat(item.offerPrice) : null,
            quantity: parseInt(item.quantity) || 1,
            personalizacija: item.personalisation || null,
          })),
          totalAmount: totalPrice,
          deliveryFee: deliveryFee,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create order');
      }

      const result = await response.json();
      clearCart();
      setOrderSuccess(true);
      
      // sačeka malo dok se prikaže poruka
      setTimeout(() => {
        navigate('/profile');
      }, 4000);
      
    } catch (err) {
      setError(err.message);
      console.error('Order error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5 checkout-container">
      <Row>
        <Col md={8}>
          <h2>Checkout</h2>
          <p className="mb-4">Enter your details to complete your purchase.</p>

          {/*poruka uspeh*/}
          {orderSuccess && (
            <Alert variant="success" className="mb-4 rounded-3 shadow-sm">
              ✅ Your order has been successfully placed! Redirecting to your orders...
            </Alert>
          )}

          {/*poruka error*/}
          {error && (
            <Alert variant="danger" className="mb-4 rounded-3 shadow-sm">
              ❌ {error}
            </Alert>
          )}

          <div className="checkout-summary mb-4">
            <ListGroup variant="flush">
              {cartItems.map((item, index) => (
                <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                  <div>
                    <strong>{item.title}</strong> x {item.quantity || 1}
                  </div>
                  <div>
                    €{((item.offerPrice || item.price) * (item.quantity || 1)).toFixed(2)}
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>

            <div className="totals">
              <div className="d-flex justify-content-between">
                <span>Subtotal:</span>
                <span>€{totalPrice.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Delivery fee:</span>
                <span>{hasFreeDelivery ? "FREE DELIVERY" : `€${deliveryFee.toFixed(2)}`}</span>
              </div>
              <div className="d-flex justify-content-between fw-bold border-top pt-2">
                <span>Total:</span>
                <span>€{finalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formPayment">
              <Form.Label>Payment method</Form.Label>
              <Form.Select 
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleInputChange}
                required 
                disabled={orderSuccess}
              >
                <option value="">Choose...</option>
                <option value="card">Card</option>
                <option value="paypal">Paypal</option>
              </Form.Select>
            </Form.Group>

            <Button 
              variant="primary" 
              type="submit"
              disabled={loading || orderSuccess || cartItems.length === 0}
            >
              {loading ? 'Processing...' : 'CONFIRM YOUR ORDER'}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Checkout;