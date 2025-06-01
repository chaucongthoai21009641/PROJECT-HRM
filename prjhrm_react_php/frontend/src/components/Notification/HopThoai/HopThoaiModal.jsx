import React, { useEffect } from "react";
import { Modal, Form, Input, InputNumber, DatePicker } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { notifySuccess, notifyError } from "../../../utils/NotificationUtils";

dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;

// const API_BASE = "http://localhost/prjhrm_react_php/backend/api/hopthoai";
const BASE_URL = `${import.meta.env.VITE_API_URL}hopthoai`;
const HopThoaiModal = ({
  modalOpen,
  setModalOpen,
  fetchHopThoai,
  editData,
  setEditData,
}) => {
  const [form] = Form.useForm();

  const headers = JSON.parse(import.meta.env.VITE_AXIOS_HEADERS);

  useEffect(() => {
    if (editData) {
      form.setFieldsValue({
        maHT: editData.maHT,
        tieuDe: editData.tieuDe,
        noiDung: editData.noiDung,
        url: editData.url,
        soLanHienThi: Number(editData.soLanHienThi),
        thoigian: [dayjs(editData.tgBatDau), dayjs(editData.tgKetThuc)],
      });
    } else form.resetFields();
  }, [editData, form]);

  const onFinish = async (values) => {
    const [tgBatDau, tgKetThuc] = values.thoigian;

    const payload = {
      maHT: values.maHT || "",
      tieuDe: values.tieuDe,
      noiDung: values.noiDung,
      url: values.url,
      soLanHienThi: values.soLanHienThi,
      tgBatDau: tgBatDau.format("YYYY-MM-DD HH:mm"),
      tgKetThuc: tgKetThuc.format("YYYY-MM-DD HH:mm"),
    };

    try {
      if (editData) {
        await axios.put(`${BASE_URL}/updatehopthoai.php`, payload, { headers });
        notifySuccess("Cập nhật thành công!");
      } else {
        await axios.post(`${BASE_URL}/inserthopthoai.php`, payload, {
          headers,
        });
        notifySuccess("Thêm mới hộp thoại thành công!");
      }

      setModalOpen(false);
      fetchHopThoai();
      setEditData(null); // Reset the edit data
    } catch (err) {
      if (err) notifyError("Có lỗi xảy ra khi lưu!");
    }
  };

  return (
    <Modal
      title={editData ? "Cập nhật hộp thoại" : "Thêm hộp thoại"}
      open={modalOpen}
      onCancel={() => setModalOpen(false)}
      onOk={() => form.submit()}
      okText={editData ? "Cập nhật" : "Thêm"}
      cancelText="Hủy bỏ"
    >
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item name="maHT" hidden>
          <Input />
        </Form.Item>

        <Form.Item
          label="Tiêu đề"
          name="tieuDe"
          rules={[{ required: true, message: "Vui lòng nhập tiêu đề" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Nội dung"
          name="noiDung"
          rules={[{ required: true, message: "Vui lòng nhập nội dung" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="URL"
          name="url"
          rules={[
            { required: false, type: "url", message: "URL không hợp lệ" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Số lần hiển thị"
          name="soLanHienThi"
          rules={[{ required: true, message: "Vui lòng nhập số lần" }]}
        >
          <InputNumber min={1} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Thời gian"
          name="thoigian"
          rules={[
            { required: true, message: "Vui lòng chọn thời gian" },
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
            format="DD/MM/YYYY HH:mm"
            style={{ width: "100%" }}
            placeholder={["Từ ngày", "Đến ngày"]}
            order={false}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default HopThoaiModal;
