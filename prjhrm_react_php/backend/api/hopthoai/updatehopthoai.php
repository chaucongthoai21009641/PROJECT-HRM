<?php
include_once '../../config/cors.php';
include_once '../../config/database.php';
include_once '../../models/hopthoai.php';

$db = new Database();
$conn = $db->connect();
$hopthoai = new HopThoai($conn);

// Đọc dữ liệu JSON từ request
$data = json_decode(file_get_contents("php://input"), true);

// Kiểm tra dữ liệu có đầy đủ không
if (isset($data['maHT'], $data['tieuDe'], $data['noiDung'], $data['url'], $data['soLanHienThi'], $data['tgBatDau'], $data['tgKetThuc'])) {

    // Gán dữ liệu từ mảng $data
    $maHT = $data['maHT'];
    $tieuDe = $data['tieuDe'];
    $noiDung = $data['noiDung'];
    $url = $data['url'];
    $soLanHienThi = $data['soLanHienThi'];
    $tgBatDau = date('Y-m-d H:i:s', strtotime($data['tgBatDau']));
    $tgKetThuc = date('Y-m-d H:i:s', strtotime($data['tgKetThuc']));

    // Câu lệnh SQL để cập nhật hộp thoại
    $query = "UPDATE hopthoai SET tieuDe = ?, noiDung = ?, url = ?, soLanHienThi = ?, tgBatDau = ?, tgKetThuc = ? WHERE maHT = ? LIMIT 1";
    $stmt = $conn->prepare($query);

    if (!$stmt) {
        echo json_encode(["error" => "SQL error: " . $conn->error]);
        exit;
    }

    // Bind các tham số vào câu lệnh SQL
    $stmt->bind_param('sssssss', $tieuDe, $noiDung, $url, $soLanHienThi, $tgBatDau, $tgKetThuc, $maHT);

    // Thực thi câu lệnh SQL
    if ($stmt->execute()) {
        if ($stmt->affected_rows > 0) {
            echo json_encode(["message" => "Cập nhật hộp thoại thành công!"]);
        } else {
            echo json_encode(["error" => "Không tìm thấy hộp thoại để cập nhật hoặc không có thay đổi."]);
        }
    } else {
        echo json_encode(["error" => "Cập nhật hộp thoại thất bại!", "error_details" => $stmt->error]);
    }

    // Đóng statement
    $stmt->close();
} else {
    echo json_encode(["error" => "Dữ liệu không hợp lệ hoặc thiếu thông tin."]);
}

$conn->close();
