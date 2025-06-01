<?php
include_once '../../config/cors.php';
include_once '../../config/database.php';
include_once '../../models/ThanhToan.php';

$db = new Database();
$conn = $db->connect();
$thanhtoan = new ThanhToan($conn);

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['maTT'], $data['tenDVhoacNH'], $data['soDThoacSTK'], $data['tenChuTaiKhoan'])) {
    $maTT = $data['maTT'];
    $tenDVhoacNH = $data['tenDVhoacNH'];
    $soDThoacSTK = $data['soDThoacSTK'];
    $tenChuTaiKhoan = $data['tenChuTaiKhoan'];
    $hinhAnh = null;

    // Kiểm tra nếu có hình ảnh base64 được gửi lên
    if (!empty($data['hinhAnh']) && strpos($data['hinhAnh'], 'data:image') === 0) {
        list($type, $base64Data) = explode(';', $data['hinhAnh']);
        list(, $base64Data) = explode(',', $base64Data);

        $imageInfo = explode('/', $type); // "data:image/png"
        $imgExt = isset($imageInfo[1]) ? $imageInfo[1] : 'png';

        $fileName = uniqid('qr_') . '.' . $imgExt;
        $uploadDir = '../../uploads/payments/';
        $uploadPath = $uploadDir . $fileName;

        if (file_put_contents($uploadPath, base64_decode($base64Data))) {
            $hinhAnh = $fileName;
        } else {
            echo json_encode(["error" => "Lỗi khi lưu ảnh QR."]);
            exit;
        }
    }

    // Nếu không có ảnh mới thì lấy ảnh cũ trong DB
    if (!$hinhAnh) {
        $queryOld = "SELECT hinhAnh FROM thanhtoan WHERE maTT = ? LIMIT 1";
        $stmtOld = $conn->prepare($queryOld);
        $stmtOld->bind_param("s", $maTT);
        $stmtOld->execute();
        $stmtOld->bind_result($oldImage);
        if ($stmtOld->fetch()) {
            $hinhAnh = $oldImage;
        }
        $stmtOld->close();
    }

    // Thực hiện UPDATE
    $query = "UPDATE thanhtoan SET tenDVhoacNH = ?, soDThoacSTK = ?, tenChuTaiKhoan = ?, hinhAnh = ? WHERE maTT = ? LIMIT 1";
    $stmt = $conn->prepare($query);

    if (!$stmt) {
        echo json_encode(["error" => "SQL error: " . $conn->error]);
        exit;
    }

    $stmt->bind_param('sssss', $tenDVhoacNH, $soDThoacSTK, $tenChuTaiKhoan, $hinhAnh, $maTT);

    if ($thanhtoan->insertUpDel($stmt)) {
        if ($stmt->affected_rows >= 0) {
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
