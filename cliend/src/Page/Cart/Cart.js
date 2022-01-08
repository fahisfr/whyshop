import React, { useEffect } from 'react'
import './Cart.css'
import {  Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchCart } from '../../Features/Cart'
import Axios,{ImagePath} from '../../Axios'

import Navbar from '../../Components/Navbar/NavBar'



function Cart() {
    const dispatch = useDispatch()
    useEffect(() => {
       dispatch(fetchCart())
    },[dispatch])
    
    const cart = useSelector(state => state.cart)
    var changeQuantity = (count, id) => {
        Axios.put('cart/change-product-quantity/' + id, { quantity: count, productID: id }).then(res => {
            dispatch(fetchCart())
        }).catch(err => {
            dispatch(fetchCart())
        })
    }
    var removeCartProduct = id => {
        Axios.put('cart/remove-product/' + id, { id: id }).then(res => {
            console.log(res)
            dispatch(fetchCart())
        }).catch(err => {
            dispatch(fetchCart())
        })
    }
    function deleteAll() {
        Axios.delete('cart/remove-all-products').then(res => {
            dispatch(fetchCart())
        }).catch(err => {
            dispatch(fetchCart())
        })
    }
    return (
        <div>

        
            <Navbar></Navbar>
        <div className="cart-main">
            {
                cart.cartInfo.length === 0 ?
                    <div className='cart-empty'>
                        <h1 >Cart empty</h1>
                    </div>
                    :
                    <div className="cart-container">
                        <div className="cart-products-info">
                            <div className="cart-info-tag">
                                <h1>FrShopping Cart</h1>
                                <h1>{cart.cartInfo.lengt}Items</h1>
                            </div>
                            <div className="cart-info-list">
                                <table >
                                    <thead>
                                        <tr>
                                            <th className='align-initial cart-table-head-border'>Product Name</th>
                                            <th className='align-center cart-table-head-border'></th>
                                            <th className='align-center cart-table-head-border'>Price</th>
                                            <th className='align-center cart-table-head-border'>Quantity</th>
                                            <th className='align-center cart-table-head-border'>Total</th>
                                            <th className='align-center cart-table-head-border'><button onClick={deleteAll} className='clear-cart'>Clear Cart</button></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            cart.cartInfo.map(product => {
                                                return (
                                                    <tr>
                                                        <td className='align-initial'>
                                                            <div className='cart-table-body-productname'>
                                                                <img src={ImagePath(product.imageId)} alt="" />
                                                                <h4>{product.name}</h4>
                                                            </div></td>
                                                        <td></td>
                                                        <td className='cart-ceanter-td' >₹{product.price}</td>
                                                        <td className='cart-ceanter-td' >
                                                            <div className="cart-table-body-quantiy">
                                                                <button onClick={(e) => changeQuantity(-.5, product._id)} >-</button>
                                                                <span>{product.quantity} kg</span>
                                                                <button onClick={(e) => changeQuantity(.5, product._id)}>+</button>
                                                            </div>
                                                        </td>
                                                        <td className='cart-ceanter-td' >₹{product.total}</td>
                                                        <td className='cart-ceanter-td'>
                                                            <button onClick={(e) => removeCartProduct(product._id)} className='remove-from-cart'>Remove</button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }

                                    </tbody>
                                </table>
                            </div>


                        </div>
                        <div className="cart-billinfo">
                            <div className="cart-billinfo-header">
                                <h4>Bill Information</h4>
                            </div>
                            <div className="cart-billinfo-body">
                                <Link to='/place-order'><button className='checkout-btn'>Checkout</button></Link>
                            </div>
                        </div>
                    </div>
            }
            </div>
        </div>
    )

}

export default Cart
