// frontend/src/pages/University/ImportCertificate.jsx
import React from 'react';
import { Card, Typography, Upload, Button, Space, message } from 'antd';
import { UploadOutlined, LeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const ImportCertificate = () => {
  const navigate = useNavigate();

  // Cấu hình cho việc upload file
  const uploadProps = {
    beforeUpload: (file) => {
      const isExcel = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.type === 'application/vnd.ms-excel';
      if (!isExcel) {
        message.error(`${file.name} không phải là file Excel!`);
      }
      return isExcel || Upload.LIST_IGNORE;
    },
    onChange: (info) => {
      if (info.file.status === 'done') {
        message.success(`${info.file.name} đã được chọn.`);
      }
    },
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '50px' }}>
      <Card 
        title={<Title level={4} style={{ margin: 0, fontWeight: 'normal' }}>Import dữ liệu từ tập tin Excel</Title>}
        style={{ width: '100%', maxWidth: '600px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
      >
        <div style={{ marginBottom: '20px' }}>
          <Text strong>Tập tin</Text>
          <div style={{ marginTop: '10px' }}>
            {/* Component Upload của Ant Design */}
            <Upload {...uploadProps} maxCount={1}>
              <Button icon={<UploadOutlined />}>Chọn tập tin...</Button>
            </Upload>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', marginTop: '30px' }}>
          <Button 
            type="primary" 
            style={{ flex: 1, height: '40px', background: '#1890ff' }}
            onClick={() => message.info('Đang xử lý import dữ liệu...')}
          >
            Import
          </Button>
          <Button 
            style={{ flex: 1, height: '40px', background: '#8c8c8c', color: '#fff' }}
            onClick={() => navigate('/university/certificate/list')}
          >
            Trở về
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ImportCertificate;