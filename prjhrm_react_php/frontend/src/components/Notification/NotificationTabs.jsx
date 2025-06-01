// src/components/NotificationTabs.js
import React, { useState, useEffect } from "react";
import { Tabs, Spin, Alert } from "antd";
import axios from "axios";
import HopThoaiTab from "./HopThoai/HopThoaiTab";
import ThongBaoTab from "./ThongBao/ThongBaoTab";
import TaiLieuTab from "./TaiLieu/TaiLieuTab";

const headers = JSON.parse(import.meta.env.VITE_AXIOS_HEADERS);

// const baseURL = "http://localhost/prjhrm_react_php/backend/api/";
const BASE_URL = `${import.meta.env.VITE_API_URL}`;
const tabItems = [
  {
    key: "messages",
    label: "📩 Hộp thoại",
    url: BASE_URL + "hopthoai/hopthoai.php",
  },
  {
    key: "notifications",
    label: "🔔 Thông báo",
    url: BASE_URL + "thongbao/thongbao.php",
  },
  {
    key: "documents",
    label: "📂 Tài liệu",
    url: BASE_URL + "tailieu/tailieu.php",
  },
];

const NotificationTabs = () => {
  const [activeKey, setActiveKey] = useState("messages");
  const [contents, setContents] = useState({});
  const [loadingKey, setLoadingKey] = useState(null);
  const [errorKey, setErrorKey] = useState(null);

  const fetchContent = async (key, url) => {
    setLoadingKey(key);
    setErrorKey(null);
    try {
      const res = await axios.get(url, { headers });
      setContents((prev) => ({ ...prev, [key]: res.data }));
    } catch (err) {
      if (err) {
        setErrorKey(key);
      }
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

    if (key === "messages") {
      return <HopThoaiTab />;
    }

    if (key === "notifications") {
      return <ThongBaoTab />;
    }
    if (key === "documents") {
      return <TaiLieuTab />;
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

export default NotificationTabs;
