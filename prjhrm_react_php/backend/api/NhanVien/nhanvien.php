<?php
include_once '../../config/cors.php';
include_once '../../config/database.php';
include_once '../../models/nhanvien.php';

$db = new Database();
$conn = $db->connect();

$nhanvien = new NhanVien($conn);
$getAll = $nhanvien->selectAll();
$num = $getAll->num_rows;

if ($num > 0) {
    $nhanvien_arr = array();

    while ($row = $getAll->fetch_assoc()) {
        extract($row);
        $nhanvien_item = array(
            "maNV" => $maNV,
            "hoTen" => $hoTen,
            "chucDanh" => $chucDanh,
            "soDienThoai" => $soDienThoai,
            "email" => $email,
            "gioiTinh" => $gioiTinh,
            "ngayVaoLam" => $ngayVaoLam,
            "ngaySinh" => $ngaySinh,
            "trangThai" => $trangThai,
            "tai_khoan" => array(
                "maTK" => $maTK,
                "matKhau" => $matKhau,
                "tenTaiKhoan" => $tenTaiKhoan,
                "quyenHan" => $quyenHan,
            ),
            "ca_lam" => array(
                "maCL" => $maCL,
                "tenCa" => $tenCa,
            ),
            "phieu_luong" => array(
                "maPL" => $maPL,
                "kieuLuong" => $kieuLuong,
                "luongCoBan" => $luongCoBan,
            )
        );

        array_push($nhanvien_arr, $nhanvien_item);
    }

    echo json_encode($nhanvien_arr);
}
