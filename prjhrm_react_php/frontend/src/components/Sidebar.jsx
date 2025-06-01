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
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LogoHRM from "/src/assets/uploads/logo.png";


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
      if (path.startsWith("/Admin/LeaveManagement")) return ["3"];
      if (path.startsWith("/Admin/Schedule")) return ["4"];
      if (path.startsWith("/Admin/Timekeeping")) return ["5"];
      if (path.startsWith("/Admin/ConfigTimekeeping")) return ["6"];
      if (path.startsWith("/Admin/Salary")) return ["7"];
    } else if (userRole === "user") {
      if (path.startsWith("/Employee/Information")) return ["1"];
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
            label: <Link to="/Admin/LeaveManagement">Phép</Link>,
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
            label: <Link to="/Employee/Information">Điểm danh</Link>,
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
      trigger={null}
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      theme={isDarkMode ? "dark" : "light"}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100vh",
        }}
      >
        <div>
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
            <img width="30" src={LogoHRM} alt="Logo" />
            {!collapsed && (
              <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                HRM System
              </span>
            )}
            <Button
              type="text"
              style={{ display: "block" }}
              onClick={() => setCollapsed(!collapsed)}
              icon={
                collapsed ? (
                  <MenuFoldOutlined style={{ fontSize: "20px" }} />
                ) : (
                  <MenuUnfoldOutlined style={{ fontSize: "20px" }} />
                )
              }
            />
          </div>
          <Menu
            theme={isDarkMode ? "dark" : "light"}
            mode="inline"
            selectedKeys={getSelectedKeys()}
            items={menuItems}
          />
        </div>

        <div
          style={{ padding: 12, textAlign: "center", height: "fit-content" }}
        >
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
      </div>
    </Sider>
  );
};

export default Sidebar;
