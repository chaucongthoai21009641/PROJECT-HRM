// src/components/ShiftManagement.js
import React, { useState, useEffect } from "react";
import { Tabs, Spin, Alert } from "antd";
import axios from "axios";
import ThoiKhoaBieu from "./ThoiKhoaBieu/ThoiKhoaBieu";
// import NgayLe from "./NgayLe";
import LichLamViec from "./LichLamViec/LichLamViec";
import NgayLe from "./NgayLe/NgayLe";

import thoikhoabieu from "../../../assets/uploads/thoikhoabieu.png"; // Thay đổi đường dẫn nếu cần
import ngayle from "../../../assets/uploads/leave.png"; // Thay đổi đường dẫn nếu cần
import lichlamviec from "../../../assets/uploads/work-schedule.png"; // Thay đổi đường dẫn nếu cần

const headers = JSON.parse(import.meta.env.VITE_AXIOS_HEADERS);
// const baseURL = "http://localhost/prjhrm_react_php/backend/api/";
const BASE_URL = `${import.meta.env.VITE_API_URL}`;
const tabItems = [
  {
    key: "timetable",
    label: (
      <span>
        <img
          src={thoikhoabieu}
          alt="timetable"
          style={{ width: 20, height: 20, marginRight: 10 }}
        />
        Thời khóa biểu
      </span>
    ),
    url: BASE_URL + "calam/calam.php",
  },
  {
    key: "holidays",
    label: (
      <span>
        <img
          src={ngayle}
          alt="holidays"
          style={{ width: 20, height: 20, marginRight: 10 }}
        />
        Ngày lễ
      </span>
    ),
    // url: BASE_URL + "ngayle/ngayle.php",
  },
  {
    key: "workschedule",
    label: (
      <span>
        <img
          src={lichlamviec}
          alt="workschedule"
          style={{ width: 20, height: 20, marginRight: 10 }}
        />
        Lịch làm việc
      </span>
    ),
    url: BASE_URL + "lichlamviec/lichlamviec.php",
  },
];

const ShiftManagement = () => {
  const [activeKey, setActiveKey] = useState("timetable");
  const [contents, setContents] = useState({});
  const [loadingKey, setLoadingKey] = useState(null);
  const [errorKey, setErrorKey] = useState(null);

  const fetchContent = async (key, url) => {
    setLoadingKey(key);
    setErrorKey(null);
    try {
      const res = await axios.get(url, {
        headers,
      });
      setContents((prev) => ({ ...prev, [key]: res.data }));
    } catch (error) {
      console.error("Error fetching content:", error);
      setErrorKey(key);
    } finally {
      setLoadingKey(null);
    }
  };

  useEffect(() => {
    const currentTab = tabItems.find((item) => item.key === activeKey);
    if (!contents[activeKey] && currentTab?.url) {
      fetchContent(currentTab.key, currentTab.url);
    }
  }, [activeKey, contents]);

  const renderTabContent = (key) => {
    if (loadingKey === key) {
      return (
        <div style={{ textAlign: "center", padding: "20px" }}>
          <Spin />
        </div>
      );
    }
    if (errorKey === key) {
      return <Alert message="Lỗi khi tải nội dung!" type="error" />;
    }

    if (key === "timetable") {
      return <ThoiKhoaBieu />;
    }

    if (key === "holidays") {
      return <NgayLe />;
    }
    if (key === "workschedule") {
      return <LichLamViec />;
    }

    // Mặc định render HTML cho các tab khác
    return (
      <div
        dangerouslySetInnerHTML={{
          __html: contents[key] || "<p>Đang tải...</p>",
        }}
      />
    );
  };
  return (
    <div>
      <Tabs
        activeKey={activeKey}
        onChange={(key) => setActiveKey(key)}
        type="line"
        size="large"
        tabBarGutter={24}
        items={tabItems.map((tab) => ({
          key: tab.key,
          label: tab.label,
          children: renderTabContent(tab.key),
        }))}
      />
    </div>
  );
};

export default ShiftManagement;
