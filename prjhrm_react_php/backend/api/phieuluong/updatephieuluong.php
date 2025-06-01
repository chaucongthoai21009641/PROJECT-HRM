<?php
include_once '../../config/cors.php';
include_once '../../config/database.php';
include_once '../../models/PhieuLuong.php';

$db = new Database();
$conn = $db->connect();
$phieuluong = new PhieuLuong($conn);

// Lấy dữ liệu từ request
$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['maNV']) && isset($data['fieldName']) && isset($data['fieldValue'])) {
    $maNV = $data['maNV'];
    $fieldName = $data['fieldName'];
    $fieldValue = $data['fieldValue'];

    // Kiểm tra nếu trường có hợp lệ trong danh sách các trường
    $validFields = [
        'kieuLuong',
        'luongCoBan',
        // 'luongGio',
        // 'gioLam',
        // 'caLam',
        // 'gioOT',
        // 'caOT',
        // 'luongOT',
        // 'luongHeSo',
        // 'luongThuong',
        // 'tongCong',
    ];

    if (in_array($fieldName, $validFields)) {
        // Cập nhật trường tương ứng trong bảng nhanvien
        $query = "UPDATE phieuluong SET $fieldName = ? WHERE maNV = ?";
        $stmt = $conn->prepare($query);

        if (!$stmt) {
            die(json_encode(["error" => "SQL error: " . $conn->error]));
        }

        // Xử lý kiểu dữ liệu cho fieldValue
        // Nếu giá trị là chuỗi, dùng 's' (string)
        $stmt->bind_param('si', $fieldValue, $maNV);

        // Thực thi câu lệnh SQL
        if ($phieuluong->insertUpDel($stmt)) {
            echo json_encode(["message" => "Cập nhật thành công!"]);
        } else {
            echo json_encode(["error" => "Cập nhật thất bại"]);
        }
    } else {
        echo json_encode(["error" => "Trường không hợp lệ."]);
    }
}

$conn->close();
