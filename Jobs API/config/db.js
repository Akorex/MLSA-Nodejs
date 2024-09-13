import mongoose from "mongoose";
import { configDotenv } from "dotenv";


configDotenv()
const mongo_uri = process.env.MONGO_URI
export const port = process.env.PORT

const connectDB = async () => {
    return mongoose
    .connect(mongo_uri)
    .then(() => console.log("Connected to the database successfully"))
    .catch((error) =>console.log(`Unable to connect to the database ${error}`))

}

export default connectDB