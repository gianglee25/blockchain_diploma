// frontend/src/pages/Student/StudentDashboard.jsx
import React, { useState } from 'react';
import { Card, Row, Col, Typography, Button, Modal, Checkbox, Space, message, Input } from 'antd';
import { ShareAltOutlined, CopyOutlined } from '@ant-design/icons';

const { Text } = Typography;
const { TextArea } = Input;

const StudentDashboard = () => {
  // 1. Quản lý trạng thái đóng/mở của 2 Modal
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isProofModalOpen, setIsProofModalOpen] = useState(false);
  
  // Dữ liệu mẫu VBCC
  const certificates = [
    {
      uuid: '637b4a171b7a53764b03e664',
      type: 'Chứng chỉ ứng dụng CNTT cơ bản',
      provider: 'Trung Tâm Tin Học - Trường Đại học An Giang',
      issueDate: '2022-07-23',
      certNo: 'QH53202200592',
      regNo: '1052/CBK66.2022',
    }
  ];

  // Danh sách các thông tin có thể chọn để chia sẻ (Hình 4.11)
  const shareOptions = [
    { label: 'Ngày sinh', value: 'dob' },
    { label: 'Nơi sinh', value: 'pob' },
    { label: 'Giới tính', value: 'gender' },
    { label: 'Điểm lý thuyết', value: 'theory' },
    { label: 'Điểm thực hành', value: 'practice' },
    { label: 'Dân tộc', value: 'nation' },
  ];

  // Dữ liệu minh chứng giả lập (Hình 4.12)
  const proofData = JSON.stringify({
    "proof": [
      "0x54fc0ae9efc87ed2156cbe4292ec5e3abadf1a077fddc60242eee909c1757558",
      "0x1efaf54a8c44d8dc7ef9534692530cd5c3ad4b2904861bc2c707bee43e164443",
      "0x2fa18306ab229137f8688390d9f1c79f75168450e75f74b0ba6425168548dd64"
    ],
    "disclosedData": {
      "birthday": "30/04/2001",
      "certUUID": "637b4a171b7a53764b03e664"
    }
  }, null, 2);

  // Hàm xử lý khi nhấn "Tạo minh chứng"
  const handleCreateProof = () => {
    setIsShareModalOpen(false); // Đóng Modal chọn thông tin
    setIsProofModalOpen(true);  // Mở Modal hiển thị kết quả
  };

  // Hàm copy mã minh chứng
  const copyToClipboard = () => {
    navigator.clipboard.writeText(proofData);
    message.success('Đã sao chép minh chứng vào bộ nhớ tạm!');
  };

  return (
    <div style={{ padding: '40px 20px', background: '#f0f2f5', minHeight: '100vh' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {certificates.map((cert, index) => (
          <Card key={index} style={{ marginBottom: '20px', borderRadius: '4px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <Row gutter={[16, 24]} justify="space-around" style={{ textAlign: 'center' }}>
                <Col span={8}><Text strong>UUID</Text><br/><Text type="secondary" style={{ fontSize: '12px' }}>{cert.uuid}</Text></Col>
                <Col span={8}><Text strong>Loại VBCC</Text><br/><Text>{cert.type}</Text></Col>
                <Col span={8}><Text strong>Nơi cấp</Text><br/><Text>{cert.provider}</Text></Col>
            </Row>
            <div style={{ margin: '30px 0' }} />
            <Row gutter={[16, 24]} justify="space-around" style={{ textAlign: 'center' }}>
                <Col span={8}><Text strong>Ngày cấp</Text><br/><Text>{cert.issueDate}</Text></Col>
                <Col span={8}><Text strong>Số hiệu</Text><br/><Text>{cert.certNo}</Text></Col>
                <Col span={8}><Text strong>Số vào sổ</Text><br/><Text>{cert.regNo}</Text></Col>
            </Row>

            <Button 
              type="primary" 
              block 
              icon={<ShareAltOutlined />}
              style={{ marginTop: '30px', height: '40px' }}
              onClick={() => setIsShareModalOpen(true)}
            >
              Chia sẻ VBCC
            </Button>
          </Card>
        ))}
      </div>

      {/* MODAL 1: CHỌN THÔNG TIN CẦN CHIA SẺ (Hình 4.11) */}
      <Modal
        title="637b4a171b7a53764b03e664"
        open={isShareModalOpen}
        onCancel={() => setIsShareModalOpen(false)}
        footer={[
          <Button key="back" onClick={() => setIsShareModalOpen(false)} style={{ background: '#8c8c8c', color: '#fff' }}>
            Đóng
          </Button>,
          <Button key="submit" type="primary" onClick={handleCreateProof}>
            Tạo minh chứng
          </Button>,
        ]}
      >
        <div style={{ padding: '10px 0' }}>
          <Checkbox.Group style={{ width: '100%' }}>
            <Space direction="vertical" style={{ width: '100%' }}>
              {shareOptions.map(option => (
                <Checkbox key={option.value} value={option.value}>
                  {option.label}
                </Checkbox>
              ))}
            </Space>
          </Checkbox.Group>
        </div>
      </Modal>

      {/* MODAL 2: HIỂN THỊ MINH CHỨNG ĐÃ TẠO (Hình 4.12) */}
      <Modal
        title={
          <div style={{ paddingRight: '20px' }}>
            Minh chứng đã được tạo. Sao chép nội dung minh chứng trong khung bên dưới
          </div>
        }
        open={isProofModalOpen}
        onCancel={() => setIsProofModalOpen(false)}
        width={650}
        footer={[
          <Button key="copy" icon={<CopyOutlined />} onClick={copyToClipboard}>
            Sao chép
          </Button>,
          <Button key="close" onClick={() => setIsProofModalOpen(false)} style={{ background: '#8c8c8c', color: '#fff' }}>
            Đóng
          </Button>
        ]}
      >
        <TextArea 
          value={proofData} 
          readOnly 
          autoSize={{ minRows: 8, maxRows: 12 }}
          style={{ 
            fontFamily: 'monospace', 
            backgroundColor: '#fafafa',
            marginTop: '10px',
            fontSize: '13px'
          }}
        />
      </Modal>
    </div>
  );
};

export default StudentDashboard;