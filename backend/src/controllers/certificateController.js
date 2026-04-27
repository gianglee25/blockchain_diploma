import { processExcelImport } from '../services/certificateService.js';
import { HTTP_STATUS } from '../utils/constants.js';

export const importCertificates = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(HTTP_STATUS.BAD_REQUEST.code).json({ 
                message: 'Vui lòng tải lên file Excel hoặc CSV' 
            });
        }

        // Controller không cần biết logic đọc Excel thế nào, chỉ việc gọi Service
        const result = await processExcelImport(req.file.buffer);

        return res.status(HTTP_STATUS.CREATED.code).json({
            message: `Đã import thành công ${result.length} văn bằng!`,
            data: result
        });
    } catch (error) {
        console.error('Controller Error:', error);
        return res.status(HTTP_STATUS.INTERNAL_SERVER.code).json({ 
            message: error.message || 'Lỗi server khi xử lý file' 
        });
    }
};