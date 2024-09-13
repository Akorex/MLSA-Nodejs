import Jobs from '../models/jobs.js'
import { successResponse, errorResponse } from '../utils/responses.js'
import {StatusCodes} from 'http-status-codes'



export const createJob = async (req, res) => {

    const {company, position} = req.body

    if (!company || !position){
        return errorResponse(res, StatusCodes.UNPROCESSABLE_ENTITY, 'missing parameters for job creation')
    }

    const newJob = await Jobs.create({company, position})


    successResponse(res, StatusCodes.CREATED, 'successfully created new job', newJob)

}


export const getJob = async (req, res) => {
    const jobId = req.params.id

    const job = await Jobs.findOne({_id: jobId})

    if (!job){
        return errorResponse(res, StatusCodes.NOT_FOUND, 'That job doesnt exist')
    }

    successResponse(res, StatusCodes.OK, 'successfully found job', job)

}

export const getAllJobs = async (req, res) => {
    const jobs = await Jobs.find({})

    if (!jobs){
        return errorResponse(res, StatusCodes.NOT_FOUND, 'No job found')
    }

    successResponse(res, StatusCodes.OK, 'successfully found jobs', jobs)

}


export const deleteJob = async (req, res) => {
    
    const jobId = req.params.id

    const job = await Jobs.findOne({_id: jobId})

    if (!job){
        return errorResponse(res, StatusCodes.BAD_REQUEST, `job does not exist`)
    }

    await Jobs.deleteOne({_id: jobId})

    successResponse(res, StatusCodes.OK, `successfully deleted a job`, null)

}


export const updateJob = async (req, res) => {
    const jobId = req.params.id
    const {position} = req.body
    
    const updatedJob = await Jobs.findOneAndUpdate({_id: jobId}, {position: position}, {new: true, runValidators: true})

    if (!updatedJob){
        return errorResponse(res, StatusCodes.BAD_REQUEST, `job does not exist`)
    }

    successResponse(res, StatusCodes.OK, 'successfully updated job details', updatedJob)

}



// winston -> logging 
// try - catch
// API error 
// validators -> zod