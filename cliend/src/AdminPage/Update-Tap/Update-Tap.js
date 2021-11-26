import React from 'react'
import {Form,} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
function Update_Tap() {
    return (
        <div>
            
            <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Update tap</Form.Label>
                 <Form.Control type="file" />
            </Form.Group>
                
        </div>
    )
}

export default Update_Tap
