import { Router } from "express";
import { createJob, deleteJob, getAllJobs, getJob, updateJob } from "../controllers/jobs.js";


const jobRouter = Router()
jobRouter.post('/', createJob)
jobRouter.get('/', getAllJobs)
jobRouter.get('/:id', getJob)
jobRouter.patch('/:id', updateJob)
jobRouter.delete('/:id', deleteJob)





export default jobRouter