import express from 'express'
import connectDB from './config/db.js'
import { port } from './config/db.js'
import jobRouter from './routes/jobs.js'
import errorHandler from './middlewares/errorHandler/index.js'
import authRouter from './routes/auth.js'

const app = express()
app.use(express.json())
app.use(errorHandler) // use your middleware with the .use method

app.use('/jobs', jobRouter)
app.use('/auth', authRouter)

//DOMAIN/auth/register


app.listen(port, async () => {
    await connectDB()
    console.log(`Server started. Listening on http://localhost:${port}`)
})