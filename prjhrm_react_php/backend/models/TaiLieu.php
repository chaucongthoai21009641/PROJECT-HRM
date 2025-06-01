<?php
class TaiLieu
{
    private $conn;
    private $table = "tailieu";

    private $maTL = "maTL";
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
        $query = "SELECT * FROM $this->table ORDER BY $this->maTL DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt->get_result();
    }
    // Lấy 1 thông báo
    public function selectOne($maTL)
    {
        $query = "SELECT * FROM $this->table WHERE $this->maTL = $maTL LIMIT 1";
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
