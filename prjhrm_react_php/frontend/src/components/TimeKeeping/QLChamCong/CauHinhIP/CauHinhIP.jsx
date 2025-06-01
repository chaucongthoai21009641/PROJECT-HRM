import React, { useEffect, useState } from "react";
import { DeleteOutlined, EditTwoTone } from "@ant-design/icons";
import {
  notifyError,
  notifySuccess,
} from "../../../../utils/NotificationUtils";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  message,
  Space,
  Dropdown,
  Tag,
  Spin,
  Col,
  Row,
} from "antd";
import axios from "axios";

const { Option } = Select;

// const API_BASE = "http://localhost/prjhrm_react_php/backend/api";
const BASE_URL = `${import.meta.env.VITE_API_URL}`;
const CauHinhIP = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [editData, setEditData] = useState(null);

  const headers = JSON.parse(import.meta.env.VITE_AXIOS_HEADERS);

  // requestDSThietBi()
  const fetchData = async () => {
    setLoading(true);
    try {
      // getDSThietBi(url)
      const res = await axios.get(`${BASE_URL}diachiip/ip.php`, { headers });
      setData(res.data);
    } catch (err) {
      if (err) notifyError("Không thể lấy dữ liệu từ API!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // openForm()
  const handleOpenModal = (record = null) => {
    setEditData(record);
    form.resetFields();
    if (record) form.setFieldsValue(record);
    else form.setFieldsValue({ trangThai: 1 });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    Modal.confirm({
      title: "Xóa thiết bị!",
      content: "Bạn có chắc muốn thiết bị này không?",
      cancelText: "Hủy bỏ",
      okText: "Xóa",
      onOk: async () => {
        try {
          // requestDeleteDiaChiIP()
          await axios.delete(`${BASE_URL}diachiip/deleteip.php/${id}`, {
            headers,
          });
          notifySuccess("Xóa IP thành công!");
          fetchData();
        } catch (err) {
          if (err) notifyError("Xóa IP thất bại!");
        }
      },
    });
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      let response;
      if (editData) {
        // requestUpdateDiaChiIP()
        response = await axios.put(
          `${BASE_URL}diachiip/updateip.php`,
          {
            ...values,
            maDCIP: editData.maDCIP,
          },
          { headers }
        );
      } else {
        // requestAddDiaChiIP()
        response = await axios.post(
          `${BASE_URL}diachiip/insertip.php`,
          values,
          { headers }
        );
      }

      // Kiểm tra nếu tên thiết bị đã tồn tại (trả về từ API)
      // showNotification()
      if (response.data.exist) {
        notifyError("Tên thiết bị đã tồn tại. Vui lòng chọn tên khác!");
        return;
      }

      // showNotification()
      notifySuccess(
        editData ? "Cập nhật IP thành công!" : "Thêm IP thành công!"
      );
      setIsModalOpen(false);
      fetchData();
    } catch {
      // console.error("Lỗi khi gửi form:", err);
      // notifyError("Có lỗi xảy ra khi lưu dữ liệu!");
    }
  };

  const handleToggleStatus = async (id, status) => {
    const newStatus = status === 1 ? 1 : 0;
    try {
      await axios.post(
        `${BASE_URL}diachiip/updateip.php`,
        {
          maDCIP: id,
          trangThai: status,
        },
        { headers }
      );
      notifySuccess("Cập nhật trạng thái thành công!");
      fetchData();
      setData((prev) =>
        prev.map((item) =>
          item.maDCIP === id ? { ...item, trangThai: newStatus } : item
        )
      );
    } catch (error) {
      if (error) notifyError("Cập nhật trạng thái thất bại!");
    }
  };

  const StatusTag = React.memo(({ trangThai, onChange, loading }) => {
    return (
      <Dropdown
        menu={{
          items: [
            {
              label: "Hoạt động",
              key: "1",
              onClick: () => onChange(1),
            },
            {
              label: "Không hoạt động",
              key: "0",
              onClick: () => onChange(0),
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
          <Tag color={trangThai === 1 ? "green" : "red"}>
            {loading ? <Spin size="small" /> : trangThai === 1 ? "On" : "Off"}
          </Tag>
        </button>
      </Dropdown>
    );
  });

  const columns = [
    { title: "#", dataIndex: "maDCIP", align: "center" },
    { title: "Tên thiết bị", dataIndex: "tenThietBi", align: "center" },
    { title: "IP", dataIndex: "diaChiIP", align: "center" },
    {
      title: "Trạng thái",
      width: "15%",
      align: "center",
      render: (_, record) => (
        <StatusTag
          trangThai={record.trangThai}
          loading={record._updating}
          onChange={(newStatus) => {
            if (record.trangThai !== newStatus) {
              handleToggleStatus(record.maDCIP, newStatus);
            }
          }}
        />
      ),
    },
    {
      title: "Thao tác",
      align: "center",
      render: (_, record) => (
        <Space>
          <EditTwoTone
            style={{ color: "darkblue", cursor: "pointer" }}
            onClick={() => handleOpenModal(record)}
          />

          <DeleteOutlined
            style={{ color: "red", cursor: "pointer" }}
            onClick={() => handleDelete(record.maDCIP)}
          />
        </Space>
      ),
    },
  ];

  const fetchIPAddress = async () => {
    try {
      const res = await axios.get("https://api.ipify.org?format=json");
      const ip = res.data.ip;
      form.setFieldsValue({ diaChiIP: ip }); // Gán IP vào input của form
      // message.success(`Đã lấy IP: ${ip}`);
    } catch (error) {
      if (error) message.error("Không thể lấy địa chỉ IP");
    }
  };
  return (
    <div>
      <Row justify="end" align="middle">
        <Col>
          <Button
            type="primary"
            onClick={() => handleOpenModal()}
            className="mb-3"
          >
            Thêm IP
          </Button>
        </Col>
      </Row>

      <Table
        rowKey="maDCIP"
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={false}
      />

      <Modal
        title={editData ? "Cập nhật địa chỉ IP" : "Thêm địa chỉ IP"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleSubmit}
        okText={editData ? "Cập nhật" : "Thêm"}
        cancelText="Hủy bỏ"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="tenThietBi"
            label="Tên thiết bị"
            rules={[{ required: true, message: "Vui lòng nhập tên thiết bị!" }]}
          >
            <Input placeholder="Tên thiết bị" />
          </Form.Item>

          <Form.Item label="Địa chỉ IP" required>
            <Space.Compact style={{ width: "100%" }}>
              <Form.Item
                name="diaChiIP"
                noStyle
                rules={[
                  { required: true, message: "Vui lòng nhập địa chỉ IP!" },
                ]}
              >
                <Input placeholder="Địa chỉ IP" />
              </Form.Item>
              <Button type="primary" onClick={fetchIPAddress}>
                Lấy IP Hiện tại
              </Button>
            </Space.Compact>
          </Form.Item>

          <Form.Item
            name="trangThai"
            label="Trạng thái"
            rules={[{ required: true, message: "Chọn trạng thái" }]}
          >
            <Select>
              <Option value={1}>Hoạt động</Option>
              <Option value={0}>Không hoạt động</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CauHinhIP;
