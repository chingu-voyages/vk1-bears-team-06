import mongoose from 'mongoose'

const reviewSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
}, {
    timestamps: true
})

const resortSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    price_per_night: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    province: {
        type: String,
        required: true
    },
    zip_code: {
        type: Number,
        required: true
    },
    latitude: {
        type: Number
    },
    longitude: {
        type: Number
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    website: {
        type: String
    },
    reviews: [reviewSchema], 
    totalReviews: {
        type: Number,
        required: true,
        default: 0
    },
    rating: {
        type: Number,
        required: true,
        default: 0
    },
    image: {
        type: String
    },
    amenities: {
        tv: { type: Boolean, required: true, default: false },
        reservation: { type: Boolean, required: true, default: false },
        moderate_noise: { type: Boolean, required: true, default: false },
        free_wifi: { type: Boolean, required: true, default: false },
        trendy: { type: Boolean, required: true, default: false },
        credit_card: { type: Boolean, required: true, default: false },
        bar: { type: Boolean, required: true, default: false },
        animals: { type: Boolean, required: true, default: false },
        kids: { type: Boolean, required: true, default: false },
    },
}, { timestamps: true
})

const Resort = mongoose.model('Resort', resortSchema)

export default Resort




