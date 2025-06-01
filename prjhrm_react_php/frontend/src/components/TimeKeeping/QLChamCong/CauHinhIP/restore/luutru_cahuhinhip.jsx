import React, { useEffect, useState } from "react";
import { DeleteOutlined, EditTwoTone } from "@ant-design/icons";
import {
  notifyError,
  notifySuccess,
} from "../../../../../utils/NotificationUtils";
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

const API_BASE = "http://localhost/prjhrm_react_php/backend/api";

const CauHinhIP = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [editData, setEditData] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/diachiip/ip.php`);
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
      onOk: async () => {
        try {
          await axios.delete(`${API_BASE}/diachiip/deleteip.php/${id}`);
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
      if (editData) {
        await axios.put(`${API_BASE}/diachiip/updateip.php`, {
          ...values,
          maDCIP: editData.maDCIP,
        });
        console.log(values);
        notifySuccess("Cập nhật IP thành công!");
      } else {
        await axios.post(`${API_BASE}/diachiip/insertip.php`, values);
        notifySuccess("Thêm IP thành công!");
      }
      setIsModalOpen(false);
      fetchData();
    } catch (err) {
      if (err) notifyError("Có lỗi xảy ra khi lưu dữ liệu!");
      // notifyError("Có lỗi xảy ra khi lưu dữ liệu!");
    }
  };

  // const handleToggleStatus = async (record) => {
  //   try {
  //     await axios.post(`${API_BASE}/diachiip/updateip.php`, {
  //       maDCIP: record.maDCIP,
  //       trangThai: record.trangThai === 1 ? 0 : 1,
  //     });
  //     notifySuccess("Cập nhật trạng thái thành công!");
  //     fetchData();
  //   } catch (err) {
  //     notifyError("Cập nhật trạng thái thất bại!");
  //   }
  // };

  const handleToggleStatus = async (id, status) => {
    const newStatus = status === 1 ? 1 : 0;
    try {
      await axios.post(`${API_BASE}/diachiip/updateip.php`, {
        maDCIP: id,
        trangThai: status,
      });
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
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="tenThietBi"
            label="Tên thiết bị"
            rules={[{ required: true, message: "Vui lòng nhập tên thiết bị" }]}
          >
            <Input />
          </Form.Item>

          {/* <Form.Item
            name="diaChiIP"
            label="Địa chỉ IP"
            rules={[{ required: true, message: "Vui lòng nhập địa chỉ IP" }]}
          >
            <Input />
          </Form.Item> */}
          <Form.Item label="Địa chỉ IP" required>
            <Space.Compact style={{ width: "100%" }}>
              <Form.Item
                name="diaChiIP"
                noStyle
                rules={[
                  { required: true, message: "Vui lòng nhập địa chỉ IP" },
                ]}
              >
                <Input placeholder="Địa chỉ IP..." />
              </Form.Item>
              <Button type="primary" onClick={fetchIPAddress}>
                IP Hiện tại
              </Button>
            </Space.Compact>
          </Form.Item>

          <Form.Item
            name="trangThai"
            label="Trạng thái"
            rules={[{ required: true, message: "Chọn trạng thái" }]}
          >
            <Select>
              <Option value={1}>Enable</Option>
              <Option value={0}>Disable</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CauHinhIP;
