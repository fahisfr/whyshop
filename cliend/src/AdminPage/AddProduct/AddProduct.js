import React, {useState} from 'react'
import './AddProduct.css'
import axios from '../../Axios'
function AddProduct() {
    
    const [name, setname] = useState('')
    const [image, setimage] = useState(null)
    const [type, settype] = useState('')
    const [quantity, setquantity] = useState()
    const [price, setprice] = useState()
    
    function addproduct() {
        const Data = new FormData();
        Data.append('name', name)
        Data.append('image', image);
        console.log(image)
        Data.append('type', type)
        Data.append('quantity', quantity)
        Data.append('price', price)
        axios.post('/admin/addproduct',Data).then((result) => {
            console.log(result.data);
            result.data.status === true ? alert('Product Added Successfully') : alert(result.data.message)
        })
    }
    return (
        <div className='addproduct-main-div'>
            <div className="addproduct-box">
                <input type="file" accept='.jpg'  onChange={(e) => setimage(e.target.files[0])} />
                <input type="text" value={name} onChange={(e) => setname(e.target.value)} />
                <select value={type} onChange={(e) => settype(e.target.value)}>
                    <option value="">Select Product Type</option>
                    <option value="vegtable">Vegtable</option>
                    <option value="frutis">Frutis</option>
                    <option value="sweets">Sweets</option>
                </select>

                <input type="number" value={price}
                    onChange={(e) => setprice(e.target.value)}
                    placeholder="price"
                />

                <input type="number" value={quantity}
                    onChange={(e) => setquantity(e.target.value)}
                    placeholder="quantity"
                />

                <button type='submit' onClick={(e) => addproduct()}>AddProduct</button>
            </div>
        </div>
    )
}

export default AddProduct
