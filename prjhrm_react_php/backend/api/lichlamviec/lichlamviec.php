<?php
include_once '../../config/cors.php';
include_once '../../config/database.php';
include_once '../../models/lichlamviec.php';

$db = new Database();
$conn = $db->connect();

$lichlamviec = new LichLamViec($conn);
$getAll = $lichlamviec->selectAll();
$num = $getAll->num_rows;

if ($num > 0) {
    $lichlamviec_arr = array();

    while ($row = $getAll->fetch_assoc()) {
        extract($row);
        $lichlamviec_item = array(
            "maLLV" => $maLLV,
            "tenCa" => $tenCa,
            "ngayLamViec" => $ngayLamViec,
            "tgBatDau" => $tgBatDau,
            "tgKetThuc" => $tgKetThuc,
            "tgBatDauNghi" => $tgBatDauNghi,
            "tgKetThucNghi" => $tgKetThucNghi,
            "tgCheckInSom" => $tgCheckInSom,
            "tgCheckOutMuon" => $tgCheckOutMuon,
            "heSoLuong" => $heSoLuong,
            "tienThuong" => $tienThuong,
            "maNV" => $maNV
        );

        array_push($lichlamviec_arr, $lichlamviec_item);
    }

    echo json_encode($lichlamviec_arr);
}
