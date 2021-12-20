import { disconnect } from 'mongoose'
import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Axios from '../../Axios'
import NavBar from '../../Components/Navbar/NavBar'
import './Signup.css'

// import NavBar from '../../Components/Navbar/NavBar'
function Signup() {
    const [name, setname] = useState('')
    const [number, setnumber] = useState('')
    const [password, setpassword] = useState('')
    // const [confirmpass, setconfirmpass] = useState('')
    const navigate = useNavigate()
    function sumbitform(e) {
        e.preventDefault()
        Axios.post('/signup', { name, number, password }).then((result) => {
            if (result.data.status) {
                alert('user add to data base')
                navigate('/login')
            } else {
                alert('something is wrong')
            }
        })
    }
    return (
            <div className='signup-container'>
                <div className="signup-box">

                    <div className="signup-box-1">
                    <img className='signup-1-image' src={process.env.PUBLIC_URL + '/frshopLS.jpg'} alt="logo" />
                    </div>
                    <div className='signup-box-2'>
                        <form className="signup-2-from">
                            <h1>Create a new account</h1>
                            <label>User Name</label>
                            <input  type="text" value={name} onChange={(e) => setname(e.target.value)} placeholder="User Name" />
                            <label>Phone</label>
                            <input  type="number" value={number} onChange={(e) => setnumber(e.target.value)} placeholder="Phone Number" />
                            <label>Password</label>
                            <input type="password" value={password} onChange={(e) => setpassword(e.target.value)} placeholder="Enther Password" />
                            <label>Confirm Password</label>
                            <input  type="password" placeholder="Enther password" />
                            <Link to='/login'><span>Already have an account?</span></Link>
                            <button  onClick={sumbitform}>Signup</button>
                        </form>
                    </div>
                </div>
                
            </div>

        
    )
}

export default Signup
