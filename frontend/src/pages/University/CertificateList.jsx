// frontend/src/pages/University/CertificateList.jsx
import React from 'react';
import { Table, Typography, Button, Input, Space, Row, Col } from 'antd';
import { ImportOutlined, SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;
const CertificateList = () => {
    const navigate = useNavigate();

  // 1. Định nghĩa các cột (Columns) - Tổng cộng 9 cột như trong hình
  const columns = [
    { title: 'STT', dataIndex: 'key', key: 'stt', width: 60 },
    { title: 'Họ Tên', dataIndex: 'fullName', key: 'fullName', width: 150 },
    { title: 'Ngày sinh', dataIndex: 'dob', key: 'dob', width: 110 },
    { title: 'Email', dataIndex: 'email', key: 'email', width: 200 },
    { title: 'Loại Văn bằng ', dataIndex: 'certType', key: 'certType', width: 120 },
    { title: 'Nơi cấp', dataIndex: 'provider', key: 'provider', width: 150 },
    { title: 'Ngày cấp', dataIndex: 'issueDate', key: 'issueDate', width: 110 },
    { title: 'Số hiệu', dataIndex: 'certNo', key: 'certNo', width: 150 },
    { title: 'Số vào sổ', dataIndex: 'regNo', key: 'regNo', width: 150 },
  ];

  // 2. Dữ liệu mẫu (Data) - Giống y hệt nội dung trong hình 4.5 của bạn
  const dataSource = [
    {
      key: '1',
      fullName: 'Nguyễn Thị An',
      dob: '30/04/2001',
      email: 'hvtrung1@student.agu.edu.vn',
      certType: 'Chứng chỉ ứng dụng CNTT cơ bản',
      provider: 'Trung Tâm Tin Học - Trường Đại học An Giang',
      issueDate: '2022-07-23',
      certNo: 'QH53202200592',
      regNo: '1052/CBK66.2022',
    },
    {
      key: '2',
      fullName: 'Nguyễn Tấn An',
      dob: '25/03/2001',
      email: 'hvtrung2@student.agu.edu.vn',
      certType: 'Chứng chỉ ứng dụng CNTT cơ bản',
      provider: 'Trung Tâm Tin Học - Trường Đại học An Giang',
      issueDate: '2022-07-23',
      certNo: 'QH53202200593',
      regNo: '1053/CBK66.2022',
    },
    {
      key: '3',
      fullName: 'Trần Nhật Anh',
      dob: '19/03/1996',
      email: 'hvtrung3@student.agu.edu.vn',
      certType: 'Chứng chỉ ứng dụng CNTT cơ bản',
      provider: 'Trung Tâm Tin Học - Trường Đại học An Giang',
      issueDate: '2022-07-23',
      certNo: 'QH53202200594',
      regNo: '1054/CBK66.2022',
    },
  ];

  return (
    <div style={{ background: '#fff', padding: '24px', borderRadius: '8px' }}>
      {/* Tiêu đề xanh dương */}
      <Title level={3} style={{ textAlign: 'center', color: '#1890ff', marginBottom: 30 }}>
        DANH SÁCH VĂN BẰNG 
      </Title>

      {/* Dòng điều khiển: Nút Import và Ô Tìm kiếm */}
      <Row justify="space-between" align="middle" style={{ marginBottom: 20 }}>
        <Col>
          <Button 
            type="primary" 
            icon={<ImportOutlined />} 
            size="large"
            onClick={() => navigate('/university/certificate/import')}
            style={{ borderRadius: '4px' }}
          >
            Import Dữ liệu
          </Button>
          <div style={{ marginTop: 15 }}>
            Show <Input type="number" defaultValue={10} style={{ width: 60 }} size="small" /> entries
          </div>
        </Col>
        
        <Col style={{ alignSelf: 'flex-end' }}>
          <Space>
            <span>Search:</span>
            <Input suffix={<SearchOutlined />} style={{ width: 250 }} />
          </Space>
        </Col>
      </Row>

      {/* Bảng dữ liệu */}
      <Table 
        columns={columns} 
        dataSource={dataSource} 
        bordered 
        pagination={false} // Tắt phân trang tạm thời để giống hình
        scroll={{ x: 1200 }} // Cho phép cuộn ngang nếu màn hình nhỏ vì có nhiều cột
      />
    </div>
  );
};

export default CertificateList;