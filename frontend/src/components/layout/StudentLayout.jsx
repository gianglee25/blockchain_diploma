// frontend/src/components/layout/StudentLayout.jsx
import React from 'react';
import { Layout, Menu } from 'antd';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

const { Header, Content } = Layout;

const StudentLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Menu dành riêng cho Sinh viên/Học sinh
  const menuItems = [
    { 
      key: '/student/dashboard', 
      label: 'Bảng điều khiển' 
    },
    { 
      key: '/student/register', 
      label: 'Đăng ký' 
    },
    { 
      key: '/login', 
      label: 'Đăng nhập' 
    }
  ];

  const handleMenuClick = ({ key }) => {
    navigate(key);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* HEADER CHO SINH VIÊN */}
      <Header style={{ 
        display: 'flex', 
        alignItems: 'center', 
        background: '#333', 
        padding: '0 20px'
      }}>
        {/* Tên hệ thống phía Sinh viên (Giống Hình 4.9) */}
        <div style={{ 
          color: 'white', 
          fontSize: '18px', 
          fontWeight: '500', 
          marginRight: 'auto' 
        }}>
          Bảng điều khiển phía SV-HS
        </div>

        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={handleMenuClick}
          style={{ 
            background: 'transparent', 
            borderBottom: 'none', 
            minWidth: '350px', 
            justifyContent: 'flex-end' 
          }}
        />
      </Header>

      {/* NỘI DUNG CHÍNH */}
      <Content style={{ background: '#f0f2f5' }}>
        <Outlet />
      </Content>
    </Layout>
  );
};

export default StudentLayout;