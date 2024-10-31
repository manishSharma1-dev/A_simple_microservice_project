class Apiresponse {
    constructor(
        status,
        message,
        data 
    ) {
        this.status = status,
        this.message = message,
        this.data = data ?? ""
    }
}

export { 
    Apiresponse
}