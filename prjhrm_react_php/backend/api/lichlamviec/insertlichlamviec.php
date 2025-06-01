<?php
include_once '../../config/cors.php';
include_once '../../config/database.php';
include_once '../../models/lichlamviec.php';

$db = new Database();
$conn = $db->connect();
$lichlamviec = new LichLamViec($conn);

// Đọc dữ liệu JSON từ request
$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['ngayLamViec'], $data['tgBatDau'], $data['tgKetThuc'], $data['heSoLuong'])) {

    $tenCa = $data['tenCa'];
    $ngayLamViec = $data['ngayLamViec'];
    $tgBatDau = $data['tgBatDau'];
    $tgKetThuc = $data['tgKetThuc'];
    $tgBatDauNghi = $data['tgBatDauNghi'];
    $tgKetThucNghi = $data['tgKetThucNghi'];
    $tgCheckInSom = $data['tgCheckInSom'] ?? 0;
    $tgCheckOutMuon = $data['tgCheckOutMuon'] ?? 0;
    $heSoLuong = $data['heSoLuong'] ?? 1;
    $tienThuong = $data['tienThuong'] ?? 0;
    $maNV = $data['maNV'];

    $query = "INSERT INTO lichlamviec (tenCa, ngayLamViec, tgBatDau, 
    tgKetThuc, tgBatDauNghi, tgKetThucNghi, tgCheckInSom, tgCheckOutMuon, 
    heSoLuong, tienThuong, maNV) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($query);

    if (!$stmt) {
        echo json_encode(["error" => "Lỗi prepare SQL", "error_details" => $conn->error]);
        exit;
    }

    $stmt->bind_param(
        "ssssssssdds",
        $tenCa,
        $ngayLamViec,
        $tgBatDau,
        $tgKetThuc,
        $tgBatDauNghi,
        $tgKetThucNghi,
        $tgCheckInSom,
        $tgCheckOutMuon,
        $heSoLuong,
        $tienThuong,
        $maNV
    );

    if ($lichlamviec->insertUpDel($stmt)) {
        $maLLV = $stmt->insert_id;
        echo json_encode([
            "message" => "Tạo khung giờ làm thành công!",
            // "maLLV" => $maLLV
            "status" => 200
        ]);
    } else {
        echo json_encode([
            "error" => "Tạo khung giờ làm thất bại.",
            "error_details" => $stmt->error
        ]);
    }

    $stmt->close();
} else {
    echo json_encode(["error" => "Thiếu dữ liệu."]);
}

$conn->close();
