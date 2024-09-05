import express from "express"
import ConnectDB from "./config.js"
import { configDotenv } from "dotenv"


configDotenv()

const mongo_uri = process.env.MONGO_URI
const app = express()
const port = process.env.PORT

app.get('/', (req, res) => {
    res.send("I am happily teaching Nodejs with MLSA")
})

app.listen(port, await ConnectDB(mongo_uri))
