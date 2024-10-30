class ApiError extends Error {
    constructor(
        status,
        message,
        data ,
        error
    ){ 
        super()
        this.status = status
        this.message = message
        this.data = data ?? data 
        this.error = error ?? error 
    }
}

export  {
    ApiError
}