import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Checkout.css'
import Axios from '../../Axios'
// import { useSelector } from 'react-redux'


function loadRazorpay(src) {
    return new Promise(resolve => {
        const script = document.createElement("script");
        script.src = src
        document.body.appendChild(script);
        console.log(script)
        script.onload = () => {
            resolve(true);

        }
        script.onerror = () => {
            resolve(false);
        }
        document.body.appendChild(script);
    })
}



function Order() {
    const navigate = useNavigate()
    // const cart = useSelector(state => state.cart)
    const [name, setname] = useState('')
    const [number, setnumber] = useState()
    const [city, setcity] = useState('')
    const [landmark, setlademark] = useState('')
    const [paymentType, setpaymentType] = useState('')

    async function displayRazor(Order) {
        const res = await loadRazorpay("https://checkout.razorpay.com/v1/checkout.js")
        if (!res) {
            alert("Razorpay is not loaded are you offline")
            return


        } else {
            console.log("Razorpay is loaded")

            var options = {
                "key": "rzp_test_lFLdi5y9B4LWvU", // Enter the Key ID generated from the Dashboard
                "amount": Order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                "currency": "INR",
                "name": "Acme Corp",
                "description": "Test Transaction",
                "image": "https://example.com/your_logo",
                "order_id": Order.id,
                "handler": function (response) {
                    Axios.post('order/verifypayment', { order: response }).then(res => {
                        if (res.data.status) {
                            alert("Payment Successfull")
                            navigate('/')
                        } else {
                            alert("Payment Failed")
                        }
                    })
                },
                "callback_url": "https://eneqd3r9zrjok.x.pipedream.net/",
                "prefill": {
                    "name": "Fahis",
                    "email": "TestMode.kumar@example.com",
                    "contact": "9999999999"
                },
                "notes": {
                    "address": "Razorpay Corporate Office"
                },
                "theme": {
                    "color": "#3399cc"
                }
            };

            const PaymentObject = new window.Razorpay(options);
            PaymentObject.open();
        }
    }
    function OrderNow(e) {
        e.preventDefault()
        Axios.post('cart/place-order', { name: name, number: number, city: city, lademark: landmark, paymentType: paymentType }).then(res => {
            if (res.data.status) {
                alert('Order palced successfully')
                navigate('/')
            
            } else if (res.data.status ==="razorpay"){
                displayRazor(res.data.order)

            }

        }).catch(err => {
            alert(err.data.message)
        })
    }


    return (

        <div className='checkout-container'>
            <div className='checkout-form'>
                <h1 className='checkout-from-tital'>Checkout</h1>
                <form onSubmit={OrderNow}>
                    <div className='checkout-form-input'>
                        <label>Name</label>
                        <input type='text' value={name} onChange={(e) => setname(e.target.value)}></input>
                    </div>
                    <div className='checkout-form-input'>
                        <label>Number</label>
                        <input type='text' value={number} onChange={(e) => setnumber(e.target.value)}></input>
                    </div>
                    <div className='checkout-form-input'>
                        <label>City</label>
                        <select name="selectList" id="selectList" value={city}
                            onChange={(e) => setcity(e.target.value)}>

                            <option value="">Select City</option>
                            <option value="vengara">Vengara</option>
                            <option value="Oorakam">Oorakam</option>
                            <option value="option 3">karibele</option>
                        </select>
                    </div>
                    <div className='checkout-form-input'>
                        <label>Landmark</label>
                        <input type='text' value={landmark} onChange={(e) => setlademark(e.target.value)}></input>
                    </div>

                    <label>Paymen Type</label>
                    <div className='order-billinginfo'>
                        <input type="radio" name="paymentType" value="Online"
                            checked={paymentType === 'Online'}
                            onChange={(e) => setpaymentType(e.target.value)} />
                        <label>Online</label>
                        <input type="radio" name="paymentType" value="COD"
                            checked={paymentType === 'COD'}
                            onChange={(e) => setpaymentType(e.target.value)} />
                        <label>Cash On Delivery</label>




                    </div>
                    <div className='checkout-form-button'>
                        <button onClick={OrderNow} className='order-button'>Order Now</button>
                    </div>
                </form>
            </div>
        </div>
    )
}



export default Order
