import React, { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { fetchAllOrder } from '../../Features/AllOrders'
import Axios from '../../Axios'

import './CliendOrders.css'

function CliendOrders() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchAllOrder())
    }, [dispatch])
    const Orders = useSelector(state => state.allorders.OrdersInfo)
    const  ChangeOrderStatus =(id, status)=> {
        Axios.put(`admin/order/change-status/${id}`, { id, status }).then(res => {
            dispatch(fetchAllOrder())
        }).catch(err => {
            console.log(err)
        })

    }
    return (
        <div className='order-main'>

            <div className="order-container">
                <div className="order-products-info">
                    <div className="order-info-tag">
                    </div>
                    <div className="order-info-list">
                        <table >
                            <thead>
                                <tr>
                                    <th className='align-initial order-table-head-border'>Address</th>
                                    <th className='align-center order-table-head-border'>Payment</th>
                                    <th className='align-center order-table-head-border'>Total</th>
                                    <th className='align-center order-table-head-border'>OrderID</th>
                                    <th className='align-center order-table-head-border'>OrderStatus</th>
                                    <th className='align-center order-table-head-border'>Products</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    Orders.map((Order) => {
                                        return (
                                            <tr  >
                                                <td className='align-initial td-fr'>
                                                    <div className="order-info-list-address">
                                                        <span>name:{Order.address.name}</span>
                                                        <span>number:{Order.address.number}</span>
                                                        <span>city:{Order.address.city}</span>
                                                        <span>lademark:{Order.address.lademark}</span>
                                                    </div>
                                                </td>

                                                <td className='order-ceanter-td' >{Order.paymentType}:{Order.paymentStatus}</td>
                                                <td className='order-ceanter-td' >{Order.totalPrice}</td>
                                                <td className='order-ceanter-td' >{Order.paymentID}</td>
                                                <td className='order-ceanter-td' ><div className="order-info-list-status">
                                                    <span>Satatus:{Order.paymentStatus}</span>
                                                    {
                                                        Order.OrderStatus === "Picking" ?
                                                            <button onClick={()=>ChangeOrderStatus(Order._id, "Packing")} >Packign</button>
                                                            :
                                                            Order.OrderStatus === "Packing" ?
                                                                <button onClick={()=>ChangeOrderStatus(Order._id, "Packed")}>Packed</button>
                                                                :
                                                                Order.OrderStatus === "Packed" ?
                                                                    <button onClick={() =>ChangeOrderStatus(Order._id, "Out for delivery")}>Out for delivery</button>
                                                                    :
                                                                    <span>{Order.OrderStatus}</span>

                                                    }

                                                </div></td>
                                                <td className='order-ceanter-td'>{
                                                    Order.products.map((product) => {
                                                        return (
                                                            <div className="order-info-list-products">
                                                                <span>{product.name}</span>
                                                                <span>,{product.quantity}</span>
                                                                <span>,{product.price}</span>
                                                                <span>,{product.total}</span>
                                                            </div>
                                                        )
                                                    })
                                                }</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CliendOrders
