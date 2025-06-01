import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  Table,
  Modal,
  Button,
  Form,
  DatePicker,
  TimePicker,
  Tooltip,
  Row,
  Col,
  InputNumber,
} from "antd";
import axios from "axios";
import dayjs from "dayjs";
import {
  notifyError,
  notifySuccess,
  notifyAlert,
} from "../../../utils/NotificationUtils";

// const API_BASE = "http://localhost/prjhrm_react_php/backend/api";
const BASE_URL = `${import.meta.env.VITE_API_URL}`;
const BangChamCong = () => {
  const [month, setMonth] = useState(dayjs().format("YYYY-MM"));
  const [employees, setEmployees] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [timeAttendance, setTimeAttendance] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingShift, setEditingShift] = useState(null);
  const tableWrapperRef = useRef(null);

  const headers = JSON.parse(import.meta.env.VITE_AXIOS_HEADERS);

  useEffect(() => {
    loadData();
  }, [month]);

  const fetchEmployees = async () => {
    const res = await axios.get(`${BASE_URL}nhanvien/nhanvien.php`, {
      headers,
    });
    setEmployees(res.data);
  };

  const fetchShifts = async () => {
    const res = await axios.get(`${BASE_URL}lichlamviec/lichlamviec.php`, {
      headers,
    });
    setShifts(res.data);
  };

  //   const fetchTimeAttendance = async () => {
  //     const res = await axios.get(`${API_BASE}/bangcong/bangcong.php`, {});
  //     setTimeAttendance(res.data);
  //   };

  const fetchTimeAttendance = async () => {
    try {
      const res = await axios.get(`${BASE_URL}bangcong/bangcong.php`, {
        headers,
      });

      // Kiểm tra xem dữ liệu trả về có phải là một mảng hay không
      if (Array.isArray(res.data)) {
        setTimeAttendance(res.data);
      } else {
        // Nếu không phải mảng, có thể log lỗi hoặc xử lý theo cách khác
        setTimeAttendance([]);
      }
    } catch (error) {
      console.error("Có lỗi khi lấy dữ liệu chấm công:", error);
      setTimeAttendance([]); // Set giá trị mặc định là mảng rỗng nếu có lỗi
    }
  };

  const loadData = useCallback(async () => {
    await Promise.all([fetchEmployees(), fetchShifts(), fetchTimeAttendance()]);
  }, []);

  const getAllDaysInMonth = (month) => {
    const [year, m] = month.split("-");
    const daysInMonth = new Date(year, m, 0).getDate();
    return Array.from(
      { length: daysInMonth },
      (_, i) => `${month}-${String(i + 1).padStart(2, "0")}`
    );
  };

  const handleEditShift = (shift) => {
    setEditingShift(shift);
    const attendanceData = timeAttendance.find(
      (ta) => ta.maLLV === shift.maLLV
    );

    form.setFieldsValue({
      tenCa: shift.tenCa,
      workTime: [
        dayjs(shift.tgBatDau, "HH:mm"),
        dayjs(shift.tgKetThuc, "HH:mm"),
      ],
      breakTime:
        shift.tgBatDauNghi && shift.tgKetThucNghi
          ? [
              dayjs(shift.tgBatDauNghi, "HH:mm"),
              dayjs(shift.tgKetThucNghi, "HH:mm"),
            ]
          : null,
      CheckInEarlyOutLate: [
        dayjs(shift.tgCheckInSom, "HH:mm"),
        dayjs(shift.tgCheckOutMuon, "HH:mm"),
      ],
      salaryMultiplier: parseFloat(shift.heSoLuong) || 1.0,
      bonus: parseFloat(shift.tienThuong) || 0.0,
      CheckIn:
        attendanceData && attendanceData.tgCheckIn
          ? dayjs(attendanceData.tgCheckIn, "HH:mm")
          : undefined,
      CheckOut:
        attendanceData && attendanceData.tgCheckOut
          ? dayjs(attendanceData.tgCheckOut, "HH:mm")
          : undefined,
    });
    setModalVisible(true);
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();

      const checkIn = values.CheckIn;
      const checkOut = values.CheckOut;

      // ⚠️ Trường hợp CheckOut có mà CheckIn không có
      if (checkOut && !checkIn) {
        notifyError("Bạn cần nhập giờ Check-in trước khi nhập giờ Check-out!");
        return;
      }

      // ⚠️ Trường hợp CheckIn > CheckOut
      if (checkIn && checkOut && checkIn.isAfter(checkOut)) {
        notifyError("Giờ Check-in phải trước giờ Check-out!");
        return;
      }

      const payload = {
        tgCheckIn: checkIn ? checkIn.format("HH:mm") : null,
        tgCheckOut: checkOut ? checkOut.format("HH:mm") : null,
        maLLV: editingShift.maLLV,
      };

      const attendanceData = timeAttendance.find(
        (ta) => ta.maLLV === editingShift.maLLV
      );

      if (attendanceData && editingShift.maLLV === attendanceData?.maLLV) {
        const response = await axios.put(
          `${BASE_URL}bangcong/updatebangcong.php/${attendanceData.maBC}`,
          payload,
          { headers }
        );
        console.log("Payload:", payload);
        console.log(
          `${BASE_URL}bangcong/updatebangcong.php/${attendanceData.maBC}`
        );

        response.status === 200
          ? notifySuccess("Cập nhật thời gian chấm công thành công!")
          : notifyError("Cập nhật thời gian chấm công thất bại!");
      } else if (!editingShift.maBC) {
        const response = await axios.post(
          `${BASE_URL}bangcong/insertbangcong.php`,
          payload,
          { headers }
        );
        response.status === 200
          ? notifySuccess("Thêm thời gian chấm công thành công!")
          : notifyError("Thêm thời gian chấm công thất bại!");
      }

      setModalVisible(false);
      form.resetFields();
      loadData();
    } catch (error) {
      console.error("Lỗi trong catch block:", error);
      notifyError("Đã có lỗi xảy ra khi cập nhật chấm công!");
    }
  };

  const handleCheckFull = () => {
    if (!editingShift) return;

    const checkInTime = dayjs(editingShift.tgBatDau, "HH:mm");
    const checkOutTime = dayjs(editingShift.tgKetThuc, "HH:mm");

    form.setFieldsValue({
      CheckIn: checkInTime,
      CheckOut: checkOutTime,
    });

    notifyAlert("Đã chấm đủ công theo giờ làm việc. Vui lòng xác nhận lại!");
  };

  const convertDay = (date) => {
    const day = dayjs(date).day();
    const thuMap = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
    return thuMap[day];
  };

  const renderTableColumns = () => {
    const days = getAllDaysInMonth(month);
    const today = dayjs().format("YYYY-MM-DD");

    const columns = [
      {
        title: "Nhân viên",
        align: "center",
        dataIndex: "hoTen",
        fixed: "left",
        render: (_, record) => (
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src="/images/default-avatar.png"
              alt="Avatar"
              width={40}
              height={40}
              style={{ borderRadius: "50%", marginRight: 8 }}
            />
            {record.hoTen}
          </div>
        ),
      },
      ...days.map((date) => ({
        title: (
          <div className="text-center">
            {dayjs(date).format("DD/MM")}
            <br />
            <small>{convertDay(date)}</small>
          </div>
        ),
        dataIndex: date,
        className: date === today ? "today-column" : "",
        render: (_, employee) => {
          const employeeShifts = shifts.filter(
            (s) => s.maNV === employee.maNV && s.ngayLamViec === date
          );

          const attendanceData = timeAttendance.filter(
            (ta) => ta.maLLV === employeeShifts[0]?.maLLV
          );

          return (
            <div
              style={{ width: "130px" }}
              className="text-center d-grid gap-2"
            >
              {employeeShifts.map((shift) => {
                const attendance = timeAttendance.find(
                  (ta) => ta.maLLV === shift.maLLV
                );

                return (
                  <div
                    key={shift.maLLV}
                    className="d-flex justify-content-center"
                  >
                    <Tooltip
                      title={
                        <>
                          <div className="text-center">{shift.tenCa}</div>
                          <div className="text-center">
                            {shift.tgBatDau.slice(0, 5)} -{" "}
                            {shift.tgKetThuc.slice(0, 5)}
                          </div>
                        </>
                      }
                    >
                      <Button
                        size="large"
                        onClick={() => handleEditShift(shift)}
                      >
                        {attendance?.tgCheckIn
                          ? attendance.tgCheckIn.slice(0, 5)
                          : "?"}{" "}
                        -{" "}
                        {attendance?.tgCheckOut
                          ? attendance.tgCheckOut.slice(0, 5)
                          : "?"}
                      </Button>
                    </Tooltip>
                  </div>
                );
              })}
              <div style={{ marginTop: 4 }}></div>
            </div>
          );
        },
      })),
    ];

    return columns;
  };

  const scrollToToday = () => {
    const today = dayjs().format("YYYY-MM-DD");

    if (!today.startsWith(month)) return;

    const columnIndex = getAllDaysInMonth(month).findIndex((d) => d === today);

    const columnSelector = `.ant-table-body td:nth-child(${columnIndex + 2})`;
    const cell = tableWrapperRef.current?.querySelector(columnSelector);
    const tableBody = tableWrapperRef.current?.querySelector(".ant-table-body");

    if (cell && tableBody) {
      const currentScrollTop = tableBody.scrollTop;

      // Tính vị trí để căn giữa cell hôm nay
      const offsetLeft = cell.offsetLeft;
      const scrollX =
        offsetLeft - tableBody.clientWidth / 2 + cell.clientWidth / 2;

      tableBody.scrollTo({
        left: scrollX,
        top: currentScrollTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between mb-3">
        <Button onClick={scrollToToday} type="default">
          Hôm nay
        </Button>
        <div>
          <DatePicker
            picker="month"
            value={dayjs(month)}
            onChange={(date) => setMonth(date.format("YYYY-MM"))}
          />
        </div>
      </div>

      <div ref={tableWrapperRef}>
        <Table
          rowKey="maNV"
          dataSource={employees}
          columns={renderTableColumns()}
          scroll={{ x: "max-content", y: 500 }}
          pagination={false}
          bordered
        />
      </div>

      <Modal
        title={
          editingShift?.maLLV
            ? "Cập nhật thời gian chấm công"
            : "Thêm lịch chấm công"
        }
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          form.resetFields();
        }}
        onOk={handleModalOk}
        okText={editingShift?.maLLV ? "Cập nhật" : "Thêm"}
        cancelText="Hủy bỏ"
        footer={[
          <Button
            color="cyan"
            variant="solid"
            key="checkFull"
            onClick={handleCheckFull}
          >
            Chấm đủ công
          </Button>,
          <Button
            key="cancel"
            onClick={() => {
              setModalVisible(false);
              form.resetFields();
            }}
          >
            Hủy bỏ
          </Button>,
          <Button key="submit" type="primary" onClick={handleModalOk}>
            {editingShift?.maLLV ? "Cập nhật" : "Thêm"}
          </Button>,
        ]}
      >
        <Form
          layout="vertical"
          form={form}
          initialValues={{
            salaryMultiplier: 1,
            bonus: 0,
          }}
        >
          <Form.Item>
            <div
              style={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 16,
                color: "#fff",
                marginBottom: 16,
              }}
            >
              Thông tin ca làm
            </div>
            <div style={{ lineHeight: 2 }}>
              <Row>
                <Col span={14}>
                  <span>Tên ca:</span>
                </Col>
                <Col span={5}>{form.getFieldValue("tenCa") || "—"}</Col>
              </Row>

              <Row>
                <Col span={14}>
                  <span style={{ color: "#1964e5" }}>Thời gian làm việc:</span>
                </Col>
                <Col span={5}>
                  {form.getFieldValue("workTime")
                    ? `${form
                        .getFieldValue("workTime")[0]
                        .format("HH:mm")} - ${form
                        .getFieldValue("workTime")[1]
                        .format("HH:mm")}`
                    : "—"}
                </Col>
              </Row>

              <Row>
                <Col span={14}>
                  <span style={{ color: "#ffc53d" }}>Thời gian nghỉ:</span>
                </Col>
                <Col span={5}>
                  {form.getFieldValue("breakTime")
                    ? `${form
                        .getFieldValue("breakTime")[0]
                        .format("HH:mm")} - ${form
                        .getFieldValue("breakTime")[1]
                        .format("HH:mm")}`
                    : "—"}
                </Col>
              </Row>

              <Row>
                <Col span={14}>
                  <span style={{ color: "#52c41a" }}>
                    Check-in sớm / Check-out muộn:
                  </span>
                </Col>
                <Col span={5}>
                  {form.getFieldValue("CheckInEarlyOutLate")
                    ? `${form
                        .getFieldValue("CheckInEarlyOutLate")[0]
                        .format("HH:mm")} - ${form
                        .getFieldValue("CheckInEarlyOutLate")[1]
                        .format("HH:mm")}`
                    : "—"}
                </Col>
              </Row>

              <Row>
                <Col span={14}>
                  <span style={{ color: "#" }}>Hệ số lương</span>
                </Col>
                <Col span={5}>
                  {form.getFieldValue("salaryMultiplier")
                    ? `${form.getFieldValue("salaryMultiplier")}`
                    : "—"}
                </Col>
              </Row>

              <Row>
                <Col span={14}>
                  <span style={{ color: "#" }}>Thưởng</span>
                </Col>
                <Col span={5}>
                  {form.getFieldValue("bonus")
                    ? `${form.getFieldValue("bonus")}`
                    : "—"}
                </Col>
              </Row>
            </div>
          </Form.Item>

          <Form.Item label="Thời gian chấm công">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="CheckIn">
                  <TimePicker
                    showTime={{ format: "HH:mm" }}
                    format="HH:mm"
                    style={{ width: "100%" }}
                    placeholder="Check-in"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="CheckOut">
                  <TimePicker
                    showTime={{ format: "HH:mm" }}
                    format="HH:mm"
                    style={{ width: "100%" }}
                    placeholder="Check-out"
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default BangChamCong;
