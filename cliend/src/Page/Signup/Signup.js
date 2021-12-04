import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Axios from '../../Axios'
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
        <div>
            <div className='main'>
                <div className="signup-bar">
                    <div className="lsimage">
                        <img className='image-ls' src={process.env.PUBLIC_URL + '/slpage.png'} alt="logo" />
                    </div>
                    <div className='input-from'>
                        <form id="form-in">
                            <h1>Create a new account</h1>
                            <label>User Name</label>
                            <input className="input-ls" type="text" value={name} onChange={(e) => setname(e.target.value)} placeholder="User Name" />
                            <label>Phone</label>
                            <input className='input-ls' type="number" value={number} onChange={(e) => setnumber(e.target.value)} placeholder="Phone Number" />
                            <label>Password</label>
                            <input className="input-ls" type="password" value={password} onChange={(e) => setpassword(e.target.value)} placeholder="Enther Password" />
                            <label>Confirm Password</label>
                            <input className='input-ls' type="password" placeholder="Enther password Athgin" />
                            <Link to='/login'>Already have an account?</Link>
                            <button  onClick={sumbitform}>Signup</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup
