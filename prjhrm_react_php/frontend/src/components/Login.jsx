import React from "react";
import { Button, Input, Form, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const BASE_URL = `${import.meta.env.VITE_API_URL}`;
const Login = ({ onLogin }) => {
  const navigate = useNavigate();

  const headers = JSON.parse(import.meta.env.VITE_AXIOS_HEADERS);

  // checkLogin()
  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(
        `${BASE_URL}taikhoan/login.php`,
        values,
        { headers }
      );

      if (response.data.success) {
        const user = response.data.user;

        const resNV = await axios.get(`${BASE_URL}nhanvien/nhanvien.php`, {
          headers,
        });
        const nhanVien = Array.isArray(resNV.data)
          ? resNV.data.find((nv) => nv.tai_khoan?.maTK === user.maTK)
          : resNV.data;

        if (nhanVien) {
          message.success("Đăng nhập thành công!");

          localStorage.setItem(
            "loggedUser",
            JSON.stringify({
              quyenHan: user.quyenHan,
              maNV: nhanVien.maNV,
            })
          );

          onLogin(user.quyenHan, navigate);
        }
      } else {
        message.error(response.data.message || "Sai tài khoản hoặc mật khẩu");
      }
    } catch (error) {
      console.error("API Error:", error);
      message.error("Lỗi kết nối đến máy chủ");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#f0f2f5",
      }}
    >
      <Form
        name="login"
        onFinish={handleSubmit}
        layout="vertical"
        style={{
          width: "25%",
          padding: 24,
          background: "#fff",
          borderRadius: 8,
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 style={{ textAlign: "center", color: "black" }}>Đăng nhập</h2>
        <Form.Item
          name="tenTaiKhoan"
          label={<span style={{ color: "black" }}>Tên tài khoản</span>}
          rules={[{ required: true, message: "Vui lòng nhập tài khoản!" }]}
        >
          <Input placeholder="Tên tài khoản" />
        </Form.Item>
        <Form.Item
          name="matKhau"
          label={<span style={{ color: "black" }}>Mật khẩu</span>}
          style={{ color: "black" }}
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
        >
          <Input.Password placeholder="Mật khẩu" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
