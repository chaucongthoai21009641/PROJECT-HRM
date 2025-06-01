import { Table, Space, Dropdown, Tag, Select, Avatar, Tooltip } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import React from "react";
import dayjs from "dayjs";
const kieuLuongOptions = [
  { label: "Lương giờ có trừ trễ", value: "Lương giờ có trừ trễ" },
  { label: "Lương giờ không trừ trễ", value: "Lương giờ không trừ trễ" },
  {
    label: "Lương giờ làm bao nhiêu tính bấy nhiêu",
    value: "Lương giờ làm bao nhiêu tính bấy nhiêu",
  },
  { label: "Lương tháng có trừ trễ", value: "Lương tháng có trừ trễ" },
  { label: "Lương tháng không trừ trễ", value: "Lương tháng không trừ trễ" },
  {
    label: "Lương tháng làm bao nhiêu tính bấy nhiêu",
    value: "Lương tháng làm bao nhiêu tính bấy nhiêu",
  },
];

import { getColor } from "../../utils/Color";

const genderOptions = [
  { label: "Nam", value: "Nam" },
  { label: "Nữ", value: "Nữ" },
  { label: "Khác", value: "Khác" },
];

export default function EmployeeTable({
  employees,
  shifts, // Nhận danh sách ca làm
  loading,
  onEdit,
  onStatusChange,
  onSalaryStyleChange,
  onChangePassword,
  onShiftChange, // Callback để xử lý thay đổi ca làm
  onGenderChange, // Callback để xử lý thay đổi giới tính
  onPayment,
}) {
  const [hoveredField, setHoveredField] = React.useState(null);

  // Hàm format số điện thoại
  const formatPhone = (phone) => {
    if (!phone) return "-";
    let str = String(phone).trim();

    if (str.startsWith("+84")) {
      str = "0" + str.slice(3);
    }
    if (/^\d{9}$/.test(str) && !str.startsWith("0")) {
      str = "0" + str;
    }
    return str;
  };

  const columns = [
    {
      title: "#",
      width: "5%",
      align: "center",
      dataIndex: "maNV",
    },
    {
      title: "Tài khoản",
      width: "10%",
      align: "center",
      dataIndex: ["tai_khoan", "tenTaiKhoan"],
      render: (text, record) => (
        <Space
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            // gap: 8,
          }}
        >
          <Dropdown
            menu={{
              items: [
                {
                  label: "Hoạt động",
                  key: "1",
                  onClick: () => onStatusChange(record.maNV, 1),
                },
                {
                  label: "Không hoạt động",
                  key: "0",
                  onClick: () => onStatusChange(record.maNV, 0),
                },
              ],
            }}
          >
            <button
              onClick={(e) => e.preventDefault()}
              style={{
                border: "none",
                background: "none",
                padding: 0,
                cursor: "pointer",
              }}
            >
              <Tag color={record.trangThai === 1 ? "green" : "red"}>
                {record.trangThai === 1 ? "On" : "Off"}
              </Tag>
            </button>
          </Dropdown>

          <span>{text}</span>
        </Space>
      ),
    },
    {
      title: "Họ tên",
      dataIndex: "hoTen",
      width: "10%",
      align: "center",
      render: (text, record) => (
        <div style={{ textAlign: "left" }}>
          <Space
            onMouseEnter={() => setHoveredField(`${record.maNV}-hoTen`)}
            onMouseLeave={() => setHoveredField(null)}
          >
            <Avatar style={{ backgroundColor: getColor(text?.charAt(0)) }}>
              {text?.charAt(0)?.toUpperCase()}
            </Avatar>
            <Tooltip title={text}>
              <div
                onClick={() => onEdit(record, "hoTen")}
                style={{
                  cursor: "pointer",
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 1,
                  overflow: "hidden",
                  textAlign: "left",
                }}
              >
                <span
                  style={
                    {
                      // display: "inline-flex",
                      // alignItems: "center",
                      // gap: 4,
                    }
                  }
                >
                  {text || "-"}
                  <EditOutlined
                    style={{
                      fontSize: 12,
                      opacity: hoveredField === `${record.maNV}-hoTen` ? 1 : 0,
                      transition: "opacity 0.2s",
                    }}
                  />
                </span>
              </div>
            </Tooltip>
          </Space>
        </div>
      ),
    },
    ...Object.entries({
      chucDanh: "Chức danh",
      ngayVaoLam: "Ngày vào làm",
      gioiTinh: "Giới tính",
      "phieu_luong.luongCoBan": "Lương cơ bản",
      "ca_lam.tenCa": "Tên ca",
      "phieu_luong.kieuLuong": "Kiểu lương",
      soDienThoai: "Số điện thoại",
      ngaySinh: "Ngày sinh",
      email: "Email",
    }).map(([field, label]) => ({
      title: label,
      align: "center",
      width:
        field === "ngayVaoLam"
          ? "150px"
          : field === "ngaySinh"
          ? "150px"
          : field === "phieu_luong.luongCoBan"
          ? "150px"
          : field === "soDienThoai"
          ? "150px"
          : field === "phieu_luong.kieuLuong"
          ? 200
          : 150,
      dataIndex:
        field.includes("phieu_luong") || field.includes("ca_lam")
          ? field.split(".")
          : field,
      render: (text, record) => {
        const isHover = hoveredField === `${record.maNV}-${field}`;
        const shouldClamp = field === "chucDanh" || field === "email";
        // Sửa ở đây để format số điện thoại
        const displayText =
          field === "soDienThoai" ? formatPhone(text) : text || "-";

        if (field === "gioiTinh") {
          return (
            <Select
              value={text}
              options={genderOptions}
              style={{ width: "100%" }}
              onChange={(value) => onGenderChange(record, value)}
            />
          );
        }

        if (field === "ca_lam.tenCa") {
          return (
            <Select
              value={record.ca_lam?.maCL ?? null}
              // options={shifts.map((shift) => ({
              options={(Array.isArray(shifts) ? shifts : []).map((shift) => ({
                label: shift.tenCa,
                value: shift.maCL,
              }))}
              style={{ width: "100%" }}
              onChange={(value) => onShiftChange(record, value)}
            />
          );
        }

        if (field === "phieu_luong.kieuLuong") {
          return (
            <Select
              value={text}
              options={kieuLuongOptions}
              style={{ width: 200 }}
              onChange={(value) => onSalaryStyleChange(record, value)}
            />
          );
        }

        if (field === "ngayVaoLam" || field === "ngaySinh") {
          const formatted =
            text && text !== "0000-00-00" && dayjs(text).isValid()
              ? dayjs(text).format("DD-MM-YYYY")
              : "-";

          return (
            <div
              style={{
                cursor: "pointer",
                display: "flex", // đổi từ inline-flex (mặc định) sang flex nếu cần
                justifyContent: "center", // căn trái nội dung
                alignItems: "center",
                width: "100%",
              }}
              onMouseEnter={() => setHoveredField(`${record.maNV}-${field}`)}
              onMouseLeave={() => setHoveredField(null)}
              onClick={() => onEdit(record, field)}
            >
              {formatted}
              <EditOutlined
                style={{
                  fontSize: 12,
                  marginLeft: 4,
                  opacity: isHover ? 1 : 0,
                  transition: "opacity 0.2s",
                }}
              />
            </div>
          );
        }

        const content = (
          <span
            style={{
              cursor: "pointer",
              // gap: 4,
            }}
            onClick={() => onEdit(record, field)}
            onMouseEnter={() => setHoveredField(`${record.maNV}-${field}`)}
            onMouseLeave={() => setHoveredField(null)}
          >
            {displayText}
            <EditOutlined
              style={{
                fontSize: 12,
                opacity: text ? (isHover ? 1 : 0) : 1,
                transition: "opacity 0.2s",
              }}
            />
          </span>
        );

        return shouldClamp ? (
          <Tooltip title={displayText}>
            <div
              style={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 1,
                overflow: "hidden",
                textAlign: "center",
                // maxWidth: 150,
                // maxWidth: 80,
              }}
            >
              {content}
            </div>
          </Tooltip>
        ) : (
          content
        );
      },
    })),
    {
      align: "center",
      fixed: "right",
      width: "1%",
      render: (_, record) => {
        const items = [
          {
            key: "changePassword",
            label: "Đổi mật khẩu",
            onClick: () => onChangePassword(record),
          },
          {
            key: "paymentMethod",
            label: "Phương thức thanh toán",
            onClick: () => onPayment(record),
          },
        ];

        return (
          <Dropdown menu={{ items }} trigger={["click"]}>
            <SettingOutlined style={{ cursor: "pointer" }} />
          </Dropdown>
        );
      },
    },
  ];

  return (
    <Table
      columns={columns}
      // dataSource={employees}
      dataSource={Array.isArray(employees) ? employees : []} // Đảm bảo luôn là mảng
      rowKey="maNV"
      loading={loading}
      style={{ marginTop: 20 }}
      scroll={{ x: "max-content", y: "65vh" }}
    />
  );
}
