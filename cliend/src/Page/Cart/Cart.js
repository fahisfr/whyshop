import React, { useEffect } from 'react'
import './Cart.css'
import { useSelector,useDispatch } from 'react-redux'
import {fetchCart} from '../../Features/Cart'
function Cart() {
    useEffect(() => {
       dispatch(fetchCart())
    }, [])
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart.cartInfo)
    console.log(cart)
   
    return (
        <div>
            <div className='products' >
                <div className='items'>
                    {
                        cart.cart.map(item => {
                            return (
                                <div className='item'>
                                    <img src='' alt='' />
                                    <div className='item-info'>
                                        <h3>s</h3>
                                        <p>s</p>
                                        <p>s</p>
                                    </div>
                                </div>

                            )
                        })
                    }
                </div>        
            </div>
            <div className='bill'>

            </div>
        </div>
    )
}

export default Cart
