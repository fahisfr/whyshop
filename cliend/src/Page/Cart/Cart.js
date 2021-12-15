import React, { useEffect ,useState} from 'react'
import './Cart.css'
import { useSelector,useDispatch } from 'react-redux'
import { fetchCart } from '../../Features/Cart'
import Axios from '../../Axios'
import { resolve } from 'promise'
import Razorpay from 'react-razorpay';

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

function Cart() {
   async  function displayRazor(Order) {
       const res = await loadRazorpay("https://checkout.razorpay.com/v1/checkout.js")
       if (!res) {
           alert("Razorpay is not loaded are you offline")
           return

           
       } else {
           console.log("Razorpay is loaded")
       }
        var options = {
            "key": "rzp_test_lFLdi5y9B4LWvU", // Enter the Key ID generated from the Dashboard
            "amount": Order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Acme Corp",
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": Order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
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
       
    const [name, setname] = useState('')
    const [number, setnumber] = useState('')
    const [address, setaddress] = useState('')
    const [city, setcity] = useState('')
    const [paymetType, setpaymetType] = useState()
    const dispatch = useDispatch()
    console.log(name,number,address,city,paymetType)
    useEffect(() => {
       dispatch(fetchCart())
    },[])
    
    const cart = useSelector(state => state.cart)
    console.log(cart.cartInfo)
    var changeQuantity = (count,id) => {
        Axios.put('cart/change-product-quantity/' +id, { quantity: count, productID:id}).then(res => {
            dispatch(fetchCart())
        }).catch(err => {
            dispatch(fetchCart())
        })
    }
    var removeCartProduct = id => {
        Axios.put('cart/remove-product/' + id,{id:id}).then(res => {
            console.log(res)
            dispatch(fetchCart())
        }).catch(err => {
            dispatch(fetchCart())
        })
    }
    function deleteAll() {
        Axios.delete('cart/remove-all-products').then(res => {
            dispatch(fetchCart())
        }).catch(err => {
            dispatch(fetchCart())
        })
    }
    function OrderNow (e) {
        e.preventDefault()
        Axios.post('cart/place-order', { name: name, number: number, address: address, city: city, paymetType: paymetType }).then(res => {
            console.log(res)
            if (res.data.status) {
                displayRazor(res.data.order)

                
            }
        }).catch(err => {
            console.log(err)
        })
    }
   
    
    return (
        <div>
            <div className='products' >
                <div className='items'>
                    <button onClick={()=>deleteAll()}>Remove ALl</button>
                    {cart.status ? '' : <h1>cart.message</h1>}
                   
                    {
                        cart.cartInfo.map(item => {
                            return (
                                <div className='item'>
                                    <img src='' alt='' />
                                    <div className='item-info'>
                                        <h3>{ item.name}</h3>
                                        <p>{ item.price}</p>
                                        <p>quantity={item.quantity}</p>
                                        <button onClick={() => changeQuantity(-1, item._id)}>-</button><input value={item.quantity} type="text" /><button onClick={() => changeQuantity(1, item._id)}>+</button>
                                        <button onClick={() => removeCartProduct(item._id) }>remove</button>
                                    </div>
                                </div>

                            )
                        })
                    }
                </div>        
            </div>
            <div className="OrderPage" >
                <form>
                    <input type="text" name="name" value={name} onChange={(e) => setname(e.target.value)} placeholder="Name" />
                    <input value={12} type="number" name="phone" value={number} onChange={(e) => setnumber(e.target.value)} placeholder="Phone" />
                    <select name="selectList" id="selectList" value={city} onChange={(e) => setcity(e.target.value)}>
                        <option value="option 1">city</option>
                        <option value="Vengara">Vengara</option>
                        <option value="Oorakam">Oorakam</option>
                        <option value="option 4">karimblili<input /></option>
                    </select>
                    <input type="text" name="address" value={address} onChange={(e) => setaddress(e.target.value)} placeholder="Address" />
                    <div>
                    <label> <input type="checkbox" value={'COD'} name="checkbox" onClick={(e) => setpaymetType(e.target.value)} />Cash on delevery</label>
                    <label> <input type="checkbox" value={'Online'} onClick={(e)=>setpaymetType(e.target.value)} name="checkbox" />Online payment</label>

                    
                    
                </div>

                </form>
                <button onClick={OrderNow}>Order Now </button>
            </div>
        </div>
    )
}

export default Cart
