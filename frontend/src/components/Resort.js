  
import React from 'react'

const Resort = ({ resort, match }) => {

    const { name, price_per_night, description, image } = resort 

    return (
        <>
        <div className="row">
        <div className="col-md-3">
               <div className="card">
                <img src={image} className="card-img-top" alt="" />
                <div className="card-body">
                    <h5 className="card-title">{ name }</h5>
                    <p className="card-text bold">₱{ price_per_night }</p>
                    <p className="card-text">{ description }</p>
                    <a href="/" className="btn btn-primary">Learn More</a>
                </div>
                    </div>
               </div>
               </div>
        </>
    )
}

export default Resort