<?php

class ChiTietCaLam
{
    private $conn;
    private $table = "chitietcalam";
    private $table_calam = "calam";

    private $maCTCL = "maCTCL";
    private $thuTrongTuan = "thuTrongTuan";
    private $tgBatDau = "tgBatDau";
    private $tgKetThuc = "tgKetThuc";
    private $tgBatDauNghi = "tgBatDauNghi";
    private $tgKetThucNghi = "tgKetThucNghi";
    private $heSoLuong = "heSoLuong";
    private $tienThuong = "tienThuong";


    private $maCL = "maCL";

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function selectAll()
    {
        $query = "SELECT * FROM $this->table ORDER BY $this->maCTCL DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt->get_result();
    }

    public function selectOne($id)
    {
        $query = "SELECT * FROM $this->table WHERE $this->maCTCL=$id LIMIT 1";
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
