<?php
include_once '../../config/cors.php';
include_once '../../config/database.php';
include_once '../../models/thongbao.php';

$db = new Database();
$conn = $db->connect();

$thongbao = new ThongBao($conn);
$getAll = $thongbao->selectAll();
$num = $getAll->num_rows;

if ($num > 0) {
    $thongbao_arr = array();

    while ($row = $getAll->fetch_assoc()) {
        extract($row);
        $thongbao_item = array(
            "maTB" => $maTB,
            "tieuDe" => $tieuDe,
            "url" => $url,
            "tgBatDau" => $tgBatDau,
            "tgKetThuc" => $tgKetThuc
        );

        array_push($thongbao_arr, $thongbao_item);
    }

    echo json_encode($thongbao_arr);
}
