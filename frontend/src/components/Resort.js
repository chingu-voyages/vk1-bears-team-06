import React from 'react'
import { Link } from 'react-router-dom'

const Resort = ({ resort, match }) => {

    const { _id, name, price_per_night, description, image } = resort 

    return (
        <>
        <div className="col-md-3 mt-4">
               <div className="card">
                <img src={image} className="card-img-top" alt="" />
                <div className="card-body">
                    <h5 className="card-title">{ name }</h5>
                    <p className="card-text bold">₱{ price_per_night }</p>
                    <p className="card-text">{ description }</p>
                    <Link to={`/resorts/${_id}`} className="btn btn-primary">Learn More</Link>
                </div>
                    </div>
               </div>
     </>
            
    )
}

export default Resort