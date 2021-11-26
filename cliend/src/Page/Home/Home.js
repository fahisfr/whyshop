
import NavBar from '../../Components/Navbar/NavBar'
import { useNavigate} from 'react-router-dom'
import "./Home.css"


function Home() {
    var history = useNavigate();
    function findproducts(id) {
        console.log(id);
        history(`/products/${id}`)
    }
    
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
