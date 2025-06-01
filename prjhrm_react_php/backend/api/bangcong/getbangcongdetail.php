<?php
include_once '../../config/cors.php';
include_once '../../config/database.php';
include_once '../../models/BangCong.php';

$db = new Database();
$conn = $db->connect();
$bangcong = new BangCong($conn);

$uri = $_SERVER['REQUEST_URI'];
$segments = explode('/', $uri);

$maBC = end($segments);

if (!$maBC) {
    die(json_encode(["error" => "Thiếu ID lịch làm việc."]));
}

$result = $bangcong->selectTimeShiftDetail($maBC);

if ($result && $result->num_rows > 0) {
    $bangcong_item = null;

    while ($row = $result->fetch_assoc()) {
        if (!$bangcong_item) {
            $bangcong_item = [
                "maBC" => $row["maBC"],
                "tgCheckIn" => $row["tgCheckIn"],
                "tgCheckOut" => $row["tgCheckOut"],
                "lichLamViecItem" => [
                    "maLLV" => $row["maLLV"],
                    "tenCa" => $row["tenCa"],
                    "ngayLamViec" => $row["ngayLamViec"],
                    "tgCheckInSom" => $row["tgCheckInSom"],
                    "tgCheckOutMuon" => $row["tgCheckOutMuon"],
                    "tgBatDau" => $row["tgBatDau"],
                    "tgKetThuc" => $row["tgKetThuc"],
                    "tgBatDauNghi" => $row["tgBatDauNghi"],
                    "tgKetThucNghi" => $row["tgKetThucNghi"],
                    "heSoLuong" => $row["heSoLuong"],
                    "tienThuong" => $row["tienThuong"],
                    "maNV" => $row["maNV"],
                ]
            ];
        }
    }
    echo json_encode($bangcong_item);
} else {
    echo json_encode(["error" => "Ca làm không tồn tại."]);
}


$conn->close();
