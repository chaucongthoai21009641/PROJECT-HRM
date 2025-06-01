<?php
include_once '../../config/cors.php';
include_once '../../config/database.php';
include_once '../../models/chitietcalam.php';

$db = new Database();
$conn = $db->connect();
$chitietcalam = new ChiTietCaLam($conn);

$uri = $_SERVER['REQUEST_URI'];
$segments = explode('/', $uri);

$maCTCL = end($segments);

if (!$maCTCL) {
    die(json_encode(["error" => "Thiếu ID chi tiết ca làm."]));
}

$result = $chitietcalam->selectOne($maCTCL);

if ($result) {
    // Lấy kết quả và chuyển thành mảng
    $chitietcalam_item = $result->fetch_assoc();
    $chitietcalam_item = array(
        "maCTCL" => $chitietcalam_item['maCTCL'],
        "thuTrongTuan" => $chitietcalam_item['thuTrongTuan'],
        "tgBatDau" => $chitietcalam_item['tgBatDau'],
        "tgKetThuc" => $chitietcalam_item['tgKetThuc'],
        "tgBatDauNghi" => $chitietcalam_item['tgBatDauNghi'],
        "tgKetThucNghi" => $chitietcalam_item['tgKetThucNghi'],
        "heSoLuong" => $chitietcalam_item['heSoLuong'],
        "tienThuong" => $chitietcalam_item['tienThuong'],
        "maCL" => $chitietcalam_item['maCL']
    );

    echo json_encode([$chitietcalam_item]);
} else {
    echo json_encode([["error" => "Chi tiết ca làm không tồn tại."]]);
}

$conn->close();
