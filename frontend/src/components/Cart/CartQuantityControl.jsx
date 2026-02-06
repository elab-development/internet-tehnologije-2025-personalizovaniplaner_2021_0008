import React from 'react'
import { Button, FormControl, InputGroup } from 'react-bootstrap'

export const CartQuantityControl = ({ quantity = 1, maxQuantity = Infinity, onQuantityChange }) => {
    const handleIncrease = () => {
        if (quantity < maxQuantity && onQuantityChange) onQuantityChange(quantity + 1);
    }

    const handleDecrease = () => {
        if (onQuantityChange) onQuantityChange(Math.max(1, quantity - 1));
    }

    return (
        <InputGroup>
            <Button size='sm' variant='light' onClick={handleDecrease}>
                <i className='bi bi-dash-lg'></i>
            </Button>
            <FormControl
                type='text'
                readOnly
                value={quantity}
                className='text-center'
                style={{width:'2.5rem', border:'2px solid #f8f9fa'}}
            />
            <Button 
                size='sm' 
                variant='light' 
                onClick={handleIncrease}
                disabled={quantity >= maxQuantity}
            >
                <i className='bi bi-plus-lg'></i>
            </Button>
        </InputGroup>
    )
}