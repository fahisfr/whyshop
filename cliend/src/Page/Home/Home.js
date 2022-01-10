
import NavBar from '../../Components/Navbar/NavBar'

import { useNavigate } from 'react-router-dom'
import "./Home.css"
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'
import { fetchUser } from '../../Features/User'
import Axios, { Image, ImagePath } from '../../Axios'

function Home() {
    const [products, setproducts] = useState([])
    useEffect(() => {
        dispatch(fetchUser())
        Axios.get('/products').then(res => {
            setproducts(res.data.products)
        })


    }, [])

    const dispatch = useDispatch()
    var history = useNavigate();
    function findProductType(id) {
        history('/shop/' + id)
    }
    let obj = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,]


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

            <div className='recommend-products'>
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

export default Home
