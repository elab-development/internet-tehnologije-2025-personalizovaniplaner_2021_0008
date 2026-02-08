import React, { useState } from "react";
import { Container, Row, Col, Button, Form, ListGroup, Alert } from "react-bootstrap";
import { useCart } from "../../contexts/CartContext";
import './checkout.css';

const Checkout = () => {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const [orderSuccess, setOrderSuccess] = useState(false); 

  const freeDeliveryThreshold = 40;
  const totalPrice = getTotalPrice();
  const hasFreeDelivery = totalPrice >= freeDeliveryThreshold;
  const deliveryFee = hasFreeDelivery ? 0 : 5;
  const finalPrice = totalPrice + deliveryFee;

  const handleSubmit = (e) => {
    e.preventDefault();
    clearCart(); 
    setOrderSuccess(true); 
  };

  return (
    <Container className="py-5 checkout-container">
      <Row>
        <Col md={8}>
          <h2>Checkout</h2>
          <p className="mb-4">Enter your details to complete your purchase.</p>

          {/* Poruka o uspešnoj porudžbini */}
          {orderSuccess && (
            <Alert variant="success" className="mb-4 rounded-3 shadow-sm">
              ✅ Your order has been successfully processed!
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
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name and surname</Form.Label>
              <Form.Control type="text" placeholder="Enter your name and surname" required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control type="text" placeholder="Enter your address" required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formCity">
              <Form.Label>City</Form.Label>
              <Form.Control type="text" placeholder="Enter your city" required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPayment">
              <Form.Label>Payment method</Form.Label>
              <Form.Select required>
                <option value="">Choose...</option>
                <option>Card</option>
                <option>Paypal</option>
              </Form.Select>
            </Form.Group>

            <Button variant="primary" type="submit">
              CONFIRM YOUR ORDER
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Checkout;