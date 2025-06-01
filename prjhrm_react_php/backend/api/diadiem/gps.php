<?php
include_once '../../config/cors.php';
include_once '../../config/database.php';
include_once '../../models/DiaDiem.php';

$db = new Database();
$conn = $db->connect();

$diadiem = new DiaDiem($conn);
$getAll = $diadiem->selectAll();
$num = $getAll->num_rows;

if ($num > 0) {
    $diadiem_arr = array();

    while ($row = $getAll->fetch_assoc()) {
        extract($row);
        $diadiem_item = array(
            "maDD" => $maDD,
            "tenDiaDiem" => $tenDiaDiem,
            "viDo" => $viDo,
            "kinhDo" => $kinhDo,
            "banKinh" => $banKinh,
            "trangThai" => $trangThai,
        );

        array_push($diadiem_arr, $diadiem_item);
    }

    echo json_encode($diadiem_arr);
}
