<?php
include_once '../../config/cors.php';
include_once '../../config/database.php';
include_once '../../models/ThanhToan.php';

$db = new Database();
$conn = $db->connect();
$thanhtoan = new ThanhToan($conn);

// ✅ Đọc dữ liệu JSON từ request
$data = json_decode(file_get_contents("php://input"), true);

// ✅ Kiểm tra dữ liệu có đủ không
if (isset($data['tenDVhoacNH'], $data['soDThoacSTK'], $data['tenChuTaiKhoan'], $data['loaiTaiKhoan'], $data['maNV'])) {

    echo json_encode($data);
    // ✅ Gán dữ liệu từ mảng $data
    $tenDVhoacNH = $data['tenDVhoacNH'];
    $soDThoacSTK = $data['soDThoacSTK'];
    $tenChuTaiKhoan = $data['tenChuTaiKhoan'];
    $loaiTaiKhoan = $data['loaiTaiKhoan'];
    // $hinhAnh = isset($data['hinhAnh']) ? $data['hinhAnh'] : null;
    $hinhAnh = null;
    $maNV = $data['maNV'];

    if (isset($data['hinhAnh']) && strpos($data['hinhAnh'], 'data:image') === 0) {
        // Tách định dạng và dữ liệu
        list($type, $base64Data) = explode(';', $data['hinhAnh']);
        list(, $base64Data) = explode(',', $base64Data);

        // Xác định phần mở rộng ảnh
        $imageInfo = explode('/', $type); // "data:image/png"
        $imgExt = isset($imageInfo[1]) ? $imageInfo[1] : 'png';

        // Tạo tên file
        $fileName = uniqid('qr_') . '.' . $imgExt;
        $uploadDir = '../../uploads/payments/';
        $uploadPath = $uploadDir . $fileName;

        // Lưu ảnh vào thư mục
        if (file_put_contents($uploadPath, base64_decode($base64Data))) {
            $hinhAnh = $fileName; // Lưu tên file vào DB
        } else {
            echo json_encode(["error" => "Lỗi khi lưu ảnh QR."]);
            exit;
        }
    }

    // ✅ Câu lệnh SQL
    $query = "INSERT INTO thanhtoan (tenDVhoacNH, soDThoacSTK, tenChuTaiKhoan, loaiTaiKhoan, hinhAnh, maNV) VALUES (?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($query);

    if (!$stmt) {
        echo json_encode(["error" => "Lỗi prepare SQL", "error_details" => $conn->error]);
        exit;
    }

    // ✅ Bind biến vào statement
    $stmt->bind_param("ssssss", $tenDVhoacNH, $soDThoacSTK, $tenChuTaiKhoan, $loaiTaiKhoan, $hinhAnh, $maNV);

    // ✅ Gọi hàm thực thi từ model
    if ($thanhtoan->insertUpDel($stmt)) {
        echo json_encode(["message" => "Thêm phương thức thanh toán thành công."]);
    } else {
        echo json_encode(["error" => "Thêm phương thức thanh toán thất bại.", "error_details" => $stmt->error]);
    }

    $stmt->close();
} else {
    echo json_encode(["error" => "Thiếu dữ liệu."]);
}

$conn->close();
