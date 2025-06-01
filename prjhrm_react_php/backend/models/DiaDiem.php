<?php
class DiaDiem
{
    private $conn;
    private $table = "diadiem";

    private $maDD = "maDD";
    private $tenDiaDiem = "tenDiaDiem";
    private $viDo = "viDo";
    private $kinhDo = "kinhDo";
    private $banKinh = "banKinh";
    private $trangThai = "trangThai";

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function selectAll()
    {
        $query = "SELECT * FROM $this->table ORDER BY $this->maDD DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt->get_result();
    }
    public function selectOne($maDD)
    {
        $query = "SELECT * FROM $this->table WHERE $this->maDD = $maDD LIMIT 1";
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
