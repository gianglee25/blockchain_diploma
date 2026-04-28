// frontend/src/components/layout/PublicLayout.jsx
import React from 'react';
import { Layout, Menu, Dropdown, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Outlet, Link, useLocation } from 'react-router-dom';

const { Header, Content } = Layout;

const PublicLayout = () => {
  const location = useLocation();

  // 1. Xác định tiêu đề Header dựa trên đường dẫn (Chuẩn Hình 4.14)
  const headerTitle = location.pathname === '/verify';

  // 2. Cấu trúc lại Menu Đăng nhập (Dropdown)
  const loginMenuItems = [
    { 
      key: '1', 
      label: <Link to="/login">Sinh viên</Link> 
    },
    { 
      key: '2', 
      label: <Link to="/login">Trường học</Link> 
    },
    {
      type: 'divider',
    },
    {
      key: '3',
      label: <Link to="/student/register">Đăng ký Sinh viên</Link>
    }
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* HEADER MÀU ĐEN - Thiết kế đồng nhất cho Home và Verify */}
      <Header style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        background: '#333', 
        padding: '0 50px',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        width: '100%'
      }}>
        {/* Tiêu đề bên trái - Tự động đổi theo trang */}
        <div style={{ color: 'white', fontSize: '18px', fontWeight: '500' }}>
          <Link to="/" style={{ color: 'white' }}>
            {headerTitle}
          </Link>
        </div>

        {/* Cụm điều hướng bên phải */}
        <div className="header-right">
          <Dropdown 
            menu={{ items: loginMenuItems }} 
            placement="bottomRight" 
            trigger={['click', 'hover']}
          >
            <a 
              onClick={(e) => e.preventDefault()} 
              style={{ color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }}
            >
              <Space>
                Đăng nhập
                <DownOutlined style={{ fontSize: '10px' }} />
              </Space>
            </a>
          </Dropdown>
        </div>
      </Header>

      {/* PHẦN NỘI DUNG BIẾN ĐỔI */}
      <Content style={{ background: '#fff' }}>
        <Outlet /> 
      </Content>
    </Layout>
  );
};

export default PublicLayout;