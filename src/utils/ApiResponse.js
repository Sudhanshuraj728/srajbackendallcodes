class ApiResponse {
    constructor(statusCode, message = "Success", data = {}) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.success = statusCode <400 ; // agar status code 400 se chota hai to success true hoga niche help krne ke liye likh diya h 
    }
        // information status codes (100-199)
        // successful status codes (200-299)
        // redirection status codes (300-399)   
        // client error status codes (400-499)
        // server error status codes (500-599)

}