import { DatePicker, Card, Row, Col, Calendar, Badge, Typography } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import axios from "axios";

const { Text } = Typography;
const BASE_URL = `${import.meta.env.VITE_API_URL}`;

const AttendanceCalendar = () => {
  const [selectedMonth, setSelectedMonth] = useState(dayjs());
  const [lichLamViec, setLichLamViec] = useState([]);
  const [bangCong, setBangCong] = useState([]);
  const [maNV, setMaNV] = useState(null);

  // Lấy maNV từ localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedUser"));
    if (!user?.maNV) return;
    setMaNV(user.maNV);
  }, []);

  useEffect(() => {
    if (!maNV) return;

    // Lấy lịch làm việc của nhân viên hiện tại, so sánh maNV với dữ liệu API
    axios
      .get(`${BASE_URL}lichlamviec/lichlamviec.php`)
      .then((res) => {
        const lichLamViecNV = res.data.filter((item) => item.maNV === maNV);
        setLichLamViec(lichLamViecNV || []);
      })
      .catch((error) => {
        console.error("Error fetching working schedule:", error);
      });
  }, [maNV]); // Chỉ gọi API lịch làm việc khi maNV thay đổi

  useEffect(() => {
    if (lichLamViec.length === 0) return; // Nếu chưa có lịch làm việc thì không gọi API bảng công

    // Lấy bảng công của nhân viên sau khi đã có lichLamViec
    axios
      .get(`${BASE_URL}bangcong/bangcong.php`)
      .then((res) => {
        // Sau khi có lichLamViec, ta có thể lấy maLLV từ đó
        const maLLVList = lichLamViec.map((item) => item.maLLV); // Lấy tất cả maLLV trong lịch làm việc
        const bangCongNV = res.data.filter((item) =>
          maLLVList.includes(item.maLLV)
        ); // So sánh maLLV với danh sách đã có
        setBangCong(bangCongNV || []);
      })
      .catch((error) => {
        console.error("Error fetching attendance:", error);
      });
  }, [lichLamViec]); // Gọi API bảng công khi lichLamViec đã thay đổi

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
          console.log("Attendance data:", attendance); // Debug

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
