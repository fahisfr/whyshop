import React ,{useState} from 'react'
import Axios from '../../Axios'
import { Link, useNavigate } from 'react-router-dom'
import './Login.css'
import { useDispatch } from 'react-redux'
import {login} from '../../Features/User'

function Login() {
    const dispatch = useDispatch()
    const [number, setnumber] = useState()
    const [password, setpassword] = useState('')
    const navigate = useNavigate()
    function loginform(e) {
        e.preventDefault()
        Axios.post('/login', { number, password }).then((result) => {
            if (result.data.status) {
                alert('Login Successfully')
                console.log(result.data);
                localStorage.setItem('accesstoken', result.data.accesstoken)
                localStorage.setItem('refreshtoken', result.data.refreshtoken)
                dispatch(login({name:result.data.name,number:result.data.number}))
                navigate('/')
            } else {
                alert('login failed')
                dispatch(login({name:'',number:''}))
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
                            <h1>Login</h1>
                            <label>Phone Number</label>
                            <input className='input-ls' type="number" value={number} onChange={(e) => setnumber(e.target.value)} placeholder="Enther Phone Number" />
                            <label htmlFor="">Password</label>
                            <input className='input-ls' type="password" value={password} onChange={(e) => setpassword(e.target.value)} placeholder="Enther Password" />
                            <Link to='/signup'>Create New Account</Link>
                            <button onClick={loginform}>Signup</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
