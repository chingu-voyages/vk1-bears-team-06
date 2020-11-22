import React from 'react'
import PropTypes from 'prop-types'
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";


const Rating = ({ rating, reviews }) => {
    return (
        <div className="star-rating">
            {rating >=1 ? 
                <BsStarFill /> : 
                rating >= 0.5 
                ? <BsStarHalf />
                : <BsStar />
            }

        {rating >=2 ?  
                <BsStarFill /> : 
                rating >= 1.5 
                ? <BsStarHalf />
                : <BsStar />
            }

{rating >=3 ?  
                <BsStarFill /> : 
                rating >= 2.5 
                ? <BsStarHalf /> 
                : <BsStar /> 
            }

{rating >=4 ?  
               <BsStarFill /> : 
               rating >= 3.5 
                ? <BsStarHalf /> 
                : <BsStar /> 
            }

{rating >= 5 ?  
                <BsStarFill /> :  
                rating >= 4.5 
                ? <BsStarHalf />  
                : <BsStar /> 
            } 
            
           <span className="ml-2">({reviews && reviews})</span>
        </div>
    )
}

Rating.propTypes = {
    rating: PropTypes.number.isRequired,
    reviews: PropTypes.string.isRequired
}

export default Rating
