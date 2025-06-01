<?php
include_once '../../config/cors.php';
include_once '../../config/database.php';
include_once '../../models/taikhoan.php';

$db = new Database();
$conn = $db->connect();

$taikhoan = new TaiKhoan($conn);
$getAll = $taikhoan->selectAll();
$num = $getAll->num_rows;

if ($num > 0) {
    $taikhoan_arr = array();

    while ($row = $getAll->fetch_assoc()) {
        extract($row);
        $taikhoan_item = array(
            "maTK" => $maTK,
            "tenTaiKhoan" => $tenTaiKhoan,
            "matKhau" => $matKhau,
            "quyenHan" => $quyenHan,
        );

        array_push($taikhoan_arr, $taikhoan_item);
    }

    echo json_encode($taikhoan_arr);
}
