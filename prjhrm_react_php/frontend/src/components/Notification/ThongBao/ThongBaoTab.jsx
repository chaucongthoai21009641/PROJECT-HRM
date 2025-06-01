import React, { useEffect, useState } from "react";
import { notifySuccess, notifyError } from "../../../utils/NotificationUtils";
import { DeleteOutlined, EditTwoTone } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  DatePicker,
  Modal,
  Space,
  Table,
  message,
} from "antd";
import axios from "axios";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;

// const API_BASE = "http://localhost/prjhrm_react_php/backend/api/thongbao";
const BASE_URL = `${import.meta.env.VITE_API_URL}thongbao`;

const ThongBaoTab = () => {
  const [thongBaoList, setThongBaoList] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [editData, setEditData] = useState(null);

  const headers = JSON.parse(import.meta.env.VITE_AXIOS_HEADERS);

  const fetchThongBao = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/thongbao.php`, { headers });
      setThongBaoList(res.data);
    } catch (err) {
      if (err) message.error("Lỗi khi lấy danh sách thông báo!");
    }
  };

  useEffect(() => {
    fetchThongBao();
  }, []);

  const openModal = (data = null) => {
    setEditData(data);
    setModalOpen(true);

    if (data) {
      form.setFieldsValue({
        maTB: data.maTB,
        tieuDe: data.tieuDe,
        url: data.url,
        thoigian: [dayjs(data.tgBatDau), dayjs(data.tgKetThuc)],
      });
    } else {
      form.resetFields();
    }
  };

  const onFinish = async (values) => {
    const [tgBatDau, tgKetThuc] = values.thoigian;

    const payload = {
      maTB: values.maTB || "",
      tieuDe: values.tieuDe,
      url: values.url,
      tgBatDau: tgBatDau.format("YYYY-MM-DD HH:mm:ss"),
      tgKetThuc: tgKetThuc.format("YYYY-MM-DD HH:mm:ss"),
    };

    try {
      if (editData) {
        await axios.put(`${BASE_URL}/updatethongbao.php`, payload, { headers });
        notifySuccess("Cập nhật thông báo thành công!");
      } else {
        await axios.post(`${BASE_URL}/insertthongbao.php`, payload, {
          headers,
        });
        notifySuccess("Thêm thông báo mới thành công!");
      }

      setModalOpen(false);
      fetchThongBao();
    } catch (err) {
      if (err) notifyError("Có lỗi xảy ra khi lưu thông báo!");
    }
  };

  const deleteThongBao = async (id) => {
    Modal.confirm({
      title: "Xóa thông báo!",
      content: "Bạn có chắc muốn xóa thông báo này không?",
      cancelText: "Hủy bỏ",
      okText: "Xóa",
      onOk: async () => {
        try {
          await axios.post(
            `${BASE_URL}/deletethongbao.php`,
            { maTB: id },
            { headers }
          );
          notifySuccess("Xóa thông báo thành công!");
          fetchThongBao();
        } catch (err) {
          if (err) notifyError("Xóa thất bại!");
        }
      },
    });
  };

  const columns = [
    {
      title: "#",
      align: "center",
      dataIndex: "maTB",
      fixed: "left",
      key: "maTB",
    },
    { title: "Tiêu đề", align: "center", dataIndex: "tieuDe", key: "tieuDe" },
    {
      title: "URL",
      align: "center",
      dataIndex: "url",
      key: "url",
      render: (url) => (
        <a href={url} target="_blank" rel="noopener noreferrer">
          {url}
        </a>
      ),
    },
    {
      title: "Thời gian",
      align: "center",
      key: "thoigian",
      render: (_, record) => {
        const tgBatDauFormatted = dayjs(record.tgBatDau).format(
          "DD/MM/YYYY HH:mm"
        );
        const tgKetThucFormatted = dayjs(record.tgKetThuc).format(
          "DD/MM/YYYY HH:mm"
        );
        return `${tgBatDauFormatted} - ${tgKetThucFormatted}`;
      },
    },
    {
      title: "Thao tác",
      key: "action",
      fixed: "right",
      width: "7%",
      align: "center",
      render: (_, record) => (
        <Space>
          <EditTwoTone
            style={{ color: "darkblue", cursor: "pointer" }}
            onClick={() => openModal(record)}
          />

          <DeleteOutlined
            style={{ color: "red", cursor: "pointer" }}
            onClick={() => deleteThongBao(record.maTB)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Space
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: 16,
        }}
      >
        <Button type="primary" onClick={() => openModal()}>
          Thêm thông báo
        </Button>
      </Space>

      <Table
        dataSource={thongBaoList}
        columns={columns}
        rowKey="maTB"
        scroll={{ y: 400, x: "max-content" }}
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title={editData ? "Cập nhật thông báo" : "Thêm thông báo"}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onOk={() => form.submit()}
        okText={editData ? "Cập nhật" : "Thêm"}
        cancelText="Hủy bỏ"
      >
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item name="maTB" hidden>
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
            label="URL"
            name="url"
            rules={[
              { required: true, type: "url", message: "URL không hợp lệ" },
            ]}
          >
            <Input />
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
              inputReadOnly
              placeholder={["Từ ngày", "Đến ngày"]}
              order={false} // Tắt auto-swap ngày (Ant Design 5 mới hỗ trợ)
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ThongBaoTab;
