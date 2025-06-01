<?php
include_once '../../config/cors.php';
include_once '../../config/database.php';
include_once '../../models/BangCong.php';

$db = new Database();
$conn = $db->connect();

$bangcong = new BangCong($conn);
$getAll = $bangcong->selectAll();
$num = $getAll->num_rows;

if ($num > 0) {
    $bangcong_arr = array();

    while ($row = $getAll->fetch_assoc()) {
        extract($row);
        $bangcong_item = array(
            "maBC" => $maBC,
            "tgCheckIn" => $tgCheckIn,
            "tgCheckOut" => $tgCheckOut,
            "maLLV" => $maLLV
        );

        array_push($bangcong_arr, $bangcong_item);
    }

    echo json_encode($bangcong_arr);
}
