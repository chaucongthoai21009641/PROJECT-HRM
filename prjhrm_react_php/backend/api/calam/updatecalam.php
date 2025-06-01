<?php
include_once '../../config/cors.php';
include_once '../../config/database.php';
include_once '../../models/CaLam.php';

$db = new Database();
$conn = $db->connect();
$calam = new CaLam($conn);

$uri = $_SERVER['REQUEST_URI'];
$segments = explode('/', $uri);

$maCL = end($segments);


if (!$maCL) {
    die(json_encode(["error" => "Thiếu ID ca làm."]));
}

// Đọc dữ liệu JSON từ request
$data = json_decode(file_get_contents("php://input"), true);

if ($maCL > 0) {
    $tenCa = $data['tenCa'];
    $gioCheckInSom = $data['gioCheckInSom'] ?? 0;
    $gioCheckOutMuon = $data['gioCheckOutMuon'] ?? 0;

    // Kiểm tra xem tên ca đã tồn tại chưa
    $checkShiftNameExist = "SELECT COUNT(*) as count FROM calam WHERE tenCa = ?";
    $checkStmt = $conn->prepare($checkShiftNameExist);
    $checkStmt->bind_param("s", $tenCa);
    $checkStmt->execute();
    $checkStmt->bind_result($count);
    $checkStmt->fetch();
    $checkStmt->close();

    if ($count > 0) {
        echo json_encode([
            "error" => "Tên ca đã tồn tại.",
            "exist" => true
        ]);
        $conn->close();
        exit;
    }

    $query = "UPDATE calam SET tenCa = ?, gioCheckInSom = ?, gioCheckOutMuon = ? WHERE maCL = ? LIMIT 1";
    $stmt = $conn->prepare($query);
    if (!$stmt) {
        echo json_encode(["error" => "SQL error: " . $conn->error]);
        exit;
    }

    $stmt->bind_param('ssii', $tenCa, $gioCheckInSom, $gioCheckOutMuon, $maCL);

    if ($calam->insertUpDel($stmt)) {
        echo json_encode(["message" => "Cập nhật ca làm thành công!", "status" => "200"]);
    } else {
        echo json_encode(["error" => "Cập nhật ca làm thất bại!", "error_details" => $stmt->error]);
    }

    $stmt->close();
} else {
    echo json_encode(["error" => "Dữ liệu không hợp lệ hoặc thiếu thông tin."]);
}

$conn->close();
