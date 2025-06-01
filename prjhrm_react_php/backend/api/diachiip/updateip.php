<?php
include_once '../../config/cors.php';
include_once '../../config/database.php';
include_once '../../models/DiaChiIP.php';

$db = new Database();
$conn = $db->connect();
$diachiip = new DiaChiIP($conn);

$data = json_decode(file_get_contents("php://input"), true);

$maDCIP = $data['maDCIP'] ?? null;
$tenThietBi = $data['tenThietBi'] ?? null;
$diaChiIP = $data['diaChiIP'] ?? null;
$trangThai = isset($data['trangThai']) ? $data['trangThai'] : null;


if (!$maDCIP) {
    echo json_encode(["error" => "Thiếu mã IP (maDCIP)"]);
    exit;
}

// Kiểm tra xem IP đã tồn tại chưa
$checkTitleExist = "SELECT COUNT(*) as count FROM diachiip WHERE tenThietBi = ? AND maDCIP != ?";
$checkStmt = $conn->prepare($checkTitleExist);
$checkStmt->bind_param("si", $tenThietBi, $maDCIP);
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

if ($tenThietBi !== null && $diaChiIP !== null && $trangThai !== null) {
    $query = "UPDATE diachiip SET tenThietBi = ?, diaChiIP = ?, trangThai = ? WHERE maDCIP = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param('ssis', $tenThietBi, $diaChiIP, $trangThai, $maDCIP);
} elseif ($trangThai !== null) {
    $query = "UPDATE diachiip SET trangThai = ? WHERE maDCIP = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param('ii', $trangThai, $maDCIP);
} else {
    echo json_encode(["error" => "Dữ liệu không đầy đủ để cập nhật."]);
    exit;
}

if (!$stmt) {
    echo json_encode(["error" => "Lỗi prepare: " . $conn->error]);
    exit;
}

if ($diachiip->insertUpDel($stmt)) {
    echo json_encode(["message" => "Cập nhật thành công!"]);
} else {
    echo json_encode(["error" => "Cập nhật thất bại!"]);
}

$stmt->close();
$conn->close();
