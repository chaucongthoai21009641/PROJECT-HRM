<?php
include_once '../../config/cors.php';
include_once '../../config/database.php';
include_once '../../models/tailieu.php';

$db = new Database();
$conn = $db->connect();
$tailieu = new TaiLieu($conn);

// ✅ Đọc dữ liệu JSON từ request
$data = json_decode(file_get_contents("php://input"), true);

// ✅ Kiểm tra dữ liệu có đủ không
if (isset($data['tieuDe'], $data['url'], $data['tgBatDau'], $data['tgKetThuc'])) {

    // ✅ Gán dữ liệu từ mảng $data
    $tieuDe = $data['tieuDe'];
    $url = $data['url'];
    $tgBatDau = $data['tgBatDau'];
    $tgKetThuc = $data['tgKetThuc'];

    // ✅ Câu lệnh SQL
    $query = "INSERT INTO tailieu (tieuDe, url, tgBatDau, tgKetThuc) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($query);

    if (!$stmt) {
        echo json_encode(["error" => "Lỗi prepare SQL", "error_details" => $conn->error]);
        exit;
    }

    // ✅ Bind biến vào statement
    $stmt->bind_param("ssss", $tieuDe, $url, $tgBatDau, $tgKetThuc);

    // ✅ Gọi hàm thực thi từ model
    if ($tailieu->insertUpDel($stmt)) {
        echo json_encode(["message" => "Tạo tài liệu thành công."]);
    } else {
        echo json_encode(["error" => "Tạo tài liệu thất bại.", "error_details" => $stmt->error]);
    }

    $stmt->close();
} else {
    echo json_encode(["error" => "Thiếu dữ liệu."]);
}

$conn->close();
