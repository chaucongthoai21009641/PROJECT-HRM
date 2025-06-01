<?php
class ThongBao
{
    private $conn;
    private $table = "thongbao";

    private $maTB = "maTB";
    private $tieuDe = "tieuDe";
    private $url = "url";
    private $tgBatDau = "tgBatDau";
    private $tgKetThuc = "tgKetThuc";

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function selectAll()
    {
        $query = "SELECT * FROM $this->table ORDER BY $this->maTB DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt->get_result();
    }
    // Lấy 1 thông báo
    public function selectOne($maTB)
    {
        $query = "SELECT * FROM $this->table WHERE $this->maTB = $maTB LIMIT 1";
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
