import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import 'animate.css'
import  Message from '../components/Message'
import  Loader from '../components/Loader'
import { createResortOwner } from '../actions/resortActions'
import { RESORT_OWNER_CREATE_RESET } from '../constants/resortConstants'

const ResortCreateOwnerScreen = ({ history, match }) => {

    const [name, setName] = useState('')
    const [pricePerNight, setPricePerNight] = useState(0)
    const [description, setDescription] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [province, setProvince] = useState('')
    const [zipCode, setZipCode] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [website, setWebsite] = useState('')
    const [image, setImage] = useState('')
    const [tv, setTV] = useState(false)
    const [reservation, setReservation] = useState(false)
    const [moderateNoise, setModerateNoise] = useState(false)
    const [freeWifi, setFreeWifi] = useState(false)
    const [trendy, setTrendy] = useState(false)
    const [creditCard, setCreditCard] = useState(false)
    const [bar, setBar] = useState(false)
    const [animals, setAnimals] = useState(false)
    const [kids, setKids] = useState(false)
    const [uploading, setUploading] = useState(false)
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


    const submitHandler = (e) => {
        e.preventDefault()
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
    <h1>Add Resort</h1>
    { loading && <Loader /> } 
    { error && <Message variant='danger'>{error}</Message> }
            <form onSubmit={submitHandler}> 
            <div className="form-group"> 
                <label for="name">Name</label>
                <input type="text" name="name"className="form-control" id="name" onChange={(e) => setName(e.target.value)}  />
            </div>
 
            <div className="form-group"> 
                <label for="name">Price Per Night</label>
                <input type="number" name="price_per_night" className="form-control" id="price_per_night" onChange={(e) => setPricePerNight(e.target.value)}  />
            </div>

            <div className="form-group"> 
                <label for="description">Description</label>
                 <textarea class="form-control" id="description" rows="5" onChange={(e) => setDescription(e.target.value)}></textarea>
            </div>

            <div className="form-group"> 
                <label for="province">Address</label>
                <input type="text" name="address" className="form-control" id="address" onChange={(e) => setAddress(e.target.value)}  />
            </div>

            <div className="form-group"> 
                <label for="province">Province</label>
                <input type="text" name="province" className="form-control" id="province" onChange={(e) => setProvince(e.target.value)}  />
            </div>

            <div className="form-group"> 
                <label for="zip_code">Zip Code</label>
                <input type="number" name="zip_code" className="form-control" id="zip_code" onChange={(e) => setZipCode(e.target.value)}  />
            </div>


            <div className="form-group"> 
                <label for="city">City</label>
                <input type="text" name="city" className="form-control" id="city" onChange={(e) => setCity(e.target.value)}  />
            </div>

            <div className="form-group"> 
                <label for="city">Phone</label>
                <input type="number" name="phone" className="form-control" id="phone" onChange={(e) => setPhone(e.target.value)}  />
            </div>

            <div className="form-group"> 
                <label for="city">Email</label>
                <input type="text" name="email" className="form-control" id="email" onChange={(e) => setEmail(e.target.value)}  />
            </div>

            <div className="form-group"> 
                <label for="website">Website</label>
                <input type="text" className="form-control" id="website" onChange={(e) => setWebsite(e.target.value)}  />
            </div>

            <div className="form-group"> 
                <label for="image">Image</label>
                <input type="text" className="form-control" id="image" onChange={(e) => setImage(e.target.value)}  />
            </div>

            <div className="form-group"> 
               <label for="uploadImage">Upload Image</label>
                <input type="file" class="form-control-file" id="uploadImage" onChange={uploadFileHandler} />
            </div>
            { uploading && <Loader /> }

            <div className="form-group"> 
            <div class="form-check">
                <input class="form-check-input" type="checkbox" id="tv" onChange={(e) => setTV(true)} />
                <label class="form-check-label" for="tv">TV</label>
            </div>

            <div class="form-check">
                <input class="form-check-input" type="checkbox" id="reservation" onChange={(e) => setReservation(true)} />
                <label class="form-check-label" for="reservation">Reservation</label>
            </div>

            <div class="form-check">
                <input class="form-check-input" type="checkbox" id="moderate_noise" onChange={(e) => setModerateNoise(true)} />
                <label class="form-check-label" for="moderate_noise">Moderate Noise</label>
            </div>


            <div class="form-check">
                <input class="form-check-input" type="checkbox" id="free_wifi" onChange={(e) => setFreeWifi(true)} />
                <label class="form-check-label" for="free_wifi">Free Wifi</label>
            </div>

            <div class="form-check">
                <input class="form-check-input" type="checkbox" id="trendy" onChange={(e) => setTrendy(true)} />
                <label class="form-check-label" for="trendy">Trendy</label>
            </div>

            <div class="form-check">
                <input class="form-check-input" type="checkbox" id="credit_card" onChange={(e) => setCreditCard(true)} />
                <label class="form-check-label" for="credit_card">Credit Card</label>
            </div>

            <div class="form-check">
                <input class="form-check-input" type="checkbox" id="bar" onChange={(e) => setBar(true)} />
                <label class="form-check-label" for="bar">Bar</label>
            </div>

            <div class="form-check">
                <input class="form-check-input" type="checkbox" id="animals" onChange={(e) => setAnimals(true)} />
                <label class="form-check-label" for="animals">Animals</label>
            </div>


            <div class="form-check">
                <input class="form-check-input" type="checkbox" id="kids" onChange={(e) => setKids(true)} />
                <label class="form-check-label" for="animals">Kids</label>
            </div>

            </div>

            <button type="submit" className="btn btn-primary">Add Resort</button>
            </form>
            </>
    )
  

      
}

export default ResortCreateOwnerScreen
