import React, { useState, useEffect } from 'react'
import './Product.css'
import RecomendDiv from '../../Components/RecomendProducts/RecomendDIv'


import NavBar from '../../Components/Navbar/NavBar'
import { useParams } from 'react-router-dom'
import Axios, { ImagePath } from '../../Axios'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart,changeProductQuantity } from '../../Features/Cart'




function Product() {
    const dispatch = useDispatch()
    const { cartInfo } = useSelector(state => state.cart)
    const [SearchProduct, setproduct] = useState({})
    const inCart = cartInfo.find(item => item._id === SearchProduct._id)
    const { id: idparams } = useParams()
    useEffect(() => {
        Axios.get(`/product/${idparams}`).then(res => {
            if (res.data.status) {
                setproduct(res.data.product)

            }

        })
    }, [idparams])
    function AddTOCart(id, product) {
        const { name, price, imageId, type } = product
        Axios.put(`cart/add-to-cart/${id}`).then(res => {
            if (res.data.status) {
                dispatch(addToCart({ _id: id, name, price, imageId, id, quantity: 1, type }))
            }
        })
    }
    const changeQuantity = (quantity, id) => {
        Axios.put(`cart/change-product-quantity/${id}`, { quantity }).then(res => {
            if (res.data.status) {
                dispatch(changeProductQuantity({ id, quantity }))
            }
        })
    }
    return (
        <div className='product-main'>
            <NavBar />
            <div className='show-product-info'>
                <div className='show-product-images'>
                    <img src={ImagePath(SearchProduct.imageId)} alt='product' />
                </div>
                <div className='show-product-details'>
                    <span className='p-title'>{SearchProduct.name}</span>
                    <span className='p-stock'> In stock</span>
                    <span className='p-price'>₹{SearchProduct.price} Kg</span>

                    {inCart ? <div className='p-addtocart'>
                        <button style={{ backgroundColor: "red" }} onClick={()=>changeQuantity(-.5,inCart._id)} >-</button>
                        <span>{inCart.quantity}</span>
                        <button onClick={() => changeQuantity(.5, inCart._id)}>+</button>
                    </div> :
                        <button className='p-button' onClick={() => AddTOCart(SearchProduct._id, SearchProduct)} >Add to cart</button>}
                </div>
            </div>
            <div className='p-recommend'>
                <RecomendDiv pricelimit={SearchProduct.price} pricemax={SearchProduct.price + 100} />
            </div>


        </div>
    )
}

export default Product
