<?php
include_once '../../config/cors.php';
include_once '../../config/database.php';
include_once '../../models/tailieu.php';

$db = new Database();
$conn = $db->connect();
$tailieu = new TaiLieu($conn);

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['maTL'], $data['tieuDe'], $data['url'], $data['tgBatDau'], $data['tgKetThuc'])) {
    $maTL = $data['maTL'];
    $tieuDe = $data['tieuDe'];
    $url = $data['url'];
    $tgBatDau = date('Y-m-d H:i:s', strtotime($data['tgBatDau']));
    $tgKetThuc = date('Y-m-d H:i:s', strtotime($data['tgKetThuc']));

    $query = "UPDATE tailieu SET tieuDe = ?, url = ?, tgBatDau = ?, tgKetThuc = ? WHERE maTL = ? LIMIT 1";
    $stmt = $conn->prepare($query);

    if (!$stmt) {
        echo json_encode(["error" => "SQL error: " . $conn->error]);
        exit;
    }

    $stmt->bind_param('ssssi', $tieuDe, $url, $tgBatDau, $tgKetThuc, $maTL);

    if ($tailieu->insertUpDel($stmt)) {
        if ($stmt->affected_rows > 0) {
            echo json_encode(["message" => "Cập nhật tài liệu thành công!"]);
        } else {
            echo json_encode(["error" => "Không tìm thấy tài liệu để cập nhật."]);
        }
    } else {
        echo json_encode(["error" => "Cập nhật tài liệu thất bại!"]);
    }

    $stmt->close();
} else {
    echo json_encode(["error" => "Dữ liệu không hợp lệ."]);
}

$conn->close();
