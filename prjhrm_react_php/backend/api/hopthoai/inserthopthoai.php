<?php
include_once '../../config/cors.php';
include_once '../../config/database.php';
include_once '../../models/hopthoai.php';

$db = new Database();
$conn = $db->connect();
$hopthoai = new HopThoai($conn);

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['tieuDe'], $data['noiDung'], $data['url'], $data['soLanHienThi'], $data['tgBatDau'], $data['tgKetThuc'])) {

    $tieuDe = $data['tieuDe'];
    $noiDung = $data['noiDung'];
    $url = $data['url'];
    $soLanHienThi = $data['soLanHienThi'];
    $tgBatDau = $data['tgBatDau'];
    $tgKetThuc = $data['tgKetThuc'];

    $query = "INSERT INTO hopthoai (tieuDe, noiDung, url, soLanHienThi, tgBatDau, tgKetThuc) VALUES (?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($query);

    if (!$stmt) {
        echo json_encode(["error" => "Lỗi prepare SQL", "error_details" => $conn->error]);
        exit;
    }

    $stmt->bind_param("ssssss", $tieuDe, $noiDung, $url, $soLanHienThi, $tgBatDau, $tgKetThuc);

    if ($hopthoai->insertUpDel($stmt)) {
        echo json_encode(["message" => "Tạo hộp thoại thành công."]);
    } else {
        echo json_encode(["error" => "Tạo hộp thoại thất bại.", "error_details" => $stmt->error]);
    }

    $stmt->close();
} else {
    echo json_encode(["error" => "Thiếu dữ liệu."]);
}

$conn->close();
