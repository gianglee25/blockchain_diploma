// frontend/src/pages/Public/VerifyCertificate.jsx
import React, { useState } from 'react';
import {
  Card,
  Input,
  Button,
  Typography,
  message,
  Space,
  Row,
  Col
} from 'antd';
import { FileSearchOutlined } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

const VerifyCertificate = () => {
  const [proof, setProof] = useState('');
  const [isDone, setIsDone] = useState(false);

  const handleVerify = () => {
    if (!proof.trim()) {
      return message.warning('Vui lòng nhập minh chứng!');
    }

    const hide = message.loading('Đang xác thực blockchain...', 0);

    setTimeout(() => {
      hide();
      setIsDone(true);
      message.success('Xác thực thành công!');
    }, 1200);
  };

  // ================= RESULT =================
  if (isDone) {
    return (
      <div style={{ padding: 40, background: '#f5f5f5', minHeight: '100vh' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>

          <Title level={2} style={{ color: '#52c41a', marginBottom: 30 }}>
            Văn bằng hợp lệ
          </Title>

          <Card style={{ borderRadius: 8 }}>

            {/* ROW 1 - 2 CỘT SÁT NHAU */}
            <Row gutter={[24, 16]}>
              <Col span={12}>
                <Text type="secondary">Họ tên</Text>
                <div>Nguyễn Thị An</div>
              </Col>

              <Col span={12}>
                <Text type="secondary">Ngày sinh</Text>
                <div>30/04/2001</div>
              </Col>
            </Row>

            <div style={{ height: 16 }} />

            {/* ROW 2 */}
            <Row gutter={[24, 16]}>
              <Col span={12}>
                <Text type="secondary">Loại văn bằng</Text>
                <div>Chứng chỉ ứng dụng CNTT cơ bản</div>
              </Col>

              <Col span={12}>
                <Text type="secondary">Ngày cấp</Text>
                <div>2022-07-23</div>
              </Col>
            </Row>

            <div style={{ height: 16 }} />

            {/* ROW 3 */}
            <Row gutter={[24, 16]}>
              <Col span={12}>
                <Text type="secondary">Nơi cấp</Text>
                <div>Trung tâm Tin học - ĐH An Giang</div>
              </Col>

              <Col span={12}>
                <Text type="secondary">Số hiệu văn bằng </Text>
                <div>QH53202200592</div>
              </Col>
            </Row>

            <div style={{ height: 16 }} />

            <div style={{ marginTop: 30 }}>
              <Button onClick={() => setIsDone(false)}>
                Quay lại
              </Button>
            </div>

          </Card>
        </div>
      </div>
    );
  }

  // ================= INPUT =================
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '90vh',
      background: '#f5f5f5',
      padding: 20
    }}>
      <Card style={{ width: 700 }}>

        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <Title level={3}>Kiểm tra văn bằng</Title>
          <Paragraph type="secondary">
            Dán JSON minh chứng để xác thực trên blockchain
          </Paragraph>
        </div>

        <div>
          <Text strong>
            <FileSearchOutlined /> Minh chứng
          </Text>

          <TextArea
            rows={8}
            value={proof}
            onChange={(e) => setProof(e.target.value)}
            placeholder='{"proof": ["0x..."], "disclosedData": {...}}'
            style={{
              marginTop: 10,
              fontFamily: 'monospace'
            }}
          />
        </div>

        <Button
          type="primary"
          block
          size="large"
          style={{ marginTop: 20 }}
          onClick={handleVerify}
        >
          Kiểm tra
        </Button>

      </Card>
    </div>
  );
};

export default VerifyCertificate;