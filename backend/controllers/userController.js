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
        phone: user.phone,
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


// @description   Update user profile
// @route         PUT /api/users/profle
// @access        Private
const updateUserProfile = expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if(user){
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.phone = req.body.phone || user.phone
        if(req.body.password){
            user.password = req.body.password
        }

        const updatedUser = await user.save()
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            phone: updatedUser.phone,
            role: updatedUser.role,
            token: generateToken(updatedUser._id)
          })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
  })


// @description   Get all users
// @route         PUT /api/users
// @access        Private/Admin
const getUsers = expressAsyncHandler(async (req, res) => {
    const users = await User.find({})
    res.json(users)
  })


// @description   Delete user
// @route         DELETE /api/users/:id
// @access        Private/Admin
const deleteUser = expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if(user){
       await user.remove()
       res.json({ message: 'User deleted!' })
    } else {
        res.status(404)
        throw new Error('User not found!')
    }
  })


export { authUser, getUserProfile, updateUserProfile, registerUser, getUsers, deleteUser }