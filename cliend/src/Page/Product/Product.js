import React, { useEffect, useState } from 'react'
import './Product.css'
import NavBar from '../../Components/Navbar/NavBar'
import { useParams } from 'react-router-dom'
import Axios from '../../Axios'
import './Product.css'

function Product() {
    var { id } = useParams()
    id = id.split('=')[0]
    const [mainProduct, setmainProduct] = useState()
    const [Randomproduct, setproduct] = useState([])

    // useEffect(() => {
    //     Axios.get(`/products/${id}`).then(res => {


    //     })
    // }, [id])
    let obj = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,]


    return (
        <div className='product-main'>
            <NavBar />
            <div className='show-product-info'>
                <div className='show-product-images'>
                    <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgA7xpOViT-HeWGzj7f3-rWgX9Fu-dabTj4g&usqp=CAU' alt='product' />
                </div>
                <div className='show-product-details'>
                    <span className='p-title'>Orange</span>

                    <span className='p-stock'> In stock</span>
                    <span className='p-price'>₹60 kg</span>

                    <button className='p-button' >Add to cart</button>


                </div>
            </div>
            <div className='p-recommend'>
                {
                    obj.map(res => {
                        return (
                            <div className='recommend-item' >
                                <div className='recommend-item-image'>
                                    <img src='' alt='loading' />
                                </div>
                                <div className='recommend-item-name'>
                                    <span></span>
                                </div>
                                <div className='recommend-item-pirce'>
                                    <span></span>
                                </div>
                                <div className='recommend-item-add2cart'>
                                    <button >Add to cart</button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>


        </div>
    )
}

export default Product
