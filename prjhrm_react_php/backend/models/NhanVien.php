<?php

class NhanVien
{
    private $conn;
    private $table = "nhanvien";
    private $table_taikhoan = "taikhoan";

    private $table_calam = "calam";
    private $table_phieuluong = "phieuluong";

    private $maNV = "maNV";
    private $hoTen = "hoTen";
    private $chucDanh = "chucDanh";
    private $soDienThoai = "soDienThoai";
    private $email = "email";
    private $gioiTinh = "gioiTinh";
    private $ngayVaoLam = "ngayVaoLam";
    private $tienLuong = "tienLuong";
    private $ngaySinh = "ngaySinh";
    private $trangThai = "trangThai";

    private $maTK = "maTK";
    private $maPL = "maPL";
    private $maCL = "maCL";

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function selectAll()
    {
        $query = "SELECT * FROM $this->table nv 
        LEFT JOIN $this->table_taikhoan tk ON nv.$this->maNV = tk.$this->maTK 
        LEFT JOIN $this->table_phieuluong pl ON nv.$this->maNV = pl.$this->maNV
        LEFT JOIN $this->table_calam cl ON nv.$this->maCL = cl.$this->maCL
        ORDER BY nv.$this->maNV DESC";
        $stmt = $this->conn->prepare($query);

        if (!$stmt) {
            die(json_encode(["error" => "SQL error: " . $this->conn->error]));
        }

        $stmt->execute();
        return $stmt->get_result();
    }

    public function insertUpDel($sql)
    {
        if ($sql->execute())
            return 1;
        else
            return 0;
    }


    // public function selectAll()
    // {
    //     $query = "SELECT * FROM " . $this->table . " ORDER BY " . $this->maNV . " DESC";
    //     $stmt = $this->conn->prepare($query);
    //     $stmt->execute();
    //     return $stmt;
    // }

    // Lấy danh sách tất cả nhân viên
    // public function selectAll()
    // {
    //     $query = "SELECT * FROM " . $this->table . " ORDER BY " . $this->maNV." DESC";
    //     $result = $this->conn->query($query);
    //     return $result->fetch_all(MYSQLI_ASSOC);
    // }




    // Lấy thông tin một nhân viên theo ID
    public function getById($maNV)
    {
        $query = "SELECT * FROM " . $this->table . " WHERE maNV = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("i", $maNV);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_assoc();
    }

    // Thêm nhân viên mới
    public function create($data)
    {
        $query = "INSERT INTO " . $this->table . " (hoTen, chucDanh, soDienThoai, email, gioiTinh, ngayVaoLam, tienLuong, ngaySinh, trangThai, maTK, maLuong, maTT) 
                  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param(
            "sssssssdsiii",
            $data['hoTen'],
            $data['chucDanh'],
            $data['soDienThoai'],
            $data['email'],
            $data['gioiTinh'],
            $data['ngayVaoLam'],
            $data['tienLuong'],
            $data['ngaySinh'],
            $data['trangThai'],
            $data['maTK'],
            $data['maLuong'],
            $data['maTT']
        );
        return $stmt->execute();
    }

    // Cập nhật thông tin nhân viên
    public function update($maNV, $data)
    {
        $query = "UPDATE " . $this->table . " SET hoTen = ?, chucDanh = ?, soDienThoai = ?, email = ?, gioiTinh = ?, ngayVaoLam = ?, 
                  tienLuong = ?, ngaySinh = ?, trangThai = ?, maTK = ?, maLuong = ?, maTT = ? WHERE maNV = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param(
            "sssssssdsiiii",
            $data['hoTen'],
            $data['chucDanh'],
            $data['soDienThoai'],
            $data['email'],
            $data['gioiTinh'],
            $data['ngayVaoLam'],
            $data['tienLuong'],
            $data['ngaySinh'],
            $data['trangThai'],
            $data['maTK'],
            $data['maLuong'],
            $data['maTT'],
            $maNV
        );
        return $stmt->execute();
    }

    // Xóa nhân viên
    public function delete($maNV)
    {
        $query = "DELETE FROM " . $this->table . " WHERE maNV = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("i", $maNV);
        return $stmt->execute();
    }
}
