const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    dob:{
        type: String,
        required: true
    },
    department:{
        type: String,
        required: true
    },
    contactNo:{
        type: String,
        required: true
    }

})

module.exports = mongoose.model('Employee', employeeSchema)