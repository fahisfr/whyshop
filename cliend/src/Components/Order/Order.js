
import e from 'express'
import React, { useState } from 'react'
//import own axios
// import axios from '../../Axios'
function Order(props) {
    //get chekout 
    const [name, setname] = useState('')
    const [number, setnumber] = useState('')
    const [address, setaddress] = useState('')
    const [city, setcity] = useState('')
    const [paymetType, setpaymetType] = useState()
    //console top all ustate in console.log
    // console.log(name, number, address, city, paymetType)
    
    return (props.trigger) ? (
        <div className="OrderPage" >
            <form>
                <input type="text" name="name" value={name} onChange={(e)=>setname(e.target.value)} placeholder="Name" />
                <input value={12} type="number" name="phone" value={number} onChange={(e)=>setnumber(e.target.value)} placeholder="Phone" />
                <select name="selectList" id="selectList" value={city} onChange={(e)=>setcity(e.target.value)}>
                    <option value="option 1">city</option>
                    <option value="option 2">Vengara</option>
                    <option value="option 3">Oorakam</option>
                    <option value="option 4"><input /></option>
                </select>
                <input type="text" name="address" value={address} onChange={(e)=>setaddress(e.target.value)} placeholder="Address" />
                {/* <div>
                    <label> <input type="checkbox" value={'CD'} name="checkbox" onClick={(e) => setpaymetType(e.value)} />Cash on delevery</label>
                    <label> <input type="checkbox" value={'Online'} onClick={(e)=>setpaymetType(e.value)} name="checkbox" />Online payment</label>

                    
                    
                </div> */}

            </form>
            <button onClick={props.onClick}>Order</button>
        </div>
    ) : ''

}

export default Order
