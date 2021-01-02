import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { listResortDetails, createResortReview } from '../actions/resortActions'
import { RESORT_CREATE_REVIEW_RESET } from '../constants/resortConstants'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { FaMapMarkerAlt  } from 'react-icons/fa'
import { BiLinkAlt  } from "react-icons/bi"
import { MdLocalPhone  } from "react-icons/md"
import { AiOutlineMail  } from "react-icons/ai"

const ResortDetailScreen = ({ match }) => {
     
  const [ratingInput, setRatingInput] = useState(0)
  const [comment, setComment] = useState('')

   const dispatch = useDispatch()

   const resortDetails = useSelector(state => state.resortDetails)
   const { loading, error, resort } = resortDetails

   const resortReviewCreate = useSelector(state => state.resortReviewCreate)
   const { success:successResortReview, error: errorResortReview } = resortReviewCreate

   const userLogin = useSelector(state => state.userLogin)
   const { userInfo } = userLogin

   useEffect(() => {
       if(successResortReview){
           alert('Review submitted')
           setRatingInput(0)
           setComment('')
           dispatch({ type: RESORT_CREATE_REVIEW_RESET} )
       }
       dispatch(listResortDetails(match.params.id))
   }, [dispatch, match, successResortReview])

  
   const submitHandler = (e) => {
       e.preventDefault()
       dispatch(createResortReview(match.params.id, 
        {
        rating: ratingInput,
        comment
    }))
   }

    const { name, address, city, province, zip_code, image, description, amenities, website, phone, email, rating, totalReviews, reviews } = resort

    return (
        <>
            { loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <div className="row mt-5">
                <div className="col-lg-7">
                <h1>{name}</h1>
                <p><FaMapMarkerAlt /> {`${address}, ${city} ${province}, Philippines, ${zip_code}`}</p>
                <img src={image} alt={name} width="700" />
                <br/>
                <p>{description}</p>
                <br/>
                <h4>Amenities:</h4> 
             <div>

{  
  amenities && Object.entries(amenities).filter(([key,value]) =>  value === true).map(
    ([key]) => {
        switch(key){
            case 'tv':
                return <p><FaMapMarkerAlt />  {key}</p>;
            case 'reservation':
                return <p><FaMapMarkerAlt />  {key}</p>;
            case 'moderate_noise':
                return <p><FaMapMarkerAlt />  {key}</p>;
            case 'free_wifi':
                return <p><FaMapMarkerAlt />  {key}</p>;
            case 'trendy':
                return <p><FaMapMarkerAlt />  {key}</p>;
            case 'credit_card':
                return <p><FaMapMarkerAlt />  {key}</p>;
            case 'bar':
                return <p><FaMapMarkerAlt />  {key}</p>;
            case 'animals':
                return <p><FaMapMarkerAlt />  {key}</p>;
            case 'kids':
                return <p><FaMapMarkerAlt />  {key}</p>;
            default:
                return null;
        }
    })
}

            </div> 
        </div>

        <div className="col-lg-4">
        <div className="card">
            <ul className="list-group list-group-flush">
                 <li className="list-group-item"><span>{totalReviews} Reviews</span> <Rating rating={rating} /> <span>{rating}/5.0</span></li>
                <li className="list-group-item"><BiLinkAlt /> <a href={ website ?  `${website}` : ''}>{ website ? website : 'No website provided'}</a> </li>
                <li className="list-group-item"><MdLocalPhone /> { phone ? phone : 'No phone number' }</li>
                <li className="list-group-item"><AiOutlineMail /> <a href={`mailto:${email}`}>{ email ? email : 'No email provided' }</a> </li>
            </ul>
        </div>
        </div>
        </div>

     )}

<div class="col-lg-4">
    <h2>Reviews</h2>
    { reviews.length === 0 && <Message>No Reviews</Message>}
    <ul className="list-group">
        {reviews.map(review => (
            <li className="list-group-item" key={review._id}>
                <strong>{review.name}</strong>
                <Rating rating={review.rating} />
                <p>{review.createdAt.substring(0, 10)}</p>
                <p>{review.comment}</p>
                </li>
        ))}
         <li class="list-group-item">
           <h2>Write a Review</h2>
           {errorResortReview && <Message variant='danger'>{errorResortReview}</Message>}
            {userInfo ? (
            <form onSubmit={submitHandler}>
            <div className="form-group">
                <label for="rating">Rating</label>
                <select className="form-control" id="rating" value={ratingInput} onChange={(e) => setRatingInput(e.target.value)}>
                    <option value=''>Select...</option>
                    <option value='1'>1 - Poor</option>
                    <option value='2'>2 - Fair</option>
                    <option value='3'>3 - Good</option>
                    <option value='4'>4 - Very Good</option>
                    <option value='5'>5 - Excellent</option>
                </select>
             </div>
  
            <div class="form-group">
               <textarea className="form-control" value={comment} onChange={(e) => setComment(e.target.value)} id="comment" rows="3"></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            
            ) : <Message>Please <Link to='/login'>Login</Link> to write a review</Message>}
        </li>
</ul>
</div>

</>

)
}

export default ResortDetailScreen