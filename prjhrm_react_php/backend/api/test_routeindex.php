<?php

require_once '../config/database.php'; // Import database connection

// Thử sử dụng REQUEST_URI thay vì PATH_INFO
$requestUri = $_SERVER['REQUEST_URI']; // Lấy toàn bộ URI từ server

// Debug để kiểm tra REQUEST_URI
echo "REQUEST_URI: " . $requestUri . "<br>";

// Loại bỏ phần đường dẫn chính để lấy URL thực sự (chỉ lấy phần sau api)
$basePath = '/prjhrmthuan/api/'; // Phần prefix bạn muốn loại bỏ
if (strpos($requestUri, $basePath) === 0) {
    // Nếu REQUEST_URI bắt đầu với "/prjhrmthuan/api/", loại bỏ nó
    $pathname = substr($requestUri, strlen($basePath));
} else {
    // Nếu không có prefix, chỉ cần giữ nguyên đường dẫn
    $pathname = $requestUri;
}

$pathname = rtrim($pathname, '/'); // Loại bỏ dấu '/' cuối cùng

// Debug để kiểm tra $pathname
echo "Pathname: " . $pathname . "<br>";

// Chuyển đường dẫn thành một mảng các phần từ
$pathnameArr = array_filter(explode('/', $pathname)); // Tách đường dẫn thành mảng
$pathnameArr = array_values($pathnameArr); // Đảm bảo chỉ số mảng bắt đầu từ 0

// Debug để kiểm tra $pathnameArr
var_dump($pathnameArr); // Kiểm tra mảng đường dẫn

// Kiểm tra xem phần tử đầu tiên có phải là 'nhanvien' không
if (isset($pathnameArr[0]) && $pathnameArr[0] === 'nhanvien' && empty($pathnameArr[1])) {
    // Yêu cầu file nhanvien.php từ thư mục api/nhanvien
    require __DIR__ . '/NhanVien/index.php';
} else {
    // Nếu không khớp route, trả về thông báo lỗi
    echo json_encode(['error' => 'Không tìm thấy route']);
}
