import React, { useEffect, useState, useRef } from "react";
import { Table, Typography, Spin, Alert, Button, Avatar, Space } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import { DatePicker } from "antd";
import { getColor } from "../../utils/Color";
const { Title } = Typography;
import absentIcon from "/src/assets/uploads/salary/absent.png";
// const API_BASE = "http://localhost/prjhrm_react_php/backend/api/";
const BASE_URL = `${import.meta.env.VITE_API_URL}`;

function Salary() {
  const [salaries, setSalaries] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [month, setMonth] = useState(dayjs().format("YYYY-MM"));
  const tableWrapperRef = useRef(null);
  const headers = JSON.parse(import.meta.env.VITE_AXIOS_HEADERS);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          salaryResponse,
          attendanceResponse,
          employeeResponse,
          shiftResponse,
        ] = await Promise.all([
          axios.get(`${BASE_URL}phieuluong/phieuluong.php`, { headers }),
          axios.get(`${BASE_URL}bangcong/bangcong.php`, { headers }),
          axios.get(`${BASE_URL}nhanvien/nhanvien.php`, { headers }),
          axios.get(`${BASE_URL}lichlamviec/lichlamviec.php`, { headers }),
        ]);
        setSalaries(salaryResponse.data);
        setAttendance(attendanceResponse.data);
        setEmployees(employeeResponse.data);
        setShifts(shiftResponse.data);
        setLoading(false);
      } catch {
        setError("Lỗi khi tải dữ liệu.");
        setLoading(false);
      }
    };

    fetchData();
  }, [month]);

  const getAllDaysInMonth = (month) => {
    const [year, m] = month.split("-");
    const daysInMonth = new Date(year, m, 0).getDate();
    return Array.from(
      { length: daysInMonth },
      (_, i) => `${month}-${String(i + 1).padStart(2, "0")}`
    );
  };

  const renderAttendanceForDay = (employeeId, date) => {
    const shift = shifts.find(
      (s) =>
        s.maNV === employeeId &&
        dayjs(s.ngayLamViec).format("YYYY-MM-DD") === date
    );
    if (shift && Array.isArray(attendance)) {
      const record = attendance.find((att) => att.maLLV === shift.maLLV);
      if (record) {
        return `${record.tgCheckIn || "?"} - ${record.tgCheckOut || "?"}`;
      }
      return (
        <img
          src={absentIcon}
          alt="Không có dữ liệu chấm công"
          style={{ width: 24, height: 24, objectFit: "contain" }}
        />
      );
    }
    return (
      // <img
      //   src="/src/assets/uploads/salary/no-schedule.png"
      //   alt="Không có lịch làm việc"
      //   style={{ width: 24, height: 24, objectFit: "contain" }}
      // />
      ""
    );
  };

  const getDayInVietnamese = (date) => {
    const days = ["CN", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];
    return days[dayjs(date).day()];
  };

  const getEmployeeName = (employeeId) => {
    const employee = employees.find((emp) => emp.maNV === employeeId);

    if (employee) {
      const hoTen = employee.hoTen;
      const firstChar = hoTen.charAt(0)?.toUpperCase();
      const avatarColor = getColor(firstChar); // Dùng hàm getColor để lấy màu

      return (
        <Space
          style={{
            justifyContent: "flex-start",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Avatar style={{ backgroundColor: avatarColor }}>{firstChar}</Avatar>
          {hoTen}
        </Space>
      );
    }

    return "Không xác định";
  };

  const scrollToToday = () => {
    const today = dayjs().format("YYYY-MM-DD");
    if (!today.startsWith(month)) return;

    const columnIndex = getAllDaysInMonth(month).findIndex((d) => d === today);
    if (columnIndex === -1) return;

    // Số cột fixed bên trái: "Nhân viên", "Lương cơ bản", "Lương giờ", "Lương hệ số", "Lương thưởng", "Giờ làm", "Ca làm", "Giờ OT", "Ca OT"
    const fixedLeftColumnsCount = 9;
    const targetColumn = columnIndex + fixedLeftColumnsCount + 1;

    const tableBody = tableWrapperRef.current?.querySelector(".ant-table-body");
    const cell = tableBody?.querySelector(`td:nth-child(${targetColumn})`);

    if (cell && tableBody) {
      const cellRect = cell.getBoundingClientRect();
      const bodyRect = tableBody.getBoundingClientRect();

      const offsetLeft = cellRect.left - bodyRect.left;
      const scrollX =
        tableBody.scrollLeft +
        offsetLeft -
        tableBody.clientWidth / 2 +
        cell.clientWidth / 2;

      tableBody.scrollTo({
        left: scrollX,
        top: tableBody.scrollTop,
        behavior: "smooth",
      });
    }
  };

  // Hàm format tiền
  function formatCurrency(amount) {
    if (!amount) return "0";
    return parseFloat(amount).toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  }

  const handleMonthChange = (date) => {
    if (date) {
      setMonth(date.format("YYYY-MM"));
    }
  };

  // if (loading) return <Spin tip="Đang tải dữ liệu..." />;
  if (loading) {
    return (
      <Spin tip="Đang tải dữ liệu..." spinning={true}>
        <div style={{ minHeight: 200 }} /> {/* Chỉ để hiển thị spin đẹp hơn */}
      </Spin>
    );
  }
  if (error) return <Alert message={error} type="error" showIcon />;

  const daysInMonth = getAllDaysInMonth(month);

  const columns = [
    {
      title: "Nhân viên",
      dataIndex: "maNV",
      key: "maNV",
      render: (maNV) => getEmployeeName(maNV),
      fixed: "left",
      align: "center",
      width: "7%",
    },
    {
      title: "Lương cơ bản",
      dataIndex: "luongCoBan",
      key: "luongCoBan",
      render: (value) => formatCurrency(value),
      align: "center",
      width: "2%",
    },
    {
      title: "Lương giờ",
      dataIndex: "luongGio",
      key: "luongGio",
      render: (value) => formatCurrency(value),
      align: "center",
      width: "2%",
    },
    {
      title: "Lương hệ số",
      dataIndex: "luongHeSo",
      key: "luongHeSo",
      render: (value) => formatCurrency(value),
      align: "center",
      width: "2%",
    },
    {
      title: "Lương thưởng",
      dataIndex: "luongThuong",
      key: "luongThuong",
      render: (value) => formatCurrency(value),
      width: "4%",
      align: "center",
    },
    {
      title: "Giờ làm",
      dataIndex: "gioLam",
      key: "gioLam",
      align: "center",
      width: "2%",
    },
    {
      title: "Ca làm",
      dataIndex: "caLam",
      key: "caLam",
      width: 70,

      align: "center",
    },
    {
      title: "Giờ OT",
      dataIndex: "gioOT",
      key: "gioOT",
      align: "center",
      width: 70,
    },
    {
      title: "Ca OT",
      dataIndex: "caOT",
      key: "caOT",
      align: "center",
      width: 70,
    },
    ...daysInMonth.map((date) => ({
      title: (
        <div style={{ textAlign: "center" }}>
          {dayjs(date).format("DD/MM")}
          <br />
          {getDayInVietnamese(date)}
        </div>
      ),
      key: date,
      // width: "max-content",
      width: 100,
      className: dayjs().format("YYYY-MM-DD") === date ? "today-column" : "",
      render: (_, record) => renderAttendanceForDay(record.maNV, date),
      align: "center",
    })),
    {
      title: "Tổng cộng",
      dataIndex: "tongCong",
      key: "tongCong",
      render: (value) => formatCurrency(value),
      fixed: "right",
      align: "center",
      width: 120,
    },
  ];

  return (
    <div>
      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button type="default" onClick={scrollToToday}>
          Hôm nay
        </Button>
        <DatePicker
          picker="month"
          value={dayjs(month)}
          onChange={handleMonthChange}
          format="YYYY-MM"
          placeholder="Chọn tháng"
        />
      </div>
      <div ref={tableWrapperRef}>
        <Table
          dataSource={salaries}
          columns={columns}
          rowKey="maNV"
          scroll={{ x: "max-content", y: 450 }}
          bordered
          pagination={false}
        />
      </div>
    </div>
  );
}

export default Salary;
