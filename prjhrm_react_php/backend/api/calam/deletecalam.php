<?php
include_once '../../config/cors.php';
include_once '../../config/database.php';
include_once '../../models/calam.php';

$db = new Database();
$conn = $db->connect();
$calam = new CaLam($conn);

$data = json_decode(file_get_contents("php://input"), true);
$maCL = $data['maCL'] ?? null;

if ($maCL) {
    $query = "DELETE FROM calam WHERE maCL = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $maCL);

    if ($calam->insertUpDel($stmt)) {
        echo json_encode(["message" => "Xóa ca làm thành công."]);
    } else {
        echo json_encode([
            "error" => "Xóa ca làm thất bại.",
            "error_details" => $stmt->error
        ]);
    }
} else {
    echo json_encode(["error" => "Thiếu dữ liệu maCL."]);
}

$conn->close();
