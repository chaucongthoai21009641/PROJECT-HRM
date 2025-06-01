import React, { useState, useEffect } from "react";
import "@ant-design/v5-patch-for-react-19";
import { Layout, ConfigProvider, theme as antdTheme } from "antd";
import Sidebar from "./components/Sidebar";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate, // Keep only Navigate
} from "react-router-dom";
// Admin
import EmployeeManager from "./components/Employee/EmployeeManager";
import NotificationTabs from "./components/Notification/NotificationTabs";
import LeaveManagement from "./components/LeaveManagement/LeaveManagement";
import ShiftManagement from "./components/TimeKeeping/QLCaLam/ShiftManagement";
import ConfigTimeKeepingTabs from "./components/TimeKeeping/QLChamCong/ConfigTimeKeepingTabs";
import Timekeeping from "./components/TimeKeeping/BangChamCong/BangChamCong";
import Salary from "./components/Salary/Salary";

// Employee
import InforManagement from "./components/User/InforManagement/InforManagement";

import "leaflet/dist/leaflet.css";
import Login from "./components/Login"; // Import the Login component
import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [userRole, setUserRole] = useState(() =>
    localStorage.getItem("userRole")
  ); // Initialize from localStorage

  useEffect(() => {
    const storedRole = localStorage.getItem("userRole");
    if (storedRole) {
      setUserRole(storedRole); // Restore userRole on app load
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleLogin = (role, navigate) => {
    setUserRole(role);
    localStorage.setItem("userRole", role); // Save userRole to localStorage
    if (role === "admin") {
      navigate("/Admin/EmployeeManagement");
    } else if (role === "user") {
      navigate("/Employee/InforManagement");
    }
  };

  const handleLogout = (navigate) => {
    setUserRole(null);
    localStorage.removeItem("userRole"); // Clear userRole from localStorage
    navigate("/Login");
  };

  const customTheme = {
    token: {
      colorBgBase: isDarkMode
        ? "rgba(40, 40, 48, 0.9)"
        : "rgba(255, 255, 255, 1)",
    },
    algorithm: isDarkMode
      ? antdTheme.darkAlgorithm
      : antdTheme.defaultAlgorithm,
  };

  return (
    <>
      <ConfigProvider theme={customTheme}>
        <Router>
          <Layout style={{ maxWidth: "100vw", minHeight: "100vh" }}>
            <Routes>
              <Route
                path="/Login"
                element={
                  <Login
                    onLogin={(role, navigate) => handleLogin(role, navigate)}
                  />
                }
              />
              <Route path="/" element={<Navigate to="/Login" />} />
              <Route
                path="*"
                element={
                  <>
                    <Sidebar
                      toggleTheme={toggleTheme}
                      isDarkMode={isDarkMode}
                      userRole={userRole}
                      onLogout={(navigate) => handleLogout(navigate)}
                    />
                    <Layout
                      style={{
                        overflowY: "auto",
                        height: "100vh",
                        padding: 16,
                      }}
                    >
                      <Routes>
                        {/* Admin Routes */}
                        <Route
                          path="/Admin/EmployeeManagement"
                          element={
                            <ProtectedRoute
                              userRole={userRole}
                              allowedRoles={["admin"]}
                            >
                              <EmployeeManager />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/Admin/Announcement"
                          element={
                            <ProtectedRoute
                              userRole={userRole}
                              allowedRoles={["admin"]}
                            >
                              <NotificationTabs />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/Admin/DonPhep"
                          element={
                            <ProtectedRoute
                              userRole={userRole}
                              allowedRoles={["admin"]}
                            >
                              <LeaveManagement />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/Admin/Schedule"
                          element={
                            <ProtectedRoute
                              userRole={userRole}
                              allowedRoles={["admin"]}
                            >
                              <ShiftManagement />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/Admin/ConfigTimekeeping"
                          element={
                            <ProtectedRoute
                              userRole={userRole}
                              allowedRoles={["admin"]}
                            >
                              <ConfigTimeKeepingTabs />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/Admin/Timekeeping"
                          element={
                            <ProtectedRoute
                              userRole={userRole}
                              allowedRoles={["admin"]}
                            >
                              <Timekeeping />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/Admin/Salary"
                          element={
                            <ProtectedRoute
                              userRole={userRole}
                              allowedRoles={["admin"]}
                            >
                              <Salary />
                            </ProtectedRoute>
                          }
                        />

                        {/* Employee Routes */}
                        <Route
                          path="/Employee/InforManagement"
                          element={
                            <ProtectedRoute
                              userRole={userRole}
                              allowedRoles={["user"]}
                            >
                              <InforManagement />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/Employee/LeaveRequest"
                          element={
                            <ProtectedRoute
                              userRole={userRole}
                              allowedRoles={["user"]}
                            >
                              <div>Leave Request</div>
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/Employee/Schedule"
                          element={
                            <ProtectedRoute
                              userRole={userRole}
                              allowedRoles={["user"]}
                            >
                              <div>Employee Schedule</div>
                            </ProtectedRoute>
                          }
                        />
                      </Routes>
                    </Layout>
                  </>
                }
              />
            </Routes>
          </Layout>
        </Router>
      </ConfigProvider>
    </>
  );
}

export default App;
