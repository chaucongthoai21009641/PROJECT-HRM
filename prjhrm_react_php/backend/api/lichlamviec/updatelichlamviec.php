<?php
include_once '../../config/cors.php';
include_once '../../config/database.php';
include_once '../../models/lichlamviec.php';

$db = new Database();
$conn = $db->connect();
$lichlamviec = new LichLamViec($conn);

$uri = $_SERVER['REQUEST_URI'];
$segments = explode('/', $uri);

$maLLV = end($segments);


if (!$maLLV) {
    die(json_encode(["error" => "Thiếu ID lịch làm việc."]));
}

// Đọc dữ liệu JSON từ request
$data = json_decode(file_get_contents("php://input"), true);

if ($maLLV > 0) {

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
    error_log($tgBatDauNghi);
    $query = "UPDATE lichlamviec SET tenCa = ?, ngayLamViec = ?, tgBatDau = ?, tgKetThuc = ?, 
    tgBatDauNghi = ?, tgKetThucNghi = ? , tgCheckInSom = ?, tgCheckOutMuon = ?, 
    heSoLuong = ?, tienThuong = ?, maNV = ? WHERE maLLV = ? LIMIT 1";
    $stmt = $conn->prepare($query);
    if (!$stmt) {
        echo json_encode(["error" => "SQL error: " . $conn->error]);
        exit;
    }

    $stmt->bind_param(
        'ssssssssddss',
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
        $maNV,
        $maLLV
    );

    if ($lichlamviec->insertUpDel($stmt)) {
        echo json_encode([
            "message" => "Cập nhật lịch làm việc thành công!",
            "status" => 200,
        ]);
    } else {
        echo json_encode(["error" => "Cập nhật lịch làm việc thất bại!", "error_details" => $stmt->error]);
    }

    $stmt->close();
} else {
    echo json_encode(["error" => "Dữ liệu không hợp lệ hoặc thiếu thông tin."]);
}

$conn->close();
