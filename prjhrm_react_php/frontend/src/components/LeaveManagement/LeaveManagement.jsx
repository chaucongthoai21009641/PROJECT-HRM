// src/components/LeaveManagement/LeaveManagement.jsx
import React, { useState, useEffect } from "react";
import { Tabs, Spin, Alert } from "antd";
import axios from "axios";
import LeaveRequest from "./LeaveRequest/LeaveRequest";
import LeaveManager from "./LeaveManager/LeaveManager";

import leaveRequestIcon from "/src/assets/uploads/leave-request.png";
import leaveManagerIcon from "/src/assets/uploads/leave-manager.png";

const baseURL = "http://localhost/prjhrm_react_php/backend/api/";

const tabItems = [
  {
    key: "leaverequest",
    label: (
      <span>
        <img
          src={leaveRequestIcon}
          alt="Đơn nghỉ phép"
          style={{ width: 20, height: 20, marginRight: 10 }}
        />
        Đơn nghỉ phép
      </span>
    ),
    // url: baseURL + "donphep/donphep.php",
  },
  {
    key: "leavemanager",
    label: (
      <span>
        <img
          src={leaveManagerIcon}
          alt="Quản lý ngày phép"
          style={{ width: 20, height: 20, marginRight: 10 }}
        />
        Quản lý ngày phép
      </span>
    ),
    url: baseURL + "ngayphep/ngayphep.php",
  },
];

const LeaveManagement = () => {
  const [activeKey, setActiveKey] = useState("leaverequest");
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

    if (key === "leaverequest") {
      return <LeaveRequest />;
    }

    if (key === "leavemanager") {
      return <LeaveManager />;
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

export default LeaveManagement;
