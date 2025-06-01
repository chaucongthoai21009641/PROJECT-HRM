// src/components/User/InforManagement/InforManagement.js
import React, { useState, useEffect } from "react";
import { Tabs, Spin, Alert } from "antd";
import axios from "axios";
import Information from "./Information/Information";
import TimekeepingHistory from "./TimekeepingHistory/TimekeepingHistory";

const tabItems = [
  {
    key: "messages",
    label: "Thông tin cá nhân",
  },
  {
    key: "notifications",
    label: "Lịch sử chấm công",
  },
];

const InforManagement = () => {
  const [activeKey, setActiveKey] = useState("messages");
  const [contents, setContents] = useState({});
  const [loadingKey, setLoadingKey] = useState(null);
  const [errorKey, setErrorKey] = useState(null);

  const fetchContent = async (key, url) => {
    setLoadingKey(key);
    setErrorKey(null);
    try {
      const res = await axios.get(url);
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
      return <Information />;
    }

    if (key === "notifications") {
      return <TimekeepingHistory />;
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

export default InforManagement;
