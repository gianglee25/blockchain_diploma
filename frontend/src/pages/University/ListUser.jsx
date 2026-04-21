// frontend/src/pages/University/ListUser.jsx
import React from 'react';
import { Table, Typography, Input, Space, Button } from 'antd';
import { EditOutlined, SearchOutlined } from '@ant-design/icons';

const { Title } = Typography;

const ListUser = () => {
  // 1. Định nghĩa các cột của bảng (Columns) - Giống Hình 4.4
  const columns = [
    {
      title: 'STT',
      dataIndex: 'key',
      key: 'stt',
      width: 70,
    },
    {
      title: 'Họ Tên',
      dataIndex: 'fullName',
      key: 'fullName',
      sorter: (a, b) => a.fullName.length - b.fullName.length,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Vai trò',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Chỉnh sửa',
      key: 'action',
      render: () => (
        <Button type="link" icon={<EditOutlined style={{ color: '#faad14' }} />} />
      ),
    },
  ];

  // 2. Dữ liệu mẫu (Sau này sẽ gọi từ API của Backend)
  const data = [
    {
      key: '1',
      fullName: 'TTTH',
      email: 'cict@agu.edu.vn',
      role: 'user',
    },
  ];

  return (
    <div style={{ background: '#fff', padding: '24px', borderRadius: '8px' }}>
      {/* Tiêu đề màu xanh dương giống thiết kế */}
      <Title level={4} style={{ textAlign: 'center', color: '#1890ff', marginBottom: 24 }}>
        DANH SÁCH NGƯỜI DÙNG CƠ SỞ ĐÀO TẠO
      </Title>

      {/* Thanh công cụ: Search và Show entries */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <Space>
          <span>Show</span>
          <Input type="number" defaultValue={10} style={{ width: 60 }} />
          <span>entries</span>
        </Space>

        <Space>
          <span>Search:</span>
          <Input suffix={<SearchOutlined />} style={{ width: 200 }} />
        </Space>
      </div>

      {/* Bảng dữ liệu chính */}
      <Table 
        columns={columns} 
        dataSource={data} 
        bordered 
        pagination={{
            current: 1,
            pageSize: 10,
            total: 1,
            position: ['bottomRight']
        }}
      />
      
      <div style={{ marginTop: 16, color: '#8c8c8c' }}>
        Showing 1 to 1 of 1 entries
      </div>
    </div>
  );
};

export default ListUser;