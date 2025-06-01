import { Avatar, Button, Card, Col, Row, Tabs, Typography, Table } from "antd";
import { MdQrCodeScanner } from "react-icons/md";
import {
  MailOutlined,
  PhoneOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  FileOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import { BiBarcodeReader } from "react-icons/bi"; // Icon đẹp hơn
import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import axios from "axios";
import {
  notifySuccess,
  notifyError,
  notifyAlert,
} from "../../../../utils/NotificationUtils";

const { Title, Text } = Typography;
const BASE_URL = `${import.meta.env.VITE_API_URL}`;
export default function Information() {
  const [nhanVien, setNhanVien] = useState(null);
  const [thongBao, setThongBao] = useState([]);
  const [taiLieu, setTaiLieu] = useState([]);
  const [lichHomNay, setLichHomNay] = useState([]);
  const [showScanner, setShowScanner] = useState(false);

  const headers = JSON.parse(import.meta.env.VITE_AXIOS_HEADERS);

  const haversineDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371000; // bán kính Trái Đất (mét)

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const handleScanQRCode = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        sessionStorage.setItem("lat", latitude);
        sessionStorage.setItem("lng", longitude);
        setShowScanner(true);
      },
      () => {
        notifyError("Không thể truy cập vị trí. Hãy bật định vị!");
        setShowScanner(false);
      },
      { enableHighAccuracy: true }
    );
  };

  useEffect(() => {
    if (showScanner) {
      const scanner = new Html5QrcodeScanner("qr-reader", {
        fps: 10,
        qrbox: 250,
      });

      scanner.render(
        async (decodedText, decodedResult) => {
          scanner.clear();
          setShowScanner(false);

          try {
            const qrData = JSON.parse(decodedText);
            const { kinhDo, viDo, banKinh, trangThai } = qrData;

            // 🔐 Kiểm tra trạng thái địa điểm
            if (parseInt(trangThai) !== 1) {
              return notifyAlert("Chưa cho phép chấm công ở vị trí này!");
            }

            const userLat = parseFloat(sessionStorage.getItem("lat"));
            const userLng = parseFloat(sessionStorage.getItem("lng"));

            const distance = haversineDistance(
              userLat,
              userLng,
              parseFloat(viDo),
              parseFloat(kinhDo)
            );

            if (distance > parseFloat(banKinh)) {
              return notifyError(
                "Bạn không ở trong phạm vi cho phép của mã QR này!"
              );
            }

            await handleChamCong();
          } catch (err) {
            console.error("Lỗi khi xử lý QR:", err);
            notifyError("QR Code không hợp lệ!");
          }
        },
        (error) => {
          console.log("QR scan error", error);
        }
      );

      return () => {
        scanner.clear().catch(console.error);
      };
    }
  }, [showScanner]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedUser"));
    const maNV = user?.maNV;
    if (!maNV) return;

    axios
      .get(`${BASE_URL}nhanvien/nhanvien.php`, { headers })
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : [res.data];
        const nv = data.find((item) => item.maNV === maNV);
        setNhanVien(nv);
      })
      .catch(console.error);

    // getIDSThongBao(url)
    axios
      .get(`${BASE_URL}thongbao/thongbao.php`, { headers })
      .then((res) =>
        setThongBao(Array.isArray(res.data) ? res.data : [res.data])
      )
      .catch(console.error);

    axios
      .get(`${BASE_URL}tailieu/tailieu.php`, { headers })
      .then((res) =>
        setTaiLieu(Array.isArray(res.data) ? res.data : [res.data])
      )
      .catch(console.error);

    const today = dayjs().format("YYYY-MM-DD");
    axios
      .get(`${BASE_URL}lichlamviec/lichlamviec.php`, { headers })
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : [res.data];
        const todayLich = data.filter(
          (item) => item.maNV === maNV && item.ngayLamViec === today
        );
        setLichHomNay(todayLich);
      })
      .catch(console.error);
  }, []);

  const handleChamCong = async () => {
    try {
      const now = dayjs();
      const currentTime = now.format("HH:mm:ss");
      const currentDate = now.format("YYYY-MM-DD");

      // 1. Lấy vị trí hiện tại
      const userLat = parseFloat(sessionStorage.getItem("lat"));
      const userLng = parseFloat(sessionStorage.getItem("lng"));

      if (!userLat || !userLng) {
        return notifyError("Không thể xác định vị trí hiện tại!");
      }

      // 2. Gọi API lấy danh sách địa điểm hợp lệ
      const resDiaDiem = await axios.get(`${BASE_URL}diadiem/gps.php`, {
        headers,
      });
      const diaDiems = Array.isArray(resDiaDiem.data)
        ? resDiaDiem.data
        : [resDiaDiem.data];

      // Tìm địa điểm gần nhất trong bán kính
      const diaDiemGanNhat = diaDiems.find((dd) => {
        const distance = haversineDistance(
          userLat,
          userLng,
          parseFloat(dd.viDo),
          parseFloat(dd.kinhDo)
        );
        return distance <= parseFloat(dd.banKinh);
      });

      if (!diaDiemGanNhat) {
        return notifyError("Bạn không nằm trong khu vực được phép chấm công!");
      }

      // Kiểm tra trạng thái địa điểm
      if (diaDiemGanNhat.trangThai !== 1) {
        return notifyAlert("Chưa cho phép chấm công ở vị trí này!");
      }

      // 3. Lấy lịch làm việc hôm nay của nhân viên
      const resLich = await axios.get(
        `${BASE_URL}lichlamviec/lichlamviec.php`,
        { headers }
      );
      const lichLamViec = Array.isArray(resLich.data)
        ? resLich.data
        : [resLich.data];

      const lichHomNay = lichLamViec.filter(
        (lich) =>
          lich.maNV === nhanVien.maNV && lich.ngayLamViec === currentDate
      );

      if (lichHomNay.length === 0) {
        return notifyError("Không tìm thấy lịch làm việc hôm nay!");
      }

      const resBangCong = await axios.get(`${BASE_URL}bangcong/bangcong.php`, {
        headers,
      });
      const bangCongList = Array.isArray(resBangCong.data)
        ? resBangCong.data
        : [resBangCong.data];

      let chamCongXong = false;

      for (const lich of lichHomNay) {
        const maLLV = lich.maLLV;
        const bangCong = bangCongList.find((bc) => bc.maLLV === maLLV);

        if (!bangCong) {
          const payload = {
            maLLV,
            tgCheckIn: currentTime,
            tgCheckOut: null,
          };

          const resInsert = await axios.post(
            `${BASE_URL}bangcong/insertbangcong.php`,
            payload,
            { headers }
          );

          if (resInsert.status === 200) {
            notifySuccess(`Check-in thành công cho ca ${lich.tenCa}`);
            chamCongXong = true;
            break; // hoặc tiếp tục nếu muốn check-in nhiều ca
          }
        } else if (!bangCong.tgCheckIn) {
          const payload = {
            tgCheckIn: currentTime,
            tgCheckOut: null,
            maLLV,
          };

          const resUpdate = await axios.put(
            `${BASE_URL}bangcong/updatebangcong.php/${bangCong.maBC}`,
            payload,
            { headers }
          );

          if (resUpdate.status === 200) {
            notifySuccess(`Check-in thành công cho ca ${lich.tenCa}`);
            chamCongXong = true;
            break;
          }
        } else if (!bangCong.tgCheckOut) {
          const payload = {
            tgCheckIn: bangCong.tgCheckIn,
            tgCheckOut: currentTime,
            maLLV,
          };

          const resUpdate = await axios.put(
            `${BASE_URL}bangcong/updatebangcong.php/${bangCong.maBC}`,
            payload,
            { headers }
          );

          if (resUpdate.status === 200) {
            notifySuccess(`Check-out thành công cho ca ${lich.tenCa}`);
            chamCongXong = true;
            break;
          }
        }
      }

      if (!chamCongXong) {
        notifyAlert("Bạn đã chấm đủ công hôm nay rồi!");
      }
    } catch (error) {
      console.error("Lỗi khi chấm công:", error);
      notifyError("Có lỗi xảy ra khi chấm công!");
    }
  };

  const handleChamCongWithLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        sessionStorage.setItem("lat", latitude);
        sessionStorage.setItem("lng", longitude);
        handleChamCong(); // Gọi chấm công sau khi lấy vị trí thành công
      },
      () => {
        notifyError("Không thể truy cập vị trí. Hãy bật định vị!");
      },
      { enableHighAccuracy: true }
    );
  };

  if (!nhanVien)
    return <p style={{ textAlign: "center" }}>Đang tải dữ liệu...</p>;

  // Cột cho bảng Thông báo và Tài liệu
  const columnsCommon = (type) => [
    {
      title: type === "notification" ? "Thông báo" : "Tài liệu",
      dataIndex: "tieuDe",
      key: "tieuDe",
      render: (text, record) => (
        <a href={record.url} target="_blank" rel="noopener noreferrer">
          {record.tieuDe}
        </a>
      ),
    },
    {
      title: "Thời gian",
      key: "tg",
      render: (_, record) =>
        `${record.tgBatDau?.slice(0, 16)} - ${record.tgKetThuc?.slice(0, 16)}`,
    },
  ];
  const tabItems = [
    {
      key: "1",
      label: (
        <span>
          <NotificationOutlined /> Thông báo
        </span>
      ),
      children: (
        <Table
          rowKey="maTB"
          columns={columnsCommon("notification")}
          // showDSThongBao()
          dataSource={thongBao}
          pagination={false}
          scroll={{ x: "max-content", y: 420 }}
        />
      ),
    },
    {
      key: "2",
      label: (
        <span>
          <FileOutlined /> Tài liệu
        </span>
      ),
      children: (
        <Table
          rowKey="maTL"
          columns={columnsCommon("document")}
          // showDSTaiLieu()
          dataSource={taiLieu}
          pagination={false}
          scroll={{ x: "max-content", y: 420 }}
        />
      ),
    },
  ];

  return (
    <Row gutter={[24, 24]}>
      <Col xs={24} md={9}>
        <Card hoverable>
          <Row gutter={12} wrap={false} align="middle">
            <Col flex="auto">
              <Button
                type="primary"
                size="large"
                icon={<ClockCircleOutlined />}
                onClick={handleChamCongWithLocation}
                block
                style={{ marginBottom: 16, float: "right" }}
              >
                Chấm công
              </Button>{" "}
            </Col>{" "}
            <Col>
              <Button
                type="default"
                shape="circle"
                icon={<MdQrCodeScanner size={24} />}
                onClick={handleScanQRCode}
                style={{
                  marginBottom: 16,
                  marginLeft: "auto",
                  marginRight: 0,
                  display: "block",
                }}
                size="large"
                title="Quét mã QR"
              />
              {showScanner && (
                <div
                  style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                    zIndex: 9999,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <div
                    id="qr-reader"
                    style={{
                      width: "400px",
                      maxWidth: "90vw",
                      // height: "520px",
                      height: "620px",
                      backgroundColor: "#fff",
                      borderRadius: "15px",
                      overflow: "hidden",
                    }}
                  />
                  <Button
                    type="primary"
                    danger
                    style={{ marginTop: "16px" }}
                    onClick={() => setShowScanner(false)}
                  >
                    Đóng
                  </Button>
                </div>
              )}
            </Col>
          </Row>
          <Row align="middle">
            <Col flex="100px" style={{ textAlign: "center" }}>
              <Avatar size={100} src="/avatar-default.png" />
            </Col>
            <Col flex="auto" style={{ paddingLeft: "10px" }}>
              {" "}
              {/* Thêm paddingLeft để tạo khoảng cách giữa avatar và thông tin nhân viên */}
              <Title level={4} style={{ marginBottom: 0 }}>
                {nhanVien.hoTen}
              </Title>
              <Text type="secondary">{nhanVien.chucDanh}</Text>
              <br />
              <Text>
                <MailOutlined /> {nhanVien.email}
              </Text>
              <br />
              <Text>
                <PhoneOutlined /> {nhanVien.soDienThoai}
              </Text>
              <br />
              <Text>
                <CalendarOutlined /> {nhanVien.ngaySinh}
              </Text>
              <br />
              <Text>🏢 {nhanVien.tenPhongBan}</Text>
            </Col>
          </Row>

          <Title level={5}>📅 Lịch làm hôm nay</Title>
          {lichHomNay.length > 0 &&
            lichHomNay.map((lich, index) => (
              <Card key={index} size="small" style={{ marginTop: 16 }}>
                <Text>Ca: {lich.tenCa}</Text>
                <br />
                <Text>
                  🕗 {lich.tgBatDau} - {lich.tgKetThuc}
                </Text>
                <br />
                <Text>
                  🛑 Nghỉ: {lich.tgBatDauNghi} - {lich.tgKetThucNghi}
                </Text>
              </Card>
            ))}
        </Card>
      </Col>

      <Col xs={24} md={15}>
        <Tabs defaultActiveKey="1" size="large" items={tabItems} />
      </Col>
    </Row>
  );
}
