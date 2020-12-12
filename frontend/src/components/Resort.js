import React from 'react'
import { Link } from 'react-router-dom'
import { FaMapMarkerAlt  } from 'react-icons/fa'
import Rating from './Rating'

const Resort = ({ resort }) => {

    const { _id, name, image, city, province, rating, totalReviews } = resort 

    return (
        <>
        <div class="col-lg-4 col-md-6 col-sm-12">
            <Link to={`/resorts/${_id}`}>
                <div class="popular-item card">
                    <img src={image} alt="image 1"/>
                    <div class="card-info">
                        <div class="card-top">
                        <h3 class="title">{ name }</h3>
                        <div class="loc-section">
                            <img class="loc-pin" src="#" alt="Pin" /> 
                            <p>{`${city}, ${province}`}</p>
                        </div>
                        </div>
                        <hr />
                        <div class="card-bottom">
                        <Link className="eye-btn" to={`/resorts/${_id}`}>
                            <img src="#" alt="eye" />
                        </Link>
                        <p>35 Reviews</p>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
     </>
            
    )
}

export default Resort