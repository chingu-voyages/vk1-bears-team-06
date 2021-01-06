import expressAsyncHandler from 'express-async-handler'
import generateToken from '../utility/generateToken.js'
import sgMail from '@sendgrid/mail'
import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'

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

    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    const token = jwt.sign({ name, email, phone, role, password }, process.env.JWT_ACCOUNT_ACTIVATION, {
        expiresIn: '20m'
    })

    const emailData = {
        to: email,
        from: process.env.EMAIL_FROM,
        subject: `Iko account activation link`,
        templateId: 'd-6fa57032754d4a76b500f93b3de342ee',
        dynamic_template_data: {
            name: name,
            confirm_account_url:  `${process.env.CLIENT_URL}/auth/activate/${token}`,
         }
    }
    const emailSent = await sgMail.send(emailData)

    if(emailSent){
        res.status(201).json({
              message: `Email has been sent to ${email}. Follow the instruction to activate your account!`
        })
    }
 })
 


// @description   Account activation 
// @route         POST /api/users/accout-activation
// @access        Public
const accountActivation = expressAsyncHandler(async (req, res) => {
    const { token } = req.body

    if(token){
       jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, (err, decode) => {
           if(err){
               console.log('JWT VERIFY IN ACCOUNT ACTIVATION ERROR')
               return res.status(401).json({
                   error: 'Expired link. Signup again'
               })
           }

           const { name, email, phone, role, password } = jwt.decode(token)

          const user = new User({ name, email, phone, role, password })

          user.save((err, user) => {
              if(err){
                  console.log('SAVE USER IN ACCOUNT ACTIVATION ERROR', err)
                  return res.status(401).json({
                    error: 'Error saving user in database! Try signing up again!'
                })
            }

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
                    throw new Error('Something went wrong. Try again')
                }

          })

       })
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

// @description   Get user by ID
// @route         GET /api/users/:id
// @access        Private/Admin
const getUserById = expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password')
    if(user){
        res.json(user)
    } else {
        res.status(404)
        throw new Error('User not found!')
    }
  })



// @description   Update user 
// @route         PUT /api/users/:id
// @access        Private/Admin
const updateUser = expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if(user){
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.phone = req.body.phone || user.phone
        user.role = req.body.role 
       
        const updatedUser = await user.save()
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            phone: updatedUser.phone,
            role: updatedUser.role,
          })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
  })





export { authUser, getUserProfile, updateUserProfile, registerUser, getUsers, deleteUser, getUserById, updateUser, accountActivation }