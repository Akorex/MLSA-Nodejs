import express from 'express'
import connectDB from './config/db.js'
import { port } from './config/db.js'
import jobRouter from './routes/jobs.js'

const app = express()
app.use(express.json())

app.use('/jobs', jobRouter)


app.listen(port, async () => {
    await connectDB()
    console.log(`Server started. Listening on http://localhost:${port}`)
})