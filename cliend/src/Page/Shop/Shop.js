import React, { useEffect, useState } from 'react'
import NavBar from '../../Components/Navbar/NavBar'
import './Shop.css'
import { useParams } from 'react-router-dom'
import Axios, { ImagePath } from '../../Axios'
import { useSelector, useDispatch } from 'react-redux'
import {changeProductQuantity,addToCart,removeFromCart } from '../../Features/Cart'

function Products() {
    const { id } = useParams();
    const [products, setproducts] = useState([])
    const dispatch = useDispatch()
    const { cartInfo } = useSelector(state => state.cart)
   
    
    useEffect(() => {
        Axios.get('/shop/' + id).then((result) => {
            if (result.data.product) {
                setproducts(result.data.product)
            
            }
        })
    }, [id])

    const changeQuantity = (quantity, id) => {
        dispatch(changeProductQuantity({ id, quantity }))
        Axios.put(`cart/change-product-quantity/${id}`, { quantity }).then(res => {
            if (res.data.status) {

            }
        })
    }
    function AddTOCart(id, product) {
        const { name, price, imageId, type } = product
        dispatch(addToCart({ _id: id, name, type, price, imageId, id, quantity: 1 }))
        Axios.put(`cart/add-to-cart/${id}`).then(res => {
            // if (res.data.status) {
            //     dispatch(addToCart({ _id: id, name,type,price, imageId, id, quantity: 1 }))
            // }
        })
    }
    const removeCartProduct = id => {
        dispatch(removeFromCart(id))
        Axios.put('cart/remove-product/' + id, { id: id }).then(res => {
            if (res.data.status) {

            }
        })
    }



    return (
        <div className='shop-main'>
            <NavBar/>
            <div className='shop-container'>
                <div className='shop-1-helper'> 
                </div>
                <div className='shop-2-products'>
                    {products.map((product,index) => {
                        return (
                            <div className='shop-2-item' key={index} >
                                <div className='shop-2-item-image'>
                                    <img src={ImagePath(product.imageId)} alt='loading' />
                                </div>
                                <div className='shop-2-item-name'>
                                    <span>{product.name}</span>
                                </div>
                                <div className='shop-2-item-pirce'>
                                    <span>₹{product.price}.kg</span>
                                </div>

                                 {

                                    cartInfo.find(res => res._id === product._id) ?
                                        <div className='shop-item-remove'>
                                            <button onClick={() => removeCartProduct(product._id)} className='shop-item-remove-button'>Remove</button >
                                            <button onClick={(e) => changeQuantity(-.5, product._id)} className="shop-item-quantity-button" style={{ color: 'red' }}>-</button>
                                            <span className='shop-item-show-quantity'>{cartInfo.find(res => res._id === product._id).quantity}<span> kg</span></span>
                                            <button onClick={(e) => changeQuantity(.5, product._id)} className="shop-item-quantity-button">+</button>
                                        </div> :
                                        <div className='shop-2-item-add2cart'>
                                            <button onClick={() => AddTOCart(product._id,product)}>Add to cart</button>
                                        </div>

                                }
                            </div>
                        
                        )
                    })}


                    <div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Products
