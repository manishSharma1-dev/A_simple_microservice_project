class ApiError extends Error {
    constructor(
        status,
        message,
        error,
        data 
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