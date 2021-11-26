import React ,{useState} from 'react'
import Axios from '../../Axios'
import { Link, useNavigate } from 'react-router-dom'
import './Login.css'
function Login() {
    const [number, setnumber] = useState('')
    const [password, setpassword] = useState('')
    const navigate = useNavigate()
    function loginform(e) {
        e.preventDefault()
        Axios.post('/login', { number, password }).then((result) => {
            if (result.data.status) {
                console.log(result.data.status);
                localStorage.setItem('token',result.data.token)
                alert('welcome back '+result.data.name)
                navigate('/')
            } else {
                alert('who are you sir')
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
                            <input className='input-ls' type="Password" value={password} onChange={(e) => setpassword(e.target.value)} placeholder="Enther Password" />
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
