import React, { useState } from 'react';
import {
  Card,
  Row,
  Col,
  Typography,
  Button,
  Modal,
  Checkbox,
  Space,
  message,
  Input
} from 'antd';

const { Text } = Typography;
const { TextArea } = Input;

const StudentDashboard = () => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isProofModalOpen, setIsProofModalOpen] = useState(false);

  const certificates = [
    {
      uuid: '637b4a171b7a53764b03e664',
      type: 'Chứng chỉ ứng dụng CNTT cơ bản',
      provider: 'Trung Tâm Tin Học - Trường Đại học An Giang',
      issueDate: '2022-07-23',
      certNo: 'QH53202200592',
      regNo: '1052/CBK66.2022'
    }
  ];

  const shareOptions = [
    { label: 'Ngày sinh', value: 'dob' },
    { label: 'Nơi sinh', value: 'pob' },
    { label: 'Giới tính', value: 'gender' },
    { label: 'Điểm lý thuyết', value: 'theory' },
    { label: 'Điểm thực hành', value: 'practice' },
    { label: 'Dân tộc', value: 'nation' }
  ];

  const proofData = JSON.stringify(
    {
      proof: [
        '0x54fc0ae9efc87ed2156cbe4292ec5e3abadf1a077fddc60242eee909c1757558',
        '0x1efaf54a8c44d8dc7ef9534692530cd5c3ad4b2904861bc2c707bee43e164443',
        '0x2fa18306ab229137f8688390d9f1c79f75168450e75f74b0ba6425168548dd64'
      ],
      disclosedData: {
        birthday: '30/04/2001',
        certUUID: '637b4a171b7a53764b03e664'
      }
    },
    null,
    2
  );

  const handleCreateProof = () => {
    setIsShareModalOpen(false);
    setIsProofModalOpen(true);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(proofData);
    message.success('Đã sao chép!');
  };

  return (
    <div style={{ padding: 24, background: '#f5f5f5', minHeight: '100vh' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>

        {certificates.map((cert, index) => (
          <Card
            key={index}
            style={{
              marginBottom: 16,
              borderRadius: 6
            }}
          >

            {/* HEADER */}
            <div style={{ marginBottom: 12 }}>
              <Text style={{ fontWeight: 500 }}>
                Văn bằng: {cert.certNo}
              </Text>
              <div style={{ fontSize: 12, color: '#666' }}>
                UUID: {cert.uuid}
              </div>
            </div>

            {/* INFO GRID */}
            <Row gutter={[16, 12]}>
              <Col span={8}>
                <div style={{ fontSize: 12, color: '#888' }}>Loại văn bằng</div>
                <div>{cert.type}</div>
              </Col>

              <Col span={8}>
                <div style={{ fontSize: 12, color: '#888' }}>Nơi cấp</div>
                <div>{cert.provider}</div>
              </Col>

              <Col span={8}>
                <div style={{ fontSize: 12, color: '#888' }}>Ngày cấp</div>
                <div>{cert.issueDate}</div>
              </Col>
            </Row>

            {/* BUTTON */}
            <div style={{ marginTop: 16 }}>
              <Button
                type="primary"
                block
                onClick={() => setIsShareModalOpen(true)}
              >
                Chia sẻ văn bằng
              </Button>
            </div>

          </Card>
        ))}

      </div>

      {/* MODAL 1 */}
      <Modal
        title="Chọn thông tin chia sẻ"
        open={isShareModalOpen}
        onCancel={() => setIsShareModalOpen(false)}
        footer={[
          <Button onClick={() => setIsShareModalOpen(false)}>
            Đóng
          </Button>,
          <Button type="primary" onClick={handleCreateProof}>
            Tạo minh chứng
          </Button>
        ]}
      >
        <Checkbox.Group style={{ width: '100%' }}>
          <Space direction="vertical">
            {shareOptions.map((opt) => (
              <Checkbox key={opt.value} value={opt.value}>
                {opt.label}
              </Checkbox>
            ))}
          </Space>
        </Checkbox.Group>
      </Modal>

      {/* MODAL 2 */}
      <Modal
        title="Minh chứng"
        open={isProofModalOpen}
        onCancel={() => setIsProofModalOpen(false)}
        width={600}
        footer={[
          <Button onClick={copyToClipboard}>Sao chép</Button>,
          <Button onClick={() => setIsProofModalOpen(false)}>Đóng</Button>
        ]}
      >
        <TextArea
          value={proofData}
          readOnly
          autoSize={{ minRows: 8 }}
        />
      </Modal>

    </div>
  );
};

export default StudentDashboard;