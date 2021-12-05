
import NavBar from '../../Components/Navbar/NavBar'
import { useNavigate} from 'react-router-dom'
import "./Home.css"

// import Cookies from 'universal-cookie';
import { useEffect } from 'react';
import Axios from '../../Axios'
import { useSelector, useDispatch } from 'react-redux'
import {fetchUser} from '../../Features/User'
// import { useDispatch } from 'react-redux'
function Home() {
    const dispatch = useDispatch()
    var history = useNavigate();
    function findproducts(id) {
        console.log(id);
        history(`/products/${id}`)
    }
    useEffect(() => {
        dispatch(fetchUser())
        return () => {
            
        }
    }, [])
    
    return (
        <div>
            <NavBar></NavBar>
            <div className="live-bar">
              
            </div>
            <div className='manu-bar'>
                <div name='vegtables' className='manu1' onClick={(e) => findproducts('vegtables')}>
                    <img className="" alt="" />
                </div> 
                <div name='fruits' className='manu2' onClick={(e)=>findproducts('fruits')} >
                    <img className=""  alt="" />
                </div>
                <div name='fishes' className='manu3' onClick={(e) => findproducts('fishes')}>
                    <img className="manuimage"  alt="" />
                </div>

            </div>
        </div>
    )
}

export default Home
