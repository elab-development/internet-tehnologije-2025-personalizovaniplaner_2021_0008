import React from "react";
import '../Cart/cart.css'
import { Alert, Offcanvas, Stack } from "react-bootstrap";
import { useState } from "react";
import { productData } from "../../utils/data";
import { CartQuantityControl } from "./CartQuantityControl";


const Cart = ({show, setCartBox}) => {
    
        const handleClose = () => setCartBox(false);

    return (
       <>
        <Offcanvas show = {show} onHide = {handleClose}
        placement='end' /**mozemo i da pomerimo ako nam na drugom mestu bolje izgleda */
        className = 'cartOffcanvas'
        scroll = {false}
        >
            <Offcanvas.Header closeButton className="d-block">
                <Offcanvas.Title className="heading">Your Shopping cart</Offcanvas.Title>
                <Alert variant="success" className="mt-3 rounded border-0">
                    <p className="mb-0 body-text">
                        Congrats! You have added more then NekaSuma <i class="bi bi-currency-euro"></i> in your cart. You have FREE Delivery!
                    </p>
                </Alert>
            </Offcanvas.Header>
            <Offcanvas.Body className="pt-0">
                {
                    productData/*.slice(0, 5)*/.map((item, index)=>{
                        return(
                            <Stack
                                direction="horizontal"
                                gap={3}
                                key={index}
                                className="border-bottom py-4 border-top"
                            >
                                <div>
                                    <img src={item.image} className="img-fluid" width='120px'/>
                                </div>
                                <div className="w-100 ps-3">
                                    <h6 className="sub-heading mb-2">{item.title}</h6>
                                    <div className="sub-heading pb-1 mb-2">
                                        <i class="bi bi-currency-euro"></i>
                                        {item.price}
                                    </div>
                                
                                <div className="d-flex align-items-center justify-content-between">
                                    <div className="d-inline-block">
                                        <CartQuantityControl />
                                    </div>
                                </div>
                                </div>
                            </Stack>
                        )
                    })
                }
            </Offcanvas.Body>
        </Offcanvas>
       </>
    )
}

export default Cart