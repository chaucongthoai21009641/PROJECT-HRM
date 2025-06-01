<?php

include_once '../../config/cors.php';
include_once '../../config/database.php';
include_once '../../models/calam.php';

$db = new Database();
$conn = $db->connect();

$calam = new calam($conn);
$getAll = $calam->selectAll();
$num = $getAll->num_rows;

if ($num > 0) {
    $calam_arr = array();

    while ($row = $getAll->fetch_assoc()) {
        extract($row);
        $calam_item = array(
            "maCL" => $maCL,
            "tenCa" => $tenCa,
            "gioCheckInSom" => $gioCheckInSom,
            "gioCheckOutMuon" => $gioCheckOutMuon
        );

        array_push($calam_arr, $calam_item);
    }

    echo json_encode([
        "status" => "success",
        "data" => $calam_arr
    ]);
} else {
    // Thêm phản hồi nếu không có dữ liệu
    echo json_encode([
        "status" => "error",
        "message" => "Không có ca làm nào được tìm thấy."
    ]);
}


// include_once '../../config/cors.php';
// include_once '../../config/database.php';
// include_once '../../models/calam.php';

// $db = new Database();
// $conn = $db->connect();

// $calam = new calam($conn);
// $getAll = $calam->selectAll();
// $num = $getAll->num_rows;
// $calam_arr = array();

// if ($num > 0) {

//     while ($row = $getAll->fetch_assoc()) {
//         extract($row);
//         $calam_item = array(
//             "maCL" => $maCL,
//             "tenCa" => $tenCa,
//             "gioCheckInSom" => $gioCheckInSom,
//             "gioCheckOutMuon" => $gioCheckOutMuon
//         );

//         array_push($calam_arr, $calam_item);
//     }

//     echo json_encode($calam_arr);
// }
