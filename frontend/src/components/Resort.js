import React from 'react'
import { Link } from 'react-router-dom'
import { FaMapMarkerAlt  } from 'react-icons/fa'
import Rating from './Rating'

import StarOutlineIcon from '../assets/images/svg/star-outline.svg';
import BubbleIcon from '../assets/images/svg/speech-bubble.svg';

const Resort = ({ resort }) => {

    const { _id, name, image, city, province, rating, totalReviews, price_per_night } = resort 

    return (
        <>
            <div className="col-lg-4 col-md-6 col-sm-12">
                <Link to={`/resorts/${_id}`}>
                    <div className="popular-item card">
                        <img src={image}  />
                        <div className="info">
                            <h3 className="title fweight-700">{name}</h3>
                            <p className="location"><FaMapMarkerAlt /> {`${city}, ${province}`}</p>
                            <h4 className="price fweight-700">₱ {String(price_per_night).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")} <span className="fweight-500">/night</span></h4>
                            <hr />
                            <div className="card-bottom">
                                <div className="rating">
                                    <img src={StarOutlineIcon} alt="Star Outline" />
                                    <p className="fweight-500">{rating.toFixed(1)}</p>
                                </div>
                                <div className="reviews">
                                    <img src={BubbleIcon} alt="Star Outline" />
                                    <p className="fweight-500">{totalReviews} {totalReviews === 1 ? "Review":"Reviews"}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>

            {/* <div className="col-md-3 mt-4">
                <Link to={`/resorts/${_id}`}>
                    <div className="card">
                        <img src={image} className="card-img-top" alt="" />
                        <div className="card-body">
                            <h5 className="card-title">{ name }</h5>
                        </div>
                    </div>
                    <div className="card-header">
                        <p><FaMapMarkerAlt /> {`${city}, ${province}`}</p>
                        <Rating rating={rating} totalReviews={totalReviews} />
                    </div>
                </Link>
            </div> */}
        </>    
    )
}

export default Resort