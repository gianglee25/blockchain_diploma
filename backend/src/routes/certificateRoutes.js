// backend/routes/certificateRoutes.js
import express from 'express';
import multer from 'multer';
import { importCertificates } from '../controllers/certificateController.js';

const router = express.Router();

// Lưu file tạm vào RAM để xử lý ngay, không ghi ra ổ cứng
const upload = multer({ storage: multer.memoryStorage() });

// Endpoint: POST /api/certificates/import
router.post('/import', upload.single('file'), importCertificates);

export default router;