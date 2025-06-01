<?php
include_once '../../config/cors.php';
include_once '../../config/database.php';
include_once '../../models/ThongBao.php';

$db = new Database();
$conn = $db->connect();
$thongbao = new ThongBao($conn);

$uri = $_SERVER['REQUEST_URI'];
$segments = explode('/', $uri);

$maTB = end($segments);

if (!$maTB) {
    die(json_encode(["error" => "Thiếu ID thông báo."]));
}

$result = $thongbao->selectOne($maTB);

if ($result) {
    // Lấy kết quả và chuyển thành mảng
    $thongbao_item = $result->fetch_assoc();

    echo json_encode($thongbao_item);
} else {
    echo json_encode([["error" => "Thông báo không tồn tại."]]);
}

$conn->close();
