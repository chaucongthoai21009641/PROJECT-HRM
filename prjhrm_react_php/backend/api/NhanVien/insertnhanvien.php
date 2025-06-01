<?php
include_once '../../config/cors.php';
include_once '../../config/database.php';
include_once '../../models/taikhoan.php';
include_once '../../models/nhanvien.php';
include_once '../../models/PhieuLuong.php';

$db = new Database();
$conn = $db->connect();
// Lấy dữ liệu từ request
$tenTaiKhoan = $_POST['tenTaiKhoan'] ?? null;
$matKhau = $_POST['matKhau'] ?? null;
$hoTen = $_POST['hoTen'] ?? ''; // Chuỗi trống nếu không có giá trị
$chucDanh = $_POST['chucDanh'] ?? ''; // Chuỗi trống nếu không có giá trị
$soDienThoai = $_POST['soDienThoai'] ?? ''; // Chuỗi trống nếu không có giá trị
$email = $_POST['email'] ?? ''; // Chuỗi trống nếu không có giá trị
$gioiTinh = $_POST['gioiTinh'] ?? ''; // Chuỗi trống nếu không có giá trị
$ngaySinh = $_POST['ngaySinh'] ?? ''; // Chuỗi trống nếu không có giá trị
$trangThai = $_POST['trangThai'] ?? 1; // Mặc định là 1 (đang làm)

$kieuLuong = 'Lương tháng có trừ trễ'; // 

if ($tenTaiKhoan && $matKhau) {
    $taikhoan = new TaiKhoan($conn);
    $nhanvien = new NhanVien($conn);
    $phieuluong = new PhieuLuong($conn);

    // 1. Mã hóa mật khẩu trước khi lưu vào cơ sở dữ liệu
    $hashedPassword = password_hash($matKhau, PASSWORD_BCRYPT);

    // 1. Thêm vào bảng tài khoản
    $query1 = "INSERT INTO taikhoan (tenTaiKhoan, matKhau) VALUES (?, ?)";
    $stmt1 = $conn->prepare($query1);
    $stmt1->bind_param("ss", $tenTaiKhoan, $hashedPassword);

    if ($taikhoan->insertUpDel($stmt1) === 1) {
        // 2. Lấy maTK của tài khoản vừa tạo
        $maTK = $conn->insert_id;  // Lấy ID của bản ghi vừa được thêm vào

        // 3. Thêm vào bảng nhân viên với các cột khác như hoTen, chucDanh, soDienThoai, email, gioiTinh, tienLuong, ngaySinh, trangThai


        $query2 = "INSERT INTO nhanvien 
            (maTK, hoTen, chucDanh, soDienThoai, email, gioiTinh, ngayVaoLam, ngaySinh, trangThai) 
            VALUES (?, ?, ?, ?, ?, ?, CURDATE(), ?, ?)";  // Sửa để chỉ có 9 giá trị

        // Nếu không có số điện thoại hoặc email thì có thể cho giá trị mặc định là NULL hoặc chuỗi rỗng
        $soDienThoai = !empty($soDienThoai) ? $soDienThoai : NULL;
        $email = !empty($email) ? $email : NULL;

        // Bind dữ liệu cho 9 giá trị
        $stmt2 = $conn->prepare($query2);
        $stmt2->bind_param("isssssss", $maTK, $hoTen, $chucDanh, $soDienThoai, $email, $gioiTinh, $ngaySinh, $trangThai);

        if ($stmt2->execute()) {
            $maNV = $conn->insert_id;

            $query3 = "INSERT INTO phieuluong 
                    (maNV, kieuLuong) 
                    VALUES (?, ?)";

            // $email = !empty($email) ? $email : NULL;

            $stmt3 = $conn->prepare($query3);
            $stmt3->bind_param("is", $maNV, $kieuLuong);
            if ($stmt3->execute()) {
                echo json_encode(["message" => "Thêm nhân viên thành công."]);
            } else {
                echo json_encode(["warning" => "Tạo tài khoản thành công, nhưng thêm nhân viên thất bại.", "error" => $stmt2->error]);
            }
        } else {
            echo json_encode(["warning" => "Tạo tài khoản thành công, nhưng thêm nhân viên thất bại.", "error" => $stmt2->error]);
        }
    } else {
        echo json_encode(["error" => "Tạo tài khoản thất bại.", "error_details" => $stmt1->error]);
    }
} else {
    echo json_encode(["error" => "Thiếu dữ liệu."]);
}

$conn->close();
