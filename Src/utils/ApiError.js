// Api kay errors ka standard format
class ApiError extends Error{
    constructor(
        statuscode,
        message="Something went Wrong",
        errors = [],
        stack = ""

    ){
        super(message)
        this.statuscode = statuscode
        this.data = null
        this.message = message
        this.success = false;
        this.errors = errors

        //------->Api ka error trace karega kay kon se files me hy-------------->
        if (stack) {
            this.stack = stack
        }else{
            Error.captureStackTrace(this,this.constructor)
        }
    }
}
export {ApiError}