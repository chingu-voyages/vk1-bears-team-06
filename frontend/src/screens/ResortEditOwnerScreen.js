import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import 'animate.css'
import  Message from '../components/Message'
import  Loader from '../components/Loader'
import { listResortOwnerDetails, updateResortOwner } from '../actions/resortActions'
import { RESORT_OWNER_UPDATE_RESET } from '../constants/resortConstants'

const ResortEditOwnerScreen = ({ match, history }) => {

    const resortId = match.params.id
    const userId = match.params.userid

    const { register, errors, handleSubmit } = useForm()

    const [image, setImage] = useState('')
    const [uploading, setUploading] = useState(false)
    const [tv, setTV] = useState(false)
    const [reservation, setReservation] = useState(false)
    const [moderateNoise, setModerateNoise] = useState(false)
    const [freeWifi, setFreeWifi] = useState(false)
    const [trendy, setTrendy] = useState(false)
    const [creditCard, setCreditCard] = useState(false)
    const [bar, setBar] = useState(false)
    const [animals, setAnimals] = useState(false)
    const [kids, setKids] = useState(false)

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const resortOwnerDetails = useSelector(state => state.resortOwnerDetails)
    const { loading, error, resort } = resortOwnerDetails 

    const resortOwnerUpdate = useSelector(state => state.resortOwnerUpdate)
    const { 
        loading: loadingUpdate, 
        error: errorUpdate, 
        success: successUpdate 
    } = resortOwnerUpdate 

     useEffect(() => {
        if(userInfo.role !== 'resortOwner' || userInfo._id !== userId){
            history.push('/')
        } 

        if(successUpdate){
            dispatch({ type: RESORT_OWNER_UPDATE_RESET })
            history.push(`/resort-owner/${userInfo._id}/resortslist`)
            store.addNotification({
                title: 'Success!',
                message: 'Resort successfully updated.',
                type: 'success',                       
                container: 'top-right',               
                animationIn: ["animate__animated", "animate__fadeInRight"],   
                animationOut: ["animate__animated", "animate__fadeOutRight"],  
                dismiss: {
                  duration: 4000
                }
              })
        } else {
            if(!resort.name || resort._id !== resortId){
                dispatch(listResortOwnerDetails(resortId, userId))
             } else {
                setImage(resort.image)
                setTV(resort.amenities.tv)
                setReservation(resort.amenities.reservation)
                setModerateNoise(resort.amenities.moderate_noise)
                setFreeWifi(resort.amenities.free_wifi)
                setTrendy(resort.amenities.trendy)
                setCreditCard(resort.amenities.credit_card)
                setBar(resort.amenities.bar)
                setAnimals(resort.amenities.animals)
                setKids(resort.amenities.kids)
             }
        }
     }, [dispatch, history, resortId, resort, successUpdate, userInfo._id, userId, userInfo.role])

     const uploadFileHandler = async(e) => {
         const file = e.target.files[0]
         const formData = new FormData()
         formData.append('image', file)
         setUploading(true)

         try{
             const config = {
                 headers: {
                     'Content-Type': 'multipart/form-data'
                 }
             }
          
             const { data } = await axios.post('/api/upload', formData, config)
             setImage(data)
             setUploading(false)
         } catch(error){
            console.error(error)
            setUploading(false)
         }
     }



    const submitHandler = (data, e) => {
        e.preventDefault()
        const { name, pricePerNight, description, address, city, province, zipCode, phone, email, website } = data
        dispatch(updateResortOwner({ 
            _id: resortId,
            name,
            price_per_night: pricePerNight,
            description,
            address,
            city,
            province,
            zip_code: zipCode,
            phone,
            email,
            website,
            image,
            amenities: {
                tv,
                reservation,
                moderate_noise: moderateNoise,
                free_wifi: freeWifi,
                trendy,
                credit_card: creditCard,
                bar,
                animals,
                kids
            }
        }), userId)
    }



    return ( 
        <>
            <h1>Edit Resort</h1>
    { loadingUpdate && <Loader /> }    
    { errorUpdate && <Message variant='danger'>{errorUpdate}</Message> }   
    { loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
            <form onSubmit={handleSubmit(submitHandler)}> 
            <div className="form-group"> 
            <label for="name">Name</label>
                        <input
                            type="text"
                            name="name"
                            defaultValue={resort.name}
                            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                            id="name"
                            ref={register({ required: true, minLength: 2, maxLength: 30 })}
                        />
                        { errors.name && errors.name.type ==='required' && <p className="text-danger">Name is required.</p> }
                        { errors.name && errors.name.type ==='minLength' && <p className="text-danger">Name is too short.</p> }
                        { errors.name && errors.name.type ==='maxLength' && <p className="text-danger">Name is exceeds maximum length.</p> }
            </div>
 
            <div className="form-group"> 
                    <label for="name">Price Per Night</label>
                    <input
                        type="text"
                        name="pricePerNight"
                        defaultValue={resort.price_per_night}
                        className={`form-control ${errors.pricePerNight ? 'is-invalid' : ''}`}
                        id="pricePerNight"
                        ref={register({ required: true, minLength: 2, maxLength: 5, pattern: /^-?(0|[1-9]\d*)?$/ })}
                    />
                    { errors.pricePerNight && errors.pricePerNight.type ==='required' && <p className="text-danger">Price is required.</p> }
                    { errors.pricePerNight && errors.pricePerNight.type ==='minLength' && <p className="text-danger">Price is too small.</p> }
                    { errors.pricePerNight && errors.pricePerNight.type ==='maxLength' && <p className="text-danger">Price exceeds maximum length.</p> }
                    { errors.pricePerNight && errors.pricePerNight.type ==='pattern' && <p className="text-danger">That is not a valid price.</p> }
            </div>

            <div className="form-group"> 
                <label for="description">Description</label>
                    <textarea
                    name="description"
                    defaultValue={resort.description}
                    className = {`form-control ${errors.description ? 'is-invalid' : ''}`}
                    id="description"
                    rows="5"
                    ref={register({ required: true, minLength: 100, maxLength: 500})}
                    />
                    {errors.description && errors.description.type === 'required' && <p className="text-danger">Description is required.</p>}
                    { errors.description && errors.description.type ==='minLength' && <p className="text-danger">Description is too short.</p> }
                    { errors.description && errors.description.type === 'maxLength' && <p className="text-danger">Description exceeds maximum length.</p>}
                    
            </div>

            <div className="form-group"> 
                <label for="address">Address</label>
                    <input
                        type="text"
                        name="address"
                        defaultValue={resort.address}
                        className= {`form-control ${errors.address ? 'is-invalid' : ''}`}
                        id="address"
                        ref={register({ required: true })}
                    />
                    { errors.address && errors.address.type ==='required' && <p className="text-danger">Address is required.</p> }
            </div>

            <div className="form-group"> 
                <label for="province">Province</label>
                    <input
                        type="text"
                        name="province"
                        defaultValue={resort.province}
                        className={`form-control ${errors.province ? 'is-invalid' : ''}`}
                        id="province"
                        ref={register({ required: true })}
                    />
                    { errors.province && errors.province.type ==='required' && <p className="text-danger">Province is required.</p> }
            </div>

            <div className="form-group"> 
                <label for="zip_code">Zip Code</label>
                    <input
                        type="text"
                        name="zipCode"
                        defaultValue={resort.zip_code}
                        className={`form-control ${errors.zipCode ? 'is-invalid' : ''}`}
                        id="zipCode"
                        ref={register({ required: true, minLength: 4,  maxLength: 4, pattern: /^[0-9]*$/ })}
                    />
                    { errors.zipCode && errors.zipCode.type === 'required' && <p className="text-danger">Zip Code is required.</p>}
                    {errors.zipCode && errors.zipCode.type === 'minLength' && <p className="text-danger">Zip Code must consist with 4 digits.</p>}
                    { errors.zipCode && errors.zipCode.type === 'maxLength' && <p className="text-danger">Zip Code must consist with 4 digits.</p>}
                    { errors.zipCode && errors.zipCode.type ==='pattern' && <p className="text-danger">Not a valid Zip Code.</p> }
            </div>

            <div className="form-group"> 
                <label for="city">City</label>
                    <input
                        type="text"
                        name="city"
                        defaultValue={resort.city}
                        className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                        id="city"
                        ref={register({ required: true })}
                    />
                    { errors.city && errors.city.type ==='required' && <p className="text-danger">City is required.</p> }
            </div>

            <div className="form-group"> 
                <label for="phone">Phone</label>
                        <input
                            type="text"
                            name="phone"
                            defaultValue={resort.phone}
                            className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                            id="phone"
                            ref={register({ required: true, minLength: 10, maxLength: 13, pattern: /(^0|[89]\d{2}-\d{3}\-?\d{4}$)|(^0|[89]\d{2}\d{3}\d{4}$)|(^63[89]\d{2}-\d{3}-\d{4}$)|(^63[89]\d{2}\d{3}\d{4}$)|(^[+]63[89]\d{2}\d{3}\d{4}$)|(^[+]63[89]\d{2}-\d{3}-\d{4}$)|(^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$)/})}
                    />
                    { errors.phone && errors.phone.type ==='required' && <p className="text-danger">Phone is required.</p> }
                    { errors.phone && errors.phone.type ==='minLength' && <p className="text-danger">Phone length is too small.</p> }
                    { errors.phone && errors.phone.type ==='maxLength' && <p className="text-danger">Phone exceeds maximum length.</p> }
                    { errors.phone && errors.phone.type ==='pattern' && <p className="text-danger">Phone is not a valid phone.</p> }
            </div>

            <div className="form-group"> 
                <label for="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        defaultValue={resort.email}
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        id="email"
                        ref={register({ required: true, minLength: 8, maxLength: 30, pattern: /^\S+@\S+\.\S+$/ })}
                    />
                    { errors.email && errors.email.type ==='required' && <p className="text-danger">Email is required.</p> }
                    { errors.email && errors.email.type ==='minLength' && <p className="text-danger">Email length is too small.</p> }
                    { errors.email && errors.email.type ==='maxLength' && <p className="text-danger">Email exceeds maximum length.</p> }
                    { errors.email && errors.email.type ==='pattern' && <p className="text-danger">That is not a valid email.</p> }
            </div>

            <div className="form-group"> 
                <label for="website">Website</label>
                    <input
                        type="text"
                        name="website"
                        defaultValue={resort.website}
                        className={`form-control ${errors.website ? 'is-invalid' : ''}`}
                        id="website" 
                        ref={register({ required: true, pattern: /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/ })}
                    />
                    { errors.website && errors.website.type === 'required' && <p className="text-danger">Website is required.</p>}
                    { errors.website && errors.website.type ==='pattern' && <p className="text-danger">Not a valid website url.</p> }
            </div>

            <div className="form-group"> 
               <label for="uploadImage">Upload Image</label>
                <input 
                type="file" 
                className="form-control-file"
                id="uploadImage" 
                onChange={uploadFileHandler}
                />
            </div>


           <div className="form-group"> 
            <div class="form-check">
                <input class="form-check-input" type="checkbox" checked={tv ? 'checked' : '' } id="tv" onChange={(e) => setTV(!tv)} />
                <label class="form-check-label" for="tv">TV</label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" checked={reservation ? 'checked' : '' } id="reservation" onChange={(e) => setReservation(!reservation)} />
                <label class="form-check-label" for="reservation">Reservation</label>
            </div>

            <div class="form-check">
                <input class="form-check-input" type="checkbox" checked={moderateNoise ? 'checked' : '' } id="moderate_noise" onChange={(e) => setModerateNoise(!moderateNoise)} />
                <label class="form-check-label" for="moderate_noise">Moderate Noise</label>
            </div>


            <div class="form-check">
                <input class="form-check-input" type="checkbox" checked={freeWifi ? 'checked' : ''  } id="free_wifi" onChange={(e) => setFreeWifi(!freeWifi)} />
                <label class="form-check-label" for="free_wifi">Free Wifi</label>
            </div>

            <div class="form-check">
                <input class="form-check-input" type="checkbox" checked={trendy ? 'checked' : ''  } id="trendy" onChange={(e) => setTrendy(!trendy)} />
                <label class="form-check-label" for="trendy">Trendy</label>
            </div>

            <div class="form-check">
                <input class="form-check-input" type="checkbox" checked={creditCard ? 'checked' : ''} id="credit_card" onChange={(e) => setCreditCard(!creditCard)} />
                <label class="form-check-label" for="credit_card">Credit Card</label>
            </div>

            <div class="form-check">
                <input class="form-check-input" type="checkbox" checked={bar ? 'checked' : '' } id="bar" onChange={(e) => setBar(!bar)} />
                <label class="form-check-label" for="bar">Bar</label>
            </div>

            <div class="form-check">
                <input class="form-check-input" type="checkbox" checked={animals ? 'checked' : '' } id="animals" onChange={(e) => setAnimals(!animals)} />
                <label class="form-check-label" for="animals">Animals</label>
            </div>


            <div class="form-check">
                <input class="form-check-input" type="checkbox" checked={kids ? 'checked' : '' } id="kids" onChange={(e) => setKids(!kids)} />
                <label class="form-check-label" for="animals">Kids</label>
            </div>

            </div>

            <button type="submit" className="btn btn-primary">Update</button>

            </form>
            
            
    )}

        </>
    )}

export default ResortEditOwnerScreen
