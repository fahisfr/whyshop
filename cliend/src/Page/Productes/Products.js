import React, { useEffect, useState } from 'react'

import NavBar from '../../Components/Navbar/NavBar'

import './Products.css'

import {useParams} from 'react-router-dom'

import Axios from '../../Axios'

function Products() {
    const { id } = useParams();
    const [products, setproducts] = useState([])
    
    function addproduct(data) {
        console.log(data)
        Axios.put('cart/add-to-cart/'+data, data).then(res => {
            
        }
        )
    }
    useEffect(() => {
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
        
        
    },[id])
    return (
        <div>
            <NavBar></NavBar>
            <div className="containers">
                <div className='helper'>

                </div>
                <div className="products">
                    {
                        products.map(res => {
                            return (
                                <div className="cards" >

                                    <img className='product-image' src="" alt="" />
                                    <div className='cards-body'>
                                        <h5>{res.name}</h5>
                                        <h6>${ res.price}</h6>
                                        <button onClick={()=>addproduct(res._id)} className='addcart-button'>Add card</button>

                                    </div>
                                </div>
                            )
                        })
                    }
                    


                    
                </div>
            </div>
            
        </div>
    )
}

export default Products
