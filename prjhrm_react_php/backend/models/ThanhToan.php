<?php
class ThanhToan
{
    private $conn;
    private $table = "thanhtoan";
    private $table_nhanvien = "nhanvien";

    private $maTT = "maTT";
    private $tenDVhoacNH = "tenDVhoacNH";
    private $soDThoacSTK = "soDThoacSTK";
    private $tenChuTaiKhoan = "tenChuTaiKhoan";
    private $hinhAnh = "hinhAnh";

    private $maNV = "maNV";

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function selectAll()
    {
        $query = "SELECT * FROM $this->table ORDER BY $this->maTT DESC";
        $stmt = $this->conn->prepare($query);
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
}
