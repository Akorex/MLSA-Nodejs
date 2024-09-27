import ApiError from "./api-error.js"
import { errorResponse } from "../../utils/responses.js"

const errorHandler = (error, req, res, next) => {
    let message = "Request failed. Try again later"
    let errCode = 500


    if (error instanceof ApiError){
        message = error.message
        errCode = error.code
    }else if (error instanceof Error){
        message = 'probably a mongoose error'
        errCode = 422
    }


    errorResponse(res, errCode, message)


}


// benefits of errorHandler
// format error from where your code is depending on
// dont repeat error cases
//



export default errorHandler