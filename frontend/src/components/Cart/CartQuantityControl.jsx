import React, { useState } from 'react'
import { Button, FormControl, InputGroup } from 'react-bootstrap'

export const CartQuantityControl = () => {

        const [count, setCount] = useState(0);

        const handleIncrease = () => {
            setCount((prev) => prev + 1)
        }

          const handleDecrease = () => {
            setCount((prev) => (prev > 0 ? prev-1 : 0))
        }

    return (
        <>
            <InputGroup>
            <Button size='sm' variant='light' onClick={handleDecrease}>
                <i className='bi bi-dash-lg'></i>
            </Button>

            <FormControl
                type='text'
                readOnly
                value={count}
                className='text-center'
                style={{width:'2.5rem', border:'2px solid #f8f9fa'}}
            >

            </FormControl>

            <Button size='sm' variant='light' onClick={handleIncrease}>
                <i className='bi bi-plus-lg'></i>
            </Button>
            </InputGroup>
        </>
    )
}