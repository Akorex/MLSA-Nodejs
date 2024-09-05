import mongoose from "mongoose";
import { configDotenv } from "dotenv"

configDotenv()

const port = process.env.PORT

const ConnectDB = async (uri) => {
    await mongoose.connect(uri)
    .then(() => console.log(`Connected to the database successfully. Server started in development mode. http://localhost:${port}`))
    .catch(() => console.log("Couldn't connect to database"))

}

export default ConnectDB