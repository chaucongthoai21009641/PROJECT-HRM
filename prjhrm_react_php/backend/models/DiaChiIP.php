<?php
class DiaChiIP
{
    private $conn;
    private $table = "diachiip";

    private $maDCIP = "maDCIP";
    private $tenThietBi = "tenThietBi";
    private $diaChiIP = "diaChiIP";
    private $trangThai = "trangThai";

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function selectAll()
    {
        $query = "SELECT * FROM $this->table ORDER BY $this->maDCIP DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt->get_result();
    }
    // Lấy 1 thông báo
    public function selectOne($maDCIP)
    {
        $query = "SELECT * FROM $this->table WHERE $this->maDCIP = $maDCIP LIMIT 1";
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
