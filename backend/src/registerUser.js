'use strict';
import FabricCAServices from 'fabric-ca-client';
import fs from 'fs';
import path from 'path';
import { Wallets } from 'fabric-network';

async function main() {
    try {
        // Đọc cấu hình mạng
        const ccpPath = path.resolve(process.cwd(), 'src', 'config', 'connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Khởi tạo dịch vụ CA
        const caURL = ccp.certificateAuthorities['ca.org1.example.com'].url;
        const ca = new FabricCAServices(caURL);

        // Nạp ví điện tử
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);

        // Kiểm tra appUser đã tồn tại chưa
        const userIdentity = await wallet.get('appUser');
        if (userIdentity) {
            console.log('Danh tính "appUser" đã tồn tại trong ví.');
            return;
        }

        // Kiểm tra quyền Admin
        const adminIdentity = await wallet.get('admin');
        if (!adminIdentity) {
            console.log('Admin chưa tồn tại. Vui lòng chạy enrollAdmin.js trước.');
            return;
        }

        // Nạp bối cảnh danh tính Admin để thực hiện ủy quyền
        const provider = wallet.getProviderRegistry().getProvider(adminIdentity.type);
        const adminUser = await provider.getUserContext(adminIdentity, 'admin');

        // Đăng ký (Register) người dùng mới với CA server
        const secret = await ca.register({
            affiliation: 'org1.department1',
            enrollmentID: 'appUser',
            role: 'client'
        }, adminUser);

        // Cấp phát chứng chỉ (Enroll) dựa trên secret vừa nhận
        const enrollment = await ca.enroll({
            enrollmentID: 'appUser',
            enrollmentSecret: secret
        });

        // Tạo định dạng X.509 để lưu vào ví
        const x509Identity = {
            credentials: {
                certificate: enrollment.certificate,
                privateKey: enrollment.key.toBytes(),
            },
            mspId: 'Org1MSP',
            type: 'X.509',
        };
        await wallet.put('appUser', x509Identity);
        console.log('THÀNH CÔNG: Đã đăng ký "appUser" và lưu vào wallet!');

    } catch (error) {
        console.error(`THẤT BẠI: Lỗi khi đăng ký user: ${error}`);
        process.exit(1);
    }
}

main();