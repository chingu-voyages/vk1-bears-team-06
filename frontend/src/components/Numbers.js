import React from 'react'

const Numbers = (props) => {
    return (
        <>
            <div className="col-lg-3 col-xs-12">
                <p className="count fweight-700">{props.numbers}</p>
                <p className="title">{props.title}</p>
            </div>
        </>
    )
}

export default Numbers