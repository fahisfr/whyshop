import React, {useEffect}from 'react'
import NavBar from '../../Components/Navbar/NavBar'
import {useParams} from 'react-router-dom'
import { fetchOrder } from '../../Features/Order'
import { useSelector, useDispatch } from 'react-redux'
import {ImagePath} from '../../Axios'
import './Order.css'

function Order() {
    const dispatch = useDispatch()
    const {id} = useParams()
    useEffect(() => {
        dispatch(fetchOrder())
    }, [dispatch])
    const { OrderInfo} = useSelector(state => state.order)
    const Order = OrderInfo.find(x => x._id === id)
  return (
      <div>
          <NavBar></NavBar>
          {
              Order ?
                  <div className='order-container'>
                      <div className="order-left">
                          <div className="order-left-header">
                              <div className="order-left-header-left">
                                  <h1 className="order-h1-myorder">My Order</h1>
                              </div>
                              <div className="order-left-header-right">

                              </div>
                          </div>
                          <div className="order-left-body">
                              {
                                  Order.products.map((item, index) => {
                                      return (
                                          <div className="order-left-body-product" >

                                              <div className="order-left-body-product-image">
                                                  <img src={`${ImagePath + item?.imageId}.jpg`} alt="loading" />
                                              </div>
                                              <div className="order-left-body-product-details ">
                                                  <span className='c-p-name'>{item.name}</span>
                                                  <span className='c-p-price'>₹{item.price}kg</span>
                                              </div>
                                              <div className="order-left-body-product-quantity">
                                               
                                                  <span className='order-prdocut-show-quantity'>{item.quantity}<span style={{ fontSize: '17px' }}>kg</span></span>
                                               
                                              </div>
                                              <div className="order-left-body-prdouct-total">
                                                  <span style={{color:'green'}}>₹{item.total}</span>
                                              </div>
                                              <div>
                                              
                                              </div>
                                          </div>
                                      )
                                    })  
                                      
                              }
                                         
                               
                          </div>

                      </div>
                      <div className="order-right">
                          <div className='order-bill'>
                              <span>Order DETAILS</span>
                          </div>
                          <div className='order-p-t-billing'>
                              <span>Total Price</span>
                              <span>₹{Order.totalPrice}</span>
                          </div>
                          <div className='order-p-t-billing'>
                              <span>OrderAt</span>
                              <span>{Order.OrderAt}</span>
                          </div>
                          <div className='order-p-t-billing'>
                              <span>PaymentType</span>
                              {
                                  Order.paymentType === "Online" ?
                                      <span style={{ color: 'green' }}>{Order.paymentType}</span>
                                      : <span style={{color:'red'}} >{Order.paymentType}</span>
                                      
                              }
                              
                          </div>
                          <div className='order-d-p-billing' >
                              <span>PaymentStatus</span>
                              {
                                  Order.paymentStatus === 'Success' ?
                                  <span style={{ color: 'Green' }}>Paid</span>
                                  :
                                  <span style={{ color: 'Red' }}>{Order.paymentStatus}</span>
                                  
                              }
                          </div>
                         
                         
                          <div className="order-order-total">
                              <span>OrderStatus  </span>
                              <span style={{ color: 'Green' }} >{Order.OrderStatus}</span>
                          </div>
                          
                      </div>
                  </div>
                  :
                  <div className='order-is-empty'>
                      <span >Oops</span>
                  </div>
          }


      </div>
  )
}

export default Order