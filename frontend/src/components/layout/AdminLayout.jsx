// frontend/src/components/layout/AdminLayout.jsx
import React from 'react';
import { Layout, Menu } from 'antd';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

const { Header, Content } = Layout;

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Lấy đường dẫn hiện tại để Menu biết đang ở trang nào

  // Định nghĩa các nút trên thanh Menu (Giống hệt Hình 4.3)
const menuItems = [
    { 
      key: '/university/dashboard', 
      label: 'Bảng điều khiển ' 
    },
    { 
      key: '/university/certificate/list', // Sửa lại cho khớp với Router
      label: 'Danh sách văn bằng ' 
    },
    { 
      key: '/university/certificate/issue', // Sửa lại cho khớp với Router
      label: 'Phát hành' 
    },
    { 
      key: '/', 
      label: 'Đăng xuất' 
    }
  ];
  // Hàm xử lý khi người dùng bấm vào Menu
  const handleMenuClick = ({ key }) => {
    navigate(key); // Điều hướng đến trang tương ứng
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* THANH HEADER MÀU ĐEN CỦA TRƯỜNG ĐẠI HỌC */}
      <Header style={{ 
        display: 'flex', 
        alignItems: 'center', 
        background: '#333', // Màu đen xám giống thiết kế
        padding: '0 20px'
      }}>
        
        {/* Tên hệ thống (Nằm bên trái) */}
        <div style={{ 
          color: 'white', 
          fontSize: '18px', 
          fontWeight: 'bold', 
          marginRight: 'auto' // Đẩy Menu sang tít bên phải
        }}>
          Bảng điều khiển Đại học Thủy Lợi
        </div>

        {/* Các nút Menu (Nằm bên phải) */}
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[location.pathname]} // Tự động bôi sáng menu đang được chọn
          items={menuItems}
          onClick={handleMenuClick}
          style={{ background: 'transparent', borderBottom: 'none', minWidth: '450px', justifyContent: 'flex-end' }}
        />
      </Header>

      {/* PHẦN NỘI DUNG (Nơi các trang con sẽ hiển thị) */}
      <Content style={{ padding: '24px', background: '#f0f2f5' }}>
        {/* Thẻ Outlet cực kỳ quan trọng!
          Nếu vào /university/dashboard -> Dashboard sẽ thay thế vào đây
          Nếu vào /university/list -> ListUser sẽ thay thế vào đây
        */}
        <Outlet /> 
      </Content>
    </Layout>
  );
};

export default AdminLayout;