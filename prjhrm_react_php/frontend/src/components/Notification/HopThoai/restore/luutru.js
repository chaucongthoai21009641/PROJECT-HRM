import React, { useEffect, useState } from "react";
import { notifySuccess, notifyError } from "../../../../utils/NotificationUtils";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Space,
  message,
} from "antd";
import axios from "axios";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;

const API_BASE = "http://localhost/projhrm_react_php/backend/api/hopthoai";

const HopThoaiMain = () => {
  const [hopThoaiList, setHopThoaiList] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [editData, setEditData] = useState(null);

  const fetchHopThoai = async () => {
    try {
      const res = await axios.get(`${API_BASE}/hopthoai.php`);
      setHopThoaiList(res.data);
    } catch (err) {
      message.error("Lỗi khi lấy danh sách hộp thoại!");
    }
  };

  useEffect(() => {
    fetchHopThoai();
  }, []);

  const openModal = (data = null) => {
    setEditData(data);
    setModalOpen(true);

    if (data) {
      form.setFieldsValue({
        maHT: data.maHT,
        tieuDe: data.tieuDe,
        noiDung: data.noiDung,
        url: data.url,
        soLanHienThi: Number(data.soLanHienThi),
        thoigian: [dayjs(data.tgBatDau), dayjs(data.tgKetThuc)],
      });
    } else {
      form.resetFields();
    }
  };

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
        await axios.put(`${API_BASE}/updatehopthoai.php`, payload);
        notifySuccess("Cập nhật thành công!");
      } else {
        await axios.post(`${API_BASE}/inserthopthoai.php`, payload);
        notifySuccess("Thêm mới hộp thoại thành công!");
      }

      setModalOpen(false);
      fetchHopThoai();
    } catch (err) {
      notifyError("Có lỗi xảy ra khi lưu!");
    }
  };

  const deleteHopThoai = async (id) => {
    Modal.confirm({
      title: "Xóa hộp thoại!",
      content: "Bạn có chắc muốn xóa hộp thoại này không?",
      onOk: async () => {
        try {
          await axios.post(`${API_BASE}/deletehopthoai.php`, { maHT: id });
          notifySuccess("Xóa hộp thoại thành công!");
          fetchHopThoai();
        } catch (err) {
          notifyError("Xóa thất bại!");
        }
      },
    });
  };

  return (
    <div>
      <Space
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: 16,
        }}
      >
        <Button type="primary" onClick={() => openModal()} className="mb-4">
          Thêm hộp thoại
        </Button>
      </Space>

      <Row gutter={[16, 16]}>
        {hopThoaiList.map((item) => (
          <Col key={item.maHT} span={8}>
            <Card title={item.tieuDe} bordered={false}>
              <p>{item.noiDung}</p>
              <p>🌐 {item.url}</p>
              <p>Số lần hiển thị: {item.soLanHienThi}</p>
              <p>
                ⏰ {item.tgBatDau} - {item.tgKetThuc}
              </p>
              <Space>
                <Button
                  type="primary"
                  size="small"
                  onClick={() => openModal(item)}
                >
                  ✏️ Sửa
                </Button>
                <Button
                  danger
                  size="small"
                  onClick={() => deleteHopThoai(item.maHT)}
                >
                  🗑 Xóa
                </Button>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal
        title={editData ? "Cập nhật hộp thoại" : "Thêm hộp thoại"}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onOk={() => form.submit()}
        okText={editData ? "Cập nhật" : "Thêm"}
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
            <Input className="ant-picker-input" />
          </Form.Item>

          <Form.Item
            label="Nội dung"
            name="noiDung"
            rules={[{ required: true, message: "Vui lòng nhập nội dung" }]}
          >
            <Input className="ant-picker-input" />
          </Form.Item>

          <Form.Item
            label="URL"
            name="url"
            rules={[
              { required: true, type: "url", message: "URL không hợp lệ" },
            ]}
          >
            <Input className="ant-picker-input" />
          </Form.Item>

          <Form.Item
            label="Số lần hiển thị"
            name="soLanHienThi"
            rules={[{ required: true, message: "Vui lòng nhập số lần" }]}
          >
            <InputNumber
              min={1}
              className="ant-picker-input"
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            label="Thời gian"
            name="thoigian"
            rules={[{ required: true, message: "Vui lòng chọn thời gian" }]}
          >
            <RangePicker
              showTime={{ format: "HH:mm" }}
              format="YYYY-MM-DD HH:mm"
              style={{ width: "100%" }}
              inputReadOnly
              className="ant-picker-input"
              placeholder={["Từ ngày", "Đến ngày"]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default HopThoaiMain;
