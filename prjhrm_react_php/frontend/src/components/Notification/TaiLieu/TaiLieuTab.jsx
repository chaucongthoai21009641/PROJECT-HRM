import React, { useEffect, useState } from "react";
import { notifySuccess, notifyError } from "../../../utils/NotificationUtils";
import { DeleteOutlined, EditTwoTone } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  Modal,
  Space,
  Table,
  DatePicker,
  message,
} from "antd";
import axios from "axios";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;

// const API_BASE = "http://localhost/prjhrm_react_php/backend/api/tailieu";
const BASE_URL = `${import.meta.env.VITE_API_URL}tailieu`;
const TaiLieuTab = () => {
  const [taiLieuList, setTaiLieuList] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [editData, setEditData] = useState(null);

  const headers = JSON.parse(import.meta.env.VITE_AXIOS_HEADERS);
  const fetchTaiLieu = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/tailieu.php`, { headers });
      setTaiLieuList(res.data);
    } catch (err) {
      if (err) message.error("Lỗi khi lấy danh sách tài liệu!");
    }
  };

  useEffect(() => {
    fetchTaiLieu();
  }, []);

  const openModal = (data = null) => {
    setEditData(data);
    setModalOpen(true);

    if (data) {
      form.setFieldsValue({
        maTL: data.maTL,
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
      maTL: values.maTL || "",
      tieuDe: values.tieuDe,
      url: values.url,
      tgBatDau: tgBatDau.format("YYYY-MM-DD HH:mm"),
      tgKetThuc: tgKetThuc.format("YYYY-MM-DD HH:mm"),
    };

    try {
      if (editData) {
        await axios.put(`${BASE_URL}/updatetailieu.php`, payload, { headers });
        notifySuccess("Cập nhật tài liệu thành công!");
      } else {
        await axios.post(`${BASE_URL}/inserttailieu.php`, payload, { headers });
        notifySuccess("Thêm tài liệu thành công!");
      }

      setModalOpen(false);
      fetchTaiLieu();
    } catch (err) {
      if (err) {
        notifyError("Có lỗi xảy ra khi lưu tài liệu!");
      }
    }
  };

  const deleteTaiLieu = async (id) => {
    Modal.confirm({
      title: "Xóa tài liệu!",
      content: "Bạn có chắc muốn xóa tài liệu này không?",
      cancelText: "Hủy bỏ",
      okText: "Xóa",
      onOk: async () => {
        try {
          await axios.post(
            `${BASE_URL}/deletetailieu.php`,
            { maTL: id },
            { headers }
          );
          notifySuccess("Xóa tài liệu thành công!");
          fetchTaiLieu();
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
      dataIndex: "maTL",
      fixed: "left",
      key: "maTL",
    },
    { title: "Tiêu đề", align: "center", dataIndex: "tieuDe", key: "tieuDe" },
    {
      title: "URL",
      dataIndex: "url",
      align: "center",
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
      align: "center",
      fixed: "right",
      width: "7%",
      key: "action",
      render: (_, record) => (
        <Space>
          <EditTwoTone
            style={{ color: "darkblue", cursor: "pointer" }}
            onClick={() => openModal(record)}
          />

          <DeleteOutlined
            style={{ color: "red", cursor: "pointer" }}
            onClick={() => deleteTaiLieu(record.maTL)}
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
          Thêm tài liệu
        </Button>
      </Space>

      <Table
        columns={columns}
        scroll={{ y: 400, x: "max-content" }}
        dataSource={taiLieuList}
        rowKey="maTL"
      />

      <Modal
        title={editData ? "Cập nhật tài liệu" : "Thêm tài liệu"}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onOk={() => form.submit()}
        okText={editData ? "Cập nhật" : "Thêm"}
        cancelText="Hủy bỏ"
      >
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item name="maTL" hidden>
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
              order={false}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TaiLieuTab;
