import React from "react";
import { Button, Input, Form, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost/prjhrm_react_php/backend/api/taikhoan/taikhoan.php",
        values
      );
      console.log("API Response:", response.data); // Debugging log
      const data = response.data;

      const user = data.find(
        (user) =>
          user.tenTaiKhoan.toLowerCase() === values.tenTaiKhoan.toLowerCase() &&
          user.matKhau === values.matKhau
      );
      console.log("User found:", user); // Debugging log

      if (user) {
        message.success("Đăng nhập thành công!");
        onLogin(user.quyenHan, navigate); // Pass user role and navigate
      } else {
        message.error("Tên tài khoản hoặc mật khẩu không đúng!");
      }
    } catch (error) {
      console.error("API Error:", error); // Debugging log
      message.error("Đã xảy ra lỗi khi kết nối đến API!");
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
