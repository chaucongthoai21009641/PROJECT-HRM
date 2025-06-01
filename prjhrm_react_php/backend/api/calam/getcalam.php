<?php
// header('Access-Control-Allow-Origin: *');
// header('Content-Type: application/json');
include_once '../../config/cors.php';
include_once '../../config/database.php';
include_once '../../models/calam.php';

$db = new Database();
$conn = $db->connect();
$calam = new CaLam($conn);

$uri = $_SERVER['REQUEST_URI'];
$segments = explode('/', $uri);

$maCL = end($segments);

if (!$maCL) {
    die(json_encode(["error" => "Thiếu ID ca làm."]));
}

$result = $calam->selectOne($maCL);

if ($result) {
    // Lấy kết quả và chuyển thành mảng
    $calam_item = $result->fetch_assoc();
    // $calam_item = array(
    //     "maCL" => $calam_item['maCL'],
    //     "tenCa" => $calam_item['tenCa'],
    //     "gioCheckInSom" => $calam_item['gioCheckInSom'],
    //     "gioCheckOutMuon" => $calam_item['gioCheckOutMuon']
    // );

    // echo json_encode([$calam_item]);

    echo json_encode($calam_item);
} else {
    echo json_encode([["error" => "Ca làm không tồn tại."]]);
}

$conn->close();
