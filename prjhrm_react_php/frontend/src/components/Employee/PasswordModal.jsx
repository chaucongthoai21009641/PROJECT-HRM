import { Modal, Input, Form } from "antd";
import { useState } from "react";
import { notifySuccess, notifyError } from "../../utils/NotificationUtils";
const PasswordModal = ({ open, onClose, userId }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const BASE_URL = `${import.meta.env.VITE_API_URL}`;
  const headers = JSON.parse(import.meta.env.VITE_AXIOS_HEADERS);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (values.newPassword !== values.confirmPassword) {
        notifyError("Mật khẩu xác nhận không khớp");
        return;
      }

      setLoading(true);

      const response = await fetch(
        `${BASE_URL}taikhoan/updatetaikhoan.php`,
        {
          method: "POST",
          headers,
          body: JSON.stringify({
            maTK: userId,
            matKhau: values.newPassword,
          }),
        }
      );
      console.log("Response:", response);

      const result = await response.json();
      if (result.message) {
        notifySuccess(result.message);
        onClose();
        form.resetFields();
      } else {
        notifyError(result.error || "Cập nhật tài khoản thất bại");
      }
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Đổi mật khẩu"
      open={open}
      onOk={handleSubmit}
      onCancel={onClose}
      confirmLoading={loading}
      okText="Cập nhật"
      cancelText="Hủy bỏ"
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Mật khẩu mới"
          name="newPassword"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu mới!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Xác nhận mật khẩu"
          name="confirmPassword"
          rules={[{ required: true, message: "Vui lòng xác nhận mật khẩu!" }]}
        >
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default PasswordModal;
