// src/components/ShiftManagement.js
import React, { useState, useEffect } from "react";
import { Tabs, Spin, Alert } from "antd";
import axios from "axios";
import CauHinhIP from "./CauHinhIP/CauHinhIP";
import CauHinhGPS from "./CauHinhGPS/CauHinhGPS";

import configIpIcon from "/src/assets/uploads/cauhinhip.png"; // Thay đổi đường dẫn nếu cần
import configGpsIcon from "/src/assets/uploads/cauhinhgps.png"; // Thay đổi đường dẫn nếu cần

const headers = JSON.parse(import.meta.env.VITE_AXIOS_HEADERS);

// const baseURL = "http://localhost/prjhrm_react_php/backend/api/";
const BASE_URL = `${import.meta.env.VITE_API_URL}`;

const tabItems = [
  {
    key: "configip",
    label: (
      <span>
        <img
          src={configIpIcon}
          alt="Cấu hình IP"
          style={{ width: 20, height: 20, marginRight: 10 }}
        />
        Cấu hình IP
      </span>
    ),
    url: BASE_URL + "diachiip/ip.php",
  },
  {
    key: "configgps",
    label: (
      <span>
        <img
          src={configGpsIcon}
          alt="Cấu hình GPS"
          style={{ width: 20, height: 20, marginRight: 10 }}
        />
        Cấu hình GPS
      </span>
    ),
    url: BASE_URL + "diadiem/gps.php",
  },
];

const ConfigTimeKeepingTabs = () => {
  const [activeKey, setActiveKey] = useState("configip");
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
      if (err) setErrorKey(key);
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

    if (key === "configip") {
      return <CauHinhIP />;
    }
    if (key === "configgps") {
      return <CauHinhGPS />;
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

export default ConfigTimeKeepingTabs;
