export const HTTP_STATUS = Object.freeze({
    OK: { code: 200, message: "Thao tác thành công" },
    CREATED: { code: 201, message: "Khởi tạo thành công" },
    BAD_REQUEST: { code: 400, message: "Yêu cầu không hợp lệ" },
    UNAUTHORIZED: { code: 401, message: "Bạn chưa đăng nhập" },
    FORBIDDEN: { code: 403, message: "Bạn không có quyền truy cập" },
    NOT_FOUND: { code: 404, message: "Không tìm thấy dữ liệu" },
    UNPROCESSABLE: { code: 422, message: "Dữ liệu không hợp lệ" },
    INTERNAL_SERVER: { code: 500, message: "Lỗi hệ thống nội bộ" }
});

// Các hằng số nghiệp vụ (Business Constants)
export const DIPLOMA_STATUS = Object.freeze({
    PENDING: 'PENDING',       // Mới import từ Excel, chưa làm gì
    VALIDATED: 'VALIDATED',   // Đã kiểm tra dữ liệu sạch
    ON_CHAIN: 'ON_CHAIN',     // Đã đẩy lên Blockchain thành công
    REVOKED: 'REVOKED'        // Bằng bị thu hồi/hủy bỏ
});

// Xếp loại học lực (Dùng để đồng bộ hóa dropdown ở FE và validation ở BE)
export const ACADEMIC_RANK = Object.freeze({
    EXCELLENT: 'Xuất sắc',
    VERY_GOOD: 'Giỏi',
    GOOD: 'Khá',
    AVERAGE: 'Trung bình'
});

// Loại văn bằng
export const DIPLOMA_TYPES = Object.freeze({
    ENGINEER: 'Kỹ sư',
    BACHELOR: 'Cử nhân',
    MASTER: 'Thạc sĩ'
});