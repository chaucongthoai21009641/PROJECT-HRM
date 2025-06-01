<?php
include_once '../../config/cors.php';
include_once '../../config/database.php';
include_once '../../models/ThanhToan.php';

$db = new Database();
$conn = $db->connect();

$thanhtoan = new ThanhToan($conn);
$getAll = $thanhtoan->selectAll();
$num = $getAll->num_rows;

if ($num > 0) {
    $thanhtoan_arr = array();

    while ($row = $getAll->fetch_assoc()) {
        extract($row);
        $thanhtoan_item = array(
            "maTT" => $maTT,
            "tenDVhoacNH" => $tenDVhoacNH,
            "soDThoacSTK" => $soDThoacSTK,
            "tenChuTaiKhoan" => $tenChuTaiKhoan,
            "loaiTaiKhoan" => $loaiTaiKhoan,
            "hinhAnh" => $hinhAnh,
            "maNV" => $maNV
        );

        array_push($thanhtoan_arr, $thanhtoan_item);
    }

    echo json_encode($thanhtoan_arr);
}
