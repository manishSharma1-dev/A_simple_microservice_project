class ApiError extends Error {
    constructor(
        status,
        message,
        data ,
        error
    ){ 
        this.status = status
        this.message = message
        this.data = data ? data : "No data Passed here"
        this.error = error ? error : "No Error Passed here"
    }
}

export  {
    ApiError
}