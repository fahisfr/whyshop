import React, { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { fetchAllOrder } from '../../Features/AllOrders'




function CliendOrders() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchAllOrder())
    }, [dispatch])
    
    const Orders = useSelector(state => state.allorders.OrdersInfo)
    console.log(Orders)


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
                                                <td className='align-initial td-fr'>g</td>
                                               
                                                <td className='order-ceanter-td' ></td>
                                                <td className='order-ceanter-td' >
                                                </td>
                                                <td className='order-ceanter-td' ></td>
                                                <td className='order-ceanter-td'>
                                                </td>
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
