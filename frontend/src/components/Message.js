import React, { useState } from 'react'
import { Alert } from 'react-bootstrap'

const Message = ({ variant, children }) => {
    const [show, setShow] = useState(true);

    if(show) {
        return (
            <>
                <Alert className={`alert alert-${variant}`} onClose={() => setShow(false)} dismissible role="alert">
                    <p>{children}</p>
                </Alert>
            </>
        )
    } else {
        return () => setShow(true)
    }
}

Message.defaultProps = { 
    variant: 'info'
}

export default Message
