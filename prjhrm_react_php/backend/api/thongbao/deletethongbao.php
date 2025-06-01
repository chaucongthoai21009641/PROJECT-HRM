<?php
include_once '../../config/cors.php';
include_once '../../config/database.php';
include_once '../../models/thongbao.php';

$db = new Database();
$conn = $db->connect();
$thongbao = new ThongBao($conn);

$data = json_decode(file_get_contents("php://input"), true);
$maTB = $data['maTB'] ?? null;

if ($maTB) {
    $query = "DELETE FROM thongbao WHERE maTB = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $maTB);

    if ($thongbao->insertUpDel($stmt)) {
        echo json_encode(["message" => "Xóa thông báo thành công."]);
    } else {
        echo json_encode(["error" => "Xóa thông báo thất bại.", "error_details" => $stmt->error]);
    }

    $stmt->close();
} else {
    echo json_encode(["error" => "Thiếu dữ liệu maTB."]);
}

$conn->close();
