import { useNavigate } from 'react-router-dom'
import "./Home.css"
import { useSelector } from 'react-redux'
import Axios from '../../Axios'
import { useDispatch } from 'react-redux'
import { SetProducts } from '../../Features/Products'
import { SetProductTypes } from '../../Features/ProductTypes'
import NavBar from '../../Components/Navbar/NavBar'
import RecomendBar from '../../Components/RecomendProducts/RecomendDIv';
import { useEffect } from 'react';



function Home() {
    var history = useNavigate();
    const dispatch = useDispatch()
    const { typesInfo } = useSelector(state => state.types)
    useEffect(() => {
        Axios.get('/home').then(res => {
            dispatch(SetProductTypes(res.data.types))
            dispatch(SetProducts(res.data.products))
        })
    }, [dispatch])
    return (
        <div className='home-main' >
            <NavBar />
            <div className="home-1-box">
                <img src="" style={{ maxWidth: "100%" }} alt='loading' />
            </div>
            <div className='hom-2-product-types'>
                {
                    typesInfo.map((type,index) => {
                        return (
                            <div className='product-type-cart' key={index} onClick={() => history(`/shop/${type.name}`)}>
                                <img src={type.imageid} alt='loadign' />
                                <span>{type.name}</span>
                            </div>
                        )
                    }) 
                }
            </div>
            <RecomendBar pricelimit={10} pricemax={100} />
            <RecomendBar pricelimit={70} pricemax={150} />
            <RecomendBar pricelimit={10} pricemax={150} />
        </div>
    )
}

export default Home
