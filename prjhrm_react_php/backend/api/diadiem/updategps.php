<?php
include_once '../../config/cors.php';
include_once '../../config/database.php';
include_once '../../models/DiaDiem.php';

$db = new Database();
$conn = $db->connect();
$diadiem = new DiaDiem($conn);

$data = json_decode(file_get_contents("php://input"), true);

$maDD = $data['maDD'] ?? null;
$tenDiaDiem = $data['tenDiaDiem'] ?? null;
$kinhDo = $data['kinhDo'] ?? null;
$viDo = $data['viDo'] ?? null;
$banKinh = $data['banKinh'] ?? null;
$trangThai = $data['trangThai'] ? $data['trangThai'] : 0;

if (!$maDD) {
    echo json_encode(["error" => "Thiếu mã địa điểm (maDD)"]);
    exit;
}

// Kiểm tra xem địa điểm đã tồn tại chưa
$checkPlaceExist2 = "SELECT COUNT(*) as count FROM diadiem WHERE tenDiaDiem = ? AND maDD != ?";
$checkStmt = $conn->prepare($checkPlaceExist2);
$checkStmt->bind_param("si", $tenDiaDiem, $maDD);
$checkStmt->execute();
$checkStmt->bind_result($count);
$checkStmt->fetch();
$checkStmt->close();

if ($count > 0) {
    echo json_encode([
        "error" => "Địa điểm này đã tồn tại.",
        "exist" => true
    ]);
    $conn->close();
    exit;
}

if ($tenDiaDiem !== null && $kinhDo !== null && $trangThai !== null) {
    $query = "UPDATE diadiem SET tenDiaDiem = ?, kinhDo = ?, viDo = ?, banKinh = ?, trangThai = ? WHERE maDD = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param('sddiii', $tenDiaDiem, $kinhDo, $viDo, $banKinh, $trangThai, $maDD);
} elseif ($trangThai !== null) {
    $query = "UPDATE diadiem SET trangThai = ? WHERE maDD = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param('ii', $trangThai, $maDD);
} else {
    echo json_encode(["error" => "Dữ liệu không đầy đủ để cập nhật."]);
    exit;
}

if (!$stmt) {
    echo json_encode(["error" => "Lỗi prepare: " . $conn->error]);
    exit;
}

if ($diadiem->insertUpDel($stmt)) {
    echo json_encode(["message" => "Cập nhật thành công!"]);
} else {
    echo json_encode(["error" => "Cập nhật thất bại!"]);
}

$stmt->close();
$conn->close();
