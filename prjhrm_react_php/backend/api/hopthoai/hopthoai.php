<?php
include_once '../../config/cors.php';
include_once '../../config/database.php';
include_once '../../models/hopthoai.php';

$db = new Database();
$conn = $db->connect();

$hopthoai = new HopThoai($conn);
$getAll = $hopthoai->selectAll();
$num = $getAll->num_rows;

if ($num > 0) {
    $hopthoai_arr = array();

    while ($row = $getAll->fetch_assoc()) {
        extract($row);
        $hopthoai_item = array(
            "maHT" => $maHT,
            "tieuDe" => $tieuDe,
            "noiDung" => $noiDung,
            "url" => $url,
            "soLanHienThi" => $soLanHienThi,
            "tgBatDau" => $tgBatDau,
            "tgKetThuc" => $tgKetThuc
        );

        array_push($hopthoai_arr, $hopthoai_item);
    }

    echo json_encode($hopthoai_arr);
}
