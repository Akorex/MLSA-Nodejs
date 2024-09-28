import ApiError from "./api-error.js"
import { errorResponse } from "../../utils/responses.js"
import jsonwebtoken from 'jsonwebtoken';
import { StatusCodes } from "http-status-codes";
import logger from "../../utils/logger.js";

const { JsonWebTokenError } = jsonwebtoken;


const errorHandler = (error, req, res, next) => {
    let message = "Request failed. Try again later"
    let errCode = StatusCodes.INTERNAL_SERVER_ERROR // 500


    if (error instanceof ApiError){
        message = error.message
        errCode = error.code
    }else if (error instanceof JsonWebTokenError){
        message = error.message
        errCode = StatusCodes.FORBIDDEN //403
    }else if (
        error instanceof SyntaxError ||
        error instanceof EvalError ||
        error instanceof RangeError ||
        error instanceof ReferenceError ||
        error instanceof TypeError ||
        error instanceof URIError
    ){
        message = error.message
        errCode = StatusCodes.BAD_REQUEST //400
    }else if (error instanceof Error){
        if (error.name === 'ValidationError'){
            message = Object.values(error.errors).map(err => err.message).join(' ')
            errCode = StatusCodes.UNPROCESSABLE_ENTITY
        }if (error.name === 'MongoServerError'){
            if (error.errorResponse.code === 11000){
                message = "Resource already exists"
                errCode = StatusCodes.CONFLICT
            }
        }
        
        else{
            message = error.message
            errCode = StatusCodes.BAD_GATEWAY //502
        }
    }

    // log the error and return the response

    logger.error(`[${req.method} ${req.url}] ${typeof message === 'string' ? message : JSON.stringify(message)}`);
    errorResponse(res, errCode, message)


}


// benefits of errorHandler
// format error from where your code is depending on
// dont repeat error cases



export default errorHandler