'use strict';

import { Gateway,Wallets } from 'fabric-network';
import path from 'path';
import fs from 'fs';

// Cấu hình đường dẫn
const ccpPath = path.resolve(process.cwd(), 'src', 'config', 'connection-org1.json');
const walletPath = path.join(process.cwd(), 'wallet');

/**
 * Hàm khởi tạo kết nối Gateway
 */
async function getContract() {
    const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
    const wallet = await Wallets.newFileSystemWallet(walletPath);

    // Kiểm tra danh tính appUser
    const identity = await wallet.get('appUser');
    if (!identity) {
        throw new Error('Danh tính "appUser" chưa tồn tại trong wallet. Hãy chạy registerUser.js');
    }

    // Thiết lập Gateway
    const gateway = new Gateway();
    await gateway.connect(ccp, {
        wallet,
        identity: 'appUser',
        discovery: { enabled: true, asLocalhost: true } // asLocalhost: true vì đang chạy Docker ở máy tính cá nhân
    });

    // Lấy Network và Contract
    const network = await gateway.getNetwork('diplomachannel');
    const contract = network.getContract('educert');

    return { contract, gateway };
}

/**
 * Đọc dữ liệu văn bằng (Query)
 */
exports.getDiploma = async (diplomaId) => {
    const { contract, gateway } = await getContract();
    try {
        const result = await contract.evaluateTransaction('readDiploma', diplomaId);
        return JSON.parse(result.toString());
    } finally {
        gateway.disconnect(); // Luôn đóng kết nối để giải phóng tài nguyên
    }
};

/**
 * Tạo văn bằng mới (Invoke)
 */
exports.createDiploma = async (diplomaId, studentName, major, issueDate) => {
    const { contract, gateway } = await getContract();
    try {
        await contract.submitTransaction('createDiploma', diplomaId, studentName, major, issueDate);
        return { success: true, message: 'Đã cấp văn bằng thành công trên Blockchain' };
    } finally {
        gateway.disconnect();
    }
};