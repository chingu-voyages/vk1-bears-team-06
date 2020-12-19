import React from 'react'

const SentEmailScreen = ({ match }) => {
     
    const email = match.params.email 

    return (
        <>
            <h1>We've sent an email to {email}</h1>
            <p>Please check and confirm</p>
        </>
    )
}

export default SentEmailScreen
