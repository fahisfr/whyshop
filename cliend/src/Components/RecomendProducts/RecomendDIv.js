import React, { useEffect } from 'react'
import './RecomendDiv.css'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProduts } from '../../Features/Products'
import Axios, { ImagePath } from '../../Axios'
import { addToCart} from '../../Features/Cart'


function RecomendBar(props) {
    const { products} = useSelector(state => state.products)
    const dispatch = useDispatch()
    const { cartInfo } = useSelector(state => state.cart)
    useEffect(() => {
        if (products.length === 0) {
            dispatch(fetchProduts())
        } 
    }, [dispatch])
    function AddTOCart(id, product) {
        const { name, price, imageId, type } = product
        Axios.put(`cart/add-to-cart/${id}`).then(res => {
            if (res.data.status) {
                dispatch(addToCart({ _id: id, name,type,price, imageId, id, quantity: 1 }))
            }
        })
    }
    return (
        <div className='recommend-products'>
            {
                products.filter(res => res.price >= props.pricelimit && res.price <= props.pricemax) .map((product, index) => {
                    return (
                        <div className='recommend-item' key={index}>
                            <div className='recommend-item-image'>
                                <img src={ImagePath(product.imageId)} alt='loading' />
                            </div>
                            <div className='recommend-item-name'>
                                <span>{product.name}</span>
                            </div>
                            <div className='recommend-item-pirce'>
                                <span>{product.price} kg</span>
                            </div>
                            {
                                cartInfo.find(res => res._id === product._id) ?
                                    <div className='recommend-item-addtocart'>
                                        <button className='item-remove'>Remove</button >
                                    </div> :
                                     <div className='recommend-item-addtocart'>
                                <button className='item-add' onClick={() => AddTOCart(product._id, product)} >Add to cart</button>
                            </div>
                            }
                        </div>
                    )
                })
            }

        </div>
    )
}

export default RecomendBar
