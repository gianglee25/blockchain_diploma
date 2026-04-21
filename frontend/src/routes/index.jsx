import { createBrowserRouter } from 'react-router-dom';
import App from '../App'; 
import Home from '../pages/Public/Home';
import PublicLayout from '../components/layout/PublicLayout';
import AdminLayout from '../components/layout/AdminLayout'; 
import UniversityDashboard from '../pages/University/UniversityDashboard';
import ListUser from '../pages/University/ListUser';
import CertificateList from '../pages/University/CertificateList';
import ImportCertificate from '../pages/University/ImportCertificate';
import IssueCertificate from '../pages/University/IssueCertificate';
import StudentLayout from '../components/layout/StudentLayout';
import RegisterStudent from '../pages/Student/RegisterStudent';
import StudentDashboard from '../pages/Student/StudentDashboard';
import VerifyCertificate from '../pages/Public/VerifyCertificate';
import Login from '../pages/Public/Login';




export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, 
    children: [
      // NHÓM TRANG CÔNG CỘNG
      {
        element: <PublicLayout />, 
        children: [
          { index: true, element: <Home /> }, 
          { path: "login", element: <Login /> },
          {path: "verify", element: <VerifyCertificate />}, 
        ]
      },
      // NHÓM TRANG TRƯỜNG HỌC (ĐÃ ĐỒNG BỘ PATH)
      {
        path: "university",
        element: <AdminLayout />,
        children: [
          // URL: /university/dashboard
          { path: "dashboard", element: <UniversityDashboard /> }, 
          
          // URL: /university/list (Danh sách người dùng - Hình 4.4)
          { path: "list", element: <ListUser /> },

          // URL: /university/certificate/list (Danh sách VBCC - Hình 4.5)
          { path: "certificate/list", element: <CertificateList /> },

          // URL: /university/certificate/import (Import Excel - Hình 4.6)
          { path: "certificate/import", element: <ImportCertificate /> },   

          // URL: /university/certificate/issue (Phát hành đơn lẻ - Hình 4.8)
          { path: "certificate/issue", element: <IssueCertificate /> }    
        ]
      },

      //Nhom student
      {
        path: "student",
        element: <StudentLayout />,
        children: [ 
          {path:"dashboard",element:<StudentDashboard/>},

          {path:"register",element:<RegisterStudent />}
        ]

      }
    ]
  },
]);