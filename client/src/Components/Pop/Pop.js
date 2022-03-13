import React from 'react';
import './Pop.css'
import {useNavigate } from 'react-router-dom'

function Pop(props) {
    const navigate = useNavigate()
    const successfully = () => {
        props.setPop(false)
        navigate('/')
    }
    return (props.Pop.status) ? (
        <div onClick={() => successfully()}  className="pop-up">
            <div className='pop-up-content'>
                <div className='pop-up-content-body'>
                    <span className='pop-up-message'>{props.Pop.message}</span>
                </div>
                <div className='pop-up-content-button'>
                    <button  onClick={()=>successfully()} className='pop-up-button'>Back To home</button>
                </div>
            </div>        
        </div>
    ): "";
}
export default Pop;
