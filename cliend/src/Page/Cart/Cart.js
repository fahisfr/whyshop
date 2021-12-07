import React, { useEffect } from 'react'
import './Cart.css'
import { useSelector,useDispatch } from 'react-redux'
import { fetchCart } from '../../Features/Cart'
import Axios from '../../Axios'

function Cart() {
    const dispatch = useDispatch()
    useEffect(() => {
       dispatch(fetchCart())
    },[])
    
    const cart = useSelector(state => state.cart)
    console.log(cart.cartInfo)
    var changeQuantity = (count,id) => {
        Axios.put('/change-product-quantity/' +id, { quantity: count, productID:id}).then(res => {
            dispatch(fetchCart())
        }).catch(err => {
            dispatch(fetchCart())
        })
    }
    var removeCartProduct = id => {
        Axios.delete('/remove-from-cart/' + id,{id:id}).then(res => {
            console.log(res)
            dispatch(fetchCart())
        }).catch(err => {
            dispatch(fetchCart())
        })
    }
    function deleteAll() {
        Axios.delete('/remove-cart-all-products').then(res => {
            dispatch(fetchCart())
        }).catch(err => {
            dispatch(fetchCart())
        })
    }
    return (
        <div>
            <div className='products' >
                <div className='items'>
                    <button onClick={()=>deleteAll()}>Remove ALl</button>
                    {cart.status ? '' : <h1>cart.message</h1>}
                   
                    {
                        cart.cartInfo.map(item => {
                            return (
                                <div className='item'>
                                    <img src='' alt='' />
                                    <div className='item-info'>
                                        <h3>{ item.name}</h3>
                                        <p>{ item.price}</p>
                                        <p>quantity={item.quantity}</p>
                                        <button onClick={() => changeQuantity(-1, item._id)}>-</button><input value={item.quantity} type="text" /><button onClick={() => changeQuantity(1, item._id)}>+</button>
                                        <button onClick={() => removeCartProduct(item._id) }>remove</button>
                                    </div>
                                </div>

                            )
                        })
                    }
                </div>        
            </div>
            <div className='bill'>
                <button>Order</button>
            </div>
        </div>
    )
}

export default Cart
