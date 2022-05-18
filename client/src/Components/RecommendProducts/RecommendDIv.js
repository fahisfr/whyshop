import React, { useEffect, useState } from 'react'
import './RecommendDiv.css'
import { useDispatch, useSelector } from 'react-redux'

import { Link } from 'react-router-dom'
import Axios, { ImagePath } from '../../Axios'
import { addToCart, changeProductQuantity, removeFromCart } from '../../Features/Cart'



function RecommendBar({ type }) {
    const { isAuth } = useSelector(state => state.user.userInfo)
    const { products } = useSelector(state => state.products)
    const [recommend, setRecommend] = useState([])
    const dispatch = useDispatch()



    useEffect(() => {
        const filterProducts = () => {
            if (type) {
                return products.filter(product => product.type === type)
            } else {
                let randomProducts = []

                for (let i = 0; i < 10; i++) {
                    randomProducts.push(products[Math.floor(Math.random()*products.length)])
                }
                return randomProducts
            }
        }
        setRecommend(filterProducts())

    },[type,products])


    const { cartInfo } = useSelector(state => state.cart)
    const changeQuantity = (quantity, id) => {
        dispatch(changeProductQuantity({ id, quantity }))
        Axios.put(`cart/change-product-quantity/${id}`, { quantity })
    }

    const AddTOCart = (id, product) => {

        const { name, price, imageId, type } = product
        dispatch(addToCart({ _id: id, name, type, price, imageId, id, quantity: 1 }))
        Axios.put(`cart/add-to-cart/${id}`)
    }

    const removeCartProduct = id => {
        dispatch(removeFromCart(id))
        Axios.put('cart/remove-product/' + id, { id: id })
    }

    return (
        <div className='recommend-products'>
            {
                recommend.map((product, index) => {
                    return (
                        <div className='recommend-item' key={index} >
                            <Link to={`/product/${product?.name}`}>
                                <div className='recommend-item-image'>
                                    <img src={`${ImagePath+product?.imageId}.jpg` } alt='loading' />
                                </div>
                            </Link>
                            <div className='recommend-item-name' >
                                <span>{product?.name}</span>
                            </div>
                            <div className='recommend-item-pirce'>
                                <span>{product?.price} kg</span>
                            </div>
                            {

                                cartInfo.find(res => res._id === product._id) ?
                                    <div className='recommend-item-remove'>
                                        <button onClick={() => removeCartProduct(product._id)} className='item-remove-button'>Remove</button >
                                        <button onClick={(e) => changeQuantity(-.5, product._id)} className="recommend-item-quantity-button" style={{ color: 'red' }}>-</button>
                                        <span className='recommend-item-show-quantity'>{cartInfo.find(res => res._id === product._id).quantity}<span className='random-quantity-kg'> kg</span></span>
                                        <button onClick={(e) => changeQuantity(.5, product._id)} className="recommend-item-quantity-button">+</button>
                                    </div> :
                                    <div className='recommend-item-addtocart'>{
                                        isAuth ? <button className='item-add' onClick={() => AddTOCart(product._id, product)} >Add to cart</button> :
                                            <Link to='/login' ><button className='item-add'>Add to cart</button></Link>
                                    }

                                    </div>


                            }
                        </div>
                    )
                })

            }

        </div >
    )
}

export default RecommendBar
