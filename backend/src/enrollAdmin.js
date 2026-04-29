'use strict';

import FabricCAServices from 'fabric-ca-client'; // dung goi toi api CA service  
import { Wallets } from 'fabric-network';// vi dien tu wallets de luu tru chung chi va khoa rieng cua cac nguoi dung khi enroll hoac register
import fs from 'fs';
import path from 'path'; // thao tac tep tin va duong dan 

async function main() {
    try {
        // 1. Đọc cấu hình mạng ( doc cac cau hinh ket noi den mang blockchain tu tep json)
const ccpPath = path.resolve(process.cwd(), 'src', 'config', 'connection-org1.json');        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // 2. Trỏ tới CA của Org1 (tao doi tuong ca de giao tiep voi CA service )
        const caInfo = ccp.certificateAuthorities['ca.org1.example.com'];
        const caTLSCACerts = caInfo.tlsCACerts.pem;
        const ca = new FabricCAServices(caInfo.url, { trustedRoots: caTLSCACerts, verify: false }, caInfo.caName);

        // 3. Khởi tạo Ví điện tử (Wallet) (luu tru van bang chung chi va khoa rieng cua nguoi dung)
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Đang sử dụng wallet tại: ${walletPath}`);

        // 4. Kiểm tra Admin đã tồn tại chưa neu co roi thi khong can enroll nua
        const identity = await wallet.get('admin');
        if (identity) {
            console.log('Danh tính "admin" đã tồn tại trong wallet.');
            return;
        }

        // 5. Yêu cầu cấp chứng chỉ (Enroll) tra ve phieu tu CA service de lay chung chi va khoa rieng cua admins
        const enrollment = await ca.enroll({ enrollmentID: 'admin', enrollmentSecret: 'adminpw' });
        const x509Identity = {
            credentials: {
                certificate: enrollment.certificate,
                privateKey: enrollment.key.toBytes(),
            },
            mspId: 'Org1MSP',
            type: 'X.509',
        };

        // 6. Lưu vào Wallet
        await wallet.put('admin', x509Identity);
        console.log('THÀNH CÔNG: Đã lấy chứng chỉ "admin" và lưu vào wallet!');

    } catch (error) {
        console.error(`THẤT BẠI: Lỗi khi enroll admin: ${error}`);
        process.exit(1);
    }
}

main();

// Cách chạy: node enrollAdmin.js

// Kết quả: Nếu thành công, bạn sẽ thấy thông báo "THÀNH CÔNG: Đã lấy chứng chỉ "admin" và lưu vào wallet!" và trong thư mục wallet sẽ có file chứa chứng chỉ và khóa riêng của admin. Nếu thất bại, bạn sẽ nhận được lỗi chi tiết.
// Lưu ý: Đảm bảo rằng CA server đang chạy và cấu hình kết nối trong connection-org1.json là chính xác trước khi chạy script này.