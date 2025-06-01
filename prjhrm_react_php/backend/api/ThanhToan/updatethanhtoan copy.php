<?php
include_once '../../config/cors.php';
include_once '../../config/database.php';
include_once '../../models/ThanhToan.php';

$db = new Database();
$conn = $db->connect();
$thanhtoan = new ThanhToan($conn);

$data = json_decode(file_get_contents("php://input"), true);
// var_dump($data);
if (isset($data['maTT'], $data['tenDVhoacNH'], $data['soDThoacSTK'], $data['tenChuTaiKhoan'])) {
    $maTT = $data['maTT'];
    $tenDVhoacNH = $data['tenDVhoacNH'];
    $soDThoacSTK = $data['soDThoacSTK'];
    $tenChuTaiKhoan = $data['tenChuTaiKhoan'];
    $hinhAnh = isset($data['hinhAnh']) ? $data['hinhAnh'] : null;

    $query = "UPDATE thanhtoan SET tenDVhoacNH = ?, soDThoacSTK = ?, tenChuTaiKhoan = ?, hinhAnh = ? WHERE maTT = ? LIMIT 1";
    $stmt = $conn->prepare($query);

    if (!$stmt) {
        echo json_encode(["error" => "SQL error: " . $conn->error]);
        exit;
    }

    $stmt->bind_param('sssss', $tenDVhoacNH, $soDThoacSTK, $tenChuTaiKhoan, $hinhAnh, $maTT);

    if ($thanhtoan->insertUpDel($stmt)) {
        if ($stmt->affected_rows > 0) {
            echo json_encode([
                "message" => "Cập nhật phương thức thanh toán thành công!",
                "status" => true
            ]);
        } else {
            echo json_encode([
                "error" => "Không tìm thấy phương thức thanh toán để cập nhật.",
                "status" => false
            ]);
        }
    } else {
        echo json_encode([
            "error" => "Cập nhật phương thức thanh toán thất bại!",
            "status" => false
        ]);
    }

    $stmt->close();
} else {
    echo json_encode(["error" => "Dữ liệu không hợp lệ."]);
}

$conn->close();
