class ApiError extends Error {
    constructor(
        statusCode,
        message = "Something went wrong",
        errors = [],
        statck = ""
    ){
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;
        this.stack = statck;
        this.success = false;
        // kyuki success code ko hum handle nhi n=kr rhe hum errors ko hi handle kr rhe h isliye false set kr rhe h success ko
        if(statck){
            this.stack = statck;
        }else{
            Error.captureStackTrace(this, this.constructor);
        }
    }
}