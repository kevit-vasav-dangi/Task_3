function getErrorfromCode(statuscode){
    switch (statuscode) {
        case 500: {
            return 'DATABASE_ERROR'
        }
        case 400: {
            return 'BAD_REQUEST'
        }
        case 401: {
            return 'UNAUTHORIZED'
        }
        case 424: {
            return 'FAILED_DEPENDENCY'
        }
        case 404: {
            return 'NOT_FOUND'
        }
        default:
            return 'UNHANDLED_ERROR'
    }
}

//export default 
class HttpException extends Error {
    constructor (statuscode, message, errorcode, err, meta) {
        super(message);
        this.statuscode=statuscode
        this.error = getErrorfromCode(statuscode)
        this.errorcode=errorcode
        this.message=message
        this.originalerror=err;
        this.meta = meta
    }
}
module.exports = HttpException