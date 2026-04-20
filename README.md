# Hệ thống Quản lý và Xác thực Văn bằng Blockchain (Hyperledger Fabric)
Dự án nghiên cứu và xây dựng hệ thống quản lý văn bằng dựa trên công nghệ **Blockchain (Hyperledger Fabric)** kết hợp với **MERN Stack**, hỗ trợ số hóa và xác thực dữ liệu sổ gốc lịch sử. Hệ thống giúp ngăn chặn vấn nạn làm giả văn bằng và đảm bảo tính toàn vẹn của dữ liệu giáo dục.

---

## Tính năng Cốt lõi

- **Quản lý Sổ gốc Linh hoạt:** Import dữ liệu hàng loạt từ file Excel/CSV, tự động thích ứng với cấu trúc cột thay đổi qua từng năm nhờ MongoDB.
- **Cấp phát trên Blockchain (Blockchainize):** Băm nội dung văn bằng (SHA-256) và ghi nhận mã Hash lên mạng lưới chuỗi khối cấp phép Hyperledger Fabric.
- **Tra cứu và Xác thực Công khai:** Cổng tra cứu cho phép đối chiếu mã Hash của dữ liệu hiện tại với mạng lưới Blockchain để phát hiện gian lận.
- **Kiến trúc Monorepo:** Tái sử dụng tối đa mã nguồn (Validation, Constants, Endpoints) giữa Frontend và Backend thông qua thư mục `shared`.

---

## Cấu trúc Thư mục Dự án

Dự án áp dụng mô hình kiến trúc phân lớp (Layered Architecture) chuẩn mực:

```text
blockchain_diploma/
├── README.md                   # Tài liệu mô tả dự án
├── backend/                    # MÁY CHỦ NODE.JS (Cổng 5000)
│   ├── package.json
│   └── src/
│       ├── blockchain/         # Logic tương tác Hyperledger Fabric (Phase 2)
│       ├── config/
│       │   └── db.js           # Cấu hình kết nối cơ sở dữ liệu MongoDB
│       ├── controllers/
│       │   └── diplomaController.js # Tiếp nhận request và trả về response
│       ├── middlewares/
│       │   ├── errorHandler.js      # Trạm bắt lỗi toàn cục (Global Error Handling)
│       │   └── uploadMiddleware.js  # Cấu hình Multer để upload file sổ gốc
│       ├── models/             # Định nghĩa cấu trúc MongoDB (Mongoose Schemas)
│       ├── routes/
│       │   └── diplomaRoutes.js# Khai báo các đường dẫn API Backend
│       ├── services/
│       │   └── excelService.js # Core Logic: Đọc, làm sạch và chuẩn hóa file Excel
│       └── utils/
│           ├── ApiError.js     # Class chuẩn hóa cấu trúc lỗi
│           └── ApiResponse.js  # Class chuẩn hóa cấu trúc dữ liệu trả về
│
├── frontend/                   # GIAO DIỆN REACT (Cổng 5173)
│   ├── routes/
│   │   └── index.jsx           # Cấu hình định tuyến (React Router)
│   ├── src/
│   │   ├── App.jsx             # File Component gốc
│   │   ├── assets/             # Hình ảnh, icon, font chữ
│   │   ├── components/         # UI Components dùng chung (common, layout)
│   │   ├── hooks/              # Custom React Hooks
│   │   ├── pages/              # Màn hình chính (Admin, Public)
│   │   ├── services/
│   │   │   ├── axiosClient.js  # Cấu hình bộ gọi API gốc (Axios Interceptors)
│   │   │   └── diplomaApi.js   # Các hàm API thao tác với dữ liệu văn bằng
│   │   └── utils/              # Các hàm tiện ích UI (Format Date, Shorten Hash)
│   └── vite.config.js          # Cấu hình bộ build Vite
│
├── shared/                     # THƯ VIỆN DÙNG CHUNG (MONOREPO)
│   ├── constants.js            # Hằng số hệ thống (Trạng thái, loại bằng)
│   ├── endpoints.js            # Danh sách URL API tập trung
│   ├── utils.js                # Các hàm xử lý logic chung
│   └── validation.js           # Logic kiểm tra chuẩn hóa dữ liệu đầu vào
│
└── package.json                # Lệnh chạy concurrently cho toàn bộ dự án