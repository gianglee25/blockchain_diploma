import React from 'react';
import { Card, Form, Input, DatePicker, Select, Button, Row, Col, Typography, message } from 'antd';

const { Title } = Typography;
const { Option } = Select;

const IssueCertificate = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Dữ liệu phát hành:', values);
    message.success('Đang tiến hành phát hành văn bằng lên Blockchain...');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '40px 20px' }}>
      <Card style={{ width: '100%', maxWidth: '800px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <Title level={3} style={{ textAlign: 'center', marginBottom: '40px', fontWeight: 'normal' }}>
          Phát hành Văn bằng  
        </Title>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          requiredMark={false}
        >
          <Row gutter={24}>
            {/* Cột trái */}
            <Col xs={24} md={12}>
              <Form.Item label="Họ và tên" name="fullName" rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}>
                <Input placeholder="Họ và tên" size="large" />
              </Form.Item>

              <Form.Item label="Ngày sinh" name="dob">
                <DatePicker style={{ width: '100%' }} size="large" placeholder="dd / mm / yyyy" format="DD/MM/YYYY" />
              </Form.Item>

              <Form.Item label="Loại Văn bằng" name="certType">
                <Select size="large" defaultValue="cntt_co_ban">
                  <Option value="cntt_co_ban">CNTT cơ bản</Option>
                  <Option value="cntt_nang_cao">CNTT nâng cao</Option>
                </Select>
              </Form.Item>

              <Form.Item label="Số hiệu văn bằng" name="certNo">
                <Input placeholder="Số hiệu văn bằng" size="large" />
              </Form.Item>
            </Col>

            {/* Cột phải */}
            <Col xs={24} md={12}>
              <Form.Item label="Email" name="email" rules={[{ type: 'email', message: 'Email không hợp lệ' }]}>
                <Input placeholder="Email" size="large" />
              </Form.Item>

              <Form.Item label="Ngày cấp phát" name="issueDate">
                <DatePicker style={{ width: '100%' }} size="large" placeholder="dd / mm / yyyy" format="DD/MM/YYYY" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item style={{ marginTop: '20px' }}>
            <Button type="primary" htmlType="submit" size="large" block style={{ height: '45px', fontSize: '16px' }}>
              Phát hành
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default IssueCertificate;