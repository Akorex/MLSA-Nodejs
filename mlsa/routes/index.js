import authRouter from "./auth";
import vehicleRouter from "./vehicles";
import { Router } from "express";

const router = Router()

router.use('/auth', authRouter)
router.use('/vehicles', vehicleRouter)


export default router