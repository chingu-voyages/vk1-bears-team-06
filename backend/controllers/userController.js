import expressAsyncHandler from 'express-async-handler'
import generateToken from '../utlity/generateToken.js'
import User from '../models/userModel.js'

// @description   Auth user & get token
// @route         POST /api/users/login
// @access        Public
const authUser = expressAsyncHandler(async (req, res) => {
   const { email, password } = req.body
   const user = await User.findOne({ email })
   if(user && (await user.matchPassword(password))){
       res.json({
           _id: user._id,
           name: user.name,
           email: user.email,
           role: user.role,
           token: generateToken(user._id)
       }) 
   } else {
       res.status(401)
       throw new Error('Invalid email or password')
   }
})


// @description   Register a new user
// @route         POST /api/users
// @access        Public
const registerUser = expressAsyncHandler(async (req, res) => {
    const { name, email, phone, role, password } = req.body
    const userExists = await User.findOne({ email })
    
    if(userExists){
        res.status(400)
        throw new Error('User already exist!')
    }

    const user = await User.create({ 
        name,
        email,
        phone,
        role,
        password
    })

    if(user){
       res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id)
       })
    } else {
       res.status(400)
       throw new Error('Invalid user data')
    }
 })

// @description   Get user profile
// @route         POST /api/users/profle
// @access        Private
const getUserProfile = expressAsyncHandler(async (req, res) => {
   const user = await User.findById(req.user._id)
   if(user){
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      })
   } else {
       res.status(404)
       throw new Error('User not found')
   }
 })



export { authUser, getUserProfile, registerUser }