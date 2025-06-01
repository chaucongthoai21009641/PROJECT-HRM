<?php
include_once '../../config/cors.php';
include_once '../../config/database.php';
include_once '../../models/chitietcalam.php';

$db = new Database();
$conn = $db->connect();
$chitietcalam = new ChiTietCaLam($conn);

// ✅ Đọc dữ liệu JSON từ request
$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['thuTrongTuan'], $data['tgBatDau'], $data['tgKetThuc'], $data['heSoLuong'], $data['maCL'])) {

    $thuTrongTuan = $data['thuTrongTuan'];
    $tgBatDau = $data['tgBatDau'];
    $tgKetThuc = $data['tgKetThuc'];
    $tgBatDauNghi = $data['tgBatDauNghi'] ?? null;
    $tgKetThucNghi = $data['tgKetThucNghi'] ?? null;
    $heSoLuong = $data['heSoLuong'] ?? 1;
    $tienThuong = $data['tienThuong'] ?? 0;
    $maCL = $data['maCL'];

    $query = "INSERT INTO chitietcalam (thuTrongTuan, tgBatDau, tgKetThuc, tgBatDauNghi, tgKetThucNghi, heSoLuong, tienThuong, maCL) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($query);

    if (!$stmt) {
        echo json_encode(["error" => "Lỗi prepare SQL", "error_details" => $conn->error]);
        exit;
    }

    // ✅ Bind biến vào statement
    $stmt->bind_param("sssssddi", $thuTrongTuan, $tgBatDau, $tgKetThuc, $tgBatDauNghi, $tgKetThucNghi, $heSoLuong, $tienThuong, $maCL);

    // ✅ Gọi hàm thực thi từ model
    if ($chitietcalam->insertUpDel($stmt)) {
        echo json_encode([
            "message" => "Tạo chi tiết ca làm thành công.",
            "status" => 200
        ]);
    } else {
        echo json_encode(["error" => "Tạo chi tiết ca làm thất bại.", "error_details" => $stmt->error]);
    }

    $stmt->close();
} else {
    echo json_encode(["error" => "Thiếu dữ liệu."]);
}

$conn->close();
