import mongoose from "mongoose";
import { configDotenv } from "dotenv";


configDotenv()
export const port = process.env.PORT
const mongo_uri = process.env.MONGO_URI

const connectDB = async () => {
    return mongoose
    .connect(mongo_uri)
    .then(() => console.log(`Connected to the database successfully`))
    .catch((error) => "Couldn't connect to the database")

}

export default connectDB