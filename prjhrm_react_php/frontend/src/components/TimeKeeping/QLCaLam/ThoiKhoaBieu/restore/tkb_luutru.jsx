import React, { useState, useEffect, memo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import dayjs from "dayjs";
import {
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  InputNumber,
  TimePicker,
  Checkbox,
  Col,
  Row,
} from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import {
  notifySuccess,
  notifyError,
} from "../../../../../utils/NotificationUtils";

import axios from "axios";
const { RangePicker } = TimePicker;

const days = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"];
const dayIndices = {
  "Thứ 2": 1,
  "Thứ 3": 2,
  "Thứ 4": 3,
  "Thứ 5": 4,
  "Thứ 6": 5,
  "Thứ 7": 6,
  "Chủ nhật": 7,
};
const weekDays = days.map((d, i) => ({ label: d, value: i + 1 }));

const ThoiKhoaBieu = () => {
  const [form] = Form.useForm();
  const [editShiftForm] = Form.useForm();
  const [addOrEditTimeForm] = Form.useForm();
  const [shiftData, setShiftData] = useState([]);
  const [timeDetails, setTimeDetails] = useState([]);
  const [activeModal, setActiveModal] = useState(null); // 'addShift', 'editShift', 'addTime', 'editTime'
  const [editingShift, setEditingShift] = useState(null);
  const [editingTimeShift, setEditingTimeShift] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [shiftToDelete, setShiftToDelete] = useState(null);

  useEffect(() => {
    fetchShiftData();
    fetchTimeDetails();
  }, []);

  // Điền dữ liệu khi click editShift
  useEffect(() => {
    if (editingShift) {
      editShiftForm.setFieldsValue({
        id: editingShift.id,
        shiftName: editingShift.type,
        checkInEarly: Math.abs(editingShift.checkIn),
        checkOutLate: editingShift.checkOut,
      });
    }
  }, [editingShift, editShiftForm]);

  // Điền dữ liệu khi click editTimeShift
  useEffect(() => {
    if (editingTimeShift && activeModal === "editTime") {
      addOrEditTimeForm.setFieldsValue({
        id: editingTimeShift.maCTCL,
        workTime: [
          dayjs(editingTimeShift.tgBatDau, "HH:mm"),
          dayjs(editingTimeShift.tgKetThuc, "HH:mm"),
        ],
        breakTime:
          editingTimeShift.tgBatDauNghi && editingTimeShift.tgKetThucNghi
            ? [
                dayjs(editingTimeShift.tgBatDauNghi, "HH:mm"),
                dayjs(editingTimeShift.tgKetThucNghi, "HH:mm"),
              ]
            : null,
        salaryMultiplier: editingTimeShift.heSoLuong,
        bonus: editingTimeShift.tienThuong,
        maCL: editingTimeShift.maCL,
      });
    } else if (activeModal === "addTime") {
      addOrEditTimeForm.resetFields();
    }
  }, [editingTimeShift, addOrEditTimeForm, activeModal]);

  useEffect(() => {
    if (timeDetails.length && shiftData.length) {
      const updated = shiftData.map((shift) => {
        const schedule = {};

        timeDetails.forEach((detail) => {
          if (detail.maCL === shift.id && detail.maCTCL) {
            const thu = detail.thuTrongTuan;
            const time = `${detail.tgBatDau.slice(
              0,
              5
            )} - ${detail.tgKetThuc.slice(0, 5)}`;
            const item = {
              maCTCL: detail.maCTCL,
              time,
              ...detail, // Nếu bạn muốn giữ thêm bonus, breakTime, etc
            };

            if (!schedule[thu]) {
              schedule[thu] = [];
            }

            schedule[thu].push(item);
          }
        });

        return {
          ...shift,
          schedule, // { 2: [{ maCTCL: 1, time: '08:00 - 17:00' }, ...], ... }
        };
      });

      const isDifferent = JSON.stringify(updated) !== JSON.stringify(shiftData);
      if (isDifferent) setShiftData(updated);
    }
  }, [timeDetails, shiftData]);

  const fetchShiftData = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost/prjhrm_react_php/backend/api/calam/calam.php"
      );
      const shifts = data.map((shift) => ({
        id: shift.maCL,
        type: shift.tenCa,
        checkIn: -shift.gioCheckInSom,
        checkOut: shift.gioCheckOutMuon,
        schedule: Object.fromEntries(
          Object.values(dayIndices).map((d) => [d, null])
        ),
      }));
      setShiftData(shifts);
    } catch (err) {
      console.error("Error fetching shift data:", err);
    }
  };

  const fetchTimeDetails = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost/prjhrm_react_php/backend/api/chitietcalam/chitietcalam.php"
      );
      setTimeDetails(data);
    } catch (err) {
      console.error("Error fetching time details:", err);
    }
  };

  const handleAddShift = async (values) => {
    try {
      // Bước 1: Gửi dữ liệu vào insertcalam.php
      const calamRes = await axios.post(
        "http://localhost/prjhrm_react_php/backend/api/calam/insertcalam.php",
        {
          tenCa: values.shiftName,
          gioCheckInSom: values.checkInEarly,
          gioCheckOutMuon: values.checkOutLate,
        }
      );

      // ✅ Nếu trùng tên ca -> thông báo lỗi và dừng
      if (calamRes.data.exist) {
        notifyError("Tên ca làm đã tồn tại, vui lòng chọn tên khác!");
        return;
      }

      console.log("calamRes", calamRes); // Kiểm tra phản hồi từ API
      const maCL = calamRes.data.maCL;
      if (!maCL) throw new Error("Không nhận được mã ca làm");

      // Bước 2: Gửi chi tiết làm việc theo từng ngày
      const startTime = values.workTime[0].format("HH:mm");
      const endTime = values.workTime[1].format("HH:mm");
      const breakStart = values.breakTime?.[0]?.format("HH:mm") ?? null;
      const breakEnd = values.breakTime?.[1]?.format("HH:mm") ?? null;
      const heSoLuong = values.salaryMultiplier || 1;
      const tienThuong = values.bonus || 0;

      const requests = values.workDays.map((thuTrongTuan) =>
        axios.post(
          "http://localhost/prjhrm_react_php/backend/api/chitietcalam/insertchitietcalam.php",
          {
            thuTrongTuan,
            tgBatDau: startTime,
            tgKetThuc: endTime,
            tgBatDauNghi: breakStart,
            tgKetThucNghi: breakEnd,
            heSoLuong,
            tienThuong,
            maCL,
          }
        )
      );

      await Promise.all(requests);

      // Bước 3: Cập nhật UI
      await fetchShiftData();
      await fetchTimeDetails();
      form.resetFields();
      notifySuccess("Thêm ca làm thành công!");
      setActiveModal(null);
    } catch (err) {
      console.error("Lỗi khi thêm ca làm:", err);
      notifyError("Thêm ca làm thất bại!");
    }
  };

  const handleEditShiftSubmit = async (updatedValues) => {
    try {
      const updatedShift = {
        maCL: updatedValues.id,
        tenCa: updatedValues.shiftName,
        gioCheckInSom: updatedValues.checkInEarly, // Giữ nguyên giờ check-in sớm
        gioCheckOutMuon: updatedValues.checkOutLate, // Giữ nguyên giờ check-out trễ
      };

      // Gửi yêu cầu cập nhật ca làm
      const response = await axios.post(
        `http://localhost/prjhrm_react_php/backend/api/calam/updatecalam.php/${updatedValues.id}`,
        updatedShift
      );

      // Nếu trùng tên ca -> thông báo lỗi và dừng
      if (response.data.exist) {
        notifyError("Tên ca làm đã tồn tại, vui lòng chọn tên khác!");
        return;
      }

      if (response.data.status === "200") {
        // Cập nhật lại dữ liệu trên UI nếu cập nhật thành công
        setShiftData((prev) =>
          prev.map((shift) =>
            shift.id === updatedValues.id
              ? { ...shift, ...updatedShift }
              : shift
          )
        );
        notifySuccess("Cập nhật ca làm thành công!");
        await fetchShiftData();
        await fetchTimeDetails();
        editShiftForm.resetFields();
        // form.resetFields();
        setActiveModal(null);
      } else {
        notifyError("Cập nhật ca làm thất bại!");
      }
    } catch (error) {
      console.error("Error updating shift:", error);
      notifyError("Chỉnh sửa thất bại. Vui lòng thử lại1");
    }
  };

  // Handle Add / Edit TimeShift
  const addOrEditTimeHandle = async (values) => {
    try {
      if (activeModal === "addTime") {
        const payload = {
          maCL: editingShift.id,
          thuTrongTuan: selectedDay,
          tgBatDau: values.workTime[0].format("HH:mm"),
          tgKetThuc: values.workTime[1].format("HH:mm"),
          tgBatDauNghi: values.breakTime?.[0]?.format("HH:mm") ?? null,
          tgKetThucNghi: values.breakTime?.[1]?.format("HH:mm") ?? null,
          heSoLuong: values.salaryMultiplier || 1,
          tienThuong: values.bonus || 0,
        };
        const response = await axios.post(
          "http://localhost/prjhrm_react_php/backend/api/chitietcalam/insertchitietcalam.php",
          payload
        );
        response.status === 200
          ? notifySuccess("Thêm khung giờ làm thành công!")
          : notifyError("Thêm khung giờ làm thất bại!");
      } else if (activeModal === "editTime") {
        const payload = {
          maCTCL: editingTimeShift.maCTCL,
          tgBatDau: values.workTime[0].format("HH:mm"),
          tgKetThuc: values.workTime[1].format("HH:mm"),
          tgBatDauNghi: values.breakTime?.[0]?.format("HH:mm") ?? null,
          tgKetThucNghi: values.breakTime?.[1]?.format("HH:mm") ?? null,
          heSoLuong: values.salaryMultiplier || 1,
          tienThuong: values.bonus || 0,
        };
        const response = await axios.put(
          `http://localhost/prjhrm_react_php/backend/api/chitietcalam/updatechitietcalam.php/${editingTimeShift.maCTCL}`,
          payload
        );
        console.log(
          `http://localhost/prjhrm_react_php/backend/api/chitietcalam/updatechitietcalam.php/${editingTimeShift.maCTCL}`
        );
        // setTimeDetails((prev) =>
        //   prev.map((timeShfit) =>
        //     timeShfit.id === values.id
        //       ? { ...timeShfit, ...payload }
        //       : timeShfit
        //   )
        // );
        console.log(response.data); // Xem chi tiết phản hồi từ API
        console.log(payload); // Xem chi tiết phản hồi từ API
        response.status === 200
          ? notifySuccess("Cập nhật khung giờ thành công")
          : notifyError("Cập nhật khung giờ thành công");
      }

      await fetchTimeDetails();
      addOrEditTimeForm.resetFields();
      setActiveModal(null);
    } catch (error) {
      console.error("API error:", error);
      notifyError("Cố lỗi xảy ra. Vui lòng thử lại!");
    }
  };

  // tạo 1 biến setIDTimeShift vào columns để lấy maCTCL ở button time shift
  const deleteTimeShiftHandle = async (values) => {
    console.log("Values Delete:", values);
    Modal.confirm({
      title: "Xóa khung giờ!",
      cancelText: "Hủy bỏ",
      okText: "Xóa",
      content: "Bạn có chắc muốn xóa khung giờ này không?",
      onOk: async () => {
        try {
          const response = await axios.delete(
            `http://localhost/prjhrm_react_php/backend/api/chitietcalam/deletechitietcalam.php/${editingTimeShift.maCTCL}`
          );
          console.log(response);
          response.status === 200
            ? notifySuccess("Xóa khung giờ làm thành công!")
            : notifyError("Xóa khung giờ làm thất bại!");
          fetchTimeDetails();
          setActiveModal(null);
        } catch (err) {
          if (err) notifyError("Xóa thất bại. Có lỗi xảy ra!");
        }
      },
    });
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.post(
        "http://localhost/prjhrm_react_php/backend/api/calam/deletecalam.php",
        {
          maCL: shiftToDelete.id,
        }
      );
      setShiftData((prev) =>
        prev.filter((shift) => shift.id !== shiftToDelete.id)
      );
      notifySuccess("Xóa ca làm thành công!");
    } catch {
      Modal.error({ content: "Xóa thất bại. Vui lòng thử lại!" });
      notifyError("Xóa ca làm thất bại!");
    }
    setShiftToDelete(null);
  };

  const columns = [
    {
      title: "Ca",
      width: "12%",
      key: "shiftType",
      render: (_, record) => (
        <div>
          <b>{record.type}</b>
          <div>Check-in: {record.checkIn} giờ</div>
          <div>Check-out: {record.checkOut} giờ</div>
          <Space style={{ marginTop: 8 }}>
            <Button
              icon={<EditOutlined />}
              size="small"
              onClick={() => {
                setEditingShift(record);
                setActiveModal("editShift");
                editShiftForm.resetFields();
              }}
            >
              Chỉnh sửa
            </Button>
            <Button
              icon={<DeleteOutlined />}
              size="small"
              danger
              onClick={() => setShiftToDelete(record)}
            >
              Xóa
            </Button>
          </Space>
        </div>
      ),
    },
    ...days.map((day, i) => ({
      title: <div className="text-center">{day}</div>,
      key: `day_${i + 2}`,
      render: (_, record) => {
        const value = record.schedule[dayIndices[day]];
        return value && value.length > 0 ? (
          <div className="text-center">
            {value.map((item) => (
              <div key={item.maCTCL} className="mb-2">
                <Button
                  size="large" // small, large, default
                  onClick={() => {
                    const chiTiet = timeDetails.find(
                      (ct) => ct.maCTCL === item.maCTCL
                    );

                    setEditingTimeShift(chiTiet);
                    console.log("chi tiết:", chiTiet);
                    setActiveModal("editTime");
                  }}
                >
                  {item.time}
                </Button>
              </div>
            ))}
            <Button
              type="dashed"
              shape="square"
              onClick={() => {
                setEditingShift(record);
                setSelectedDay(dayIndices[day]);
                setActiveModal("addTime");
              }}
            >
              <PlusOutlined />
            </Button>
          </div>
        ) : (
          <div className="text-center align-top">
            <Button
              type="dashed"
              shape="square"
              onClick={() => {
                setEditingShift(record);
                setSelectedDay(dayIndices[day]);
                setActiveModal("addTime");
              }}
            >
              <PlusOutlined />
            </Button>
          </div>
        );
      },
    })),
  ];

  return (
    <div>
      <Row justify="end" align="middle">
        <Col>
          <Button
            type="primary"
            style={{ marginBottom: 16 }}
            onClick={() => setActiveModal("addShift")}
          >
            + Thêm ca làm
          </Button>
        </Col>
      </Row>
      <Table
        columns={columns}
        dataSource={shiftData.map((s) => ({ ...s, key: s.id }))}
        pagination={false}
        scroll={{ y: 450, x: "max-content" }}
        bordered
      />
      {/* AddShiftModal */}
      <Modal
        title="Thêm mới ca làm việc"
        open={activeModal === "addShift"}
        onCancel={() => {
          form.resetFields();
          setActiveModal(null);
        }}
        cancelText={"Hủy bỏ"}
        // footer={null}

        onOk={() => form.submit()}
        okText={"Thêm"}
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={handleAddShift}
          initialValues={{
            checkInEarly: 1,
            checkOutLate: 1,
            salaryMultiplier: 1,
            bonus: 0,
            workDays: [],
            tgBatDauNghi: null,
            tgKetThucNghi: null,
          }}
        >
          <Form.Item
            label="Tên ca"
            name="shiftName"
            rules={[{ required: true, message: "Vui lòng nhập tên ca!" }]}
          >
            <Input style={{ width: "100%" }} />
          </Form.Item>

          <Space>
            <Form.Item label="Giờ Check-in sớm" name="checkInEarly">
              <InputNumber min={1} max={6} style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item label="Giờ Check-out trễ" name="checkOutLate">
              <InputNumber min={1} max={6} style={{ width: "100%" }} />
            </Form.Item>
          </Space>

          <Form.Item
            label="Thời gian làm việc"
            required
            name="workTime"
            rules={[
              { required: true, message: "Vui lòng chọn thời gian làm việc!" },
              {
                validator: (_, value) => {
                  if (!value || value.length !== 2) return Promise.resolve();
                  const [start, end] = value;
                  if (end.isBefore(start)) {
                    return Promise.reject(
                      new Error(
                        "Thời gian bắt đầu phải trước Thời gian kết thúc!"
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
            label="Thời gian nghỉ"
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

          <Form.Item
            label="Hệ số lương"
            name="salaryMultiplier"
            rules={[
              {
                required: true,
                message: "Hế số lương phải >=1.0",
              },
            ]}
          >
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

          <Form.Item label="Chọn thứ làm việc (*)" name="workDays">
            <Checkbox.Group options={weekDays} style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      </Modal>

      {/* EditShiftModal */}
      <Modal
        title="Chỉnh sửa ca làm"
        open={activeModal === "editShift"}
        onCancel={() => setActiveModal(null)}
        onOk={() => editShiftForm.submit()}
        okText="Cập nhật"
        cancelText="Hủy"
      >
        <Form
          layout="vertical"
          // form={form}
          onFinishFailed={(err) => {
            console.log("Submit failed", err);
          }}
          form={editShiftForm}
          onFinish={handleEditShiftSubmit}
          initialValues={{
            id: editingShift?.id,
            shiftName: editingShift?.type,
            checkInEarly: Math.abs(editingShift?.checkIn),
            checkOutLate: editingShift?.checkOut,
          }}
        >
          <Form.Item name="id" hidden>
            <Input />
          </Form.Item>

          <Form.Item label="Tên ca" name="shiftName">
            <Input />
          </Form.Item>

          <Form.Item label="Giờ Check-in sớm" name="checkInEarly">
            <InputNumber min={1} max={6} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item label="Giờ Check-out trễ" name="checkOutLate">
            <InputNumber min={1} max={6} style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      </Modal>

      {/* Add/Edit Time Modal */}
      <Modal
        title={
          activeModal === "editTime"
            ? "Chỉnh sửa khung giờ"
            : "Thêm mới khung giờ"
        }
        open={["addTime", "editTime"].includes(activeModal)}
        onCancel={() => setActiveModal(null)}
        // cancelText="Hủy bỏ"
        // onOk={() => addOrEditTimeForm.submit()}
        // okText={activeModal === "editTime" ? "Cập nhật" : "Thêm"}
        footer={
          activeModal === "editTime" ? (
            <>
              <Button
                // danger
                // variant="solid"
                variant="outlined"
                color="danger"
                onClick={deleteTimeShiftHandle}
              >
                Xóa
              </Button>
              <Button onClick={() => setActiveModal(null)}>Hủy bỏ</Button>
              <Button type="primary" onClick={() => addOrEditTimeForm.submit()}>
                Cập nhật
              </Button>
            </>
          ) : (
            <>
              <Button onClick={() => setActiveModal(null)}>Hủy bỏ</Button>
              <Button type="primary" onClick={() => addOrEditTimeForm.submit()}>
                Thêm
              </Button>
            </>
          )
        }
      >
        <Form
          layout="vertical"
          form={addOrEditTimeForm}
          onFinish={addOrEditTimeHandle}
          initialValues={{
            salaryMultiplier: 1,
            bonus: 0,
          }}
        >
          <Form.Item
            label="Thời gian làm việc"
            required
            name="workTime"
            rules={[
              { required: true, message: "Vui lòng chọn thời gian làm việc!" },
              {
                validator: (_, value) => {
                  if (!value || value.length !== 2) return Promise.resolve();
                  const [start, end] = value;
                  if (end.isBefore(start)) {
                    return Promise.reject(
                      new Error(
                        "Thời gian bắt đầu phải trước Thời gian kết thúc!"
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
            label="Thời gian nghỉ"
            name="breakTime"
            rules={[
              {
                validator: (_, value) => {
                  if (!value || value.length !== 2) return Promise.resolve();

                  // Lấy giá trị workTime từ form addOrEditTimeForm
                  const workTime = addOrEditTimeForm.getFieldValue("workTime");
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

          <Form.Item
            label="Hệ số lương"
            name="salaryMultiplier"
            required
            min={1}
            max={10}
            step={0.1}
            rules={[{ required: true, message: "Hệ số lương phải >= 1.0" }]}
          >
            <InputNumber
              min={1}
              max={10}
              step={0.1}
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item label="Thưởng" name="bonus" min={0}>
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      </Modal>

      {/* Confirm Delete Modal */}
      <Modal
        title="Xác nhận xóa"
        open={!!shiftToDelete}
        onOk={handleDeleteConfirm}
        onCancel={() => setShiftToDelete(null)}
        okText="Xóa"
        cancelText="Hủy bỏ"
      >
        <p>Bạn có chắc chắn muốn xóa ca làm này?</p>
      </Modal>
    </div>
  );
};

export default memo(ThoiKhoaBieu);
