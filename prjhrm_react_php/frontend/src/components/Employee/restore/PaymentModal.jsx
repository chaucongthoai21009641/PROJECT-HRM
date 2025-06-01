import React, { useEffect, useState } from "react";
import {
  Modal,
  Form,
  Input,
  Upload,
  Button,
  Card,
  Typography,
  Tabs,
  Row,
  Image,
  Col,
  Space,
  Popconfirm,
} from "antd";
import {
  UploadOutlined,
  DeleteOutlined,
  EditOutlined,
  StarOutlined,
  StarFilled,
} from "@ant-design/icons";

const { Text } = Typography;
const { TabPane } = Tabs;

const IMG_URL = `${import.meta.env.VITE_IMG_URL}`;

export default function PaymentModal({
  visible,
  onCancel,
  onSubmit,
  form,
  paymentMethods,
  onDelete,
  onUpdate,
  onSetDefault,
}) {
  const [activeTab, setActiveTab] = useState("NH");
  const [isEditing, setIsEditing] = useState(false);
  const [editingMethod, setEditingMethod] = useState(null);

  useEffect(() => {
    if (!visible) {
      form.resetFields();
      setIsEditing(false);
      setEditingMethod(null);
    }
  }, [visible]);

  const uploadProps = {
    beforeUpload: (file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        form.setFieldValue("hinhAnh", e.target.result);
      };
      reader.readAsDataURL(file);
      return false;
    },
  };

  const filteredMethods = paymentMethods.filter(
    (method) => method.loaiTaiKhoan === activeTab
  );

  const handleEdit = (method) => {
    setTimeout(() => {
      form.setFieldsValue(method);
    }, 0);
    setIsEditing(true);
    setEditingMethod(method);
  };

  const renderFormItems = () => {
    return (
      <>
        <Form.Item name="loaiTaiKhoan" hidden initialValue={activeTab}>
          <Input />
        </Form.Item>
        <Form.Item
          name="tenDVhoacNH"
          label={activeTab === "NH" ? "Tên ngân hàng" : "Tên dịch vụ"}
          rules={[
            {
              required: true,
              message: `Vui lòng nhập ${
                activeTab === "NH" ? "tên ngân hàng" : "tên dịch vụ"
              }!`,
            },
            {
              pattern: /^[a-zA-Z]+$/,
              message:
                "Chỉ chứa chữ, không khoảng trắng, không dấu hoặc ký tự đặc biệt!",
            },
          ]}
          normalize={(value) => value.trim()}
        >
          <Input
            placeholder={activeTab === "NH" ? "VD: Vietcombank" : "VD: Momo"}
          />
        </Form.Item>
        <Form.Item
          name="soDThoacSTK"
          label={activeTab === "NH" ? "Số tài khoản" : "Số điện thoại"}
          rules={
            activeTab === "NH"
              ? [
                  {
                    required: true,
                    message: "Vui lòng nhập số tài khoản!",
                  },
                  {
                    pattern: /^[0-9\s]+$/,
                    message: "Số tài khoản không hợp lệ!",
                  },
                ]
              : [
                  {
                    required: true,
                    message: "Vui lòng nhập số điện thoại!",
                  },
                  {
                    pattern:
                      /^(0|\+84)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-5]|9[0-9])[0-9]{7}$/,
                    message: "Số điện thoại không hợp lệ!",
                  },
                ]
          }
          normalize={(value) => value.trim()}
        >
          <Input
            placeholder={activeTab === "NH" ? "Số tài khoản" : "Số điện thoại"}
          />
        </Form.Item>
        <Form.Item
          name="tenChuTaiKhoan"
          label="Tên chủ tài khoản"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên chủ tài khoản!",
            },
            {
              pattern: /^[A-Za-zÀ-ỹ\s]+$/u,
              message: "Tên không được chứa số hoặc ký tự đặc biệt!",
            },
          ]}
        >
          <Input placeholder="Tên chủ tài khoản" />
        </Form.Item>
        <Form.Item name="hinhAnh" label="Mã QR">
          <Upload {...uploadProps} maxCount={1}>
            <Button icon={<UploadOutlined />}>Tải lên ảnh QR</Button>
          </Upload>
        </Form.Item>

        {isEditing && editingMethod?.hinhAnh && (
          <Form.Item label="Mã QR hiện tại">
            <Image
              src={`${IMG_URL}payments/${editingMethod.hinhAnh}`}
              alt="QR Code"
              style={{
                width: 120,
                height: 120,
                border: "1px solid #eee",
                padding: 4,
                marginTop: 8,
              }}
            />
          </Form.Item>
        )}
      </>
    );
  };

  return (
    <Modal
      open={visible}
      title="Thông tin thanh toán"
      onCancel={onCancel}
      onOk={async () => {
        form.setFieldsValue({ loaiTaiKhoan: activeTab });
        try {
          const values = await form.validateFields();
          if (isEditing) {
            // Cập nhật
            await onUpdate({ ...values, maTT: editingMethod.maTT });
          } else {
            // Thêm mới
            await onSubmit(values);
          }
          setIsEditing(false);
          setEditingMethod(null);
          form.resetFields();
        } catch (error) {
          console.error("Validate lỗi:", error);
        }
      }}
      okText={isEditing ? "Cập nhật" : "Thêm mới"}
      cancelText="Hủy bỏ"
      width="65vw"
    >
      <Tabs
        activeKey={activeTab}
        onChange={(key) => {
          setActiveTab(key);
          form.resetFields(); // Xoá dữ liệu nhập form
          setIsEditing(false); // Thoát khỏi chế độ chỉnh sửa nếu có
          setEditingMethod(null); // Xoá dữ liệu phương thức đang chỉnh
        }}
      >
        {["NH", "VDT"].map((type) => (
          <TabPane
            key={type}
            tab={`${type === "NH" ? "Ngân hàng" : "Ví điện tử"} (${
              paymentMethods.filter((m) => m.loaiTaiKhoan === type).length
            })`}
          >
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Form form={form} layout="vertical">
                  {renderFormItems()}
                </Form>
              </Col>
              <Col span={12} style={{ maxHeight: "50vh", overflowY: "auto" }}>
                <Card
                  title={`Danh sách ${
                    type === "NH" ? "Tài khoản ngân hàng" : "Ví điện tử"
                  }`}
                  variant="outlined"
                >
                  {filteredMethods.length > 0 ? (
                    filteredMethods.map((method) => (
                      <Card
                        key={method.maTT}
                        style={{
                          marginBottom: 12,
                          border:
                            method.isDefault === true
                              ? "2px solid #1890ff"
                              : "1px solid #f0f0f0",
                        }}
                        actions={[
                          <Button
                            type="text"
                            icon={
                              method.isDefault ? (
                                <StarFilled />
                              ) : (
                                <StarOutlined />
                              )
                            }
                            onClick={() => onSetDefault(method.maTT)}
                          >
                            {method.isDefault ? "Mặc định" : "Đặt mặc định"}
                          </Button>,
                          <Button
                            type="text"
                            icon={<EditOutlined />}
                            onClick={() => handleEdit(method)}
                          >
                            Sửa
                          </Button>,
                          <Popconfirm
                            title={`Xác nhận xóa ${
                              type === "NH"
                                ? "tài khoản ngân hàng"
                                : "ví điện tử"
                            } này?`}
                            onConfirm={() => onDelete(method.maTT)}
                            okText="Xóa"
                            cancelText="Hủy"
                          >
                            <Button
                              type="text"
                              icon={<DeleteOutlined />}
                              danger
                            >
                              Xóa
                            </Button>
                          </Popconfirm>,
                        ]}
                      >
                        <Space direction="vertical" size="small">
                          <Text strong>{method.tenDVhoacNH}</Text>
                          <Text>
                            {type === "NH"
                              ? `Số tài khoản: ${method.soDThoacSTK}`
                              : `Số điện thoại: ${method.soDThoacSTK}`}
                          </Text>
                          <Text>
                            Tên chủ tài khoản: {method.tenChuTaiKhoan}
                          </Text>
                          {method.hinhAnh && (
                            <Image
                              src={`${IMG_URL}payments/${method.hinhAnh}`}
                              alt="QR Code"
                              style={{ width: 100, height: 100 }}
                            />
                          )}
                        </Space>
                      </Card>
                    ))
                  ) : (
                    <Text type="secondary">
                      Chưa có phương thức thanh toán nào.
                    </Text>
                  )}
                </Card>
              </Col>
            </Row>
          </TabPane>
        ))}
      </Tabs>
    </Modal>
  );
}
