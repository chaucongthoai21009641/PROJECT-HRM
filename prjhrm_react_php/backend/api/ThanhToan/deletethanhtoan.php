<?php
include_once '../../config/cors.php';
include_once '../../config/database.php';
include_once '../../models/ThanhToan.php';

$db = new Database();
$conn = $db->connect();
$thanhtoan = new ThanhToan($conn);

$data = json_decode(file_get_contents("php://input"), true);
$maTT = $data['maTT'] ?? null;

if ($maTT) {
    $thanhtoan = new ThanhToan($conn);

    $query = "DELETE FROM thanhtoan WHERE maTT = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $maTT);  // Liên kết tham số maTT

    if ($thanhtoan->insertUpDel( $stmt)) {
        echo json_encode(["message" => "Xóa phương thức thanh toán thành công."]);
    } else {
        echo json_encode(["error" => "Xóa phương thức thanh toán thất bại.", "error_details" => $stmt->error]);
    }

    $stmt->close();
} else {
    echo json_encode(["error" => "Thiếu dữ liệu maTT."]);
}

$conn->close();
