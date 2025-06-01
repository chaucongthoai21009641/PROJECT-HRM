<?php
include_once '../../config/cors.php';
include_once '../../config/database.php';
include_once '../../models/DiaDiem.php';

$db = new Database();
$conn = $db->connect();
$diadiem = new DiaDiem($conn);

$uri = $_SERVER['REQUEST_URI'];
$segments = explode('/', $uri);

$maDD = end($segments);

if (!$maDD) {
    die(json_encode(["error" => "Thiếu mã địa điểm."]));
}

$result = $diadiem->selectOne($maDD);

if ($result) {
    // Lấy kết quả và chuyển thành mảng
    $diadiem_item = $result->fetch_assoc();

    echo json_encode($diadiem_item);
} else {
    echo json_encode([["error" => "Địa diểm không tồn tại."]]);
}

$conn->close();
