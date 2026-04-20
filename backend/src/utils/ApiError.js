// backend/src/utils/ApiError.js
import { HTTP_STATUS } from '../../../shared/constants.js';

class ApiError extends Error {
    constructor(statusObj, customMessage = null, errors = [], stack = "") {
        const statusCode = statusObj?.code || 500;
        const finalMessage = customMessage || statusObj?.message || "Đã xảy ra lỗi hệ thống";

        super(finalMessage);
        this.statusCode = statusCode;
        this.data = null;
        this.message = finalMessage;
        this.success = false;
        this.errors = errors;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
    static STATUS = HTTP_STATUS;
}
export { ApiError };