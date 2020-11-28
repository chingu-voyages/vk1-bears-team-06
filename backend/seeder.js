import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import resorts from './data/resorts.js'
import User from './models/userModel.js'
import Resort from './models/resortModel.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async () => {
    try{
       await User.deleteMany()
       await Resort.deleteMany()

       const createdUsers = await User.insertMany(users)
       const resortOwner = createdUsers[1]._id
       const sampleResorts = resorts.map(resort => {
           return { ...resort, user: resortOwner }
       })

       await Resort.insertMany(sampleResorts)
       console.log('Data imported'.green.inverse)
       process.exit()
    } catch(error){
      console.error(`${error}`.red.inverse)
      process.exit(1)
    }
}


const destroyData = async () => {
    try{
       await User.deleteMany()
       await Resort.deleteMany()

       console.log('Data destroyed'.red.inverse)
       process.exit()
    } catch(error){
      console.error(`${error}`.red.inverse)
      process.exit(1)
    }
}


if(process.argv[2] === '-destroy'){
    destroyData()
} else {
   importData()
}