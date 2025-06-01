<?php
include_once '../../config/cors.php';
include_once '../../config/database.php';
include_once '../../models/BangCong.php';

$db = new Database();
$conn = $db->connect();
$bangcong = new BangCong($conn);

$uri = $_SERVER['REQUEST_URI'];
$segments = explode('/', $uri);

$maBC = end($segments);
if (!$maBC) {
    die(json_encode(["error" => "Thiếu ID chấm công."]));
}

// Đọc dữ liệu JSON từ request
$data = json_decode(file_get_contents("php://input"), true);

if ($maBC > 0) {
    $tgCheckIn = $data['tgCheckIn'];
    $tgCheckOut = $data['tgCheckOut'];
    $maLLV = $data['maLLV']; // Lấy maLLV từ request

    // Kiểm tra xem maLLV có tồn tại trong bảng lichlamviec hay không
    $query_check_maLLV = "SELECT COUNT(*) FROM lichlamviec WHERE maLLV = ?";
    $stmt_check_maLLV = $conn->prepare($query_check_maLLV);
    $stmt_check_maLLV->bind_param('i', $maLLV); // Sử dụng 'i' nếu maLLV là số nguyên
    $stmt_check_maLLV->execute();
    $stmt_check_maLLV->bind_result($count_maLLV);
    $stmt_check_maLLV->fetch();
    $stmt_check_maLLV->close();

    // if ($count_maLLV == 0) {
    //     die(json_encode(["error" => "maLLV không tồn tại trong bảng lichlamviec."]));
    // }

    // Kiểm tra xem maBC đã tồn tại chưa
    $query_check = "SELECT COUNT(*) FROM bangcong WHERE maBC = ?";
    $stmt_check = $conn->prepare($query_check);
    $stmt_check->bind_param('i', $maBC);  // Sử dụng 'i' nếu maBC là số nguyên
    $stmt_check->execute();
    $stmt_check->bind_result($count);
    $stmt_check->fetch();
    $stmt_check->close();

    if ($count_maLLV > 0) {
        // Nếu bản ghi đã tồn tại, thực hiện UPDATE
        $query = "UPDATE bangcong SET tgCheckIn = ?, tgCheckOut = ? WHERE maBC = ? LIMIT 1";
        $stmt = $conn->prepare($query);
        if (!$stmt) {
            echo json_encode(["error" => "SQL error: " . $conn->error]);
            exit;
        }

        $stmt->bind_param('sss', $tgCheckIn, $tgCheckOut, $maBC);

        if ($bangcong->insertUpDel($stmt)) {
            echo json_encode([
                "message" => "Cập nhật thời gian chấm công thành công!",
                "status" => 200
            ]);
        } else {
            echo json_encode(["error" => "Cập nhật thời gian chấm công thất bại!", "error_details" => $stmt->error]);
        }

        $stmt->close();
    } else {
        // Nếu bản ghi chưa tồn tại, thực hiện INSERT
        // Kiểm tra xem maLLV có tồn tại trong bảng bangcong không
        $query_check_maLLV_in_bangcong = "SELECT COUNT(*) FROM bangcong WHERE maLLV = ?";
        $stmt_check_maLLV_in_bangcong = $conn->prepare($query_check_maLLV_in_bangcong);
        $stmt_check_maLLV_in_bangcong->bind_param('s', $maLLV);  // Sử dụng 's' nếu maLLV là chuỗi
        $stmt_check_maLLV_in_bangcong->execute();
        $stmt_check_maLLV_in_bangcong->bind_result($count_maLLV_in_bangcong);
        $stmt_check_maLLV_in_bangcong->fetch();
        $stmt_check_maLLV_in_bangcong->close();

        if ($count_maLLV_in_bangcong > 0) {
            die(json_encode(["error" => "maLLV đã tồn tại trong bảng bangcong."]));
        }

        // Tiến hành INSERT nếu không có lỗi
        $query = "INSERT INTO bangcong (maBC, tgCheckIn, tgCheckOut, maLLV) VALUES (?, ?, ?, ?)";
        $stmt = $conn->prepare($query);
        if (!$stmt) {
            echo json_encode(["error" => "SQL error: " . $conn->error]);
            exit;
        }

        $stmt->bind_param('isss', $maBC, $tgCheckIn, $tgCheckOut, $maLLV);
        if ($bangcong->insertUpDel($stmt)) {
            echo json_encode([
                "message" => "Thêm thời gian chấm công thành công!",
                "status" => 200
            ]);
        } else {
            echo json_encode(["error" => "Thêm thời gian chấm công thất bại!", "error_details" => $stmt->error]);
        }

        $stmt->close();
    }
} else {
    echo json_encode(["error" => "Dữ liệu không hợp lệ hoặc thiếu thông tin."]);
}

$conn->close();
