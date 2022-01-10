import React, { useEffect,useState}from 'react'
import './Product.css'
import NavBar from '../../Components/Navbar/NavBar'
import { useParams } from 'react-router-dom'
import Axios from '../../Axios'
import './Product.css'

function Product() {
    var { id } = useParams()
    id =id.split('=')[0]
    const [mainProduct, setmainProduct] = useState()
    const [Randomproduct, setproduct] = useState([])
    
    useEffect(() => {
        Axios.get(`/products/${id}`).then(res => {
            
            
        })
    }, [id])
 

    return (
        <div className='product-main'>
            <NavBar />
            <div className='show-product-info'>
                <div className='show-product-images'>
                    <img src='' alt='product' />
                </div>
                <div className='show-product-details'>
                    <h1>Product Name</h1>
                    <p>Product Description</p>
                    <div className='show-product-price'>
                        <h1>$100</h1>
                        <button>Add to Cart</button>
                    </div>
                </div>
            </div>
            <div className='product-random-produts'>

            </div>
        </div>
            )
}

            export default Product
