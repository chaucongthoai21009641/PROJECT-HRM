<?php
include_once '../../config/cors.php';
include_once '../../config/database.php';
include_once '../../models/PhieuLuong.php';

$db = new Database();
$conn = $db->connect();

$phieuluong = new PhieuLuong($conn);
$getAll = $phieuluong->selectAll();
$num = $getAll->num_rows;

if ($num > 0) {
    $phieuluong_arr = array();

    while ($row = $getAll->fetch_assoc()) {
        extract($row);
        $phieuluong_item = array(
            "maPL" => $maPL,
            "kieuLuong" => $kieuLuong,
            "luongCoBan" => $luongCoBan,
            "luongGio" => $luongGio,
            "gioLam" => $gioLam,
            "caLam" => $caLam,
            "gioOT" => $gioOT,
            "caOT" => $caOT,
            "luongOT" => $luongOT,
            "luongHeSo" => $luongHeSo,
            "luongThuong" => $luongThuong,
            "tongCong" => $tongCong,
            "maNV" => $maNV,
        );

        array_push($phieuluong_arr, $phieuluong_item);
    }

    echo json_encode($phieuluong_arr);
}
