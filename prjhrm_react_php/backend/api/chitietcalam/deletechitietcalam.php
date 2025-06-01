<?php
include_once '../../config/cors.php';
include_once '../../config/database.php';
include_once '../../models/ChiTietCaLam.php';

$db = new Database();
$conn = $db->connect();
$chitietcalam = new ChiTietCaLam($conn);

$uri = $_SERVER['REQUEST_URI'];
$segments = explode('/', $uri);
$maCTCL = end($segments);

if (!$maCTCL) {
    echo json_encode(["error" => "Thiếu ID chi tiết ca làm."]);
    exit;
}

$query = "DELETE FROM chitietcalam WHERE maCTCL = ? LIMIT 1";
$stmt = $conn->prepare($query);
$stmt->bind_param("i", $maCTCL);

if ($chitietcalam->insertUpDel($stmt)) {
    echo json_encode([
        "message" => "Xóa chi tiết ca làm thành công.",
        "status=" => 200
    ]);
} else {
    echo json_encode([
        "error" => "Xóa chi tiết ca làm thất bại.",
        "error_details" => $stmt->error
    ]);
}

$conn->close();
