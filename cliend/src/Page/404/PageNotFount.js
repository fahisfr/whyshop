import React, { useEffect } from 'react'

import Axios from '../../Axios'

function PageNotFount() {
    useEffect(() => {
        Axios.get('cliend/orders').then(res => {
            console.log(res)
        }) 
    },)
    return (
        <div>
            <h1>Page Not Found</h1>
        </div>
    )
}

export default PageNotFount
