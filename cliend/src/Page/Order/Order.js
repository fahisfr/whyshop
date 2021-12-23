import React, { useState } from 'react'
import './Order.css'
import Axios from '../../Axios'

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
    const [order, setOrder] = useState({
        name: '',
        number: '',
        city: '',
        landemark: '',
        paymetType: '',
    })
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
                        } else {
                            alert("Payment Failed")
                        }
                    })
                },
                "callback_url": "https://eneqd3r9zrjok.x.pipedream.net/",
                "prefill": {
                    "name": "Gaurav Kumar",
                    "email": "gaurav.kumar@example.com",
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
        Axios.post('cart/place-order', order).then(res => {
            if (res.data.status) {
                displayRazor(res.data.order)
            }
            
        }).catch(err => {
            alert(err.data.message)
        })
    }


    return (
        <div className='order-container'>
            <div className="order-addressinfo">
                <input type="text" placeholder='name'
                    value={order.name} onChange={(e) => setOrder(e.target.value)}
                />
                <input type="number" placeholder='Number'
                    value={order.number} onChange={(e) => setOrder(e.target.value)}
                />
                <select name="selectList" id="selectList" value=''
                    onChange={(e) => setOrder.city(e.target.value)}>
                    
                    <option value="">Select City</option>
                    <option value="vengara" >Vengara</option>
                    <option value="Oorakam">Oorakam</option>
                    <option value="option 3">karibele</option>
                </select>
                <input type="text" placeholder='ladee mark/road name'
                    value={order.landemark} onChange={(e) => setOrder(e.target.value)}
                />

                <input type="text" />

            </div>
            <div className='order-billinginfo'>
                <h1 >Totale</h1>
                <div>

                </div>
                <div className='order-payment'>
                    <div className='order-payment-option'>
                        <input type="radio" name="payment" value={order.paymetType}
                            // checked={order.paymetType === 'cod'}
                            onChange={(e) => setOrder(e.target.value)}
                        />
                        <label>Pay at Store</label>
                    </div>
                    <div className='order-payment-option'>
                        <input type="radio" name="payment" value={order.paymetType}
                            onChange={(e) => setOrder(e.target.value)}
                        />
                        <label>Pay Online</label>
                    </div>
                </div>
                <button onClick={OrderNow}>Order Now</button>
            </div>
        </div>
    )
}

                

export default Order
