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
error_log("maCTCL nhận được: " . $maCTCL);

if (!$maCTCL) {
    die(json_encode(["error" => "Thiếu ID chi tiết ca làm."]));
}
echo $maCTCL;
$data = json_decode(file_get_contents("php://input"), true);
if ($maCTCL) {

    $tgBatDau = $data['tgBatDau'];
    $tgKetThuc = $data['tgKetThuc'];
    $tgBatDauNghi = $data['tgBatDauNghi'];
    $tgKetThucNghi = $data['tgKetThucNghi'];
    $heSoLuong = $data['heSoLuong'];
    $tienThuong = $data['tienThuong'];

    $query = "UPDATE chitietcalam SET tgBatDau = ?, tgKetThuc = ?, tgBatDauNghi = ?, tgKetThucNghi = ?, heSoLuong = ?, tienThuong = ? WHERE maCTCL = ? LIMIT 1";
    $stmt = $conn->prepare($query);

    if (!$stmt) {
        echo json_encode(["error" => "SQL error: " . $conn->error]);
        exit;
    }

    $stmt->bind_param('ssssdds', $tgBatDau, $tgKetThuc, $tgBatDauNghi, $tgKetThucNghi, $heSoLuong, $tienThuong, $maCTCL);

    if ($chitietcalam->insertUpDel($stmt)) {
        echo json_encode([
            "message" => "Cập nhật khung giờ thành công!",
            "status" => 200,
        ]);
    } else {
        echo json_encode(["error" => "Cập nhật khung giờ thất bại!", "error_details" => $stmt->error]);
    }

    // Đóng statement
    $stmt->close();
} else {
    echo json_encode(["error" => "Dữ liệu không hợp lệ hoặc thiếu thông tin."]);
}

$conn->close();
