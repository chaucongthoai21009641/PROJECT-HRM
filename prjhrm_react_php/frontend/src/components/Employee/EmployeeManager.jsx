import { useState, useEffect } from "react";
import axios from "axios";
import EmployeeTable from "./EmployeeTable";
import EmployeeModal from "./EmployeeModal";
import PaymentModal from "./PaymentModal";
import PasswordModal from "./PasswordModal";
import { notifySuccess, notifyError } from "../../utils/NotificationUtils";
import { Form, message, Button, Modal, Input, Row, Col } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const headers = JSON.parse(import.meta.env.VITE_AXIOS_HEADERS);

// const BASE_URL = "http://localhost/prjhrm_react_php/backend/api/";
const BASE_URL = `${import.meta.env.VITE_API_URL}`;
console.log("BASE_URL:", BASE_URL);
export default function EmployeeManager() {
  const { Search } = Input;
  const [employees, setEmployees] = useState([]);
  const [shifts, setShifts] = useState([]); // Store shift data
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editing, setEditing] = useState(null);

  const [originalEmployees, setOriginalEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Payment
  const [paymentModalVisible, setPaymentModalVisible] = useState(false);
  const [selectedEmployeeForPayment, setSelectedEmployeeForPayment] =
    useState(null);
  const [paymentMethods, setPaymentMethods] = useState([]); // Danh sách phương thức thanh toán
  const [paymentForm] = Form.useForm();

  // Change password
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [selectedEmployeeForPassword, setSelectedEmployeeForPassword] =
    useState(null);

  const handleChangePasswordClick = (employee) => {
    setSelectedEmployeeForPassword(employee);
    setPasswordModalVisible(true);
  };

  // Gọi khi click vào nút "Thanh toán"
  const handlePaymentClick = async (employee) => {
    setSelectedEmployeeForPayment(employee);
    paymentForm.resetFields();

    try {
      const response = await axios.get(`${BASE_URL}thanhtoan/thanhtoan.php`, {
        headers,
      });
      const allPayments = response.data;

      // Lọc phương thức thanh toán theo nhân viên
      const employeePayments = allPayments.filter(
        (method) => method.maNV === employee.maNV
      );
      setPaymentMethods(employeePayments);
    } catch (err) {
      console.error(err);
      notifyError("Không thể tải danh sách phương thức thanh toán!");
    }

    setPaymentModalVisible(true);
  };

  const handlePaymentSubmit = async () => {
    try {
      const values = await paymentForm.validateFields();
      await axios.post(
        `${BASE_URL}thanhtoan/insertthanhtoan.php`,
        {
          ...values,
          maNV: selectedEmployeeForPayment.maNV,
        },
        { headers }
      );
      console.log("Thêm phương thức thanh toán thành công!", values);
      notifySuccess("Thêm phương thức thanh toán thành công!");

      // Cập nhật lại danh sách phương thức thanh toán
      handlePaymentClick(selectedEmployeeForPayment);
    } catch (err) {
      console.error(err);
      notifyError("Thêm phương thức thanh toán thất bại!");
    }
  };

  // const handlePaymentUpdate = async () => {
  //   try {
  //     const values = await paymentForm.validateFields();

  //     await axios.post(`${BASE_URL}thanhtoan/updatethanhtoan.php`, values, {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     notifySuccess("Cập nhật phương thức thanh toán thành công!");

  //     // Cập nhật lại danh sách
  //     handlePaymentClick(selectedEmployeeForPayment);
  //     // Reset form để không còn hiện nút "Cập nhật"
  //     paymentForm.resetFields();
  //   } catch (err) {
  //     console.error(err);
  //     notifyError("Cập nhật phương thức thanh toán thất bại!");
  //   }
  // };

  const handlePaymentDelete = async (maTT) => {
    try {
      await axios.post(
        `${BASE_URL}thanhtoan/deletethanhtoan.php`,
        { maTT },
        { headers }
      );
      notifySuccess("Xóa phương thức thanh toán thành công!");

      // Cập nhật lại danh sách phương thức thanh toán
      handlePaymentClick(selectedEmployeeForPayment);
    } catch (err) {
      console.error(err);
      notifyError("Xóa phương thức thanh toán thất bại!");
    }
  };

  const handleUpdatePayment = async (data) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/thanhtoan/updatethanhtoan.php`,
        data,
        {
          headers,
        }
      );
      console.log("data0", data);

      console.log("Test!", response.data.status);
      if (response.data.status) {
        notifySuccess("Cập nhật phương thức thanh toán thành công!");
        handlePaymentClick(selectedEmployeeForPayment);
      } else {
        notifyError("Cập nhật phương thức thanh toán thất bại!");
      }
    } catch (err) {
      console.error("Lỗi khi cập nhật:", err);
      notifyError("Có lỗi xảy ra khi cập nhật.");
    }
  };

  // const handleSetDefaultPayment = async (maTT) => {
  //   try {
  //     // Gọi API để đặt phương thức thanh toán mặc định
  //     await axios.post(`${BASE_URL}thanhtoan/setdefault.php`, { maTT });
  //     notifySuccess("Đặt mặc định thành công!");

  //     // Cập nhật lại danh sách phương thức thanh toán
  //     handlePaymentClick(selectedEmployeeForPayment);
  //   } catch (err) {
  //     console.error(err);
  //     notifyError("Đặt mặc định thất bại!");
  //   }
  // };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [employeeRes, shiftRes] = await Promise.all([
        axios.get(`${BASE_URL}NhanVien/nhanvien.php`, { headers }),
        axios.get(`${BASE_URL}calam/calam.php`, { headers }),
      ]);
      console.log(`${BASE_URL}NhanVien/nhanvien.php`, `test`);
      console.log("Employee data:", employeeRes.data); // thêm dòng này
      setEmployees(employeeRes.data);
      setOriginalEmployees(employeeRes.data);
      setShifts(shiftRes.data.data); // Lưu danh sách ca làm
    } catch (err) {
      if (err) message.error("Không thể tải dữ liệu.");
    }
    setLoading(false);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Nếu không nhập gì thì hiển thị lại toàn bộ danh sách
    if (!value.trim()) {
      setEmployees(originalEmployees);
      return;
    }

    // Tách các từ khóa tìm kiếm
    const keywords = value.toLowerCase().split(" ").filter(Boolean);

    // Lọc dữ liệu nhân viên
    const filtered = originalEmployees.filter((employee) => {
      return keywords.every((kw) => {
        // Kiểm tra tất cả các trường trong employee
        return Object.values(employee).some((field) => {
          console.log("Checking field:", field);
          if (field) {
            // Chuẩn hóa và so sánh trường dữ liệu
            return field.toString().trim().toLowerCase().includes(kw);
          }
          return false;
        });
      });
    });

    setEmployees(filtered);
  };

  const handleAdd = () => {
    setEditing(null);
    form.resetFields();
    setModalVisible(true);
  };

  // const handleEdit = (record, field) => {
  //   let value;

  //   // Handle nested fields like phieu_luong.luongCoBan
  //   if (field.includes(".")) {
  //     const [parent, child] = field.split(".");
  //     value = record[parent]?.[child];
  //   } else {
  //     value =
  //       field === "ngayVaoLam" || (field === "ngaySinh" && record[field])
  //         ? dayjs(record[field])
  //         : record[field];
  //   }

  //   form.setFieldsValue({ fieldValue: value });
  //   setEditing({ id: record.maNV, field });
  //   setModalVisible(true);
  // };

  const handleEdit = (record, field) => {
    let value;

    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      value = record[parent]?.[child];
    } else if (field === "soDienThoai") {
      // Format về dạng chuỗi có đầu 0
      let phone = String(record[field] || "").trim();
      if (phone.startsWith("+84")) {
        phone = "0" + phone.slice(3);
      }
      if (/^\d{9}$/.test(phone) && !phone.startsWith("0")) {
        phone = "0" + phone;
      }
      value = phone;
    } else if (
      (field === "ngayVaoLam" || field === "ngaySinh") &&
      record[field]
    ) {
      value = dayjs(record[field]);
    } else {
      value = record[field];
    }

    form.setFieldsValue({ fieldValue: value });
    setEditing({ id: record.maNV, field });
    setModalVisible(true);
  };

  const handleStatusChange = async (maNV, status) => {
    try {
      await axios.put(
        `${BASE_URL}NhanVien/updatenhanvien.php`,
        {
          maNV,
          fieldName: "trangThai",
          fieldValue: status,
        },
        { headers }
      );
      notifySuccess("Cập nhật trạng thái thành công!");
      fetchData();
    } catch {
      notifyError("Cập nhật trạng thái thất bại!");
    }
  };

  const handleSalaryStyleChange = async (record, newKieuLuong) => {
    try {
      await axios.put(
        `${BASE_URL}phieuluong/updatephieuluong.php`,

        {
          maNV: record.maNV,
          fieldName: "kieuLuong",
          fieldValue: newKieuLuong,
        },
        { headers }
      );
      notifySuccess("Cập nhật kiểu lương thành công!");
      fetchData();
    } catch {
      notifyError("Cập nhật kiểu lương thất bại!");
    }
  };

  const handleShiftChange = async (record, newShift) => {
    try {
      await axios.put(
        `${BASE_URL}NhanVien/updatenhanvien.php`,
        {
          maNV: record.maNV,
          fieldName: "maCL",
          fieldValue: newShift,
        },
        { headers }
      );
      notifySuccess("Cập nhật ca làm thành công!");
      fetchData();
    } catch {
      notifyError("Cập nhật ca làm thất bại!");
    }
  };

  const handleGenderChange = async (record, newGender) => {
    try {
      await axios.put(
        `${BASE_URL}nhanvien/updatenhanvien.php`,
        {
          maNV: record.maNV,
          fieldName: "gioiTinh",
          fieldValue: newGender,
        },
        { headers }
      );
      notifySuccess("Cập nhật giới tính thành công!");
      fetchData();
    } catch {
      notifyError("Cập nhật giới tính thất bại!");
    }
  };

  const handleModalOk = async () => {
    let values;
    try {
      values = await form.validateFields();
    } catch (err) {
      console.error("Lỗi validate form:", err);
      return;
    }

    if (editing) {
      let fieldValue = values.fieldValue;

      if (editing.field === "ngayVaoLam" || editing.field === "ngaySinh") {
        fieldValue = dayjs(fieldValue).format("YYYY-MM-DD");
      }

      try {
        if (editing.field === "phieu_luong.luongCoBan") {
          // Handle updating luongCoBan
          await axios.put(
            `${BASE_URL}phieuluong/updatephieuluong.php`,
            {
              maNV: editing.id,
              fieldName: "luongCoBan",
              fieldValue,
            },
            { headers }
          );
          notifySuccess("Cập nhật lương cơ bản thành công!");
        } else {
          // Handle other fields
          await axios.put(
            `${BASE_URL}nhanvien/updatenhanvien.php`,
            {
              maNV: editing.id,
              fieldName: editing.field,
              fieldValue,
            },
            { headers }
          );
          notifySuccess("Cập nhật thành công!");
        }
        setModalVisible(false);
        fetchData();
      } catch (err) {
        console.error("Error updating field:", err);
        notifyError("Cập nhật thất bại!");
      }
    } else {
      try {
        const body = new URLSearchParams({
          tenTaiKhoan: values.tenTaiKhoan,
          matKhau: values.matKhau,
          hoTen: "",
          chucDanh: "",
          soDienThoai: "",
          email: "",
          gioiTinh: "",
          ngaySinh: dayjs().format("YYYY-MM-DD"),
          trangThai: "1",
          ngayVaoLam: dayjs().format("YYYY-MM-DD"),
        });

        const response = await axios.post(
          `${BASE_URL}NhanVien/insertnhanvien.php`,
          body,
          { headers }
        );

        if (response.data?.message) {
          notifySuccess("Thêm nhân viên thành công!");
        }

        setModalVisible(false);
        fetchData();
      } catch (err) {
        console.error("Lỗi chi tiết:", err);
        notifyError("Thêm nhân viên thất bại!");
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Row justify="end" align="middle" style={{ marginBottom: 16 }}>
        <Col flex="1">
          <Search
            placeholder="Tìm nhân viên..."
            value={searchTerm}
            onChange={handleSearchChange}
            style={{ width: "30%", marginRight: "1rem" }}
            allowClear
            enterButton
          />
        </Col>
        <Col>
          <Button type="primary" onClick={handleAdd} icon={<PlusOutlined />}>
            Thêm nhân viên
          </Button>
        </Col>
      </Row>
      <EmployeeTable
        employees={employees}
        shifts={shifts} // Truyền danh sách ca làm vào EmployeeTable
        loading={loading}
        onEdit={handleEdit}
        onStatusChange={handleStatusChange}
        onSalaryStyleChange={handleSalaryStyleChange}
        onShiftChange={handleShiftChange} // Truyền hàm xử lý thay đổi ca làm
        onGenderChange={handleGenderChange} // Truyền hàm xử lý thay đổi giới tính
        onPayment={handlePaymentClick}
        onChangePassword={handleChangePasswordClick}
      />
      <EmployeeModal
        visible={modalVisible}
        editing={editing}
        form={form}
        onCancel={() => setModalVisible(false)}
        onOk={handleModalOk}
      />
      <PasswordModal
        open={passwordModalVisible}
        onClose={() => setPasswordModalVisible(false)}
        userId={selectedEmployeeForPassword?.tai_khoan?.maTK}
      />
      <PaymentModal
        visible={paymentModalVisible}
        form={paymentForm}
        onCancel={() => setPaymentModalVisible(false)}
        onSubmit={handlePaymentSubmit}
        onUpdate={handleUpdatePayment}
        paymentMethods={paymentMethods}
        onDelete={handlePaymentDelete}
        // onSetDefault={handleSetDefaultPayment}
      />
    </div>
  );
}
