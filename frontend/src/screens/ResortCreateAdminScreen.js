import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import 'animate.css'
import  Message from '../components/Message'
import  Loader from '../components/Loader'
import { createResort } from '../actions/resortActions'
import { RESORT_CREATE_RESET } from '../constants/resortConstants'

const ResortCreateAdminScreen = ({ history }) => {

    const { register, errors, handleSubmit } = useForm()
    
    const [uploading, setUploading] = useState(false)
    const [image, setImage] = useState('')
    const dispatch = useDispatch()

    const resortCreate = useSelector(state => state.resortCreate)
    const { loading, error, success } = resortCreate 

     useEffect(() => {
         if(success){
            dispatch({ type: RESORT_CREATE_RESET })
            history.push('/admin/resortsList')
            store.addNotification({
                title: 'Success!',
                message: 'Resort successfully created.',
                type: 'success',                       
                container: 'top-right',               
                animationIn: ["animate__animated", "animate__fadeInRight"],   
                animationOut: ["animate__animated", "animate__fadeOutRight"],  
                dismiss: {
                  duration: 4000
                }
              })
         } 
     }, [dispatch, history, success])

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
           setUploading(false)
        }
    }


    const submitHandler = (data, e) => {
        e.preventDefault()
        const { name, pricePerNight, description, address, city, province, zipCode, phone, email, website, image, tv, reservation, moderateNoise, freeWifi, trendy, creditCard, bar, animals, kids } = data

        dispatch(createResort({ 
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
        }))
    }

    return ( 
        <>
    <h1>Add Resort</h1>
    { loading && <Loader /> } 
    { error && <Message variant='danger'>{error}</Message> }
            <form onSubmit={handleSubmit(submitHandler)}> 
            <div className="form-group"> 
                <label for="name">Name</label>
                    <input
                        type="text"
                        name="name"
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
                        className={`form-control ${errors.website ? 'is-invalid' : ''}`}
                        id="website" 
                        ref={register({ required: true, pattern: /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/ })}
                    />
                    { errors.website && errors.website.type === 'required' && <p className="text-danger">Website is required.</p>}
                    { errors.website && errors.website.type ==='pattern' && <p className="text-danger">Not a valid website url.</p> }
            </div>

            <div className="form-group"> 
               <label for="uploadImage">Upload Image</label>
                <input type="file" 
                className="form-control-file" 
                id="uploadImage" 
                onChange={uploadFileHandler}
                ref={register} 
                />
            </div>
            { uploading && <Loader /> }

            <div className="form-group"> 
            <div class="form-check">
                <input class="form-check-input" type="checkbox"
                name="tv" id="tv" value={true} ref={register} />
                <label class="form-check-label" for="tv">TV</label>
            </div>

            <div class="form-check">
                <input class="form-check-input" type="checkbox"
                name="reservation" id="reservation" value={true} ref={register}/>
                <label class="form-check-label" for="reservation">Reservation</label>
            </div>

            <div class="form-check">
                <input class="form-check-input" type="checkbox"
                name="moderateNoise" id="moderate_noise" value={true} ref={register}/>
                <label class="form-check-label" for="moderate_noise">Moderate Noise</label>
            </div>


            <div class="form-check">
                <input class="form-check-input" type="checkbox"
                name="freeWifi" id="free_wifi" value={true} ref={register}/>
                <label class="form-check-label" for="free_wifi">Free Wifi</label>
            </div>

            <div class="form-check">
                <input class="form-check-input" type="checkbox"
                name="trendy" id="trendy" value={true} ref={register}/>
                <label class="form-check-label" for="trendy">Trendy</label>
            </div>

            <div class="form-check">
                <input class="form-check-input" type="checkbox"
                name="creditCard" id="credit_card" value={true} ref={register}/>
                <label class="form-check-label" for="credit_card">Credit Card</label>
            </div>

            <div class="form-check">
                <input class="form-check-input" type="checkbox"
                name="bar" id="bar" value={true} ref={register}/>
                <label class="form-check-label" for="bar">Bar</label>
            </div>

            <div class="form-check">
                <input class="form-check-input" type="checkbox"
                name="animals" id="animals" value={true} ref={register}/>
                <label class="form-check-label" for="animals">Animals</label>
            </div>

            <div class="form-check">
                <input class="form-check-input" type="checkbox"
                name="kids" id="kids" value={true} ref={register}/>
                <label class="form-check-label" for="animals">Kids</label>
            </div>
            </div>
            <button type="submit" className="btn btn-primary">Add Resort</button>
            </form>
            </>
    )

      
}

export default ResortCreateAdminScreen
