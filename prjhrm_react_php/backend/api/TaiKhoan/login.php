<?php
include_once '../../config/cors.php';
include_once '../../config/database.php';
include_once '../../models/taikhoan.php';

$data = json_decode(file_get_contents("php://input"), true);
$tenTaiKhoan = $data['tenTaiKhoan'];
$matKhau = $data['matKhau'];

$db = new Database();
$conn = $db->connect();

$taikhoan = new TaiKhoan($conn);
$result = $taikhoan->findByUsername($tenTaiKhoan);

if ($result && password_verify($matKhau, $result['matKhau'])) {
    echo json_encode([
        'success' => true,
        'user' => [
            'maTK' => $result['maTK'],
            'tenTaiKhoan' => $result['tenTaiKhoan'],
            'quyenHan' => $result['quyenHan'],
        ]
    ]);
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Tên tài khoản hoặc mật khẩu không đúng'
    ]);
}
