import React, { useEffect, useState, useRef } from "react";
import { Table, Typography, Spin, Alert, Button } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import { DatePicker } from "antd";

const { Title } = Typography;

function Salary() {
  const [salaries, setSalaries] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [month, setMonth] = useState(dayjs().format("YYYY-MM"));
  const tableWrapperRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          salaryResponse,
          attendanceResponse,
          employeeResponse,
          shiftResponse,
        ] = await Promise.all([
          axios.get(
            "http://localhost/prjhrm_react_php/backend/api/phieuluong/phieuluong.php"
          ),
          axios.get(
            "http://localhost/prjhrm_react_php/backend/api/bangcong/bangcong.php"
          ),
          axios.get(
            "http://localhost/prjhrm_react_php/backend/api/nhanvien/nhanvien.php"
          ),
          axios.get(
            "http://localhost/prjhrm_react_php/backend/api/lichlamviec/lichlamviec.php"
          ),
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
    if (shift) {
      const record = attendance.find((att) => att.maLLV === shift.maLLV);
      if (record) {
        return `${record.tgCheckIn || "?"} - ${record.tgCheckOut || "?"}`;
      }
      return "Không có dữ liệu chấm công";
    }
    return "Không có lịch làm việc";
  };

  const getDayInVietnamese = (date) => {
    const days = ["CN", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];
    return days[dayjs(date).day()];
  };

  const getEmployeeName = (employeeId) => {
    const employee = employees.find((emp) => emp.maNV === employeeId);
    return employee ? employee.hoTen : "Không xác định";
  };

  const scrollToToday = () => {
    const today = dayjs().format("YYYY-MM-DD");
    const daysInMonth = getAllDaysInMonth(month);

    if (!daysInMonth.includes(today)) return; // Ngày hôm nay không nằm trong tháng đang xem

    const fixedColumnsBeforeDays = 9; // số lượng cột trước phần ngày
    const columnIndex = daysInMonth.indexOf(today) + fixedColumnsBeforeDays;

    const tableBody = tableWrapperRef.current?.querySelector(".ant-table-body");
    const headerCells = tableWrapperRef.current?.querySelectorAll(
      ".ant-table-thead th"
    );

    if (tableBody && headerCells && headerCells[columnIndex]) {
      const scrollLeft = headerCells[columnIndex].offsetLeft;
      tableBody.scrollTo({ left: scrollLeft, behavior: "smooth" });
    }
  };

  const handleMonthChange = (date) => {
    if (date) {
      setMonth(date.format("YYYY-MM"));
    }
  };

  if (loading) return <Spin tip="Đang tải dữ liệu..." />;
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
    },
    {
      title: "Lương cơ bản",
      dataIndex: "luongCoBan",
      key: "luongCoBan",
      render: (value) => formatCurrency(value),
      align: "center",
    },
    {
      title: "Lương giờ",
      dataIndex: "luongGio",
      key: "luongGio",
      render: (value) => formatCurrency(value),
      align: "center",
    },
    {
      title: "Lương hệ số",
      dataIndex: "luongHeSo",
      key: "luongHeSo",
      render: (value) => formatCurrency(value),
      align: "center",
    },
    {
      title: "Lương thưởng",
      dataIndex: "luongThuong",
      key: "luongThuong",
      render: (value) => formatCurrency(value),
      align: "center",
    },
    {
      title: "Giờ làm",
      dataIndex: "gioLam",
      key: "gioLam",
      align: "center",
    },
    {
      title: "Ca làm",
      dataIndex: "caLam",
      key: "caLam",
      align: "center",
    },
    {
      title: "Giờ OT",
      dataIndex: "gioOT",
      key: "gioOT",
      align: "center",
    },
    {
      title: "Ca OT",
      dataIndex: "caOT",
      key: "caOT",
      align: "center",
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
        <Button type="primary" onClick={scrollToToday}>
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
          scroll={{ x: "max-content" }}
          bordered
        />
      </div>
    </div>
  );
}

// Hàm format tiền
function formatCurrency(amount) {
  if (!amount) return "0";
  return parseFloat(amount).toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
}

export default Salary;


