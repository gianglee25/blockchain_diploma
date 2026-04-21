// frontend/src/pages/University/UniversityDashboard.jsx
import React from 'react';
import { Card, Row, Col, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const UniversityDashboard = () => {
  const navigate = useNavigate();

  // Dữ liệu cấu hình cho 3 khối chức năng
  const functions = [
    {
      title: 'NGƯỜI DÙNG CƠ SỞ ĐÀO TẠO',
      path: '/university/list', 
      color: '#1890ff'
    },
    {
      title: 'DANH SÁCH VĂN BẰNG CHỨNG CHỈ',
      path: '/university/certificate/list', 
      color: '#1890ff'
    },
    {
      title: 'PHÁT HÀNH VĂN BẰNG CHỨNG CHỈ',
      path: '/university/certificate/issue',
      color: '#1890ff'
    }
  ];

  return (
    <div style={{ padding: '50px 20px', minHeight: '80vh' }}>
      <Row gutter={[24, 24]} justify="center">
        {functions.map((item, index) => (
          <Col xs={24} sm={12} md={7} key={index}>
            <Card
              hoverable
              onClick={() => navigate(item.path)}
              style={{
                height: '250px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
              }}
            >
              <Title level={4} style={{ color: item.color, margin: 0, fontWeight: 'normal' }}>
                {item.title}
              </Title>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default UniversityDashboard;