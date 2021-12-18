
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

    }, [])
    return (
        <div>
            <NavBar />
            <div className="home-container">
                <div className="home-1-box">
                    <img src="https://img.magicpin.com/fresh_produce.jpg"/>
                </div>
            </div>

        </div>
            
       
    )
}

export default Home
