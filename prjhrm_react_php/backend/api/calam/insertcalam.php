<?php
include_once '../../config/cors.php';
include_once '../../config/database.php';
include_once '../../models/calam.php';

$db = new Database();
$conn = $db->connect();
$calam = new CaLam($conn);

// ✅ Đọc dữ liệu JSON từ request
$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['tenCa'], $data['gioCheckInSom'], $data['gioCheckOutMuon'])) {

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

    $query = "INSERT INTO calam (tenCa, gioCheckInSom, gioCheckOutMuon) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($query);

    if (!$stmt) {
        echo json_encode(["error" => "Lỗi prepare SQL", "error_details" => $conn->error]);
        exit;
    }

    // ✅ Bind biến vào statement
    $stmt->bind_param("sii", $tenCa, $gioCheckInSom, $gioCheckOutMuon);

    // ✅ Gọi hàm thực thi từ model
    if ($calam->insertUpDel($stmt)) {
        $maCL = $stmt->insert_id;
        echo json_encode([
            "message" => "Tạo ca làm thành công.",
            "maCL" => $maCL
        ]);
    } else {
        echo json_encode([
            "error" => "Tạo ca làm thất bại.",
            "error_details" => $stmt->error
        ]);
    }

    $stmt->close();
} else {
    echo json_encode(["error" => "Thiếu dữ liệu."]);
}

$conn->close();
