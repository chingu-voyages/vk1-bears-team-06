import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import 'animate.css'
import { Link } from 'react-router-dom'
import { listResortDetails, createResortReview } from '../actions/resortActions'
import { RESORT_CREATE_REVIEW_RESET } from '../constants/resortConstants'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { FaWifi, FaRegImages, FaCocktail, FaBabyCarriage, FaMapMarkerAlt, FaPhone } from 'react-icons/fa'
import { HiHome } from "react-icons/hi"
import { FiMonitor } from "react-icons/fi"
import { BiCreditCard } from "react-icons/bi"
import { AiFillSound } from "react-icons/ai"
import { MdPets, MdEmail } from "react-icons/md"
import { ImLink } from "react-icons/im"
import ReactStars from "react-rating-stars-component"
import moment from 'moment'



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
        store.addNotification({
            title: 'Success!',
            message: 'Review successfully posted.',
            type: 'success',                       
            container: 'top-right',               
            animationIn: ["animate__animated", "animate__fadeInRight"],   
            animationOut: ["animate__animated", "animate__fadeOutRight"],  
            dismiss: {
              duration: 4000
            }
          })
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

    const { name, address, city, province, zip_code, image, description, amenities, website, phone, email, rating, totalReviews, reviews, price_per_night } = resort

    return (
        <>

            { loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <>
                    <div className="resort-hero-img">
                        <img src={image} alt={name} />
                        <div className="img-overlay"></div>
                        <div className="resort-info">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-8 title">
                                        <h1 className="fweight-700">{name}</h1>
                                        <h2><FaMapMarkerAlt /> {`${address}, ${city} ${province}, Philippines, ${zip_code}`}</h2>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="price">
                                            <h4 className="fweight-700">₱{String(price_per_night).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")} <span className="fweight-500">/night</span></h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="resort-content">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-8">
                                    <div className="left-content">
                                        <div className="desc">
                                            <p>{description}</p>
                                        </div>
                                        <hr />
                                        <div className="desc">
                                            <h3>Amenities</h3>
                                            <div className="row">
                                                <div className="col-md-6 amenities">
                                                    <ul>
                                                    {  
                                                    amenities && Object.entries(amenities).filter(([key,value]) =>  value === true).map(
                                                        ([key]) => {
                                                            switch(key){
                                                                case 'tv':
                                                                    return <li><p><FiMonitor />  {key}</p></li>;
                                                                case 'reservation':
                                                                    return <li><p><HiHome />  {key}</p></li>;
                                                                case 'moderate_noise':
                                                                    return <li><p><AiFillSound />  Noise Cancellation</p></li>;
                                                                case 'free_wifi':
                                                                    return <li><p><FaWifi />  Free Wifi</p></li>;
                                                                case 'trendy':
                                                                    return <li><p><FaRegImages />  {key}</p></li>;
                                                                case 'credit_card':
                                                                    return <li><p><BiCreditCard />  Credit Card</p></li>;
                                                                case 'bar':
                                                                    return <li><p><FaCocktail />  {key}</p></li>;
                                                                case 'animals':
                                                                    return <li><p><MdPets />  {key}</p></li>;
                                                                case 'kids':
                                                                    return <li><p><FaBabyCarriage />  {key}</p></li>;
                                                                default:
                                                                    return null;
                                                            }
                                                        })
                                                    }
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="side-ad">
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item item one">
                                                <p>{totalReviews} Reviews</p>
                                                <div className="rating">
                                                    <Rating rating={rating} />
                                                </div>
                                            </li>
                                            <li className="list-group-item item">
                                                <ImLink />
                                                <p><a className="links" href={ website ?  `${website}` : ''}>{ website ? website : 'No website provided'}</a></p>
                                            </li>
                                            <li className="list-group-item item">
                                                <FaPhone />
                                                <p>{ phone ? phone : 'No phone number' }</p>
                                            </li>
                                            <li className="list-group-item item">
                                                <MdEmail />
                                                <p>{ email ? <a className="links" href={`mailto:${email}`}>{email}</a> : 'No email provided' }</p>
                                            </li>
                                            <div className="list-group-item">
                                                <div className="submit d-grid">
                                                    <a href="#reviews" className="btn btn-block">WRITE A REVIEW</a>
                                                </div>
                                            </div>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

            <div className="resort-reviews">
                <div className="container">
                    <div className="row">
                        <hr id="reviews" />
                        <div className="col-lg-8 offset-lg-2">
                            <h3>Reviews</h3>
                              {errorResortReview && <Message variant='danger'>{errorResortReview}</Message>}
                                {userInfo && (userInfo.role !== 'administrator' && userInfo.role !== 'resortOwner') && (
                                    <>
                                    <div className="review-form">
                                        <form onSubmit={submitHandler}>
                                            <div className="start">
                                            <span>Rate this resort: </span>
                                            <ReactStars
                                                count={5}
                                                onChange={setRatingInput}
                                                size={34}
                                                activeColor="#ffd700"
                                            />
                                            </div>
                                            <textarea style={{'height':'100px'}} type="text" id="review" placeholder="Write your review here" value={comment} onChange={(e) => setComment(e.target.value)} rows="5"></textarea>
                                            <div className="function">
                                                <p>Comment as <Link className="fweight-500" to='/'>{userInfo.name}</Link></p>
                                                <button type="submit" className="btn btn-primary btn-block">Post Review</button>
                                            </div>
                                        </form>
                                    </div>
                                    </>
                                )}
                        </div>
                        <div className="col-lg-12">
                            <div className="review-list">
                                <div className="row">
                                    { reviews.length === 0 && <Message>No Reviews</Message>}
                                    {reviews.map(review => (
                                        <div className="col-lg-6">
                                            <div className="card" key={review._id}>
                                                <p className="name fweight-600">
                                                    { 
                                                      review.user.name
                                                    }</p>
                                                <p className="date">{moment(review.createdAt).format('LL')}</p>
                                                <p className="review">
                                                    {review.comment}
                                                </p>
                                                <div className="ratings">
                                                    <Rating rating={review.rating} />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

)
}

export default ResortDetailScreen