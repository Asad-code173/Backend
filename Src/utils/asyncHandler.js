const asyncHandler = (func)=>{
    return async (req,res,next)=>{
        try {
            await func(req,res,next)
        } catch (error) {
            res.status(error.statusCode || 500).json({
                status:"fail",
                message:error.message,
                errors:error.errors
            })
        }
    }}
 export { asyncHandler }