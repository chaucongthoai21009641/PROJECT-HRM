import React from "react";
import { Card, Col, Row, Button, Space } from "antd";
import dayjs from "dayjs";

const HopThoaiTable = ({ hopThoaiList, openModal, deleteHopThoai }) => {
  return (
    <Row gutter={[16, 16]}>
      {hopThoaiList.map((item) => (
        <Col key={item.maHT} span={8}>
          <Card
            title={
              <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                {item.tieuDe}
              </span>
            }
            variant="borderless"
            style={{
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
              padding: "16px",
            }}
          >
            <p>{item.noiDung}</p>
            <p>🌐 {item.url}</p>
            <p>Số lần hiển thị: {item.soLanHienThi}</p>
            <p>
              ⏰ {dayjs(item.tgBatDau).format("DD/MM/YYYY HH:mm")} -{" "}
              {dayjs(item.tgKetThuc).format("DD/MM/YYYY HH:mm")}
            </p>
            <Space>
              <Button
                type="primary"
                size="small"
                onClick={() => openModal(item)}
                style={{ borderRadius: "4px" }}
              >
                ✏️ Sửa
              </Button>
              <Button
                danger
                size="small"
                onClick={() => deleteHopThoai(item.maHT)}
                style={{ borderRadius: "4px" }}
              >
                🗑 Xóa
              </Button>
            </Space>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default HopThoaiTable;
