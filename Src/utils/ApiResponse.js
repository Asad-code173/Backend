class ApiResponse {
    // jab bhee kisi ko response bhejengay to isi class ke through bhejengay
    constructor(statusCode,data,message = "Success"){
        this.statusCode = statusCode;
        this.data = data;
        this.message = message
        this.success = statusCode<400

    } 
}
export {ApiResponse}