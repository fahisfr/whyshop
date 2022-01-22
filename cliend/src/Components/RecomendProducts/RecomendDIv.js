import React, { useEffect } from 'react'
import './RecomendDiv.css'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProduts } from '../../Features/Products'
import {useNavigate ,Link} from 'react-router-dom'
import Axios, { ImagePath } from '../../Axios'
import { addToCart, changeProductQuantity,removeFromCart} from '../../Features/Cart'






function RecomendBar(props) {
    const history = useNavigate()
    const { products,loading,error } = useSelector(state => state.products)
    const dispatch = useDispatch()
    const { cartInfo } = useSelector(state => state.cart)
   
    useEffect(() => {
        dispatch(fetchProduts())
    }, [dispatch])
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
        <div className='recommend-products'>
            {
                products.filter(res => res.price >= props.pricelimit && res.price <= props.pricemax).map((product, index) => {
                    return (
                        <div className='recommend-item' key={index} >
                            <Link to={`/product/${product.name}`}>
                                <div className='recommend-item-image'>
                                    <img src={ImagePath(product.imageId)} alt='loading' onClick={() => history('/')} />
                                </div>
                            </Link>
                           
                            <div className='recommend-item-name' >
                                <span>{product.name}</span>
                            </div>
                            <div className='recommend-item-pirce'>
                                <span>{product.price} kg</span>
                            </div>
                            {
                              
                                cartInfo.find(res => res._id === product._id) ?
                                    <div className='recommend-item-remove'>
                                        <button onClick={()=>removeCartProduct(product._id)} className='item-remove-button'>Remove</button >
                                        <button onClick={(e) => changeQuantity(-.5, product._id)} className="recommend-item-quantity-button" style={{ color: 'red' }}>-</button>
                                        <span className='recommend-item-show-quantity'>{cartInfo.find(res => res._id === product._id).quantity}<span className='random-quantity-kg'> kg</span></span>
                                        <button onClick={(e) => changeQuantity(.5, product._id)} className="recommend-item-quantity-button">+</button>
                                    </div> :
                                    <div className='recommend-item-addtocart'>
                                        <button className='item-add' onClick={() => AddTOCart(product._id, product)} >Add to cart</button>
                                    </div>
                                 
                }
                            </div>
                    )
                })
            }

        </div >
    )
}

export default RecomendBar
