import React, { useEffect } from 'react'
import { ImagePath } from '../../Axios'
import './Order.css'
import NavBar from '../../Components/Navbar/NavBar'

import { useSelector, useDispatch } from 'react-redux'
import { fetchOrder } from '../../Features/Order'

function Order() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchOrder())
    }, [dispatch])
    const Order = useSelector(state => state.order)
    return (
        <div className='order-main'>
            <NavBar />
            <div className="order-container">
                <div className="order-products-info">
                    <div className="order-info-tag">
                        <h1>Your Orders</h1>
                        <h1>Order</h1>
                    </div>
                    <div className="order-info-list">
                        <table >
                            <thead>
                                <tr>
                                    <th className='align-initial order-table-head-border'>Products</th>
                                    <th className='align-center order-table-head-border'></th>
                                    <th className='align-center order-table-head-border'>Total</th>
                                    <th className='align-center order-table-head-border'>Payment</th>
                                    <th className='align-center order-table-head-border'>OrderTime</th>
                                    <th className='align-center order-table-head-border'>Status</th>
                                    <th className='align-center order-table-head-border'></th>
                                </tr>
                            </thead>
                            <tbody>
                                {Order.OrderInfo.map(Product => {
                                    return (
                                        <tr >
                                            <td className='align-initial td-fr'>
                                                <div className='order-table-body-productname'>
                                                    {
                                                        Product.products.map(res => {
                                                            return (
                                                                <div className='order-products-show'>
                                                                    <img src={ImagePath(res.imageId)} alt='' />
                                                                    <h4>{res.name}</h4>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div></td>
                                            <td></td>
                                            <td className='order-ceanter-td' >₹{Product.totalPrice}</td>
                                            <td className='order-ceanter-td' >
                                                {Product.paymentStatus === 'Success' ? "Payed" : "Cash On Delivery"}
                                            </td>
                                        </tr>
                                    )


                                })}


                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Order
