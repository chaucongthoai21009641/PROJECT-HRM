<?php
include_once '../../config/cors.php';
include_once '../../config/database.php';
include_once '../../models/DiaDiem.php';

$db = new Database();
$conn = $db->connect();
$diadiem = new DiaDiem($conn);

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['tenDiaDiem'], $data['viDo'], $data['kinhDo'], $data['banKinh'])) {

    $tenDiaDiem = $data['tenDiaDiem'];
    $viDo = $data['viDo'];
    $kinhDo = $data['kinhDo'];
    $banKinh = $data['banKinh'];
    $trangThai = $data['trangThai'] ?? 1;

    // Kiểm tra xem địa điểm đã tồn tại chưa
    $checkPlaceExist = "SELECT COUNT(*) as count FROM diadiem WHERE tenDiaDiem = ?";
    $checkStmt = $conn->prepare($checkPlaceExist);
    $checkStmt->bind_param("s", $tenDiaDiem);
    $checkStmt->execute();
    $checkStmt->bind_result($count);
    $checkStmt->fetch();
    $checkStmt->close();

    if ($count > 0) {
        echo json_encode([
            "error" => "Địa điểm này đã tồn tại.",
            "exist" => true
        ]);
        $conn->close();
        exit;
    }

    $query = "INSERT INTO diadiem (tenDiaDiem, viDo, kinhDo, banKinh, trangThai) 
                            VALUES (?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($query);

    if (!$stmt) {
        echo json_encode(["error" => "Lỗi prepare SQL", "error_details" => $conn->error]);
        exit;
    }

    $stmt->bind_param("sddii", $tenDiaDiem, $viDo, $kinhDo, $banKinh, $trangThai);

    if ($diadiem->insertUpDel($stmt)) {
        echo json_encode(["message" => "Tạo địa điểm thành công."]);
    } else {
        echo json_encode(["error" => "Tạo địa điểm thất bại.", "error_details" => $stmt->error]);
    }

    $stmt->close();
} else {
    echo json_encode(["error" => "Thiếu dữ liệu."]);
}

$conn->close();
