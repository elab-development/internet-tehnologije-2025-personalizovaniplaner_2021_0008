import React from "react";
import '../Cart/cart.css';
import { Alert, Offcanvas, Stack, Button } from "react-bootstrap";
import { useCart } from "../../contexts/CartContext";
import { CartQuantityControl } from "./CartQuantityControl";
import { Link } from "react-router-dom"; 

const Cart = ({ show, setCartBox }) => {
  const { cartItems, getTotalPrice, removeFromCart, updateQuantity } = useCart();
  
  const handleClose = () => setCartBox(false);
  const totalPrice = getTotalPrice();
  const freeDeliveryThreshold = 40;
  const showFreeDeliveryAlert = totalPrice >= freeDeliveryThreshold;

  return (
    <>
      <Offcanvas show={show} onHide={handleClose}
        placement='end'
        className='cartOffcanvas'
        scroll={false}
      >
        <Offcanvas.Header closeButton className="d-block">
          <Offcanvas.Title className="heading">Your Shopping cart</Offcanvas.Title>
          {showFreeDeliveryAlert && (
            <Alert variant="success" className="mt-3 rounded border-0">
              <p className="mb-0 body-text">
                Congrats! You have more than €{freeDeliveryThreshold.toFixed(2)} in your cart. You have FREE Delivery!
              </p>
            </Alert>
          )}
        </Offcanvas.Header>
        <Offcanvas.Body className="pt-0">
          {cartItems.length === 0 ? (
            <div className="text-center py-5">
              <p className="body-text">Your cart is empty</p>
            </div>
          ) : (
            <>
              {cartItems.map((item, index) => (
                <Stack
                  direction="horizontal"
                  gap={3}
                  key={index}
                  className="border-bottom py-4 border-top"
                >
                  <div>
                    <img src={item.image} className="img-fluid" width='120px' alt={item.title}/>
                  </div>
                  <div className="w-100 ps-3">
                    <h6 className="sub-heading mb-2">{item.title}</h6>
                    <div className="sub-heading pb-1 mb-2">
                      <i className="bi bi-currency-euro"></i>
                      {(item.offerPrice || item.price).toFixed(2)}
                    </div>
                
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="d-inline-block">
                        <CartQuantityControl 
                          quantity={item.quantity || 1}
                          onQuantityChange={(newQty) => updateQuantity(item.id, newQty)}
                        />
                      </div>
                      <Button 
                        variant="outline-danger" 
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <i className="bi bi-trash"></i>
                      </Button>
                    </div>
                  </div>
                </Stack>
              ))}
              <div className="cart-total mt-4 pt-3 border-top">
                <div className="d-flex justify-content-between mb-2">
                  <span className="sub-heading">Total:</span>
                  <span className="sub-heading">€{totalPrice.toFixed(2)}</span>
                </div>
            
                <Link to="/checkout" className="btn btn-dark w-100 checkout-btn">
                  Proceed to Checkout
                </Link>
              </div>
            </>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Cart;
