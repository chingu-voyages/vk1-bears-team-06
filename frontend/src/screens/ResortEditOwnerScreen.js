import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import  Message from '../components/Message'
import  Loader from '../components/Loader'
import { listResortDetails, updateResort } from '../actions/resortActions'
import { RESORT_UPDATE_RESET } from '../constants/resortConstants'

const ResortEditOwnerScreen = ({ match, history }) => {

    const resortId = match.params.id

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
        } else {

            if(!resort.name || resort._id !== resortId){
                dispatch(listResortDetails(resortId))
             } else {
                setName(resort.name)
                setPricePerNight(resort.price_per_night)
                setDescription(resort.description)
                setAddress(resort.address)
                setCity(resort.city)
                setProvince(resort.province)
                setZipCode(resort.zip_code)
                setPhone(resort.phone)
                setWebsite(resort.website)
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



    const submitHandler = (e) => {
        e.preventDefault()
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
            <h1>Edit Resort</h1>
    { loadingUpdate && <Loader /> }    
    { errorUpdate && <Message variant='danger'>{errorUpdate}</Message> }   
    { loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
            <form onSubmit={submitHandler}> 
            <div className="form-group"> 
                <label for="name">Name</label>
                <input type="text" name="name" value={name} className="form-control" id="name" onChange={(e) => setName(e.target.value)}  />
            </div>
 
            <div className="form-group"> 
                <label for="name">Price Per Night</label>
                <input type="number" name="price_per_night" value={pricePerNight} className="form-control" id="price_per_night" onChange={(e) => setPricePerNight(e.target.value)}  />
            </div>

            <div className="form-group"> 
                <label for="description">Description</label>
                 <textarea class="form-control" id="description" value={description} rows="5" onChange={(e) => setDescription(e.target.value)}></textarea>
            </div>

            <div className="form-group"> 
                <label for="province">Address</label>
                <input type="text" name="address" value={address} className="form-control" id="address" onChange={(e) => setAddress(e.target.value)}  />
            </div>

            <div className="form-group"> 
                <label for="province">Province</label>
                <input type="text" name="province" value={province} className="form-control" id="province" onChange={(e) => setProvince(e.target.value)}  />
            </div>

            <div className="form-group"> 
                <label for="zip_code">Zip Code</label>
                <input type="number" name="zip_code" value={zipCode} className="form-control" id="zip_code" onChange={(e) => setZipCode(e.target.value)}  />
            </div>


            <div className="form-group"> 
                <label for="city">City</label>
                <input type="text" name="city" value={city} className="form-control" id="city" onChange={(e) => setCity(e.target.value)}  />
            </div>

            <div className="form-group"> 
                <label for="city">Phone</label>
                <input type="number" name="phone" value={phone} className="form-control" id="phone" onChange={(e) => setPhone(e.target.value)}  />
            </div>

            <div className="form-group"> 
                <label for="city">Email</label>
                <input type="email" name="email" value={email} className="form-control" id="email" onChange={(e) => setEmail(e.target.value)}  />
            </div>



            <div className="form-group"> 
                <label for="website">Website</label>
                <input type="text" value={website} className="form-control" id="website" onChange={(e) => setWebsite(e.target.value)}  />
            </div>

            <div className="form-group"> 
                <label for="image">Image</label>
                <input type="text" value={image} className="form-control" id="image" onChange={(e) => setImage(e.target.value)}  />
            </div>


            <div className="form-group"> 
               <label for="uploadImage">Upload Image</label>
                <input type="file" class="form-control-file" id="uploadImage" onChange={uploadFileHandler} />
            </div>

            { uploading && <Loader /> }

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
