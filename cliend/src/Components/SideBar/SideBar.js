import axios from '../../Axios'
import React from 'react'
import './SideBar.css'

function SIdeBar(props) {
    const logout = () => {
        axios.delete('logout').then(response => {
            if (response.data.status) {
                console.log(response.data.message)
                localStorage.removeItem('accesstoken')
            }
        })
    }
    return (props.trigger) ? (
        <div className="sidebar-container" >
            <div className='sidebar-left-menu'>
                
                <div className='left-profile'>
                    <img src='' alt='' />
                    
                </div>
                
                <div className='left-logout'>
                    <button onClick={()=>logout()}>Logout</button>
                </div>
            </div>
            <div className='sidebar-close' onClick={() => props.settrigger(false)} ></div>
        </div>
        
    ) : "";
}
export default SIdeBar
