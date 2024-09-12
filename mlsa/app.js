import express from 'express'
import { port } from './config/db.js'
import connectDB from './config/db.js'
import { successResponse } from './util/response.js'

import router from './routes/index.js'

const app = express()


app.use(express.json())
app.use('/api', router)




app.get('/', (req, res) => {
    successResponse(res, 200, 'Things are going well', null)
})


app.listen(port, async () => {
    await connectDB()
    console.log(`Server started. Listening at http://localhost:${port}`)
})