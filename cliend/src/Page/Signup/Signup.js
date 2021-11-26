import React  from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './Signup.css'
function Signup() {
    const navigate = useNavigate()
    return (
        <div>
            <div className='main'>
                <div className="signup-bar">
                    <div className="logo">
                    </div>
                    <div className='input-from'>
                        <form>
                            <label>User Name</label>
                            <input type="text" placeholder="enther a valid user name" />
                            <label>Phone</label>
                            <input type="text" placeholder="enther phone" />
                            <label>Password</label>
                            <input type="password" placeholder="enther password" />
                            <label>Confirm Password</label>
                            <input type="password" placeholder="enther password" />
                            <Link to='/login'>already have an account</Link>
                            <button>Signup</button>

                        </form>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup
