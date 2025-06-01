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

$result = $calam->selectCaLamDetail($maCL);

if ($result && $result->num_rows > 0) {
    $calam_item = null;
    $chiTietList = [];

    while ($row = $result->fetch_assoc()) {
        if (!$calam_item) {
            // Gán thông tin ca làm (lấy từ dòng đầu)
            $calam_item = [
                "maCL" => $row["maCL"],
                "tenCa" => $row["tenCa"],
                "gioCheckInSom" => $row["gioCheckInSom"],
                "gioCheckOutMuon" => $row["gioCheckOutMuon"],
                "chiTietCaLams" => []
            ];
        }

        // Nếu có dữ liệu chi tiết thì thêm vào mảng
        if (!empty($row["maCTCL"])) {
            $chiTietList[] = array(
                "maCTCL" => $row["maCTCL"],
                "thuTrongTuan" => $row["thuTrongTuan"],
                "tgBatDau" => $row["tgBatDau"],
                "tgKetThuc" => $row["tgKetThuc"],
                "tgBatDauNghi" => $row["tgBatDauNghi"],
                "tgKetThucNghi" => $row["tgKetThucNghi"],
                "heSoLuong" => $row["heSoLuong"],
                "tienThuong" => $row["tienThuong"],
                "maCL" => $row["maCL"],
            );
        }
    }

    $calam_item["chiTietCaLams"] = $chiTietList;

    echo json_encode($calam_item);
} else {
    echo json_encode(["error" => "Ca làm không tồn tại."]);
}


$conn->close();
