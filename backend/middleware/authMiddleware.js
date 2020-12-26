import jwt from 'jsonwebtoken'
import expressAsyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

const protect = expressAsyncHandler (async (req, res, next) => {
  let token
  if(
      req.headers.authorization && 
      req.headers.authorization.startsWith('Bearer'))
  {
      try{
        token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findById(decoded.id).select('-password')
        next()
      }catch(error){
          console.error(error)
          res.status(401)
          throw new Error('Not authorized, token failed')
      }
  }

  if(!token){
      res.status(401)
      throw new Error('Not authorized, no token')
  }
})

const admin = (req, res, next) => {
  if(req.user && req.user.role === 'administrator'){
     next()
  } else {
    res.status(401)
    throw new Error('Not authorized as an administrator!')
  }
}

const resortOwner = (req, res, next) => {
  if(req.user && req.user.role === 'resortOwner'){
     next()
  } else {
    res.status(401)
    throw new Error('Not authorized as a Resort Owner!')
  }
}


export { protect, admin, resortOwner }