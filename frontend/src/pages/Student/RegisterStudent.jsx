// frontend/src/pages/Public/RegisterStudent.jsx
import React from 'react';
import { Card, Form, Input, Button, Typography, Row, Col, message } from 'antd';
import { Link } from 'react-router-dom';

const { Title, Text } = Typography;

const RegisterStudent = () => {
  const onFinish = (values) => {
    message.success('Đăng ký tài khoản thành công!');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '60px 20px' }}>
      <div style={{ width: '100%', maxWidth: '600px' }}>
        <Card bordered={true} style={{ borderRadius: '2px' }}>
          <Title level={4} style={{ fontWeight: 'normal', marginBottom: '30px' }}>
            Đăng ký sinh viên
          </Title>

          <Form layout="vertical" onFinish={onFinish} requiredMark={false}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Họ và tên" name="fullName">
                  <Input placeholder="Huỳnh Văn An" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Email" name="email">
                  <Input placeholder="hva@agu.edu.vn" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item label="Tạo mật khẩu" name="password">
              <Input.Password placeholder="••••••" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block style={{ height: '40px' }}>
                Đăng ký
              </Button>
            </Form.Item>

            <div style={{ textAlign: 'left', fontSize: '12px', color: '#8c8c8c' }}>
Khi nhấn “Đăng ký”, bạn đồng ý với Điều khoản sử dụng và Chính sách quyền riêng tư của chúng tôi.            </div>
          </Form>
        </Card>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Text>Đã có tài khoản? </Text>
          <Link to="/login" style={{ color: '#1890ff' }}>Đăng nhập</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterStudent;