import expressAsyncHandler from 'express-async-handler'
import Resort from '../models/resortModel.js'

// @description   Fetch all resorts
// @route         GET /api/resorts
// @access        Public
const getResorts = expressAsyncHandler(async (req, res) => {
    const resorts = await Resort.find({})
    res.json(resorts)
})


// @description   Fetch a single resort
// @route         GET /api/resorts/:id
// @access        Public
const getResortById = expressAsyncHandler(async (req, res) => {
    const resort = await Resort.findById(req.params.id)
    
    if(resort){ 
        res.json(resort) 
    } else {
        res.status(404)
        throw new Error('Resort not found')
    }
})


// @description   Delete a resort
// @route         DELETE /api/resorts/:id
// @access        Private/Admin
const deleteResort = expressAsyncHandler(async (req, res) => {
    const resort = await Resort.findById(req.params.id)
    
    if(resort){ 
        await resort.remove()
        res.json({ message: 'Resort removed!' })
    } else {
        res.status(404)
        throw new Error('Resort not found')
    }
})


// @description   Create a resort
// @route         POST /api/resorts/:id
// @access        Private/Admin
const createResort = expressAsyncHandler(async (req, res) => {
    const resort = new Resort({
        name: 'Sample name',
        user: req.user._id,
        price_per_night: 2804,
        description: "this is a short description",
        address: "Cadiz Viejo",
        city: "Cadiz",
        province: "Negros Occidental",
        zip_code: "6121",
        latitude: 11.045411,
        longitude: 123.201465,
        phone: "(034) 213 6354",
        website: 'www.lakawonislandresort.com',
        amenities: 
            {
                tv: false,
                reservation: false,
                moderate_noise: true,
                free_wifi: true,
                trendy: true,
                credit_card: true,
                bar: true,
                animals: true,
                kids: true
            },
        image:
        "https://images.unsplash.com/photo-1591017403286-fd8493524e1e"
    })

    const createResort = await resort.save()
    res.status(201).json(createResort)
})

// @description   Update a resort
// @route         PUT /api/resorts/:id
// @access        Private/Admin
const updateResort = expressAsyncHandler(async (req, res) => {

    const { 
        name, 
        price_per_night, 
        description,
        address, 
        city, 
        province, 
        zip_code,
        latitude,
        longitude,
        phone,
        website,
        amenities,
        image
     } = req.body

    const resort = await Resort.findById(req.params.id)

    if(resort){
        resort.name = name,
        resort.price_per_night = price_per_night
        resort.description = description
        resort.address = address
        resort.city = city
        resort.province = province
        resort.zip_code = zip_code
        resort.latitude = latitude
        resort.longitude = longitude
        resort.phone = phone
        resort.website = website
        resort.amenities = amenities
        resort.image = image

        const updatedResort = await resort.save()
        res.json(updatedResort)
    } else{
        res.status(404)
        throw new Error('Resort not found!')
    }
})



export { getResorts, getResortById, deleteResort, createResort, updateResort} 