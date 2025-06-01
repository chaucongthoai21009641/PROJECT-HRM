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
        'luongGio',
        'gioLam',
        'caLam',
        'gioOT',
        'caOT',
        'luongOT',
        'luongHeSo',
        'luongThuong',
        'tongCong',
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

// Calculate derived fields for the employee
$query = "SELECT p.luongCoBan, 
                 SUM(CASE WHEN llv.tenCa = 'Fulltime' THEN TIMESTAMPDIFF(HOUR, bc.tgCheckIn, bc.tgCheckOut) ELSE 0 END) AS gioLam,
                 COUNT(CASE WHEN llv.tenCa = 'Fulltime' AND bc.tgCheckIn IS NOT NULL AND bc.tgCheckOut IS NOT NULL THEN 1 ELSE NULL END) AS caLam,
                 SUM(CASE WHEN llv.tenCa != 'Fulltime' THEN TIMESTAMPDIFF(HOUR, bc.tgCheckIn, bc.tgCheckOut) ELSE 0 END) AS gioOT,
                 COUNT(CASE WHEN llv.tenCa != 'Fulltime' AND bc.tgCheckIn IS NOT NULL AND bc.tgCheckOut IS NOT NULL THEN 1 ELSE NULL END) AS caOT,
                 SUM(llv.tienThuong) AS luongThuong
          FROM phieuluong p
          LEFT JOIN bangcong bc ON p.maNV = bc.maNV
          LEFT JOIN lichlamviec llv ON bc.maLLV = llv.maLLV
          WHERE p.maNV = ?
          GROUP BY p.maNV";

$stmt = $conn->prepare($query);
$stmt->bind_param('i', $maNV);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $luongCoBan = $row['luongCoBan'];
    $gioLam = $row['gioLam'];
    $caLam = $row['caLam'];
    $gioOT = $row['gioOT'];
    $caOT = $row['caOT'];
    $luongThuong = $row['luongThuong'];

    $luongGio = $luongCoBan / $gioLam;
    $luongOT = $gioOT * $luongGio;
    $tongCongCoHeSo = $gioLam * $luongGio + $luongOT + $luongThuong;
    $luongHeSo = $tongCongCoHeSo - $luongCoBan;
    $tongCong = $gioLam * $luongGio + $luongOT + $luongThuong;

    // Update the calculated fields in the database
    $updateQuery = "UPDATE phieuluong SET luongGio = ?, gioLam = ?, caLam = ?, gioOT = ?, caOT = ?, luongOT = ?, luongThuong = ?, luongHeSo = ?, tongCong = ? WHERE maNV = ?";
    $updateStmt = $conn->prepare($updateQuery);
    $updateStmt->bind_param('diiidddddi', $luongGio, $gioLam, $caLam, $gioOT, $caOT, $luongOT, $luongThuong, $luongHeSo, $tongCong, $maNV);

    if ($phieuluong->insertUpDel($updateStmt)) {
        echo json_encode(["message" => "Cập nhật thành công với các giá trị tính toán!"]);
    } else {
        echo json_encode(["error" => "Cập nhật thất bại trong quá trình tính toán."]);
    }
} else {
    echo json_encode(["error" => "Không tìm thấy dữ liệu cho nhân viên này."]);
}

$conn->close();
