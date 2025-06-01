<?php
include_once '../../config/cors.php';
include_once '../../config/database.php';
include_once '../../models/tailieu.php';

$db = new Database();
$conn = $db->connect();
$tailieu = new TaiLieu($conn);

$data = json_decode(file_get_contents("php://input"), true);
$maTL = $data['maTL'] ?? null;

if ($maTL) {
    $tailieu = new TaiLieu($conn);

    $query = "DELETE FROM tailieu WHERE maTL = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $maTL);  // Liên kết tham số maTL

    if ($tailieu->insertUpDel( $stmt)) {
        echo json_encode(["message" => "Xóa tài liệu thành công."]);
    } else {
        echo json_encode(["error" => "Xóa tài liệu thất bại.", "error_details" => $stmt->error]);
    }

    $stmt->close();
} else {
    echo json_encode(["error" => "Thiếu dữ liệu maTL."]);
}

$conn->close();
