import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import 'animate.css'
import  Message from '../components/Message'
import  Loader from '../components/Loader'
import SidebarSettings from '../components/SidebarSettings'
import HeaderBreadcrumb from '../components/HeaderBreadcrumb'
import { createResortOwner } from '../actions/resortActions'
import { RESORT_OWNER_CREATE_RESET } from '../constants/resortConstants'

const ResortCreateOwnerScreen = ({ history, match }) => {

    const { register, errors, handleSubmit } = useForm()
    
    const [uploading, setUploading] = useState(false)
    const [image, setImage] = useState('')
    const userId =  match.params.userid
    
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const resortOwnerCreate = useSelector(state => state.resortOwnerCreate)
    const { loading, error, success } = resortOwnerCreate 

     useEffect(() => {
        if(userInfo.role !== 'resortOwner' || userInfo._id !== userId){
            history.push('/')
        } 

        if(success){
            dispatch({ type: RESORT_OWNER_CREATE_RESET })
            history.push(`/resort-owner/${userInfo._id}/resortslist`)
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
     }, [dispatch, history, success, userInfo._id, userInfo.role, userId])

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
        const { name, pricePerNight, description, address, city, province, zipCode, phone, email, website, image, tv, reservation, moderateNoise, freeWifi, trendy, creditCard, bar, animals, kids } = data

        dispatch(createResortOwner({ 
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
        { loading && <Loader /> } 
        { error && <Message variant='danger'>{error}</Message> }
        
        <HeaderBreadcrumb title="Add Resort" subtitle="Resort Owner" />
        
        <div className="admin account-body">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-3 col-md-12 sidebar">
                        <SidebarSettings />
                    </div>
                    
                    <div className="col-lg-9 col-md-12">
                        <div className="content">
                            <form onSubmit={handleSubmit(submitHandler)}>
                                <div className="inner-form">
                                    <div className="mb-3 row form-group">
                                    <label for="name" className="col-lg-2 col-md-12 col-form-label fweight-600">Resort Name</label>
                                        <div className="col-lg-10 col-sm-12">
                                            <input
                                                type="text"
                                                name="name"
                                                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                                id="name"
                                                ref={register({ required: true, minLength: 2, maxLength: 30 })}
                                            />
                                            { errors.name && errors.name.type ==='required' && <p className="text-danger">Name is required.</p> }
                                            { errors.name && errors.name.type ==='minLength' && <p className="text-danger">Name is too short.</p> }
                                            {errors.name && errors.name.type === 'maxLength' && <p className="text-danger">Name is exceeds maximum length.</p>}
                                        </div>
                                    </div>
                                    
                                    <div className="mb-3 row form-group">
                                        <label for="price" className="col-lg-2 col-md-12 col-form-label fweight-600">Price Per
                                            Night</label>
                                        <div className="col-lg-10 col-sm-12">
                                            <div className="input-group flex-nowrap">
                                                <span className="input-group-text" id="addon-wrapping">₱</span>
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
                                        </div>
                                    </div>
                                    
                                    <div className="mb-3 row form-group">
                                        <label for="description" className="col-lg-2 col-md-12 col-form-label fweight-600">Resort Description</label>
                                        <div className="col-lg-10 col-sm-12">
                                        <textarea
                                            style={{ height: '100px' }}
                                            type="text"
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
                                    </div>
                                    <div className="mb-3 row form-group">
                                        <label for="address" className="col-lg-2 col-md-12 col-form-label fweight-600">Address</label>
                                        <div className="col-lg-10 col-sm-12">
                                        <input
                                            type="text"
                                            name="address"
                                            className= {`form-control ${errors.address ? 'is-invalid' : ''}`}
                                            id="address"
                                            ref={register({ required: true })}
                                        />
                                        { errors.address && errors.address.type ==='required' && <p className="text-danger">Address is required.</p> }
                                        </div>
                                    </div>
                                    
                                    <div className="mb-3 row form-group">
                                        <label for="province"
                                            className="col-lg-2 col-md-12 col-form-label fweight-600">Province</label>
                                        <div className="col-lg-10 col-sm-12">
                                        <input
                                            type="text"
                                            name="province"
                                            className={`form-control ${errors.province ? 'is-invalid' : ''}`}
                                            id="province"
                                            ref={register({ required: true })}
                                        />
                                        { errors.province && errors.province.type ==='required' && <p className="text-danger">Province is required.</p> }
                                        </div>
                                    </div>
                                    
                                    <div className="mb-3 row form-group">
                                        <label for="zip_code" className="col-lg-2 col-md-12 col-form-label fweight-600">Zip
                                            Code</label>
                                        <div className="col-lg-10 col-sm-12">
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
                                    </div>
                                    
                                    <div className="mb-3 row form-group">
                                        <label for="city" className="col-lg-2 col-md-12 col-form-label fweight-600">City</label>
                                        <div className="col-lg-10 col-sm-12">
                                        <input
                                            type="text"
                                            name="city"
                                            className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                                            id="city"
                                            ref={register({ required: true })}
                                        />
                                        { errors.city && errors.city.type ==='required' && <p className="text-danger">City is required.</p> }
                                        </div>
                                    </div>
                                    
                                    <div className="mb-3 row form-group">
                                        <label for="phone"
                                            className="col-lg-2 col-md-12 col-form-label fweight-600">Phone</label>
                                        <div className="col-lg-10 col-sm-12">
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
                                    </div>
                                    
                                    <div className="mb-3 row form-group">
                                        <label for="email"
                                            className="col-lg-2 col-md-12 col-form-label fweight-600">Email</label>
                                        <div className="col-lg-10 col-sm-12">
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
                                    </div>
                                    
                                    <div className="mb-3 row form-group">
                                        <label for="website"
                                            className="col-lg-2 col-md-12 col-form-label fweight-600">Website</label>
                                        <div className="col-lg-10 col-sm-12">
                                        <input
                                            type="text"
                                            name="website" 
                                            className={`form-control ${errors.website ? 'is-invalid' : ''}`}
                                            id="website" 
                                            ref={register({ required: true, pattern: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ })}
                                        />
                                        { errors.website && errors.website.type === 'required' && <p className="text-danger">Website is required.</p>}
                                        { errors.website && errors.website.type ==='pattern' && <p className="text-danger">Not a valid website url.</p> }
                                        </div>
                                    </div>
                                    
                                    <div className="mb-3 row form-group">
                                        <label for="image"
                                            className="col-lg-2 col-md-12 col-form-label fweight-600">Image</label>
                                        <div className="col-lg-10 col-sm-12">
                                            <input 
                                                class="form-control form-control-lg" type="file"
                                                id="uploadImage" 
                                                onChange={uploadFileHandler}
                                                ref={register}  />
                                            <small>Recommended image size: 1920 x 1306</small>
                                        </div>
                                    </div>
                                    
                                    { uploading && <Loader /> }
                                    
                                    <div className="mb-3 row amenities form-group">
                                        <label for="amenities"
                                            className="col-lg-2 col-md-12 col-form-label fweight-600">Amenities</label>
                                        <div className="col-lg-5 col-md-12">
                                            <div className="list-group">
                                                <label for="tv" className="form-check-label list-group-item">
                                                    <input className="form-check-input me-1 mr-2" type="checkbox" name="tv" id="tv" value={true} ref={register}/>
                                                    TV
                                                </label>
                                                <label for="reservation" className="form-check-label list-group-item">
                                                    <input className="form-check-input me-1 mr-2" type="checkbox" name="reservation" id="reservation" value={true} ref={register}/>
                                                    Reservation
                                                </label>
                                                <label for="moderate_noise" className="list-group-item">
                                                    <input className="form-check-input me-1 mr-2" type="checkbox" name="moderateNoise" id="moderate_noise" value={true} ref={register}/>
                                                    Moderate Noise
                                                </label>
                                                <label for="free_wifi" className="list-group-item">
                                                    <input className="form-check-input me-1 mr-2" type="checkbox" name="freeWifi" id="free_wifi" value={true} ref={register}/>
                                                    Free Wifi
                                                </label>
                                                <label for="trendy" className="list-group-item">
                                                    <input className="form-check-input me-1 mr-2" type="checkbox" name="trendy" id="trendy" value={true} ref={register}/>
                                                    Trendy
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-lg-5 col-md-12">
                                            <div className="list-group">
                                                <label for="credit_card" className="list-group-item">
                                                    <input className="form-check-input me-1 mr-2" type="checkbox" name="credit_card" id="credit_card" value={true} ref={register}/>
                                                    Credit Card
                                                </label>
                                                <label for="bar" className="list-group-item">
                                                    <input className="form-check-input me-1 mr-2" type="checkbox" name="bar" id="bar" value={true} ref={register}/>
                                                    Bar
                                                </label>
                                                <label for="animals" className="list-group-item">
                                                    <input className="form-check-input me-1 mr-2" type="checkbox" name="animals" id="animals" value={true} ref={register}/>
                                                    Pets
                                                </label>
                                                <label for="kids" className="list-group-item">
                                                    <input className="form-check-input me-1 mr-2" type="checkbox" name="kids" id="kids" value={true} ref={register}/>
                                                    Kids
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-grid submit">
                                    <button type="submit" className="btn btn-block">ADD NEW RESORT</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        </>
    )
  

      
}

export default ResortCreateOwnerScreen
