<?php
include_once '../../config/cors.php';
include_once '../../config/database.php';
include_once '../../models/hopthoai.php';

$db = new Database();
$conn = $db->connect();
$hopthoai = new HopThoai($conn);

$data = json_decode(file_get_contents("php://input"), true);
$maHT = $data['maHT'] ?? null;

if ($maHT) {
    $hopthoai = new HopThoai($conn);

    $query = "DELETE FROM hopthoai WHERE maHT = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $maHT);

    if ($hopthoai->insertUpDel($stmt)) {
        echo json_encode(["message" => "Xóa hộp thoại thành công."]);
    } else {
        echo json_encode(["error" => "Xóa hộp thoại thất bại.", "error_details" => $stmt->error]);
    }

    $stmt->close();
} else {
    echo json_encode(["error" => "Thiếu dữ liệu maHT."]);
}

$conn->close();
