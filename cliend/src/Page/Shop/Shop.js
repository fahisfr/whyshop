import React, { useEffect, useState } from 'react'

import NavBar from '../../Components/Navbar/NavBar'

import './Shop.css'

import { useParams } from 'react-router-dom'

import Axios from '../../Axios'

function Products() {
    const { id } = useParams();
    const [products, setproducts] = useState([])

    function addproduct(data) {
        Axios.put('cart/add-to-cart/' + data, data).then(res => {

        }
        )
    }
    useEffect(() => {
        console.log('s')
        Axios.get('/products/' + id).then((result) => {
            if (result.data.Products) {
                console.log(result.data.Products);
                setproducts(result.data.Products)

            } else {
                console.log('filed find products');
            }
        })
        return () => {
            console.log('unmount');
        }


    }, [id])
    return (
        <div className='shop-main'>
            <NavBar></NavBar>
            <div className='shop-container'>
                
                <div className='shop-1-helper'>
                    <p>heloo</p>

                </div>
                <div className='shop-2-products'>
                    {products.map((product) => {
                        return (
                            <div className='shop-2-item' >
                                <div className='shop-2-item-image'>
                                    <img src='' alt='loading' />
                                </div>
                                <div className='shop-2-item-name'>
                                    <span>{ product.name}</span>
                                </div>
                                <div className='shop-2-item-pirce'>
                                    <span>{ product.price}</span>
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
