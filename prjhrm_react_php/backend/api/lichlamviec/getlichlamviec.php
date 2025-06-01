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

$result = $lichlamviec->selectOne($maLLV);

if ($result) {
    // Lấy kết quả và chuyển thành mảng
    $lichlamviec_item = $result->fetch_assoc();
    $lichlamviec_item = array(
        "maLLV" => $lichlamviec_item['maLLV'],
        "tenCa" => $lichlamviec_item['tenCa'],
        "ngayLamViec" => $lichlamviec_item['ngayLamViec'],
        "tgBatDau" => $lichlamviec_item['tgBatDau'],
        "tgKetThuc" => $lichlamviec_item['tgKetThuc'],
        "tgBatDauNghi" => $lichlamviec_item['tgBatDauNghi'],
        "tgKetThucNghi" => $lichlamviec_item['tgKetThucNghi'],
        "tgCheckInSom" => $lichlamviec_item['tgCheckInSom'],
        "tgCheckOutMuon" => $lichlamviec_item['tgCheckOutMuon'],
        "heSoLuong" => $lichlamviec_item['heSoLuong'],
        "tienThuong" => $lichlamviec_item['tienThuong']
    );

    echo json_encode([$lichlamviec_item]);
} else {
    echo json_encode([["error" => "Lịch làm việc không tồn tại."]]);
}

$conn->close();
