import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  Card,
  Modal,
  Input,
  Table,
  Form,
  message,
  Space,
  Image,
  Dropdown,
  Tag,
  Spin,
  Row,
  Col,
} from "antd";
import {
  DeleteOutlined,
  EditTwoTone,
  ExclamationCircleOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import { QRCodeCanvas } from "qrcode.react";
import axios from "axios";
import MapSelector from "../MapSelector";

const API_BASE = "http://localhost/prjhrm_react_php/backend/api";

const CauHinhGPS = () => {
  const { Search } = Input;
  const [diaDiemData, setDiaDiemData] = useState([]);
  const [form] = Form.useForm();
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [currentLocation, setCurrentLocation] = useState({
    lat: null,
    lng: null,
  });

  // Lắng nghe sự thay đổi của các trường "Kinh độ" và "Vĩ độ"
  const handleFormChange = (changedValues) => {
    if (changedValues.kinhDo || changedValues.viDo) {
      const lat = parseFloat(form.getFieldValue("viDo"));
      const lng = parseFloat(form.getFieldValue("kinhDo"));
      console.log("Updated Location:", { lat, lng });
      setCurrentLocation({ lat, lng });
    }
  };

  useEffect(() => {
    // Cập nhật vị trí ban đầu nếu có giá trị mặc định
    if (currentLocation.lat && currentLocation.lng) {
      form.setFieldsValue({
        viDo: currentLocation.lat,
        kinhDo: currentLocation.lng,
      });
    }
  }, [currentLocation, form]);

  useEffect(() => {
    loadDiaDiem();
  }, []);

  const loadDiaDiem = async () => {
    try {
      const res = await axios.get(`${API_BASE}/diadiem/gps.php`);
      setDiaDiemData(res.data);
    } catch (error) {
      message.error("Không thể lấy dữ liệu từ API!");
      console.error(error);
    }
  };

  const toggleStatus = async (id, status) => {
    const newStatus = status === 1 ? 1 : 0;
    try {
      await axios.put(`${API_BASE}/diadiem/updategps.php`, {
        maDD: id,
        trangThai: newStatus,
      });
      message.success("Cập nhật trạng thái thành công!");
      // loadDiaDiem();
      setDiaDiemData((prev) =>
        prev.map((item) =>
          item.maDD === id ? { ...item, trangThai: newStatus } : item
        )
      );
    } catch (error) {
      message.error("Cập nhật trạng thái thất bại!");
      console.error(error);
    }
  };

  const handleEdit = (record) => {
    setCurrentId(record.maDD);
    setEditMode(true);

    setCurrentLocation({
      lat: record.viDo,
      lng: record.kinhDo,
    });

    form.setFieldsValue({
      tenDiaDiem: record.tenDiaDiem,
      kinhDo: record.kinhDo,
      viDo: record.viDo,
      banKinh: record.banKinh,
    });
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Xác nhận xóa địa điểm?",
      icon: <ExclamationCircleOutlined />,
      content: "Bạn có chắc chắn muốn xóa địa điểm này?",
      okText: "Xóa",
      cancelText: "Hủy",
      onOk: async () => {
        try {
          await axios.delete(`${API_BASE}/diadiem/deletegps.php/${id}`);
          message.success("Đã xóa địa điểm thành công!");
          loadDiaDiem();
        } catch (error) {
          message.error("Không thể xóa địa điểm!");
          console.error(error);
        }
      },
    });
  };

  const handleSubmit = async (values) => {
    const formData = {
      ...values,
      // maDD: currentId,
      ...(editMode && { maDD: currentId }),
    };

    const url = editMode
      ? `${API_BASE}/diadiem/updategps.php`
      : `${API_BASE}/diadiem/insertgps.php`;
    const method = editMode ? "put" : "post";

    try {
      await axios({
        method,
        url,
        data: formData,
        // trangThai: true,
      });
      console.log(formData);

      editMode
        ? message.success("Cập nhật địa điểm thành công!")
        : message.success("Thêm địa điểm thành công!");
      loadDiaDiem();
      form.resetFields();
      setEditMode(false);
      setCurrentId(null);
    } catch (error) {
      message.error("Có lỗi xảy ra khi cập nhật địa điểm!");
      console.error(error);
    }
  };

  const QRCodeImage = ({ value }) => {
    const [qrUrl, setQrUrl] = useState("");
    const qrRef = useRef(null);

    // Tạo data URL cho QR Code mỗi khi value thay đổi
    useEffect(() => {
      if (qrRef.current) {
        const canvas = qrRef.current.querySelector("canvas");
        if (canvas) {
          const dataUrl = canvas.toDataURL("image/png");
          setQrUrl(dataUrl);
        }
      }
    }, [value]);

    // Xử lý khi nhấn nút tải xuống
    const handleDownload = () => {
      const link = document.createElement("a");
      link.href = qrUrl;
      link.download = "QRCode.png"; // Tên file khi tải xuống
      link.click(); // Tự động click để tải xuống
    };

    return (
      <>
        {/* Render QR Code ẩn để lấy canvas */}
        <div style={{ display: "none" }} ref={qrRef}>
          <QRCodeCanvas value={value} size={100} includeMargin={true} />
        </div>

        {/* Hiển thị QR qua Image từ Ant Design */}
        {qrUrl && (
          <Image
            width={70}
            src={qrUrl}
            alt="QR Code"
            preview={{
              mask: (
                <Button
                  shape="circle"
                  icon={<DownloadOutlined />}
                  size="small"
                  style={{
                    position: "absolute",
                    top: "0px",
                    right: "0",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    color: "#fff",
                  }}
                  onClick={handleDownload} // Khi bấm vào nút download
                />
              ),
            }}
          />
        )}
      </>
    );
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
    {
      title: "#",
      dataIndex: "maDD",
      width: "5%",
      align: "center",
    },
    {
      title: "Tên địa điểm",
      dataIndex: "tenDiaDiem",
      width: "20%",
      align: "left",
    },
    {
      title: "Kinh độ",
      dataIndex: "kinhDo",
      width: "15%",
      align: "center",
    },
    {
      title: "Vĩ độ",
      dataIndex: "viDo",
      width: "15%",
      align: "center",
    },
    {
      title: "Bán kính (m)",
      dataIndex: "banKinh",
      width: "15%",
      align: "center",
    },
    {
      title: "QR Code",
      width: "15%",
      align: "center",
      render: (text, record) => {
        const qrData = JSON.stringify({
          maDD: record.maDD,
          tenDiaDiem: record.tenDiaDiem,
          kinhDo: record.kinhDo,
          viDo: record.viDo,
          banKinh: record.banKinh,
        });

        return <QRCodeImage value={qrData} />;
      },
    },
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
              toggleStatus(record.maDD, newStatus);
            }
          }}
        />
      ),
    },
    {
      title: "Thao tác",
      align: "center",
      width: "15%",
      render: (text, record) => (
        <Space>
          <EditTwoTone
            style={{ color: "darkblue", cursor: "pointer" }}
            onClick={() => handleEdit(record)}
          />

          <DeleteOutlined
            style={{ color: "red", cursor: "pointer" }}
            onClick={() => handleDelete(record.maDD)}
          />
        </Space>
      ),
    },
  ];

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          form.setFieldsValue({
            viDo: latitude,
            kinhDo: longitude,
          });
          // message.success("Đã lấy vị trí hiện tại!");
          setCurrentLocation({
            lat: latitude,
            lng: longitude,
          });
        },
        () => {
          message.error("Không thể lấy vị trí của bạn!");
        }
      );
    } else {
      message.error("Trình duyệt không hỗ trợ Geolocation!");
    }
  };

  return (
    <div className="container-fluid">
      <Search
        placeholder="input search text"
        enterButton
        initialLat={currentLocation.lat}
        initialLng={currentLocation.lng}
      />
      {/* <Search placeholder="input search text" onSearch={onSearch} enterButton /> */}

      <MapSelector
        onSelect={({ lat, lng }) => {
          form.setFieldsValue({
            viDo: lat.toFixed(6),
            kinhDo: lng.toFixed(6),
          });
          setCurrentLocation({ lat, lng });
        }}
        center={currentLocation} // Gửi vị trí của bạn vào center (từ state)
        radius={form.getFieldValue("banKinh")} // Truyền bán kính vào MapSelector
      />

      <div className="row">
        <div className="col-md-4 mb-4">
          <Card title="📌 Thông tin địa điểm">
            <Form
              form={form}
              onFinish={handleSubmit}
              onValuesChange={handleFormChange}
              layout="vertical"
              initialValues={{ trangThai: 1 }}
            >
              {/* <Form.Item>
                <Button type="default" onClick={getCurrentLocation}>
                  Lấy vị trí hiện tại
                </Button>
              </Form.Item> */}

              <Form.Item label="Tên địa điểm" required>
                <Space.Compact style={{ width: "100%" }}>
                  <Form.Item
                    style={{ width: "100%" }}
                    name="tenDiaDiem"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập tên địa điểm!",
                      },
                    ]}
                  >
                    <Input placeholder="Địa điểm..." />
                  </Form.Item>
                  <Button type="primary" onClick={getCurrentLocation}>
                    Lấy vị trí hiện tại
                  </Button>
                </Space.Compact>
              </Form.Item>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="Kinh độ"
                    name="kinhDo"
                    rules={[
                      { required: true, message: "Vui lòng nhập kinh độ!" },
                    ]}
                  >
                    <Input placeholder="Kinh độ..." />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Vĩ độ"
                    name="viDo"
                    rules={[
                      { required: true, message: "Vui lòng nhập vĩ độ!" },
                    ]}
                  >
                    <Input placeholder="Vĩ độ..." />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                label="Bán kính (m)"
                name="banKinh"
                rules={[{ required: true, message: "Vui lòng nhập bán kính!" }]}
              >
                <Input placeholder="Bán kính..." />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  {editMode ? "Cập nhật" : "Thêm"}
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>

        <div className="col-md-8 mb-4">
          <Card title="📋 Danh sách địa điểm">
            <Table
              columns={columns}
              dataSource={diaDiemData}
              rowKey="maDD"
              scroll={{ y: 300, x: 300 }}
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CauHinhGPS;
