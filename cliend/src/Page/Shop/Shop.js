import React, { useEffect, useState } from 'react'

import NavBar from '../../Components/Navbar/NavBar'

import './Shop.css'

import { useParams } from 'react-router-dom'

import Axios from '../../Axios'

function Products() {
    const { id } = useParams();
    const [products, setproducts] = useState([])

    function addproduct(data) {
        console.log(data)
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

                    <div className='shop-2-item' >
                        <div className='shop-2-item-image'>
                            <img src='data:image/jpeg;base64,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' />
                        </div>
                        <div className='shop-2-item-name'>
                            <span>Orange</span>
                        </div>
                        <div className='shop-2-item-pirce'>
                            <span>₹ 60</span>
                        </div>
                        <div className='shop-2-item-add2cart'>
                            <button onClick={() => addproduct()}>Add to cart</button>
                        </div>
                    </div>

                    <div className='shop-2-item' >
                        <div className='shop-2-item-image'>
                            <img src='' />
                        </div>
                        <div className='shop-2-item-name'>
                            <span>Orange</span>
                        </div>
                        <div className='shop-2-item-pirce'>
                            <span>$60</span>
                        </div>
                        <div className='shop-2-item-add2cart'>
                            <button onClick={() => addproduct()}>Add to cart</button>
                        </div>
                    </div>

                    <div className='shop-2-item' >
                        <div className='shop-2-item-image'>
                            <img src='' />
                        </div>
                        <div className='shop-2-item-np'>
                            <span>Orange</span>
                            <span>$60</span>
                        </div>
                        <div className='shop-2-item-add2cart'>
                            <button onClick={() => addproduct()}>Add to cart</button>
                        </div>
                    </div>

                    <div className='shop-2-item' >
                        <div className='shop-2-item-image'>
                            <img src='' />
                        </div>
                        <div className='shop-2-item-np'>
                            <span></span>
                            <span></span>
                        </div>
                        <div className='shop-2-item-add2cart'>
                            <button onClick={() => addproduct()}>Add to cart</button>
                        </div>
                    </div>

                    <div className='shop-2-item' >
                        <div className='shop-2-item-image'>
                            <img src='' />
                        </div>
                        <div className='shop-2-item-np'>
                            <span></span>
                            <span></span>
                        </div>
                        <div className='shop-2-item-add2cart'>
                            <button onClick={() => addproduct()}>Add to cart</button>
                        </div>
                    </div>




                </div>
            </div>
        </div>

    )
}

export default Products
