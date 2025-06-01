<?php
include_once '../../config/cors.php';
include_once '../../config/database.php';
include_once '../../models/NgayPhep.php';

$db = new Database();
$conn = $db->connect();

$ngayphep = new NgayPhep($conn);
$getAll = $ngayphep->selectAll();
$num = $getAll->num_rows;

if ($num > 0) {
    $ngayphep_arr = array();

    while ($row = $getAll->fetch_assoc()) {
        extract($row);
        $ngayphep_item = array(
            "maNP" => $maNP,
            "namPhep" => $namPhep,
            "soNgay" => $soNgay,
            "daNghi" => $daNghi,
            "conLai" => $conLai,
            "nhan_vien" => array(
                "maNV" => $maNV,
                "hoTen" => $hoTen,
                "chucDanh" => $chucDanh,
                "trangThai" => $trangThai,
                "ngayVaoLam" => $ngayVaoLam,
                "gioiTinh" => $gioiTinh,
            )
        );

        array_push($ngayphep_arr, $ngayphep_item);
    }

    echo json_encode($ngayphep_arr);
}
