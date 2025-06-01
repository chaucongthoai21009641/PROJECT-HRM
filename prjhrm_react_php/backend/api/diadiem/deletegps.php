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

if ($maDD) {
    $query = "DELETE FROM diadiem WHERE maDD = ? LIMIT 1";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $maDD);

    if ($diadiem->insertUpDel($stmt)) {
        echo json_encode(["message" => "Xóa địa điểm thành công."]);
    } else {
        echo json_encode(["error" => "Xóa địa điểm thất bại.", "error_details" => $stmt->error]);
    }

    // Đóng kết nối
    $stmt->close();
} else {
    echo json_encode(["error" => "Thiếu mã địa điểm."]);
}

$conn->close();
