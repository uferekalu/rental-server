const mongoose = require('mongoose')


const RentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users',
    },
    accomodationStatus: {
        type: String,
        required: true
    },
    rentRequestAmount: {
        type: Number,
        required: true
    },
    monthlySalary: {
        type: Number,
        required: true
    },
    monthlyPaymentPlan: {
        type: Number,
        required: true,
        default: 1
    }
}, {timestamps: true})
module.exports = mongoose.model('Rent', RentSchema)