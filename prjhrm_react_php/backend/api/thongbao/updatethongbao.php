<?php
include_once '../../config/cors.php';
include_once '../../config/database.php';
include_once '../../models/thongbao.php';

$db = new Database();
$conn = $db->connect();
$thongbao = new ThongBao($conn);

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['maTB'], $data['tieuDe'], $data['url'], $data['tgBatDau'], $data['tgKetThuc'])) {
    $maTB = $data['maTB'];
    $tieuDe = $data['tieuDe'];
    $url = $data['url'];
    $tgBatDau = date('Y-m-d H:i:s', strtotime($data['tgBatDau']));
    $tgKetThuc = date('Y-m-d H:i:s', strtotime($data['tgKetThuc']));

    $query = "UPDATE thongbao SET tieuDe = ?, url = ?, tgBatDau = ?, tgKetThuc = ? WHERE maTB = ?";
    $stmt = $conn->prepare($query);

    if (!$stmt) {
        echo json_encode(["error" => "SQL error: " . $conn->error]);
        exit;
    }

    $stmt->bind_param('ssssi', $tieuDe, $url, $tgBatDau, $tgKetThuc, $maTB);

    if ($thongbao->insertUpDel($stmt)) {
        if ($stmt->affected_rows > 0) {
            echo json_encode(["message" => "Cập nhật thông báo thành công!"]);
        } else {
            echo json_encode(["error" => "Không tìm thấy thông báo để cập nhật."]);
        }
    } else {
        echo json_encode(["error" => "Cập nhật thông báo thất bại!"]);
    }

    $stmt->close();
} else {
    echo json_encode(["error" => "Dữ liệu không hợp lệ."]);
}

$conn->close();
