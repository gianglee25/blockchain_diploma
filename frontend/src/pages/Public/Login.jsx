// frontend/src/pages/Public/Login.jsx
import React from 'react';
import { Card, Form, Input, Button, Typography, Tabs, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined, LoginOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';

const { Title, Text } = Typography;

const Login = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log('Dữ liệu đăng nhập:', values);
    
    // Giả lập logic chuyển trang dựa trên vai trò (sau này sẽ dùng logic thực tế)
    message.success('Đăng nhập thành công!');
    
    // Ví dụ: Nếu là nhà trường thì vào Dashboard trường, nếu là SV thì vào Dashboard SV
    if (values.role === 'university') {
      navigate('/university/dashboard');
    } else {
      navigate('/student/dashboard');
    }
  };

  // Nội dung Form Đăng nhập
  const renderLoginForm = (role) => (
    <Form
      layout="vertical"
      initialValues={{ role, remember: true }}
      onFinish={onFinish}
      style={{ marginTop: '20px' }}
    >
      <Form.Item name="role" hidden>
        <Input />
      </Form.Item>

      <Form.Item
        name="email"
        rules={[{ required: true, type: 'email', message: 'Vui lòng nhập Email hợp lệ!' }]}
      >
        <Input 
          prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} 
          placeholder="Email của bạn" 
          size="large"
        />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
      >
        <Input.Password
          prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder="Mật khẩu"
          size="large"
        />
      </Form.Item>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <Checkbox>Ghi nhớ</Checkbox>
        <a href="" style={{ color: '#1890ff' }}>Quên mật khẩu?</a>
      </div>

      <Form.Item>
        <Button 
          type="primary" 
          htmlType="submit" 
          block 
          size="large" 
          icon={<LoginOutlined />}
          style={{ height: '45px' }}
        >
          Đăng nhập
        </Button>
      </Form.Item>
    </Form>
  );

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '85vh', 
      background: '#f0f2f5',
      padding: '20px' 
    }}>
      <Card 
        style={{ 
          width: '100%', 
          maxWidth: '450px', 
          borderRadius: '8px', 
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)' 
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <Title level={3} style={{ marginBottom: '8px' }}>Chào mừng trở lại</Title>
          <Text type="secondary">Vui lòng đăng nhập để tiếp tục hệ thống</Text>
        </div>

        <Tabs
          defaultActiveKey="student"
          centered
          items={[
            {
              key: 'student',
              label: 'Sinh viên / Học viên',
              children: renderLoginForm('student'),
            },
            {
              key: 'university',
              label: 'Nhà trường / Trung tâm',
              children: renderLoginForm('university'),
            },
          ]}
        />

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Text>Bạn chưa có tài khoản? </Text>
          <Link to="/student/register" style={{ color: '#1890ff', fontWeight: '500' }}>
            Đăng ký ngay
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Login;