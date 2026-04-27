'use strict';
import { Contract } from 'fabric-contract-api';

class CertContract extends Contract {

    // Khởi tạo sổ cái
    async InitLedger(ctx) {
        console.info('============= KHỞI TẠO HỆ THỐNG VĂN BẰNG =============');
    }

    // Chức năng: Cấp VBCC (Tương ứng bảng 3.8)
    async IssueCertificate(ctx, certUUID, certDataJSON) {
        // Kiểm tra xem văn bằng đã tồn tại chưa
        const exists = await this.CertificateExists(ctx, certUUID);
        if (exists) {
            throw new Error(`Văn bằng ${certUUID} đã tồn tại trên hệ thống!`);
        }

        const certData = JSON.parse(certDataJSON);

        // Cấu trúc dữ liệu chuẩn theo luận văn 
        const certificate = {
            docType: 'certificate',
            certUUID: certUUID,                        // Mã số VBCC 
            certHash: certData.certHash,               // Giá trị băm của VBCC 
            certNumber: certData.certNumber,           // Số hiệu VBCC 
            certRegNo: certData.certRegNo,             // Số vào sổ gốc 
            dateOfIssuing: certData.dateOfIssuing,     // Ngày cấp 
            universitySignature: certData.universitySignature, // Chữ ký số của Trường 
            studentSignature: certData.studentSignature,       // Chữ ký số của sinh viên 
            universityPK: certData.universityPK,       // Khóa công khai của Trường 
            studentPK: certData.studentPK              // Khóa công khai của sinh viên 
        };

        // Lưu vào sổ cái Blockchain
        await ctx.stub.putState(certUUID, Buffer.from(JSON.stringify(certificate)));
        return JSON.stringify({ success: true, message: 'Đã cấp bằng thành công lên Blockchain' });
    }

    // Chức năng: Truy vấn/Xác thực văn bằng
    async QueryCertificate(ctx, certUUID) {
        const certAsBytes = await ctx.stub.getState(certUUID);
        if (!certAsBytes || certAsBytes.length === 0) {
            throw new Error(`Văn bằng ${certUUID} không tồn tại!`);
        }
        return certAsBytes.toString();
    }

    // Hàm phụ trợ kiểm tra tồn tại
    async CertificateExists(ctx, certUUID) {
        const certAsBytes = await ctx.stub.getState(certUUID);
        return certAsBytes && certAsBytes.length > 0;
    }
}

module.exports.CertContract = CertContract;
module.exports.contracts = [CertContract];