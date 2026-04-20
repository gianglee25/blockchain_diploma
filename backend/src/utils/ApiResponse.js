// backend/src/utils/ApiResponse.js
import { HTTP_STATUS } from '../../../shared/constants.js';

class ApiResponse {
    constructor(statusCode, data = null, message = null) {
        this.statusCode = statusCode;
        this.data = data;
        const defaultMsg = Object.values(HTTP_STATUS).find(s => s.code === statusCode)?.message;
        this.message = message || defaultMsg || "Success";
        this.success = statusCode < 400;
    }

    static success(data, message) {
        return new ApiResponse(HTTP_STATUS.OK.code, data, message);
    }

    static created(data, message) {
        return new ApiResponse(HTTP_STATUS.CREATED.code, data, message);
    }
}

export { ApiResponse };