
import NavBar from '../../Components/Navbar/NavBar'

import { useNavigate } from 'react-router-dom'
import "./Home.css"
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { fetchUser } from '../../Features/User'
import { fetchProduts } from '../../Features/Products'
import {  addToCart } from '../../Features/Cart'
import Axios, { ImagePath } from '../../Axios'

function Home() {
    const dispatch = useDispatch()
    
    const { products, error, loading } = useSelector(state => state.products)
    function AddTOCart(id, product) {
        const {name, price, imageId, type} = product
        Axios.put(`cart/add-to-cart/${id}`).then(res => {
            if (res.data.status) {
                dispatch(addToCart({_id:id,name,price,imageId,id,quantity:1}))
            }
        })
    }
    useEffect(() => {
        dispatch(fetchProduts())
    }, [])
    
    var history = useNavigate();
    function findProductType(id) {
        history('/shop/' + id)
    }
    return (
        <div className='home-main' >

            <NavBar />
            <div className="home-1-box">
                <img src="" alt='loading' />
            </div>
            <div className='hom-2-product-types'>
                <div className='product-type-cart' name='Vegtables' onClick={(e) => findProductType('vegetables')}>
                    <img src='https://www.organicplanters.in//public/uploads/pages/1628232769.jpg' alt='loadign' />
                    <span className='product-type-cart-1-2' >Vegtables</span>
                </div>
                <div className='product-type-cart' onClick={() => findProductType('fruits')}>
                    <img src='https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/assortment-of-colorful-ripe-tropical-fruits-top-royalty-free-image-995518546-1564092355.jpg' alt='loadnig' />
                    <span>Fruits</span>
                </div>
                <div className='product-type-cart'>
                    <img src='https://gomadevi.com/public/uploads/products/photos/OloI1ASQusuEsPzk30CrR0DltjIOjybqdvxQU112.jpeg' alt='loadnig' />
                    <span>Sweets</span>
                </div>
                <div className='product-type-cart'>
                    <img src='' alt='loading' />
                    <span>idonow</span>
                </div>
            </div>

            <div className='recommend-products'>
                {
                    products.filter(res=>res.price<=100).map((product,index) => {
                        return (
                            <div className='recommend-item' key={index}>
                                <div className='recommend-item-image'>
                                    <img src={ImagePath(product.imageId)} alt='loading' />
                                </div>
                                <div className='recommend-item-name'>
                                    <span>{product.name}</span>
                                </div>
                                <div className='recommend-item-pirce'>
                                    <span>{product.price}kg</span>
                                </div>
                                <div className='recommend-item-add2cart'>
                                    <button onClick={()=>AddTOCart(product._id,product)} >Add to cart</button>
                                </div>
                            </div>

                        )
                    })
                }

            </div>
        </div>


    )
}

export default Home
