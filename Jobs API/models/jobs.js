import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    company : {
        type: String,
        required: [true, 'company name cannot be blank'],
        maxlength: 20
    },

    position: {
        type: String,
        required: [true, 'position cannot be blank'],
        maxlength: 20
    },

    status: {
        type: String,
        enum: ['interview', 'pending', 'declined'],
        default: 'pending'
    }

}, {timestamps: true})

const Jobs = mongoose.model('jobs', jobSchema)

export default Jobs