import expressAsyncHandler from 'express-async-handler'
import Resort from '../models/resortModel.js'

// @description   Fetch all resorts
// @route         GET /api/resorts
// @access        Public
const getResorts = expressAsyncHandler(async (req, res) => {
    const pageSize = 1
    const page = Number(req.query.pageNumber) || 1

    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}

    const count = await Resort.countDocuments({ ...keyword } )

    const resorts = await Resort.find({ ...keyword }).limit(pageSize).skip(pageSize * (page - 1))
    res.json({ resorts, page, pages: Math.ceil(count / pageSize) })
})

// @description   Fetch all resorts created by the resort owner
// @route         GET /api/resorts
// @access        Public
const getOwnerResorts = expressAsyncHandler(async (req, res) => {
    const pageSize = 10
    const page = Number(req.query.pageNumber) || 1

    const count = await Resort.countDocuments({ user: req.user._id })

    const resorts = await Resort.find({ user: req.user._id }).limit(pageSize).skip(pageSize * (page - 1))
    res.json({ resorts, page, pages: Math.ceil(count / pageSize) })
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

    const { 
        name, 
        price_per_night, 
        description, 
        address, 
        city, 
        province, 
        zip_code, 
        phone, 
        website, 
        amenities, 
        image
      } = req.body
    
      const resortExists = await Resort.findOne({ name })
    
      if(resortExists){
          res.status(400)
          throw new Error('Resort already exist!')
      }
  
    const resort = await Resort.create({
        user: req.user._id,
        name, 
        price_per_night, 
        description, 
        address, 
        city, 
        province, 
        zip_code, 
        phone, 
        website, 
        amenities, 
        image
    })

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


// @description   Create new review
// @route         POST /api/resorts/:id/reviews
// @access        Private
const createResortReview = expressAsyncHandler(async (req, res) => {

    const { rating, comment } = req.body

    const resort = await Resort.findById(req.params.id)

    if(resort){
       const alreadyReviewed = resort.reviews.find(r => r.user.toString() === req.user._id.toString())

       if(alreadyReviewed){
           res.status(400)
           throw new Error('Resort already reviewed!')
       }
       
       const review = {
           name: req.user.name,
           rating: Number(rating),
           comment,
           user: req.user._id   
       }

       resort.reviews.push(review)
       resort.totalReviews = resort.reviews.length

       resort.rating = resort.reviews.reduce((acc, item) => item.rating + acc, 0) / resort.reviews.length

       await resort.save()

       res.status(201).json({ message: 'Review added!'})
    } else{
        res.status(404)
        throw new Error('Resort not found!')
    }
})
 


// @description   Get top rated resorts
// @route         GET /api/resorts/top
// @access        Public
const getTopResorts = expressAsyncHandler(async (req, res) => {
   const resorts = await Resort.find({}).sort({ rating: -1 }).limit(9)
   res.json(resorts)
})
 

export { getResorts, getResortById, deleteResort, createResort, updateResort, createResortReview, getTopResorts, getOwnerResorts } 