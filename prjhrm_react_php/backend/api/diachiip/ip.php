<?php
include_once '../../config/cors.php';
include_once '../../config/database.php';
include_once '../../models/DiaChiIP.php';

$db = new Database();
$conn = $db->connect();

$diachiip = new diaChiIP($conn);
$getAll = $diachiip->selectAll();
$num = $getAll->num_rows;

if ($num > 0) {
    $diachiip_arr = array();

    while ($row = $getAll->fetch_assoc()) {
        extract($row);
        $diachiip_item = array(
            "maDCIP" => $maDCIP,
            "tenThietBi" => $tenThietBi,
            "diaChiIP" => $diaChiIP,
            "trangThai" => $trangThai,
        );

        array_push($diachiip_arr, $diachiip_item);
    }

    echo json_encode($diachiip_arr);
}
