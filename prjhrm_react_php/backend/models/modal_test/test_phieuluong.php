<?php
class PhieuLuong
{
    private $conn;
    private $table = "phieuluong";
    private $table_nhanvien = "nhanvien";

    private $maPL = "maPL";
    private $kieuLuong = "kieuLuong";
    private $luongCoBan = "luongCoBan";
    private $luongGio = "luongGio";
    private $gioLam = "gioLam";
    private $caLam = "caLam";
    private $gioOT = "gioOT";
    private $caOT = "caOT";
    private $luongOT = "luongOT";
    private $luongHeSo = "luongHeSo";
    private $luongThuong = "luongThuong";
    private $tongCong = "tongCong";

    private $maNV = "maNV";

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function selectAll()
    {
        $query = "SELECT p.*, 
                         SUM(CASE WHEN llv.tenCa = 'Fulltime' THEN TIMESTAMPDIFF(HOUR, bc.tgCheckIn, bc.tgCheckOut) ELSE 0 END) AS gioLam,
                         COUNT(CASE WHEN llv.tenCa = 'Fulltime' AND bc.tgCheckIn IS NOT NULL AND bc.tgCheckOut IS NOT NULL THEN 1 ELSE NULL END) AS caLam,
                         SUM(CASE WHEN llv.tenCa != 'Fulltime' THEN TIMESTAMPDIFF(HOUR, bc.tgCheckIn, bc.tgCheckOut) ELSE 0 END) AS gioOT,
                         COUNT(CASE WHEN llv.tenCa != 'Fulltime' AND bc.tgCheckIn IS NOT NULL AND bc.tgCheckOut IS NOT NULL THEN 1 ELSE NULL END) AS caOT,
                         SUM(llv.tienThuong) AS luongThuong
                  FROM $this->table p
                  LEFT JOIN bangcong bc ON p.maNV = bc.maNV
                  LEFT JOIN lichlamviec llv ON bc.maLLV = llv.maLLV
                  GROUP BY p.maPL
                  ORDER BY p.$this->maPL DESC";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt->get_result();
    }
    public function selectOne($maPL)
    {
        $query = "SELECT * FROM $this->table WHERE $this->maPL = $maPL LIMIT 1";
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
