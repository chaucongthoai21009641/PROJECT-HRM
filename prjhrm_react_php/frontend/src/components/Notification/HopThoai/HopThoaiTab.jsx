import React, { useEffect, useState } from "react";
import { Button, Modal, Space, message } from "antd";
import axios from "axios";
import { notifySuccess, notifyError } from "../../../utils/NotificationUtils";
import HopThoaiTable from "./HopThoaiTable";
import HopThoaiModal from "./HopThoaiModal";

// const API_BASE = "http://localhost/prjhrm_react_php/backend/api/hopthoai";
const BASE_URL = `${import.meta.env.VITE_API_URL}hopthoai`;
const HopThoaiTab = () => {
  const [hopThoaiList, setHopThoaiList] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const headers = JSON.parse(import.meta.env.VITE_AXIOS_HEADERS);

  const fetchHopThoai = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/hopthoai.php`, { headers });

      // Kiểm tra xem res.data có phải là mảng không
      if (Array.isArray(res.data)) {
        setHopThoaiList(res.data);
      } else {
        console.error("Dữ liệu không phải là mảng:", res.data);
        setHopThoaiList([]); // Gán mảng rỗng nếu không phải mảng
      }
    } catch (err) {
      console.error(err);
      message.error("Lỗi khi lấy danh sách hộp thoại!");
    }
  };

  useEffect(() => {
    fetchHopThoai();
  }, []);

  const openModal = (data = null) => {
    setEditData(data);
    setModalOpen(true);
  };

  const deleteHopThoai = async (id) => {
    Modal.confirm({
      title: "Xóa hộp thoại!",
      content: "Bạn có chắc muốn xóa hộp thoại này không?",
      okText: "Xóa",
      cancelText: "Hủy bỏ",
      onOk: async () => {
        try {
          await axios.post(
            `${BASE_URL}/deletehopthoai.php`,
            { maHT: id },
            { headers }
          );
          notifySuccess("Xóa hộp thoại thành công!");
          fetchHopThoai();
        } catch (err) {
          if (err) notifyError("Xóa thất bại!");
        }
      },
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <Space
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: 20,
        }}
      >
        <Button type="primary" onClick={() => openModal()} className="mb-4">
          Thêm hộp thoại
        </Button>
      </Space>

      <HopThoaiTable
        hopThoaiList={hopThoaiList}
        openModal={openModal}
        deleteHopThoai={deleteHopThoai}
      />

      <HopThoaiModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        fetchHopThoai={fetchHopThoai}
        editData={editData}
        setEditData={setEditData}
      />
    </div>
  );
};

export default HopThoaiTab;
