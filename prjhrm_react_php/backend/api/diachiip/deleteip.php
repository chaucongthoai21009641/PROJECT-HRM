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
    echo json_encode(["error" => "Thiếu ID thiết bị."]);
    exit;
} else if ($maDCIP) {
    $query = "DELETE FROM diachiip WHERE maDCIP = ? LIMIT 1";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $maDCIP);

    if ($diachiip->insertUpDel($stmt)) {
        echo json_encode(["message" => "Xóa IP thành công."]);
    } else {
        echo json_encode(["error" => "Xóa IP thất bại.", "error_details" => $stmt->error]);
    }

    // Đóng kết nối
    $stmt->close();
} else {
    echo json_encode(["error" => "Thiếu dữ liệu mã IP."]);
}

$conn->close();
