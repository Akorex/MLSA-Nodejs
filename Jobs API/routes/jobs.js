import { Router } from "express";
import { createJob, deleteJob, getAllJobs, getJob, updateJob } from "../controllers/jobs.js";


const jobRouter = Router()
jobRouter.post('/', createJob)
jobRouter.get('/', getAllJobs)
jobRouter.get('/:id', getJob)
jobRouter.patch('/:id', updateJob)
jobRouter.delete('/:id', deleteJob)


// if you want to chain these, you could do
// jobRouter.route('/').post(createJob).get(getAllJobs)
// jobRouter.route('/:id).get(getJob).patch(updateJob).delete(deleteJob)




export default jobRouter