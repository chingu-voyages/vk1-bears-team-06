import React from 'react'
import { Link } from 'react-router-dom'
import { FaMapMarkerAlt  } from 'react-icons/fa'
import Rating from './Rating'


const Resort = ({ resort }) => {

    const { _id, name, image, city, province, rating, reviews } = resort 

    return (
        <>
        <div className="col-md-3 mt-4">
        <Link to={`/resorts/${_id}`}>
               <div className="card">
                <img src={image} className="card-img-top" alt="" />
                <div className="card-body">
                    <h5 className="card-title">{ name }</h5>
                </div>
               </div>
               <div className="card-header">
                   <p><FaMapMarkerAlt /> {`${city}, ${province}`}</p>
                   <Rating rating={rating} reviews={reviews} />
                </div>
                </Link>
               </div>
     </>
            
    )
}

export default Resort