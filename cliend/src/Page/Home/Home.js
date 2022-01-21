
import { useNavigate } from 'react-router-dom'
import "./Home.css"
// import { useDispatch, useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { fetchCart} from '../../Features/Cart'
import NavBar from '../../Components/Navbar/NavBar'
import RecomendBar from '../../Components/RecomendProducts/RecomendDIv';
import { useEffect } from 'react';


function Home() {
    var history = useNavigate();
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchCart())
    }, [dispatch])
    function findProductType(id) {
        history('/shop/' + id)
    }
    return (
        <div className='home-main' >
            <NavBar />
            <div className="home-1-box">
                <img src="" style={{maxWidth:"100%"}} alt='loading' />
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
                <div className='product-type-cart' onClick={() => findProductType('sweets')}>
                    <img src='https://gomadevi.com/public/uploads/products/photos/OloI1ASQusuEsPzk30CrR0DltjIOjybqdvxQU112.jpeg' alt='loadnig' />
                    <span>Sweets</span>
                </div>
                <div className='product-type-cart'>
                    <img src='' alt='loading' />
                </div>
            </div>
            <RecomendBar pricelimit={10} pricemax={100}/>
            <RecomendBar pricelimit={70} pricemax={150} />
            <RecomendBar pricelimit={10} pricemax={150} />
        </div>
    )
}

export default Home
