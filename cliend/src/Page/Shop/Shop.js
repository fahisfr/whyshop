import React, { useEffect, useState } from 'react'
import NavBar from '../../Components/Navbar/NavBar'
import './Shop.css'
import { useParams } from 'react-router-dom'
import Axios, { ImagePath } from '../../Axios'
// import { useSelector, useDispatch } from 'react-redux'
// import { fetchCart } from '../../Features/Cart'

function Products() {
    const { id } = useParams();
    const [products, setproducts] = useState([])
    const [Search, setSearch] = useState('')

    function addproduct(id) {
        Axios.put(`cart/add-to-cart/${id}`).then(res => {
            
        })
    }
    
    
    useEffect(() => {
        Axios.get('/shop/' + id).then((result) => {
            if (result.data.product) {
                setproducts(result.data.product)
            
            }
        })
        return () => {
            console.log('unmount');
        }
    }, [id])
    return (
        <div className='shop-main'>
            <NavBar setSearch={setSearch} />
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
                                
                                <div className='shop-2-item-add2cart'>
                                    <button onClick={() => addproduct(product._id)}>Add to cart</button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>

    )
}

export default Products
