<?php

class BangCong
{
    private $conn;
    private $table = "bangcong";
    private $table_chitietlichlamviec = "lichlamviec";

    private $maBC = "maBC";
    private $maLLV = "maLLV";
    private $tgCheckIn = "tgCheckIn";
    private $tgCheckout = "tgCheckout";

    private $maCTCL = "maCTCL";

    public function __construct($db)
    {
        $this->conn = $db;
    }

    // Lấy tất cả ca làm
    public function selectAll()
    {
        $query = "SELECT * FROM $this->table ORDER BY $this->maBC DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt->get_result();
    }

    public function selectTimeShiftDetail($id)
    {
        $query = "SELECT $this->table.*, $this->table_chitietlichlamviec.*
                    FROM $this->table 
                    LEFT JOIN $this->table_chitietlichlamviec ON $this->table.$this->maLLV = $this->table_chitietlichlamviec.$this->maLLV 
                    WHERE $this->table.$this->maBC = $id";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt->get_result();
    }

    public function selectOne($id)
    {
        $query = "SELECT * FROM $this->table WHERE $this->maBC=$id LIMIT 1";
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
