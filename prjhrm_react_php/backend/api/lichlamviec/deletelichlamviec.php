<?php
include_once '../../config/cors.php';
include_once '../../config/database.php';
include_once '../../models/lichlamviec.php';

$db = new Database();
$conn = $db->connect();
$lichlamviec = new LichLamViec($conn);

// $data = json_decode(file_get_contents("php://input"), true);
$uri = $_SERVER['REQUEST_URI'];
$segments = explode('/', $uri);
$maLLV = end($segments);

if (!$maLLV) {
    echo json_encode(["error" => "Thiếu ID khung giờ làm."]);
    exit;
}

$query = "DELETE FROM lichlamviec WHERE maLLV = ? LIMIT 1";
$stmt = $conn->prepare($query);
$stmt->bind_param("s", $maLLV);

if ($lichlamviec->insertUpDel($stmt)) {
    echo json_encode([
        "message" => "Xóa khung giờ làm thành công.",
        "status=" => 200
    ]);
} else {
    echo json_encode([
        "error" => "Xóa khung giờ làm thất bại.",
        "error_details" => $stmt->error
    ]);
}

$conn->close();
