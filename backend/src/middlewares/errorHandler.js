// backend/src/middlewares/errorHandler.js
import { ApiError } from '../utils/ApiError.js';
import { HTTP_STATUS } from '../../../shared/constants.js';

/**
 * Middleware xử lý lỗi tập trung (Global Error Handler)
 * Phải có đủ 4 tham số (err, req, res, next) để Express nhận diện là Error Middleware
 */
const errorHandler = (err, req, res, next) => {
    let error = err;

    // 1. Nếu lỗi không phải là instance của ApiError (ví dụ lỗi do thư viện bên ngoài hoặc lỗi code)
    if (!(error instanceof ApiError)) {
        // Lấy statusCode từ lỗi gốc hoặc mặc định là 500
        const statusCode = error.statusCode || 500;
        
        // Tìm thông báo mặc định từ hệ thống dựa trên statusCode
        const defaultEntry = Object.values(HTTP_STATUS).find(s => s.code === statusCode);
        const message = error.message || defaultEntry?.message || "Lỗi hệ thống nội bộ";

        // Ép về chuẩn ApiError của chúng ta
        error = new ApiError(
            { code: statusCode, message: message },
            null, // Không dùng custom message để giữ message gốc của lỗi
            error?.errors || [],
            err.stack
        );
    }

    // 2. Cấu trúc phản hồi cuối cùng trả về cho Frontend
    const response = {
        success: false,
        statusCode: error.statusCode,
        message: error.message,
        data: null,
        errors: error.errors,
        // Chỉ hiển thị stack trace (dòng code lỗi chi tiết) khi đang ở môi trường phát triển (Development)
        // Khi chạy thực tế (Production), tuyệt đối ẩn đi để bảo mật hệ thống
        ...(process.env.NODE_ENV === 'development' ? { stack: error.stack } : {})
    };

    // 3. Log lỗi ra Console để lập trình viên dễ theo dõi khi đang code
    if (process.env.NODE_ENV === 'development') {
        console.error(`[ERROR] ${error.statusCode} - ${error.message}`);
        if (error.errors.length > 0) console.error('Details:', error.errors);
    }

    // 4. Trả về response cho Client
    return res.status(error.statusCode).json(response);
};

export { errorHandler };