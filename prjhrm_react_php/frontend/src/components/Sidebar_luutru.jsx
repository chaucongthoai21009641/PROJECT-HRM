// Sidebar.jsx
import React, { useState } from "react";
import { Layout, Menu, Button } from "antd";
import {
  UserOutlined,
  BellOutlined,
  CalendarOutlined,
  PayCircleOutlined,
  FileDoneOutlined,
  SunOutlined,
  MoonOutlined,
} from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";

const { Sider } = Layout;

const Sidebar = ({ toggleTheme, isDarkMode, userRole, onLogout }) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout(navigate); // Call the logout handler passed from App.jsx
  };

  const getSelectedKeys = () => {
    const path = location.pathname;

    if (userRole === "admin") {
      if (path.startsWith("/Admin/EmployeeManagement")) return ["1"];
      if (path.startsWith("/Admin/Announcement")) return ["2"];
      if (path.startsWith("/Admin/Donphep")) return ["3"];
      if (path.startsWith("/Admin/Schedule")) return ["4"];
      if (path.startsWith("/Admin/Timekeeping")) return ["5"];
      if (path.startsWith("/Admin/ConfigTimekeeping")) return ["6"];
      if (path.startsWith("/Admin/Salary")) return ["7"];
    } else if (userRole === "user") {
      if (path.startsWith("/Employee/InforManagement")) return ["1"];
      if (path.startsWith("/Employee/LeaveRequest")) return ["2"];
      if (path.startsWith("/Employee/Schedule")) return ["3"];
    }

    return [];
  };

  const menuItems =
    userRole === "admin"
      ? [
          {
            key: "1",
            icon: <UserOutlined />,
            label: <Link to="/Admin/EmployeeManagement">Nhân viên</Link>,
          },
          {
            key: "2",
            icon: <BellOutlined />,
            label: <Link to="/Admin/Announcement">Thông báo</Link>,
          },
          {
            key: "3",
            icon: <FileDoneOutlined />,
            label: <Link to="/Admin/DonPhep">Phép</Link>,
          },
          {
            key: "sub1",
            icon: <CalendarOutlined />,
            label: "Hành chính nhân sự",
            children: [
              {
                key: "4",
                label: <Link to="/Admin/Schedule">Thiết lập ca làm</Link>,
              },
              {
                key: "5",
                label: <Link to="/Admin/Timekeeping">Bảng chấm công</Link>,
              },
              {
                key: "6",
                label: (
                  <Link to="/Admin/ConfigTimekeeping">Cấu hình chấm công</Link>
                ),
              },
            ],
          },
          {
            key: "7",
            icon: <PayCircleOutlined />,
            label: <Link to="/Admin/Salary">Tiền lương</Link>,
          },
        ]
      : [
          {
            key: "1",
            icon: <UserOutlined />,
            label: <Link to="/Employee/Information">Thông tin cá nhân</Link>,
          },
          {
            key: "2",
            icon: <FileDoneOutlined />,
            label: <Link to="/Employee/LeaveRequest">Yêu cầu nghỉ phép</Link>,
          },
          {
            key: "3",
            icon: <CalendarOutlined />,
            label: <Link to="/Employee/Schedule">Lịch làm việc</Link>,
          },
        ];

  return (
    <Sider
      width={250}
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      theme={isDarkMode ? "dark" : "light"}
      
    >
      <div
        className="logo"
        style={{
          padding: "16px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          color: isDarkMode ? "#fff" : "#000",
        }}
      >
        <img width="30" src="/src/assets/uploads/logo.png" alt="Logo" />
        {!collapsed && (
          <span style={{ fontSize: "18px", fontWeight: "bold" }}>
            HRM System
          </span>
        )}
      </div>

      <Menu
        theme={isDarkMode ? "dark" : "light"}
        mode="inline"
        selectedKeys={getSelectedKeys()}
        items={menuItems}
      />

      <div style={{ padding: 12, textAlign: "center" }}>
        <Button
          icon={isDarkMode ? <SunOutlined /> : <MoonOutlined />}
          size="large"
          onClick={toggleTheme}
          type="default"
          style={{ marginBottom: 16 }}
        />
        <Button type="primary" danger onClick={handleLogout} block>
          Đăng xuất
        </Button>
      </div>
    </Sider>
  );
};

export default Sidebar;
