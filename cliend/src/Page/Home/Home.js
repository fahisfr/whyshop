
import NavBar from '../../Components/Navbar/NavBar'
import { useNavigate } from 'react-router-dom'
import "./Home.css"
import { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { fetchUser } from '../../Features/User'

function Home() {
    useEffect(() => {
        dispatch(fetchUser())

    },)

    const dispatch = useDispatch()
    var history = useNavigate();
    function findProductType(id) {
        history('/shop/' + id)
    }
    
    return (
        <div>
            <NavBar />
            
            <div className="home-1-box">
                <img src="" alt='loading' />
            </div>
            <div className='hom-2-product-types'>

                <div className='product-type-cart' name='Vegtables' onClick={(e) => findProductType('vegetables')}>
                    <img src='https://www.organicplanters.in//public/uploads/pages/1628232769.jpg' alt='loadign'  />
                    <span className='product-type-cart-1-2' >Vegtables</span>
                </div>
                <div className='product-type-cart' onClick={()=>findProductType('fruits')}>
                    <img src='https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/assortment-of-colorful-ripe-tropical-fruits-top-royalty-free-image-995518546-1564092355.jpg' alt='loadnig' />
                    <span>Fruits</span>
                </div>
                <div className='product-type-cart'>
                    <img src='https://gomadevi.com/public/uploads/products/photos/OloI1ASQusuEsPzk30CrR0DltjIOjybqdvxQU112.jpeg' alt='loadnig'  />
                    <span>Sweets</span>
                </div>
                <div className='product-type-cart'>
                    <img src='' alt='loading' />
                    <span>idonow</span>
                </div>
            </div>


        </div>


    )
}

export default Home
