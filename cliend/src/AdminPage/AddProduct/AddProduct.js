import React, { useState } from 'react'

import axios from '../../Axios'
function AddProduct() {
    const [name, setname] = useState('')
    const [image, setimage] = useState(null)
    const [type, settype] = useState('')
    const [quantity, setquantity] = useState()
    const [amount, setamount] = useState()
    
    function addproduct(e) {
        e.preventDefault();
        const Data = new FormData();
        Data.append('name', name)
        Data.append('image', image);
        Data.append('type', type)
        Data.append('quantity', quantity)
        Data.append('amount', amount)
        axios.post('/admin/addproduct',Data).then((result) => {
            console.log(result.data);
            result.data.status === true ? alert('Product Added Successfully') : alert('Product Not Added chake agin')
        })

    }
    return (
        <div>
            {/* <Container>
                <Row>
                    <Col>
                        <Form>
                            <FloatingLabel controlId="floatingSelect" label="Select Product Type">
                                <Form.Select aria-label="Se Productes" value={type} onChange={(e) => settype(e.target.value)}>
                                    <option value="">Select Product Type</option>
                                    <option value="vegetable">vegetable </option>
                                    <option value="fruits">fruits</option>
                                    <option value="c">c</option>
                                </Form.Select>
                            </FloatingLabel>
                            <Form.Group className="mb-3" controlId="Normal text">
                                <Form.Label>product Name</Form.Label>
                                <Form.Control type="text" value={name} onChange={(e) => setname(e.target.value)} placeholder="Product Name" />

                            </Form.Group>
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Upload Product Image</Form.Label>
                                <input type="file" accept='.jpg' onChange={(e)=>setimage(e.target.files[0]) }/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="Normal nubmer">
                                <Form.Label>Product Total quantity</Form.Label>
                                <Form.Control type="number" placeholder="Total quantity" value={quantity} onChange={(e) => setquantity(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="Normal text">
                                <Form.Label>Product Amount</Form.Label>
                                <Form.Control type="number" placeholder="Amount" value={amount} onChange={(e)=>setamount(e.target.value)} />
                            </Form.Group>

                            <Button variant="primary" type="submit" onClick={addproduct}>
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
 */}

        </div>
    )
}

export default AddProduct
