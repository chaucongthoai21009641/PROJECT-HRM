<?php
include_once '../../config/cors.php';
include_once '../../config/database.php';
include_once '../../models/PhieuLuong.php';

$db = new Database();
$conn = $db->connect();

$phieuluong = new PhieuLuong($conn);

// Lấy tất cả dữ liệu phiếu lương
$getAll = $phieuluong->selectAll();
$num = $getAll->num_rows;

// Kiểm tra xem có dữ liệu không
if ($num > 0) {
    $phieuluong_arr = array();

    // Lặp qua từng dòng kết quả
    while ($row = $getAll->fetch_assoc()) {
        extract($row);

        // Xử lý và tạo mảng cho từng phiếu lương
        $phieuluong_item = array(
            "maPL" => $maPL,  // Mã phiếu lương
            "kieuLuong" => $kieuLuong,  // Kiểu lương
            "luongCoBan" => $luongCoBan,  // Lương cơ bản
            "luongGio" => $luongGio,  // Lương theo giờ
            "gioLam" => $gioLam,  // Giờ làm
            "caLam" => $caLam,  // Số ca làm
            "gioOT" => $gioOT,  // Giờ làm ngoài
            "caOT" => $caOT,  // Số ca làm ngoài
            "luongOT" => $luongOT,  // Lương làm thêm
            "luongHeSo" => $luongHeSo,  // Hệ số lương
            "luongThuong" => $luongThuong,  // Tiền thưởng
            "tongCong" => $tongCong,  // Tổng công
            "maNV" => $maNV,  // Mã nhân viên
        );

        // Thêm dữ liệu vào mảng kết quả
        array_push($phieuluong_arr, $phieuluong_item);
    }

    // Trả về dữ liệu dưới dạng JSON
    echo json_encode($phieuluong_arr);
} else {
    // Nếu không có dữ liệu, trả về mảng rỗng
    echo json_encode(array());
}
