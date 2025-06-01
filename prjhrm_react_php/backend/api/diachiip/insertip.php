<?php
include_once '../../config/cors.php';
include_once '../../config/database.php';
include_once '../../models/DiaChiIP.php';

$db = new Database();
$conn = $db->connect();
$diachiip = new DiaChiIP($conn);

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['tenThietBi'], $data['diaChiIP'], $data['trangThai'])) {

    $tenThietBi = $data['tenThietBi'];
    $diaChiIP = $data['diaChiIP'];
    $trangThai = $data['trangThai'];

    // Kiểm tra xem IP đã tồn tại chưa
    $checkTitleExist = "SELECT COUNT(*) as count FROM diachiip WHERE tenThietBi = ?";
    $checkStmt = $conn->prepare($checkTitleExist);
    $checkStmt->bind_param("s", $tenThietBi);
    $checkStmt->execute();
    $checkStmt->bind_result($count);
    $checkStmt->fetch();
    $checkStmt->close();

    if ($count > 0) {
        echo json_encode([
            "error" => "IP đã tồn tại.",
            "exist" => true
        ]);
        $conn->close();
        exit;
    }

    $query = "INSERT INTO diachiip (tenThietBi, diaChiIP, trangThai) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($query);

    if (!$stmt) {
        echo json_encode(["error" => "Lỗi prepare SQL", "error_details" => $conn->error]);
        exit;
    }

    $stmt->bind_param("ssi", $tenThietBi, $diaChiIP, $trangThai);

    if ($diachiip->insertUpDel($stmt)) {
        echo json_encode(["message" => "Tạo IP thành công."]);
    } else {
        echo json_encode(["error" => "Tạo IP thất bại.", "error_details" => $stmt->error]);
    }

    $stmt->close();
} else {
    echo json_encode(["error" => "Thiếu dữ liệu."]);
}

$conn->close();
