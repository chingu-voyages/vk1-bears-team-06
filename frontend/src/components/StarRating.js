import React from 'react'
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

const StarRating = () => {
    return (
        <>
            {[...Array(5)].map((star, index) => {
                const ratingValue = index + 1
                return (
                    <label>
                        <input type="radio" name="rating" className="star-radio" value={ratingValue}/>
                        <BsStar className="star"/> 
                    </label>
                )
            }) }

        </>
    )
}

export default StarRating
