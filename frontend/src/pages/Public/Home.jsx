// frontend/src/pages/Public/Home.jsx
import React from 'react';
import { Typography, Button, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const Home = () => {
  const navigate = useNavigate(); // Hook để điều hướng

  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      
      {/* KHU VỰC 1: BANNER TRUNG TÂM (Kết nối đến Cổng xác minh) */}
      <div style={{ backgroundColor: '#f0f2f5', padding: '100px 20px', textAlign: 'center', marginBottom: '60px' }}>
        <Title level={2} style={{ fontWeight: 'normal', marginBottom: '10px' }}>
          VBCC trên nền tảng Blockchain
        </Title>
        <Text style={{ display: 'block', marginBottom: '20px', color: '#595959', fontSize: '16px' }}>
          Giải pháp quản lý và xác thực văn bằng chứng chỉ sử dụng công nghệ Hyperledger Fabric
        </Text>
        <Button 
          type="primary" 
          size="large" 
          onClick={() => navigate('/verify')} // Dẫn đến Hình 4.14
        >
          Xác minh VBCC »
        </Button>
      </div>

      {/* KHU VỰC 2: HAI CỘT CHỨC NĂNG */}
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 20px' }}>
        <Row gutter={[80, 40]} justify="center"> 
          
          {/* Cột 1: Sinh viên / Học viên */}
          <Col xs={24} md={12}>
            <div style={{ textAlign: 'center' }}>
              <Title level={3} style={{ fontWeight: 'normal' }}>Sinh viên/Học viên</Title>
              <Text style={{ display: 'block', height: '60px', marginBottom: '15px', color: '#595959' }}>
                Sinh viên, học viên có thể sử dụng nền tảng này để quản lý<br/>
                và chia sẻ các VBCC của họ.
              </Text>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                <Button type="primary" onClick={() => navigate('/login')}>Đăng nhập »</Button>
                <Button type="primary" onClick={() => navigate('/student/register')}>Đăng ký »</Button>
              </div>
            </div>
          </Col>

          {/* Cột 2: Trường đại học / Trung tâm */}
          <Col xs={24} md={12}>
            <div style={{ textAlign: 'center' }}>
              <Title level={3} style={{ fontWeight: 'normal' }}>Trường đại học/Trung tâm</Title>
              <Text style={{ display: 'block', height: '60px', marginBottom: '15px', color: '#595959' }}>
                Các trường đại học và trung tâm có thể sử dụng nền tảng<br/>
                này để phát hành VBCC đến các sinh viên, học viên của họ.
              </Text>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                {/* Ở đây đều dẫn về /login, nhưng trang Login đã có Tabs để phân loại */}
                <Button type="primary" onClick={() => navigate('/login')}>Đăng nhập »</Button>
                <Button type="primary" onClick={() => navigate('/login')}>Đăng ký »</Button>
              </div>
            </div>
          </Col>

        </Row>
      </div>

      {/* FOOTER NHẸ NHÀNG CHO GIỐNG CÁC TRANG WEB CÔNG CỘNG */}
      <div style={{ marginTop: '100px', padding: '40px', textAlign: 'center', borderTop: '1px solid #f0f0f0', color: '#8c8c8c' }}>
        <Text type="secondary">Hệ thống quản lý VBCC dựa trên Blockchain ©2026</Text>
      </div>

    </div>
  );
};

export default Home;