<?php

class HopThoai
{
    private $conn;
    private $table = "hopthoai";
    // private $table_taikhoan = "taikhoan";

    private $maHT = "maHT";
    private $tieuDe = "tieuDe";
    private $noiDung = "noiDung";
    private $url = "url";
    private $soLanHienThi = "soLanHienThi";
    private $tgBatDau = "tgBatDau";
    private $tgKetThuc = "tgKetThuc";

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function selectAll()
    {
        $query = "SELECT * FROM $this->table ORDER BY $this->maHT DESC";
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
