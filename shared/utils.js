// shared/utils.js

/**
 * Tạo một slug từ chuỗi tiếng Việt (Dùng để chuẩn hóa tên ngành, tên trường)
 * Ví dụ: "Công nghệ thông tin" -> "cong-nghe-thong-tin"
 */
export const slugify = (str) => {
    return str.toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/[đĐ]/g, 'd')
        .replace(/([^0-9a-z-\s])/g, '')
        .replace(/(\s+)/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-+|-+$/g, '');
};

/**
 * Kiểm tra xem một đối tượng có trống hay không
 */
export const isEmpty = (obj) => {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
};