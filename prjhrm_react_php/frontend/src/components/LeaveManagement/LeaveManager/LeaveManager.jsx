import React, { useState, useEffect } from "react";
import { Table, Modal, InputNumber, Avatar, Image } from "antd";
import { notifySuccess, notifyError } from "../../../utils/NotificationUtils";
import { EditOutlined } from "@ant-design/icons";
import axios from "axios";
import { getColor } from "../../../utils/Color";
const BASE_URL = `${import.meta.env.VITE_API_URL}`;
const LeaveManager = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [editingField, setEditingField] = useState(null);
  const [editingValue, setEditingValue] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [hoveredKey, setHoveredKey] = useState(null);

  useEffect(() => {
    fetchLeaveData();
  }, []);

  const headers = JSON.parse(import.meta.env.VITE_AXIOS_HEADERS);

  // requesDSNgayPhepNV()
  const fetchLeaveData = async () => {
    setLoading(true);
    try {
      // getDSNgayPhepNV(url)
      const response = await axios.get(`${BASE_URL}ngayphep/ngayphep.php`, {
        headers,
      });
      const formattedData = response.data.map((item) => ({
        maNV: item.nhan_vien.maNV,
        hoTen: item.nhan_vien.hoTen,
        chucVu: item.nhan_vien.chucDanh,
        ngayVaoLam: item.nhan_vien.ngayVaoLam,
        soNgay: item.soNgay,
        daNghi: item.daNghi,
        conLai: item.conLai,
        // namPhep: item.namPhep,
        maNP: item.maNP, // Include maNP for updates
      }));
      console.log("ma np:", formattedData);
      console.log("Fetched data:", response.data);

      setData(formattedData);
      setFilteredData(formattedData);
    } catch (error) {
      console.error("Error fetching leave data:", error);
    } finally {
      setLoading(false);
    }
  };

  const showEditModal = (record, field) => {
    setEditingRecord(record);
    setEditingField(field);
    setEditingValue(record[field]);
    setIsModalVisible(true);
  };

  const handleSave = async () => {
    try {
      let newSoNgay = editingRecord.soNgay;
      let newDaNghi = editingRecord.daNghi;
      let newConLai = editingRecord.conLai;

      if (editingField === "soNgay") {
        const chenhLech = editingValue - editingRecord.soNgay;
        newSoNgay = editingValue;
        newConLai = editingRecord.conLai + chenhLech;

        if (newConLai < 0) newConLai = 0;
        if (newDaNghi > newSoNgay) newDaNghi = newSoNgay;
      }

      if (editingField === "daNghi") {
        newDaNghi = editingValue;
        newConLai = newSoNgay - newDaNghi;

        if (newConLai < 0) {
          notifyError("Số ngày đã nghỉ không thể lớn hơn tổng số ngày phép!");
          return;
        }
      }

      if (editingField === "conLai") {
        newConLai = editingValue;
        newSoNgay = newDaNghi + newConLai;

        if (newConLai < 0) {
          notifyError("Số ngày còn lại không thể nhỏ hơn 0!");
          return;
        }
      }

      const updatedRecord = {
        ...editingRecord,
        soNgay: newSoNgay,
        daNghi: newDaNghi,
        conLai: newConLai,
      };

      // requestUpdateINgayPhep()
      const response = await axios.post(
        `${BASE_URL}ngayphep/updatengayphep.php`,
        {
          maNP: editingRecord.maNP,
          soNgay: updatedRecord.soNgay,
          daNghi: updatedRecord.daNghi,
          conLai: updatedRecord.conLai,
        },
        {
          headers,
        }
      );

      // showNotification()
      if (response.data.message) {
        notifySuccess("Cập nhật ngày phép thành công!");
        const newData = data.map((item) =>
          item.maNV === editingRecord.maNV ? updatedRecord : item
        );
        setData(newData);
        setFilteredData(newData);
        setIsModalVisible(false);
        setEditingRecord(null);
        setEditingField(null);
      } else {
        notifyError(response.data.error || "Cập nhật ngày phép thất bại!");
      }
    } catch (error) {
      console.error("Error updating leave data:", error);
      notifyError("Cập nhật thất bại!");
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingRecord(null);
    setEditingField(null);
  };

  const handleInputChange = (value) => {
    setEditingValue(value);
  };

  const columns = [
    {
      title: "Mã NV",
      width: "10%",
      dataIndex: "maNV",
      key: "maNV",
      fixed: "left",
      align: "center",
    },
    {
      title: "Họ Tên",
      dataIndex: "hoTen",
      key: "hoTen",
      align: "center",
      render: (text) => (
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Avatar
            style={{
              backgroundColor: getColor(text),
              verticalAlign: "middle",
            }}
          >
            {text?.charAt(0)}
          </Avatar>
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: "Chức Vụ",
      dataIndex: "chucVu",
      key: "chucVu",
      align: "center",
    },
    {
      title: "Ngày Vào Làm",
      dataIndex: "ngayVaoLam",
      key: "ngayVaoLam",
      align: "center",
    },
    {
      title: "Số Ngày Phép",
      dataIndex: "soNgay",
      key: "soNgay",
      align: "center",
      render: (text, record) => (
        <div
          onMouseEnter={() => setHoveredKey(`${record.maNV}-soNgay`)}
          onMouseLeave={() => setHoveredKey(null)}
          onClick={() => showEditModal(record, "soNgay")} // Open modal on value click
          style={{ cursor: "pointer" }}
        >
          {text}
          {hoveredKey === `${record.maNV}-soNgay` && (
            <EditOutlined
              style={{ marginLeft: 8 }}
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering the parent click
                showEditModal(record, "soNgay");
              }}
            />
          )}
        </div>
      ),
    },
    {
      title: "Đã Nghỉ",
      dataIndex: "daNghi",
      key: "daNghi",
      align: "center",
      render: (text, record) => (
        <div
          onMouseEnter={() => setHoveredKey(`${record.maNV}-daNghi`)}
          onMouseLeave={() => setHoveredKey(null)}
          onClick={() => showEditModal(record, "daNghi")} // Open modal on value click
          style={{ cursor: "pointer" }}
        >
          {text}
          {hoveredKey === `${record.maNV}-daNghi` && (
            <EditOutlined
              style={{ marginLeft: 8 }}
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering the parent click
                showEditModal(record, "daNghi");
              }}
            />
          )}
        </div>
      ),
    },
    {
      title: "Còn Lại",
      dataIndex: "conLai",
      key: "conLai",
      align: "center",
      render: (text, record) => (
        <div
          onMouseEnter={() => setHoveredKey(`${record.maNV}-conLai`)}
          onMouseLeave={() => setHoveredKey(null)}
          onClick={() => showEditModal(record, "conLai")} // Open modal on value click
          style={{ cursor: "pointer" }}
        >
          {text}
          {hoveredKey === `${record.maNV}-conLai` && (
            <EditOutlined
              style={{ marginLeft: 8 }}
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering the parent click
                showEditModal(record, "conLai");
              }}
            />
          )}
        </div>
      ),
    },
  ];

  const fieldLabelMap = {
    soNgay: "số ngày phép",
    daNghi: "số ngày đã nghỉ",
    conLai: "số ngày còn lại",
  };

  return (
    <div>
      <Table
        columns={columns}
        dataSource={filteredData}
        loading={loading}
        rowKey="maNV"
        scroll={{ y: "65vh" }}
      />
      <Modal
        title={`Cập nhật ${fieldLabelMap[editingField] || editingField}`}
        open={isModalVisible}
        onOk={handleSave}
        onCancel={handleCancel}
        okText="Cập nhật"
        cancelText="Hủy bỏ"
      >
        <InputNumber
          value={editingValue}
          onChange={handleInputChange}
          style={{ width: "100%" }}
        />
      </Modal>
    </div>
  );
};

export default LeaveManager;
