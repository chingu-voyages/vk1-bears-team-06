import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listResortDetails } from '../actions/resortActions'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { FaMapMarkerAlt  } from 'react-icons/fa'
import { BiLinkAlt  } from "react-icons/bi"
import { MdLocalPhone  } from "react-icons/md"
import { AiOutlineMail  } from "react-icons/ai"

const ResortDetail = ({ match }) => {
     
   const dispatch = useDispatch()

   const resortDetails = useSelector(state => state.resortDetails)
   
   const { loading, error, resort } = resortDetails
   
   useEffect(() => {
       dispatch(listResortDetails(match.params.id))
   }, [dispatch, match])

  
    const { name, address, city, province, zip_code, image, description, amenities, website, phone, email, rating, totalReviews } = resort

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

</>

)
}

export default ResortDetail