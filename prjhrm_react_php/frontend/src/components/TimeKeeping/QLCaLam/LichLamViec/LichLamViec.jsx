import React, { useEffect, useState, useCallback, useRef } from "react";
import "../../../../assets/css/LichLamViec/lichlamviec.css";
import {
  Table,
  Modal,
  Button,
  Select,
  Form,
  Input,
  DatePicker,
  TimePicker,
  InputNumber,
  Checkbox,
  Tooltip,
  Avatar,
} from "antd";
import axios from "axios";
import dayjs from "dayjs";
import {
  notifyError,
  notifySuccess,
} from "../../../../utils/NotificationUtils";
import { getColor } from "../../../../utils/Color";

getColor;
const { RangePicker } = TimePicker;

// const API_BASE = "http://localhost/prjhrm_react_php/backend/api";
const BASE_URL = `${import.meta.env.VITE_API_URL}`;
const LichLamViec = () => {
  const [month, setMonth] = useState(dayjs().format("YYYY-MM"));
  const [employees, setEmployees] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingShift, setEditingShift] = useState(null);
  // Today
  const tableWrapperRef = useRef(null); // thêm dòng này
  // Gán ca
  const [assignForm] = Form.useForm();
  const [shiftOptions, setShiftOptions] = useState([]);
  const [employeeOptions, setEmployeeOptions] = useState([]);
  const [isAssignModalOpen, setAssignModalOpen] = useState(false);
  // Delete Shift Details
  const [isMultipleSelect, setIsMultipleSelect] = useState(false); // Chế độ chọn nhiều
  const [selectedShifts, setSelectedShifts] = useState([]); // Các ca đã chọn

  useEffect(() => {
    loadData();
  }, [month]);

  const headers = JSON.parse(import.meta.env.VITE_AXIOS_HEADERS);

  // Hàm xử lý khi nhấn nút "Chọn nhiều"
  const toggleMultipleSelect = () => {
    setIsMultipleSelect((prev) => !prev);
    setSelectedShifts([]); // Reset danh sách chọn
  };

  // Hàm xử lý khi chọn một ca làm việc
  const handleClickShift = (shift) => {
    setSelectedShifts((prev) =>
      prev.includes(shift.maLLV)
        ? prev.filter((id) => id !== shift.maLLV)
        : [...prev, shift.maLLV]
    );
  };

  // Hàm xử lý xóa các ca đã chọn
  const handleDeleteMultipleShifts = async () => {
    Modal.confirm({
      title: "Xóa ca làm việc!",
      content: "Bạn có chắc chắn muốn xóa các ca đã chọn không?",
      cancelText: "Hủy bỏ",
      okText: "Xóa",
      okType: "danger",
      onOk: async () => {
        try {
          for (let shiftId of selectedShifts) {
            await axios.delete(
              `${BASE_URL}lichlamviec/deletelichlamviec.php/${shiftId}`,
              { headers }
            );
          }
          notifySuccess("Đã xóa các ca đã chọn!");
          setSelectedShifts([]); // Reset sau khi xóa
          loadData(); // Tải lại dữ liệu
        } catch (err) {
          if (err) notifyError("Lỗi khi xóa các ca.");
        }
      },
    });
  };

  // Asign shift details
  const showAssignModal = async () => {
    try {
      const [shiftsRes, employeesRes] = await Promise.all([
        axios.get(`${BASE_URL}calam/calam.php`, { headers }),
        axios.get(`${BASE_URL}nhanvien/nhanvien.php`, { headers }),
      ]);

      const shiftsData = Array.isArray(shiftsRes.data.data)
        ? shiftsRes.data.data
        : [];
      const employeesData = Array.isArray(employeesRes.data)
        ? employeesRes.data
        : [];

      setShiftOptions(shiftsData);
      setEmployeeOptions(employeesData);
      setAssignModalOpen(true);
    } catch (err) {
      if (err) notifyError("Lỗi khi tải dữ liệu gán ca");
    }
  };

  const handleAssignShift = async (values) => {
    try {
      const { maCL, maNV } = values;

      // B1: Lấy chi tiết ca làm
      const { data: shiftDetails } = await axios.get(
        `${BASE_URL}calam/getcalamdetail.php/${maCL}`,
        { headers }
      );

      if (
        !shiftDetails ||
        // !shiftDetails.chiTietCaLams ||
        shiftDetails.chiTietCaLams.length === 0
      ) {
        notifyError("Không có chi tiết ca làm việc nào cho ca này.");
        return;
      }

      const formatTime = (value) => (value ? String(value).slice(0, 5) : null);

      const getAllDatesByWeekdayInMonth = (weekday, monthStr) => {
        const [year, month] = monthStr.split("-").map(Number);
        const dates = [];
        const daysInMonth = dayjs(`${year}-${month}`).daysInMonth();

        for (let d = 1; d <= daysInMonth; d++) {
          const date = dayjs(`${year}-${month}-${d}`);
          const convertedWeekday = weekday === 7 ? 0 : weekday;
          if (date.day() === convertedWeekday) {
            dates.push(date.format("YYYY-MM-DD"));
          }
        }
        return dates;
      };

      const subtractHours = (timeStr, hours) => {
        return dayjs(`1970-01-01 ${timeStr}`)
          .subtract(hours, "hour")
          .format("HH:mm");
      };

      const addHours = (timeStr, hours) => {
        return dayjs(`1970-01-01 ${timeStr}`)
          .add(hours, "hour")
          .format("HH:mm");
      };

      let requests = [];

      shiftDetails.chiTietCaLams.forEach((detail) => {
        const workingDates = getAllDatesByWeekdayInMonth(
          detail.thuTrongTuan,
          month
        );

        workingDates.forEach((ngayLamViec) => {
          const requestData = {
            maNV,
            tenCa: shiftDetails.tenCa,
            ngayLamViec,
            tgBatDau: formatTime(detail.tgBatDau),
            tgKetThuc: formatTime(detail.tgKetThuc),
            tgBatDauNghi: formatTime(detail.tgBatDauNghi),
            tgKetThucNghi: formatTime(detail.tgKetThucNghi),
            tgCheckInSom: subtractHours(
              formatTime(detail.tgBatDau),
              shiftDetails.gioCheckInSom
            ),
            tgCheckOutMuon: addHours(
              formatTime(detail.tgKetThuc),
              shiftDetails.gioCheckOutMuon
            ),
            heSoLuong: parseFloat(detail.heSoLuong) || 1.0,
            tienThuong: parseFloat(detail.tienThuong) || 0.0,
          };

          requests.push(
            axios.post(
              `${BASE_URL}lichlamviec/insertlichlamviec.php`,
              requestData,
              { headers }
            )
          );
        });
      });

      await Promise.all(requests);

      notifySuccess("Gán ca thành công!");
      setAssignModalOpen(false);
      loadData();
      assignForm.resetFields();
    } catch (err) {
      console.error(err);
      notifyError("Lỗi khi gán ca làm việc. Vui lòng thử lại.");
    }
  };

  // Gán ca

  const fetchEmployees = async () => {
    const res = await axios.get(
      `${BASE_URL}nhanvien/nhanvien.php`,
      { headers },
      {
        // headers: { "X-CSRF-TOKEN": getCsrfToken() },
      }
    );
    setEmployees(res.data);
  };

  const fetchShifts = async () => {
    const res = await axios.get(
      `${BASE_URL}lichlamviec/lichlamviec.php`,
      { headers },
      {
        // headers: { "X-CSRF-TOKEN": getCsrfToken() },
      }
    );
    setShifts(res.data);
  };

  const loadData = useCallback(async () => {
    await Promise.all([fetchEmployees(), fetchShifts()]);
  }, []);

  const getAllDaysInMonth = (month) => {
    const [year, m] = month.split("-");
    const daysInMonth = new Date(year, m, 0).getDate();
    return Array.from(
      { length: daysInMonth },
      (_, i) => `${month}-${String(i + 1).padStart(2, "0")}`
    );
  };

  const handleAddShift = (employee, date) => {
    setEditingShift({ maNV: employee.maNV, ngayLamViec: date });
    form.resetFields();
    setModalVisible(true);
  };

  const handleEditShift = (shift) => {
    setEditingShift(shift);
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
    });
    setModalVisible(true);
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      const payload = {
        ...editingShift,
        tenCa: values.tenCa,
        tgCheckInSom: values.CheckInEarlyOutLate[0].format("HH:mm"),
        tgCheckOutMuon: values.CheckInEarlyOutLate[1].format("HH:mm"),
        tgBatDau: values.workTime[0].format("HH:mm"),
        tgKetThuc: values.workTime[1].format("HH:mm"),
        tgBatDauNghi: values.breakTime?.[0]?.format("HH:mm") ?? null,
        tgKetThucNghi: values.breakTime?.[1]?.format("HH:mm") ?? null,
        heSoLuong: values.salaryMultiplier || 1,
        tienThuong: values.bonus || 0,
      };

      if (editingShift.maLLV) {
        await axios.put(
          `${BASE_URL}lichlamviec/updatelichlamviec.php/${editingShift.maLLV}`,
          payload,
          { headers }
        );
        notifySuccess("Cập nhật lịch làm việc thành công!");
      } else {
        await axios.post(
          `${BASE_URL}lichlamviec/insertlichlamviec.php`,
          payload,
          { headers }
        );
        notifySuccess("Thêm lịch làm việc thành công!");
      }

      setModalVisible(false);
      loadData();
    } catch (error) {
      if (error) {
        console.error("Lỗi khi cập nhật lịch làm việc:", error);
      }
      // notifyError("Vui lòng nhâp");
    }
  };

  const convertDay = (date) => {
    const day = dayjs(date).day(); // 0 (Sunday) -> 6 (Saturday)
    const thuMap = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
    return thuMap[day];
  };

  const deleteScheduleTimeShiftHandle = async (values) => {
    console.log("Values Delete:", values);
    Modal.confirm({
      title: "Xóa khung giờ!",
      cancelText: "Hủy bỏ",
      okText: "Xóa",
      content: "Bạn có chắc muốn xóa khung giờ này không?",
      onOk: async () => {
        try {
          await axios.delete(
            `${BASE_URL}lichlamviec/deletelichlamviec.php/${editingShift.maLLV}`,
            { headers }
          );
          notifySuccess("Xóa khung giờ làm thành công!");
          fetchShifts();
          setModalVisible(null);
        } catch (err) {
          if (err) notifyError("Xóa khung giờ làm thất bại!");
        }
      },
    });
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
        render: (text, record) => (
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <Avatar style={{ backgroundColor: getColor(text?.charAt(0)) }}>
              {text?.charAt(0)?.toUpperCase()}
            </Avatar>
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
        className: date === today ? "today-column" : "", // <-- thêm dòng này
        render: (_, employee) => {
          const employeeShifts = shifts.filter(
            (s) => s.maNV === employee.maNV && s.ngayLamViec === date
          );
          return (
            <div
              style={{ width: "150px" }}
              className="text-center d-grid gap-2"
            >
              {employeeShifts.map((shift) => (
                <div
                  key={shift.maLLV}
                  className="d-flex justify-content-center"
                >
                  {/* Checkbox để chọn ca */}
                  <Tooltip title={`Ca: ${shift.tenCa}`}>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 8 }}
                    >
                      {isMultipleSelect && (
                        <Checkbox
                          checked={selectedShifts.includes(shift.maLLV)}
                          onChange={() => handleClickShift(shift)}
                        />
                      )}
                      <Button
                        size="large"
                        onClick={() => {
                          if (isMultipleSelect) {
                            handleClickShift(shift);
                          } else {
                            handleEditShift(shift);
                          }
                        }}
                        style={{
                          backgroundColor: isMultipleSelect
                            ? selectedShifts.includes(shift.maLLV)
                              ? "#8e8e8e"
                              : undefined
                            : undefined,
                          borderColor: isMultipleSelect ? "#a8dcf7" : undefined,
                        }}
                      >
                        {shift.tgBatDau.slice(0, 5)} -{" "}
                        {shift.tgKetThuc.slice(0, 5)}
                      </Button>
                    </div>
                  </Tooltip>
                </div>
              ))}
              <div style={{ marginTop: 4 }}>
                <Button
                  type="dashed"
                  size="middle"
                  onClick={() => handleAddShift(employee, date)}
                >
                  +
                </Button>
              </div>
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
        <div className="d-flex gap-2">
          <Button onClick={scrollToToday} type="default">
            Hôm nay
          </Button>
          <Button type="primary" onClick={showAssignModal}>
            Gán ca làm việc
          </Button>
          <Button
            type="primary"
            danger
            onClick={toggleMultipleSelect} // Thêm logic toggle chế độ chọn nhiều
          >
            {isMultipleSelect ? "Hủy chọn nhiều" : "Chọn nhiều"}
          </Button>
          <Button
            type="primary"
            danger
            onClick={handleDeleteMultipleShifts} // Thêm logic xóa các ca đã chọn
            hidden={!isMultipleSelect || selectedShifts.length === 0}
          >
            Xóa các ca đã chọn
          </Button>
        </div>
        <div>
          <DatePicker
            picker="month"
            value={dayjs(month)}
            onChange={(date) => setMonth(date.format("YYYY-MM"))}
          />
        </div>
      </div>

      <Modal
        title="Gán ca làm việc"
        open={isAssignModalOpen}
        onCancel={() => {
          setAssignModalOpen(false);
          assignForm.resetFields();
        }}
        // footer={null}
        cancelText={"Hủy bỏ"}
        onOk={() => assignForm.submit()}
        okText={"Gán ca"}
      >
        <Form layout="vertical" onFinish={handleAssignShift} form={assignForm}>
          <Form.Item
            label="Nhân viên"
            name="maNV"
            rules={[{ required: true, message: "Chọn nhân viên" }]}
          >
            <Select
              showSearch
              placeholder="Chọn nhân viên"
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={employeeOptions.map((nv) => ({
                value: nv.maNV,
                label: `${nv.maNV} - ${nv.hoTen}`,
              }))}
            />
          </Form.Item>

          <Form.Item
            label="Ca làm việc"
            name="maCL"
            rules={[{ required: true, message: "Chọn ca làm việc" }]}
          >
            <Select
              showSearch
              placeholder="Chọn ca làm việc"
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={shiftOptions.map((ca) => ({
                value: ca.maCL,
                label: `${ca.maCL} - ${ca.tenCa}`,
              }))}
            />
          </Form.Item>

          <div className="flex justify-between mt-4">
            <Button type="dashed">Ca làm mặc định</Button>
            {/* <Button type="primary" htmlType="submit">
              Gán ca
            </Button> */}
          </div>
        </Form>
      </Modal>

      {/* Gán ca */}
      <div ref={tableWrapperRef}>
        <Table
          rowKey="maNV"
          dataSource={employees}
          columns={renderTableColumns()}
          scroll={{ x: "max-content", y: 400 }}
          pagination={false}
          bordered
        />
      </div>
      <Modal
        title={
          editingShift?.maLLV ? "Cập nhật lịch làm việc" : "Thêm lịch làm việc"
        }
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          editingShift?.maLLV && (
            <Button
              key="delete"
              danger
              onClick={() => {
                // Gọi hàm xóa ở đây
                deleteScheduleTimeShiftHandle(editingShift.maLLV);
              }}
            >
              Xóa
            </Button>
          ),
          <Button key="cancel" onClick={() => setModalVisible(false)}>
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
          <Form.Item
            name="tenCa"
            label="Tên ca"
            required
            rules={[{ required: true, message: "Vui lòng nhập tên ca!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Check-in sớm và Check-out trễ"
            name="CheckInEarlyOutLate"
            required
            rules={[
              {
                required: true,
                message: "Vui lòng chọn giờ Check-in sớm và Check-out trễ!",
              },
              {
                validator: (_, value) => {
                  if (!value || value.length !== 2) return Promise.resolve();
                  const [start, end] = value;
                  if (end.isBefore(start)) {
                    return Promise.reject(
                      new Error("Check-in sớm phải trước Check-out trễ!")
                    );
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <RangePicker
              showTime={{ format: "HH:mm" }}
              format="HH:mm"
              style={{ width: "100%" }}
              inputReadOnly
              placeholder={["Check In sớm", "Check Out muộn"]}
              order={false}
            />
          </Form.Item>

          <Form.Item
            label="Thời gian làm việc"
            required
            name="workTime"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn thời gian làm việc!",
              },
              {
                validator: (_, value) => {
                  if (!value || value.length !== 2) return Promise.resolve();

                  const checkInEarlyOutLate = form.getFieldValue(
                    "CheckInEarlyOutLate"
                  );
                  const [start, end] = value;

                  // Kiểm tra logic thời gian nghỉ
                  if (end.isBefore(start)) {
                    return Promise.reject(
                      new Error(
                        "Thời gian bắt đầu phải trước Thời gian kết thúc!"
                      )
                    );
                  }

                  // Nếu workTime chưa chọn thì không kiểm tra tiếp
                  if (!checkInEarlyOutLate || checkInEarlyOutLate.length !== 2)
                    return Promise.resolve();

                  const [chechInEarLy, checkOutLate] = checkInEarlyOutLate;

                  // Nếu thời gian nghỉ nằm ngoài giờ làm việc
                  if (
                    start.isBefore(chechInEarLy) ||
                    end.isAfter(checkOutLate)
                  ) {
                    return Promise.reject(
                      new Error(
                        "Thời gian làm việc phải nằm trong Thời gian Check-in sớm và Check-out trễ!"
                      )
                    );
                  }

                  return Promise.resolve();
                },
              },
            ]}
          >
            <RangePicker
              showTime={{ format: "HH:mm" }}
              format="HH:mm"
              style={{ width: "100%" }}
              inputReadOnly
              placeholder={["Bắt đầu", "Kết thúc"]}
              order={false}
            />
          </Form.Item>

          <Form.Item
            label="Thời gian nghỉ "
            name="breakTime"
            rules={[
              {
                validator: (_, value) => {
                  if (!value || value.length !== 2) return Promise.resolve();

                  const workTime = form.getFieldValue("workTime");
                  const [breakStart, breakEnd] = value;

                  // Kiểm tra logic thời gian nghỉ
                  if (breakEnd.isBefore(breakStart)) {
                    return Promise.reject(
                      new Error("Bắt đầu nghỉ phải trước Kết thúc nghỉ!")
                    );
                  }

                  // Nếu workTime chưa chọn thì không kiểm tra tiếp
                  if (!workTime || workTime.length !== 2)
                    return Promise.resolve();

                  const [workStart, workEnd] = workTime;

                  // Nếu thời gian nghỉ nằm ngoài giờ làm việc
                  if (
                    breakStart.isBefore(workStart) ||
                    breakEnd.isAfter(workEnd)
                  ) {
                    return Promise.reject(
                      new Error("Thời gian nghỉ phải nằm trong giờ làm việc!")
                    );
                  }

                  return Promise.resolve();
                },
              },
            ]}
          >
            <RangePicker
              showTime={{ format: "HH:mm" }}
              format="HH:mm"
              style={{ width: "100%" }}
              inputReadOnly
              placeholder={["Bắt đầu nghỉ", "Kết thúc nghỉ"]}
              order={false}
            />
          </Form.Item>

          <Form.Item label="Hệ số lương" name="salaryMultiplier" required>
            <InputNumber
              min={1}
              max={10}
              step={0.1}
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item label="Thưởng" name="bonus">
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default LichLamViec;
