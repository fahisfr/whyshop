import NavBar from "../../Components/Navbar/NavBar"
import './Orders.css'
import { useSelector, useDispatch } from 'react-redux'

import { ImagePath } from '../../Axios'
import { useEffect } from "react"
import { fetchOrder } from '../../Features/Order'
import {Link} from 'react-router-dom'


function Order() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchOrder())
    }, [dispatch])
    const { OrderInfo } = useSelector(state => state.order)
    
    return (
        <div>
            <NavBar />
            <div className="orders-container">
                <div className="ao">
                    <div className="ao-a-header">
                        <h2 className="ao-myorders">My Orders</h2>
                    </div>
                    <div className="ao-body">
                        
                        {
                            OrderInfo.map((order, index) => {
                                return (
                                    <div className='order-info' key={index}>
                                        <div className='oi-product'>
                                            {
                                                order.products.map((item, index) => {
                                                    return (
                                                        <img className='oi-images' src={ImagePath(item.imageId)} alt="" key={index} />
                                                       
                                                    )
                                                }
                                                )
                                            }

                                        </div>
                                        <div className="oi-price">
                                            <span>TotalPrice: ₹{order.totalPrice}</span>
                                            <span></span>
                                        </div>
                                        <div className='oi-status'>
                                            <span>{order.OrderStatus}</span>
                                        </div>
                                        <div className='oi-paymet-type'>
                                            <span>{order.paymentType  }</span>
                                           
                                        </div>
                                        <div className='oi-md'>
                                            <Link to={`/order/${order._id}`}><button className='oi-btn'>More Details</button></Link>
                                        </div>
                                    </div>
                                )

                            })
                        }
                    </div>


                </div>
            </div>
        </div>
    )

}

export default Order
