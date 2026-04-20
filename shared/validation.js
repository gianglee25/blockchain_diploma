// shared/validation.js

export const VALIDATION_RULES = {
    // Mã sinh viên: ví dụ 10 ký tự số
    STUDENT_ID: /^[0-9]{8,12}$/,
    
    // Số hiệu văn bằng: ví dụ số hiệu của trường TLU
    DIPLOMA_NO: /^TLU-[0-9]{6}$/,
    
    // Định dạng Email
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
};

export const validateField = (value, regex) => {
    return regex.test(value);
};