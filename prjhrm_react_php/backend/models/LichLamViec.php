<?php

class LichLamViec
{
    private $conn;
    private $table = "lichlamviec";
    private $table_nhanvien = "nhanvien";

    private $maLLV = "maLLV";
    private $tenCa = "tenCa";
    private $ngayLamViec = "ngayLamViec";
    private $tgBatDau = "tgBatDau";
    private $tgKetThuc = "tgKetThuc";
    private $tgBatDauNghi = "tgBatDauNghi";
    private $tgKetThucNghi = "tgKetThucNghi";
    private $tgCheckInSom = "tgCheckInSom";
    private $tgCheckOutMuon = "tgCheckOutMuon";
    private $heSoLuong = "heSoLuong";
    private $tienThuong = "tienThuong";

    private $maNV = "maNV";

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function selectAll()
    {
        $query = "SELECT * FROM $this->table ORDER BY $this->maLLV DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt->get_result();
    }

    public function selectOne($id)
    {
        $query = "SELECT * FROM $this->table WHERE $this->maLLV=$id LIMIT 1";
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
