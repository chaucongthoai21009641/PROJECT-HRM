<?php
include_once '../../config/cors.php';
include_once '../../config/database.php';
include_once '../../models/thongbao.php';

$db = new Database();
$conn = $db->connect();
$thongbao = new ThongBao($conn);

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['tieuDe'], $data['url'], $data['tgBatDau'], $data['tgKetThuc'])) {

    $tieuDe = $data['tieuDe'];
    $url = $data['url'];
    $tgBatDau = $data['tgBatDau'];
    $tgKetThuc = $data['tgKetThuc'];

    $query = "INSERT INTO thongbao (tieuDe, url, tgBatDau, tgKetThuc) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($query);

    if (!$stmt) {
        echo json_encode(["error" => "Lỗi prepare SQL", "error_details" => $conn->error]);
        exit;
    }

    $stmt->bind_param("ssss", $tieuDe, $url, $tgBatDau, $tgKetThuc);

    if ($thongbao->insertUpDel($stmt)) {
        echo json_encode(["message" => "Tạo thông báo thành công."]);
    } else {
        echo json_encode(["error" => "Tạo thông báo thất bại.", "error_details" => $stmt->error]);
    }

    $stmt->close();
} else {
    echo json_encode(["error" => "Thiếu dữ liệu."]);
}

$conn->close();
