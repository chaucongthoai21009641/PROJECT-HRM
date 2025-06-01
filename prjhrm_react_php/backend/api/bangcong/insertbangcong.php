<?php
include_once '../../config/cors.php';
include_once '../../config/database.php';
include_once '../../models/BangCong.php';

$db = new Database();
$conn = $db->connect();
$bangcong = new BangCong($conn);

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['tgCheckIn'], $data['maLLV'])) {

    $maLLV = $data['maLLV'];
    $tgCheckIn = $data['tgCheckIn'];
    $tgCheckOut = $data['tgCheckOut'];

    $query = "INSERT INTO bangcong (tgCheckIn, tgCheckOut, maLLV) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($query);

    if (!$stmt) {
        echo json_encode(["error" => "Lỗi prepare SQL", "error_details" => $conn->error]);
        exit;
    }

    $stmt->bind_param("ssi", $tgCheckIn, $tgCheckOut, $maLLV);

    if ($bangcong->insertUpDel($stmt)) {
        echo json_encode([
            "message" => "Tạo thời gian chấm công thành công.",
            "status" => 200
        ]);
    } else {
        echo json_encode(["error" => "Tạo thời gian chấm công thất bại.", "error_details" => $stmt->error]);
    }

    $stmt->close();
} else {
    echo json_encode(["error" => "Thiếu dữ liệu."]);
}

$conn->close();
