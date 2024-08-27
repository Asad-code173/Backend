// Api kay errors ka standard format
class ApiError extends Error{
    constructor(statusCode , message = "something went wrong" , errors = []){
        super(message)
        this.statusCode = statusCode,
        this.message = message,
        this.errors = errors,
        this.success = false
        
    }
}
export {ApiError}