import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import 'animate.css'
import  Message from '../components/Message'
import  Loader from '../components/Loader'
import { listResortDetails, updateResort } from '../actions/resortActions'
import { RESORT_UPDATE_RESET } from '../constants/resortConstants'
import HeaderBreadcrumb from '../components/HeaderBreadcrumb'
import SidebarSettings from '../components/SidebarSettings'
import MetaDecorator from '../components/MetaDecorator' 
import editResortMeta from '../data/editResort'

const ResortEditAdminScreen = ({ match, history }) => {
 
    const { register, errors, handleSubmit } = useForm()
    const resortId = match.params.id
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

    const resortDetails = useSelector(state => state.resortDetails)
    const { loading, error, resort } = resortDetails 

    const resortUpdate = useSelector(state => state.resortUpdate)
    const { 
        loading: loadingUpdate, 
        error: errorUpdate, 
        success: successUpdate 
    } = resortUpdate 

     useEffect(() => {

        if(successUpdate){
            dispatch({ type: RESORT_UPDATE_RESET })
            history.push('/admin/resortsList')
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
                dispatch(listResortDetails(resortId))
            }
            else {
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
     }, [dispatch, history, resortId, resort, successUpdate])

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

        dispatch(updateResort({ 
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
        }))
    }



    return ( 
        <>
           <MetaDecorator 
                title={`${editResortMeta.pageTitle} | ${resort.name}`} 
                description={editResortMeta.pageDescription} 
                keywords={editResortMeta.pageKeyword}
            /> 

        { loading && <Loader /> } 
        <HeaderBreadcrumb title="Edit Resort" subtitle="Administrator" />
        { errorUpdate && <Message variant='danger'>{errorUpdate}</Message> }
        {  error ? <Message variant='danger'>{error}</Message> : (
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
                                                defaultValue={resort.name}
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
                                                    defaultValue={resort.price_per_night}
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
                                            defaultValue={resort.description}
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
                                            defaultValue={resort.address}
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
                                            defaultValue={resort.province}
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
                                    </div>
                                    <div class="mb-3 row">
                                        <label for="city" class="col-lg-2 col-md-12 col-form-label fweight-600">City</label>
                                        <div class="col-lg-10 col-sm-12">
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
                                    </div>
                                    <div class="mb-3 row">
                                        <label for="phone"
                                            class="col-lg-2 col-md-12 col-form-label fweight-600">Phone</label>
                                        <div class="col-lg-10 col-sm-12">
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
                                    </div>
                                    <div class="mb-3 row">
                                        <label for="phone"
                                            class="col-lg-2 col-md-12 col-form-label fweight-600">Email</label>
                                        <div class="col-lg-10 col-sm-12">
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
                                    </div>
                                    <div class="mb-3 row">
                                        <label for="website"
                                            class="col-lg-2 col-md-12 col-form-label fweight-600">Website</label>
                                        <div class="col-lg-10 col-sm-12">
                                        <input
                                            type="text"
                                            name="website"
                                            defaultValue={resort.website} 
                                            className={`form-control ${errors.website ? 'is-invalid' : ''}`}
                                            id="website" 
                                            ref={register({ required: true,  pattern: /(https?:\/\/)?(www\.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)|(https?:\/\/)?(www\.)?(?!ww)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ })}
                                        />
                                        { errors.website && errors.website.type === 'required' && <p className="text-danger">Website is required.</p>}
                                        { errors.website && errors.website.type ==='pattern' && <p className="text-danger">Not a valid website url.</p> }
                                        </div>
                                    </div>
                                    <div class="mb-3 row">
                                        <label for="image"
                                            class="col-lg-2 col-md-12 col-form-label fweight-600">Image</label>
                                        <div class="col-lg-10 col-sm-12">
                                            <input 
                                            class="form-control form-control-lg" 
                                            type="file"
                                            id="uploadImage" 
                                            onChange={uploadFileHandler}></input>
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
                                                    checked={tv ? 'checked' : '' } id="tv" onChange={(e) => setTV(!tv)} />
                                                    TV
                                                </label>
                                                <label class="list-group-item">
                                                    <input class="form-check-input" type="checkbox"
                                                    name="reservation" checked={reservation ? 'checked' : '' } id="reservation" onChange={(e) => setReservation(!reservation)}/>
                                                    Reservation
                                                </label>
                                                <label class="list-group-item">
                                                    <input class="form-check-input" type="checkbox"
                                                    checked={moderateNoise ? 'checked' : '' } id="moderate_noise" onChange={(e) => setModerateNoise(!moderateNoise)} />
                                                    Moderate Noise
                                                </label>
                                                <label class="list-group-item">
                                                    <input class="form-check-input" type="checkbox"
                                                    name="freeWifi" checked={freeWifi ? 'checked' : ''  } id="free_wifi" onChange={(e) => setFreeWifi(!freeWifi)} />
                                                    Free Wifi
                                                </label>
                                                <label class="list-group-item">
                                                    <input class="form-check-input" type="checkbox"
                                                    name="trendy" checked={trendy ? 'checked' : ''  } id="trendy" onChange={(e) => setTrendy(!trendy)} />
                                                    Trendy
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-lg-5 col-md-12">
                                            <div class="list-group">
                                                <label class="list-group-item">
                                                    <input class="form-check-input" type="checkbox"
                                                    name="creditCard" checked={creditCard ? 'checked' : ''} id="credit_card" onChange={(e) => setCreditCard(!creditCard)} />
                                                    Credit Card
                                                </label>
                                                <label class="list-group-item">
                                                    <input class="form-check-input" type="checkbox"
                                                    name="bar" checked={bar ? 'checked' : '' } id="bar" onChange={(e) => setBar(!bar)} />
                                                    Bar
                                                </label>
                                                <label class="list-group-item">
                                                    <input class="form-check-input" type="checkbox"
                                                    name="animals" checked={animals ? 'checked' : '' } id="animals" onChange={(e) => setAnimals(!animals)} />
                                                    Pets
                                                </label>
                                                <label class="list-group-item">
                                                    <input class="form-check-input" type="checkbox"
                                                    name="kids" checked={kids ? 'checked' : '' } id="kids" onChange={(e) => setKids(!kids)} />
                                                    Kids
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="d-grid submit">
                                    <button type="submit" class="btn btn-block">UPDATE RESORT</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )}
        </>
    )}

export default ResortEditAdminScreen
