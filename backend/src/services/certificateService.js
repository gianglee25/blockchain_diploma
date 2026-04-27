import xlsx from 'xlsx';
import { v4 as uuidv4 } from 'uuid';
import Certificate from '../models/Certificate.js';
import { DIPLOMA_STATUS } from '../utils/constants.js';

// Hàm phụ để xử lý ngày tháng (Helper function)
const formatExcelDate = (dateInput) => {
    if (!dateInput) return "";
    if (!isNaN(dateInput)) {
        const date = xlsx.SSF.parse_date_code(dateInput);
        return `${date.d}/${date.m}/${date.y}`;
    }
    return dateInput;
};

// Hàm phụ lấy Họ tên (Helper function)
const getFullName = (row) => {
    const full = row['Họ và tên người học'] || row['Họ và tên'] || row['Họ vả tên'];
    if (full) return full;
    const hoDem = row['Họ Đệm'] || row['Họ đệm'] || "";
    const ten = row['Tên'] || "";
    return `${hoDem} ${ten}`.trim() || "N/A";
};

export const processExcelImport = async (fileBuffer) => {
    // 1. Đọc dữ liệu thô
    const workbook = xlsx.read(fileBuffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    if (sheetData.length === 0) {
        throw new Error('File Excel không có dữ liệu');
    }

    // 2. Chuyển đổi dữ liệu chuẩn
    const certificatesToInsert = sheetData.map((row) => ({
        uuid: uuidv4(),
        mssv: String(row['Mã sinh viên'] || row['Mã SV'] || row['MSSV'] || "N/A"),
        fullName: getFullName(row),
        dob: formatExcelDate(row['Ngày sinh'] || row['Ngày tháng năm sinh '] || row['Ngày tháng năm sinh']),
        gender: row['Giới tính'] || row['Giới tính '] || "",
        major: row['Ngành đào tạo'] || row['Ngành \ntốt nghiệp'] || row['Ngành tốt nghiệp'] || "",
        grade: row['Xếp loại tốt nghiệp'] || row['Xếp loại TN'] || row['Xếp loại \ntốt nghiệp'] || "",
        certNo: String(row['Số hiệu văn bằng'] || row['Số hiệu'] || ""),
        regNo: String(row['Số vào sổ gấp cấp bằng'] || row['Số vào sổ'] || ""),
        status: DIPLOMA_STATUS.PENDING
    }));

    // 3. Tương tác với Database
    return await Certificate.insertMany(certificatesToInsert);
};