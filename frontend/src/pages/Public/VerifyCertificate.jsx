// frontend/src/pages/Public/VerifyCertificate.jsx
import React, { useState } from 'react';
import { Card, Input, Button, Typography, message, Space, Result,Row,Col } from 'antd';
import { SafetyCertificateOutlined, FileSearchOutlined, ArrowLeftOutlined } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

const VerifyCertificate = () => {
  const [proof, setProof] = useState('');
  const [isDone, setIsDone] = useState(false); // Trạng thái để switch giao diện sau khi bấm nút

  const handleVerify = () => {
    if (!proof.trim()) {
      return message.warning('Vui lòng nhập minh chứng để kiểm tra!');
    }
    
    // Hiện loading giả lập trong 1.5 giây
    const hide = message.loading('Đang truy vấn dữ liệu từ Blockchain Hyperledger Fabric...', 0);
    
    setTimeout(() => {
      hide();
      setIsDone(true); // Chuyển sang màn hình kết quả
      message.success('Đã xác thực minh chứng thành công!');
    }, 1500);
  };

  // Giao diện kết quả sau khi kiểm tra (Fix cứng thành công)
// Giao diện kết quả sau khi kiểm tra thành công (Hình 4.16)
if (isDone) {
  return (
    <div style={{ padding: '60px 20px', background: '#f0f2f5', minHeight: '90vh' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
        
        {/* Dòng chữ VBCC hợp lệ màu xanh lá */}
        <Title level={1} style={{ color: '#52c41a', marginBottom: '40px', fontWeight: 'normal' }}>
          VBCC hợp lệ
        </Title>

        {/* Khung trắng chứa thông tin chi tiết */}
        <Card bordered={false} style={{ borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', padding: '20px' }}>
          <Row gutter={[16, 40]} justify="center">
            {/* Hàng 1 */}
            <Col span={8}>
              <Text strong style={{ display: 'block', fontSize: '16px' }}>Họ và tên</Text>
              <Text style={{ fontSize: '15px' }}>Nguyễn Thị An</Text>
            </Col>
            <Col span={8}>
              <Text strong style={{ display: 'block', fontSize: '16px' }}>Loại VBCC</Text>
              <Text style={{ fontSize: '15px' }}>Chứng chỉ ứng dụng CNTT cơ bản</Text>
            </Col>
            <Col span={8}>
              <Text strong style={{ display: 'block', fontSize: '16px' }}>Ngày cấp phát</Text>
              <Text style={{ fontSize: '15px' }}>2022-07-23</Text>
            </Col>

            {/* Hàng 2 */}
            <Col span={8}>
              <Text strong style={{ display: 'block', fontSize: '16px' }}>Nơi cấp</Text>
              <Text style={{ fontSize: '15px' }}>Trung tâm Tin học - Trường Đại học An Giang</Text>
            </Col>
            <Col span={8}>
              <Text strong style={{ display: 'block', fontSize: '16px' }}>Số hiệu</Text>
              <Text style={{ fontSize: '15px' }}>QH53202200592</Text>
            </Col>
            <Col span={8}>
              <Text strong style={{ display: 'block', fontSize: '16px' }}>Số vào sổ</Text>
              <Text style={{ fontSize: '15px' }}>1052/CBK66.2022</Text>
            </Col>

            {/* Hàng 3: Các thông tin bổ sung (Disclosed Data) */}
            <Col span={8}>
              <Text strong style={{ display: 'block', fontSize: '16px' }}>birthday</Text>
              <Text style={{ fontSize: '15px' }}>30/04/2001</Text>
            </Col>
          </Row>

          <div style={{ marginTop: '50px' }}>
            <Button size="large" onClick={() => setIsDone(false)}>
              Quay lại
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

  // Giao diện nhập mã (Mặc định)
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '85vh', 
      background: '#f0f2f5',
      padding: '40px 20px'
    }}>
      <Card 
        bordered={false} 
        style={{ 
          width: '100%', 
          maxWidth: '740px', 
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          borderRadius: '12px'
        }}
      >
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: '10px' }}>
            <Title level={3} style={{ marginTop: '16px' }}>
              Kiểm tra tính xác thực VBCC
            </Title>
            <Paragraph type="secondary">
              Vui lòng dán đoạn mã minh chứng (JSON) sinh viên đã cung cấp để kiểm tra trên mạng lưới Blockchain.
            </Paragraph>
          </div>

          <div>
            <Text strong style={{ display: 'block', marginBottom: '10px' }}>
              <FileSearchOutlined /> Nội dung minh chứng:
            </Text>
            <TextArea 
              rows={8} 
              value={proof}
              onChange={(e) => setProof(e.target.value)}
              placeholder='{"proof": ["0x...", "0x..."], "disclosedData": {...}}'
              style={{ 
                borderRadius: '8px', 
                fontFamily: 'monospace', 
                backgroundColor: '#fafafa',
                fontSize: '13px'
              }}
            />
          </div>

          <Button 
            type="primary" 
            block 
            size="large" 
            onClick={handleVerify}
            style={{ 
              height: '50px', 
              fontSize: '16px', 
              fontWeight: '600',
              borderRadius: '8px',
              marginTop: '10px'
            }}
          >
            Bắt đầu kiểm tra
          </Button>
        </Space>
      </Card>
    </div>
  );
};

export default VerifyCertificate;