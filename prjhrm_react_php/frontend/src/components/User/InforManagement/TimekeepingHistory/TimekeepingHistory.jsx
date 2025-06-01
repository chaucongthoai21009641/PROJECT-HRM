import { DatePicker, Card, Row, Col, Calendar, Badge, Typography } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import axios from "axios";

const { Text } = Typography;
const BASE_URL = `${import.meta.env.VITE_API_URL}`;
const headers = JSON.parse(import.meta.env.VITE_AXIOS_HEADERS);

const AttendanceCalendar = () => {
  const [selectedMonth, setSelectedMonth] = useState(dayjs());
  const [lichLamViec, setLichLamViec] = useState([]);
  const [bangCong, setBangCong] = useState([]);
  const [maNV, setMaNV] = useState(null);

  // Lấy maNV từ localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedUser"));
    if (user?.maNV) {
      setMaNV(user.maNV);
    }
  }, []);

  // Hàm fetch API lịch làm việc và bảng công
  const fetchData = async () => {
    if (!maNV) return;

    try {
      const resLLV = await axios.get(`${BASE_URL}lichlamviec/lichlamviec.php`, {
        headers,
      });
      const lichLamViecNV = resLLV.data.filter((item) => item.maNV === maNV);
      setLichLamViec(lichLamViecNV || []);

      const maLLVList = lichLamViecNV.map((item) => item.maLLV);

      const resBangCong = await axios.get(`${BASE_URL}bangcong/bangcong.php`, {
        headers,
      });
      const bangCongNV = resBangCong.data.filter((item) =>
        maLLVList.includes(item.maLLV)
      );
      setBangCong(bangCongNV || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Gọi API mỗi 5 giây
  useEffect(() => {
    if (!maNV) return;

    fetchData(); // gọi lần đầu
    const interval = setInterval(fetchData, 5000); // gọi lặp lại mỗi 5 giây

    return () => clearInterval(interval); // clear khi unmount
  }, [maNV]);

  const getCellContent = (date) => {
    const ngay = date.format("YYYY-MM-DD");
    const caTrongNgay = lichLamViec.filter((ca) => ca.ngayLamViec === ngay);

    if (caTrongNgay.length === 0) {
      return <div>X</div>;
    }

    return (
      <div className="max-h-24 overflow-y-auto space-y-1">
        {caTrongNgay.map((ca) => {
          const attendance = bangCong.find((b) => b.maLLV === ca.maLLV);
          const checkIn = attendance?.tgCheckIn;
          const checkOut = attendance?.tgCheckOut;
          const muon = checkIn && checkIn > ca.tgBatDau;

          return (
            <div key={ca.maLLV} className="text-xs">
              <div>
                {`${ca.tgBatDau.slice(0, 5)} - ${ca.tgKetThuc.slice(0, 5)}`}
              </div>
              {attendance ? (
                <>
                  <Text type={muon ? "danger" : "success"}>
                    {checkIn ? `Vào: ${checkIn}` : "Chưa vào"}
                  </Text>
                  <Text>{checkOut ? `Ra: ${checkOut}` : "Chưa ra"}</Text>
                </>
              ) : (
                <Badge status="warning" text="Chưa chấm công" />
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const dateCellRender = (date) => {
    const content = getCellContent(date);
    return <div style={{ padding: 10 }}>{content}</div>;
  };

  return (
    <div>
      <Row justify="end" align="middle">
        <Col>
          <DatePicker
            picker="month"
            value={selectedMonth}
            onChange={(val) => val && setSelectedMonth(val)}
            format="MM/YYYY"
            style={{ marginBottom: 16 }}
          />
        </Col>
      </Row>

      <Card>
        <Calendar
          cellRender={dateCellRender}
          headerRender={() => null}
          value={selectedMonth}
          onPanelChange={(value) => setSelectedMonth(value)}
        />
      </Card>
    </div>
  );
};

export default AttendanceCalendar;
