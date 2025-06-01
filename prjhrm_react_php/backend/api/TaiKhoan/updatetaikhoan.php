<?php
include_once '../../config/cors.php';
include_once '../../config/database.php';
include_once '../../models/TaiKhoan.php';

$db = new Database();
$conn = $db->connect();
$taikhoan = new TaiKhoan($conn);

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['maTK'], $data['matKhau'])) {
    $maTK = $data['maTK'];
    $matKhau =  password_hash($data['matKhau'], PASSWORD_BCRYPT);

    $query = "UPDATE taikhoan SET matKhau = ? WHERE maTK = ? LIMIT 1";
    $stmt = $conn->prepare($query);

    if (!$stmt) {
        echo json_encode(["error" => "SQL error: " . $conn->error]);
        exit;
    }

    $stmt->bind_param('si', $matKhau, $maTK);

    if ($taikhoan->insertUpDel($stmt)) {
        if ($stmt->affected_rows > 0) {
            echo json_encode(["message" => "Cập nhật tài khoản thành công!"]);
        } else {
            echo json_encode(["error" => "Không tìm thấy tài khoản để cập nhật."]);
        }
    } else {
        echo json_encode(["error" => "Cập nhật tài khoản thất bại!"]);
    }

    $stmt->close();
} else {
    echo json_encode(["error" => "Dữ liệu không hợp lệ."]);
}

$conn->close();
