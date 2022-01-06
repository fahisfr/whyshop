import React from 'react'

function SIdeBar(props) {
    return (props.trigger) ? (
        <div className='sidebar-main'>
            <div className='profile-row'>
                <div className='profile-image'>
                    <img src='https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60' alt='profile' />
                    <h1>Fahis</h1>
                </div>

            </div>

        </div>
        
    ) : "";
}

//     return ( 
       
//     )
// }

export default SIdeBar
