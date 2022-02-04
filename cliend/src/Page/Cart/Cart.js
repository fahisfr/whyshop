import React, { useEffect } from 'react'
import './Cart.css'
import { Link} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchCart, removeFromCart, changeProductQuantity} from '../../Features/Cart'
import Axios, { ImagePath } from '../../Axios'

import Navbar from '../../Components/Navbar/NavBar'



function Cart() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchCart())
    }, [dispatch])
    const { cartInfo,total } = useSelector(state => state.cart)

    const changeQuantity = (quantity, id,price) => {
        dispatch(changeProductQuantity({ id, quantity,price }))
        Axios.put(`cart/change-product-quantity/${id}`, { quantity }).then(res => {
            if (res.data.status) {
            }
        })
    }
    const removeCartProduct = id => {
        dispatch(removeFromCart(id))
        Axios.put('cart/remove-product/' + id, { id: id }).then(res => {
        }).then(res => {
            
        }).catch(err => {
            
        })
    }
    return (
        <div>
            <Navbar></Navbar>
            {
                cartInfo.length === 0 ?
                    <div className='cart-is-empty'>
                        <span>Cart is Empty</span>
                    </div> :
                    
                    <div className='cart-container'>
                      
                        <div className="cart-left">
                            <div className="cart-left-header">
                                <div className="cart-left-header-left">
                                    <h1 className="cart-h1-mycart">My Cart</h1>

                                </div>
                                <div className="cart-left-header-right">

                                </div>
                            </div>
                            <div className="cart-left-body">
                                {
                                    cartInfo.map((item, index) => {
                                        return (
                                            <div className="cart-left-body-product" key={index}>

                                                <div className="cart-left-body-product-image">
                                                    <img src={ImagePath(item.imageId)} alt="loading" />
                                                </div>
                                                <div className="cart-left-body-product-details">
                                                    <span className='c-p-name'>{item.name}</span>
                                                    <span className='c-p-stock'>inStock</span>
                                                    <span className='c-p-price'>₹{item.price} kg</span>
                                                    <span className='c-p-total'>total:{item.total}</span>
                                                </div>
                                                <div className="cart-left-body-product-quantity">
                                                    <button onClick={() => changeQuantity(-.5, item._id, item.price / 2)} style={{ backgroundColor: 'red' }} className="cart-product-quantity-button">-</button>
                                                    <span className='cart-prdocut-show-quantity'>{item.quantity}<span style={{ fontSize: '10px' }}>kg</span></span>
                                                    <button onClick={() => changeQuantity(.5, item._id, item.price / 2)} className="cart-product-quantity-button">+</button>
                                                </div>
                                                <div className="cart-left-body-prdouct-total">
                                                    <span>₹24</span>
                                                </div>
                                                <div>
                                                    <button onClick={() => { removeCartProduct(item._id) }} className="cart-prdocut-remove">remove</button>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>

                        </div>
                        <div className="cart-right">
                            <div className='cart-bill'>
                                <span>PRICE DETAILS</span>
                            </div>
                            <div className='cart-p-t-billing'>
                                <span>Products Total </span>
                                <span>₹{total}</span>
                            </div>
                            <div className='cart-d-p-billing' >
                                <span>delivery price</span>
                                <span style={{ color: 'lightgreen' }}>Free</span>
                            </div>
                            <div className="cart-order-total">
                                <span>Total Price</span>
                                <span>₹{total}</span>
                            </div>
                            <div className='cart-place-order'>
                                <Link to='/checkout'><button className='place-order'>Place Order</button></Link>

                            </div>
                        </div>
                    </div>
            }
            

        </div>
    )

}

export default Cart
