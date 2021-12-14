import React, { useEffect ,useState} from 'react'
import './Cart.css'
import { useSelector,useDispatch } from 'react-redux'
import { fetchCart } from '../../Features/Cart'
import Axios from '../../Axios'

function Cart() {
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
                    <label> <input type="checkbox" value={'CD'} name="checkbox" onClick={(e) => setpaymetType(e.target.value)} />Cash on delevery</label>
                    <label> <input type="checkbox" value={'Online'} onClick={(e)=>setpaymetType(e.target.value)} name="checkbox" />Online payment</label>

                    
                    
                </div>

                </form>
                <button>Order</button>
            </div>
        </div>
    )
}

export default Cart
