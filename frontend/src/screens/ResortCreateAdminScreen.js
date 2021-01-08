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
import HeaderBreadcrumb from '../components/HeaderBreadcrumb'
import SidebarSettings from '../components/SidebarSettings'
import MetaDecorator from '../components/MetaDecorator' 
import createResortMeta from '../data/createResort'

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
        const { name, pricePerNight, description, address, city, province, zipCode, phone, email, website, tv, reservation, moderateNoise, freeWifi, trendy, creditCard, bar, animals, kids } = data

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
        <MetaDecorator 
            title={createResortMeta.pageTitle} 
            description={createResortMeta.pageDescription} 
            keywords={createResortMeta.pageKeyword}
        />    
        { loading && <Loader /> } 
        <HeaderBreadcrumb title="Add Resort" subtitle="Administrator" />
        { error && <Message variant='danger'>{error}</Message> }
        
        <div class="admin account-body">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-3 col-md-12 sidebar">
                        <SidebarSettings />
                    </div>
                    <div class="col-lg-9 col-md-12">
                        <div class="content">
                            <form onSubmit={handleSubmit(submitHandler)}>
                                <div class="inner-form">
                                    <div class="mb-3 row">
                                        <label for="fullname" class="col-lg-2 col-md-12 col-form-label fweight-600">Resort
                                            Name</label>
                                        <div class="col-lg-10 col-sm-12">
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
                                    </div>
                                    <div class="mb-3 row">
                                        <label for="price" class="col-lg-2 col-md-12 col-form-label fweight-600">Price per
                                            night</label>
                                        <div class="col-lg-10 col-sm-12">
                                            <div class="input-group flex-nowrap">
                                                <span class="input-group-text" id="addon-wrapping">₱</span>
                                                <input
                                                    type="text"
                                                    name="pricePerNight"
                                                    className={`form-control ${errors.pricePerNight ? 'is-invalid' : ''}`}
                                                    id="pricePerNight"
                                                    ref={register({ required: true, minLength: 2, maxLength: 5, pattern: /^-?(0|[1-9]\d*)?$/ })}
                                                />
                                            </div>
                                            <div>
                                            { errors.pricePerNight && errors.pricePerNight.type ==='required' && <p className="text-danger">Price is required.</p> }
                                            { errors.pricePerNight && errors.pricePerNight.type ==='minLength' && <p className="text-danger">Price is too small.</p> }
                                            { errors.pricePerNight && errors.pricePerNight.type ==='maxLength' && <p className="text-danger">Price exceeds maximum length.</p> }
                                            { errors.pricePerNight && errors.pricePerNight.type ==='pattern' && <p className="text-danger">That is not a valid price.</p> }
                                            </div>
                                        </div>
                                    </div>
                                    <div class="mb-3 row">
                                        <label for="description"
                                            class="col-lg-2 col-md-12 col-form-label fweight-600">Resort Description</label>
                                        <div class="col-lg-10 col-sm-12">
                                        <textarea
                                            name="description"
                                            className = {`form-control ${errors.description ? 'is-invalid' : ''}`}
                                            id="description"
                                            rows="5"
                                            style={{ height: '100px' }}
                                            ref={register({ required: true, minLength: 100, maxLength: 500})}
                                            />
                                            {errors.description && errors.description.type === 'required' && <p className="text-danger">Description is required.</p>}
                                            { errors.description && errors.description.type ==='minLength' && <p className="text-danger">Description is too short.</p> }
                                            { errors.description && errors.description.type === 'maxLength' && <p className="text-danger">Description exceeds maximum length.</p>}
                                        </div>
                                    </div>
                                    <div class="mb-3 row">
                                        <label for="address"
                                            class="col-lg-2 col-md-12 col-form-label fweight-600">Address</label>
                                        <div class="col-lg-10 col-sm-12">
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
                                    <div class="mb-3 row">
                                        <label for="province"
                                            class="col-lg-2 col-md-12 col-form-label fweight-600">Province</label>
                                        <div class="col-lg-10 col-sm-12">
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
                                    <div class="mb-3 row">
                                        <label for="zip" class="col-lg-2 col-md-12 col-form-label fweight-600">Zip
                                            Code</label>
                                        <div class="col-lg-10 col-sm-12">
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
                                    <div class="mb-3 row">
                                        <label for="city" class="col-lg-2 col-md-12 col-form-label fweight-600">City</label>
                                        <div class="col-lg-10 col-sm-12">
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
                                    <div class="mb-3 row">
                                        <label for="phone"
                                            class="col-lg-2 col-md-12 col-form-label fweight-600">Phone</label>
                                        <div class="col-lg-10 col-sm-12">
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
                                    <div class="mb-3 row">
                                        <label for="phone"
                                            class="col-lg-2 col-md-12 col-form-label fweight-600">Email</label>
                                        <div class="col-lg-10 col-sm-12">
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
                                    <div class="mb-3 row">
                                        <label for="website"
                                            class="col-lg-2 col-md-12 col-form-label fweight-600">Website</label>
                                        <div class="col-lg-10 col-sm-12">
                                        <input
                                            type="text"
                                            name="website" 
                                            className={`form-control ${errors.website ? 'is-invalid' : ''}`}
                                            id="website" 
                                            ref={register({ required: true, pattern: /(https?:\/\/)?(www\.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)|(https?:\/\/)?(www\.)?(?!ww)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ })}
                                        />
                                        { errors.website && errors.website.type === 'required' && <p className="text-danger">Website is required.</p>}
                                        { errors.website && errors.website.type ==='pattern' && <p className="text-danger">Not a valid website url.</p> }
                                        </div>
                                    </div>
                                    <div class="mb-3 row">
                                        <label for="image"
                                            class="col-lg-2 col-md-12 col-form-label fweight-600">Image</label>
                                        <div class="col-lg-10 col-sm-12">
                                            {/* <input type="file" 
                                            className="form-control-file" 
                                            id="uploadImage" 
                                            onChange={uploadFileHandler}
                                            ref={register} 
                                            /> */}
                                            
                                            <input 
                                            class="form-control form-control-lg" 
                                            type="file"
                                            id="uploadImage" 
                                            onChange={uploadFileHandler}  />
                                                <small>Recommended image size: 1920 x 1280</small>
                                        </div>
                                        
                                    </div>
                                    <div class="mb-3 row amenities">
                                        <label for="amenities"
                                            class="col-lg-2 col-md-12 col-form-label fweight-600">Amenities</label>
                                        <div class="col-lg-5 col-md-12">
                                            <div class="list-group">
                                                <label class="list-group-item">
                                                    <input class="form-check-input" type="checkbox"
                                                    name="tv" id="tv" value={true} ref={register} />
                                                    TV
                                                </label>
                                                <label class="list-group-item">
                                                    <input class="form-check-input" type="checkbox"
                                                    name="reservation" id="reservation" value={true} ref={register}/>
                                                    Reservation
                                                </label>
                                                <label class="list-group-item">
                                                    <input class="form-check-input" type="checkbox"
                                                    name="moderateNoise" id="moderate_noise" value={true} ref={register}/>
                                                    Moderate Noise
                                                </label>
                                                <label class="list-group-item">
                                                    <input class="form-check-input" type="checkbox"
                                                    name="freeWifi" id="free_wifi" value={true} ref={register}/>
                                                    Free Wifi
                                                </label>
                                                <label class="list-group-item">
                                                    <input class="form-check-input" type="checkbox"
                                                    name="trendy" id="trendy" value={true} ref={register}/>
                                                    Trendy
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-lg-5 col-md-12">
                                            <div class="list-group">
                                                <label class="list-group-item">
                                                    <input class="form-check-input" type="checkbox"
                                                    name="creditCard" id="credit_card" value={true} ref={register}/>
                                                    Credit Card
                                                </label>
                                                <label class="list-group-item">
                                                    <input class="form-check-input" type="checkbox"
                                                    name="bar" id="bar" value={true} ref={register}/>
                                                    Bar
                                                </label>
                                                <label class="list-group-item">
                                                    <input class="form-check-input" type="checkbox"
                                                    name="animals" id="animals" value={true} ref={register}/>
                                                    Pets
                                                </label>
                                                <label class="list-group-item">
                                                    <input class="form-check-input" type="checkbox"
                                                    name="kids" id="kids" value={true} ref={register}/>
                                                    Kids
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="d-grid submit">
                                    <button type="submit" class="btn btn-block">ADD NEW RESORT</button>
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

export default ResortCreateAdminScreen
