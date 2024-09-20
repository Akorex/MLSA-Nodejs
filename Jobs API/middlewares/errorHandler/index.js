import ApiError from "./api-error.js"
import { errorResponse } from "../../utils/responses.js"

const errorHandler = (error, req, res, next) => {
    if (error instanceof ApiError){
        message = error.message
        code = error.code
    }


    //log the error

    errorResponse(res, code, message)





}




export default errorHandler