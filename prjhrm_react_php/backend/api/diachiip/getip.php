<?php
include_once '../../config/cors.php';
include_once '../../config/database.php';
include_once '../../models/DiaChiIP.php';

$db = new Database();
$conn = $db->connect();
$diachiip = new DiaChiIP($conn);

$uri = $_SERVER['REQUEST_URI'];
$segments = explode('/', $uri);

$maDCIP = end($segments);

if (!$maDCIP) {
    die(json_encode(["error" => "Thiếu ID địa chỉ."]));
}

$result = $diachiip->selectOne($maDCIP);

if ($result) {
    // Lấy kết quả và chuyển thành mảng
    $diachiip_item = $result->fetch_assoc();

    echo json_encode($diachiip_item);
} else {
    echo json_encode([["error" => "IP không tồn tại."]]);
}

$conn->close();
