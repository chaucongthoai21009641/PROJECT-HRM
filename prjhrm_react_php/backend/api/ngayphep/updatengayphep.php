<?php
include_once '../../config/cors.php';
include_once '../../config/database.php';
include_once '../../models/NgayPhep.php';

$db = new Database();
$conn = $db->connect();
$ngayphep = new NgayPhep($conn);

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['maNP'], $data['soNgay'], $data['daNghi'], $data['conLai'])) { // Corrected field name
    $maNP = $data['maNP'];
    $soNgay = $data['soNgay'];
    $daNghi = $data['daNghi'];
    $conLai = $data['conLai'];

    $query = "UPDATE ngayphep SET soNgay = ?, daNghi = ?, conLai = ? WHERE maNP = ?";
    $stmt = $conn->prepare($query);

    if (!$stmt) {
        echo json_encode(["error" => "SQL error: " . $conn->error]);
        exit;
    }

    $stmt->bind_param('ssss', $soNgay, $daNghi, $conLai, $maNP);

    if ($ngayphep->insertUpDel($stmt)) {
        echo json_encode(["message" => "Cập nhật ngày phép thành công!"]);
    } else {
        echo json_encode(["error" => "Cập nhật ngày phép thất bại!"]);
    }

    $stmt->close();
} else {
    echo json_encode(["error" => "Dữ liệu không hợp lệ."]);
}

$conn->close();
