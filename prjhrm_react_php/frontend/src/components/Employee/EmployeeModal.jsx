import { Modal, Form, Input, InputNumber, DatePicker, Select } from "antd";
import dayjs from "dayjs";

const columnsMap = {
  hoTen: "Họ tên",
  chucDanh: "Chức danh",
  ngayVaoLam: "Ngày vào làm",
  ngaySinh: "Ngày sinh",
  soDienThoai: "Số điện thoại",
  email: "Email",
  "phieu_luong.luongCoBan": "Lương cơ bản", // Added mapping for luongCoBan
};

const genderOptions = [
  { label: "Nam", value: "Nam" },
  { label: "Nữ", value: "Nữ" },
  { label: "Khác", value: "Khác" },
];

const EmployeeModal = ({ visible, editing, form, onCancel, onOk }) => {
  return (
    <Modal
      open={visible}
      title={
        editing
          ? `Cập nhật ${columnsMap[editing.field] || editing.field}`
          : "Thêm nhân viên"
      }
      onCancel={onCancel}
      onOk={onOk}
      okText={editing ? "Cập nhật" : "Thêm"}
      cancelText="Hủy bỏ"
    >
      <Form form={form} layout="vertical">
        {editing ? (
          <Form.Item
            label={columnsMap[editing.field] || editing.field}
            name="fieldValue"
            rules={[
              ...(editing.field === "soDienThoai"
                ? [
                    {
                      validator: (_, value) => {
                        if (!value || value.trim() === "")
                          return Promise.resolve();
                        const isValid = /^0[3|5|7|8|9][0-9]{8}$/.test(value);
                        return isValid
                          ? Promise.resolve()
                          : Promise.reject("Số điện thoại không hợp lệ!");
                      },
                    },
                  ]
                : editing.field === "email"
                ? [
                    {
                      validator: (_, value) => {
                        if (!value || value.trim() === "")
                          return Promise.resolve();
                        const isValid =
                          /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(
                            value
                          );
                        return isValid
                          ? Promise.resolve()
                          : Promise.reject("Email không hợp lệ!");
                      },
                    },
                  ]
                : editing.field === "hoTen" || editing.field === "chucDanh"
                ? [
                    {
                      pattern:
                        /^[a-zA-Zàáảãạăắằẳẵặâấầẩẫậêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵđ\s]+$/i,
                      message: `${
                        columnsMap[editing.field] || editing.field
                      } không được chứa số/ký tự đặc biệt!`,
                    },
                    { required: true, message: "Không được bỏ trống!" },
                  ]
                : editing.field === "ngaySinh"
                ? []
                : [{ required: true, message: "Không được bỏ trống!" }]),
            ]}
          >
            {editing.field === "gioiTinh" ? (
              <Select options={genderOptions} style={{ width: "100%" }} />
            ) : editing.field === "ngayVaoLam" ||
              editing.field === "ngaySinh" ? (
              <DatePicker
                format="DD-MM-YYYY"
                style={{ width: "100%" }}
                value={
                  form.getFieldValue("fieldValue")
                    ? dayjs(form.getFieldValue("fieldValue"))
                    : null
                }
              />
            ) : editing.field === "phieu_luong.luongCoBan" ? (
              <InputNumber min={0} step={1} style={{ width: "100%" }} />
            ) : editing.field === "soDienThoai" ? (
              <Input type="text" />
            ) : (
              <Input />
            )}
          </Form.Item>
        ) : (
          <>
            <Form.Item
              label="Tài khoản"
              name="tenTaiKhoan"
              rules={[
                { required: true, message: "Bắt buộc nhập tài khoản!" },
                {
                  pattern: /^[a-z0-9]+$/, // chỉ chữ thường và số, không khoảng trắng, không ký tự đặc biệt
                  message:
                    "Tài khoản không chứa khoảng trắng/ký tự lạ, viết thường!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Mật khẩu"
              name="matKhau"
              rules={[{ required: true, message: "Bắt buộc nhập mật khẩu!" }]}
            >
              <Input.Password />
            </Form.Item>
          </>
        )}
      </Form>
    </Modal>
  );
};

export default EmployeeModal;
