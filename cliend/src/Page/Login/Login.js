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
                dispatch(login({name:result.data.name,number:result.data.number}))
                navigate('/')
            } else {
                alert(result.data.message)
                
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
                        <h1>Login</h1>
                        <label>Phone</label>
                        <input type="number" value={number} placeholder="Phone Number"
                               onChange={(e)=>setnumber(e.target.value)}
                        />
                        <label>Password</label>
                        <input type="password" placeholder="Enther Password"
                            value={password} onChange={(e)=>setpassword(e.target.value)}
                        />
                       
                        <Link className='remove-line' to='/signup'><span>Create a new account</span></Link>
                        <button onClick={loginform} >Signup</button>
                    </form>
                </div>
            </div>
        </div>

        
    )
}

export default Login
