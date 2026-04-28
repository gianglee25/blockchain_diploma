// frontend/src/pages/Public/Home.jsx
import React from 'react';
import { Typography, Button, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      
      {/* Banner */}
      <div style={{ backgroundColor: '#f0f2f5', padding: '100px 20px', textAlign: 'center', marginBottom: '60px' }}>
<Title level={2} style={{ fontWeight: 'normal', marginBottom: '10px' }}>
  XÁC THỰC VĂN BẰNG TRƯỜNG ĐẠI HỌC THỦY LỢI DỰA TRÊN CÔNG NGHỆ BLOCKCHAIN
</Title>
        <Button 
          type="primary" 
          size="large" 
          onClick={() => navigate('/verify')}
        >
          Xác minh »
        </Button>
      </div>

      {/* Hai cột */}
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 20px' }}>
        <Row gutter={[80, 40]} justify="center"> 
          
          {/* Cột 1: Sinh viên */}
          <Col xs={24} md={12}>
            <div style={{ textAlign: 'center' }}>
              <Title level={3} style={{ fontWeight: 'normal' }}>Sinh viên</Title>
              <Text style={{ display: 'block', height: '60px', marginBottom: '15px', color: '#595959' }}>
              </Text>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                <Button type="primary" onClick={() => navigate('/login')}>Đăng nhập »</Button>
                <Button type="primary" onClick={() => navigate('/student/register')}>Đăng ký »</Button>
              </div>
            </div>
          </Col>

          {/* Cột 2: Trường đại học */}
          <Col xs={24} md={12}>
            <div style={{ textAlign: 'center' }}>
              <Title level={3} style={{ fontWeight: 'normal' }}>Trường đại học</Title>
              <Text style={{ display: 'block', height: '60px', marginBottom: '15px', color: '#595959' }}>
              </Text>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                <Button type="primary" onClick={() => navigate('/login')}>Đăng nhập »</Button>
                <Button type="primary" onClick={() => navigate('/login')}>Đăng ký »</Button>
              </div>
            </div>
          </Col>

        </Row>
      </div>

    </div>
  );
};

export default Home;