<?php

class CaLam
{
    private $conn;
    private $table = "calam";
    private $table_chitietcalam = "chitietcalam";

    private $maCL = "maCL";
    private $tenCa = "tenCa";
    private $gioCheckInSom = "gioCheckInSom";
    private $gioCheckOutMuon = "gioCheckOutMuon";

    private $maCTCL = "maCTCL";

    public function __construct($db)
    {
        $this->conn = $db;
    }

    // Lấy tất cả ca làm
    public function selectAll()
    {
        $query = "SELECT * FROM $this->table ORDER BY $this->maCL DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt->get_result();
    }

    public function selectCaLamDetail($id)
    {
        //     $query = "SELECT 
        //             ca.maCL, ca.tenCa, ca.gioCheckInSom, ca.gioCheckOutMuon,
        //             ct.maCTCL, ct.thuTrongTuan, ct.tgBatDau, ct.tgKetThuc,
        //             ct.tgBatDauNghi, ct.tgKetThucNghi, ct.heSoLuong, ct.tienThuong
        //           FROM calam ca
        //           LEFT JOIN chitietcalam ct ON ca.maCL = ct.maCL
        //           WHERE ca.maCL = ?
        // ";
        $query = "SELECT $this->table.*, $this->table_chitietcalam.*
                    FROM $this->table 
                    LEFT JOIN $this->table_chitietcalam ON $this->table.$this->maCL = $this->table_chitietcalam.$this->maCL 
                    WHERE $this->table.$this->maCL = $id";
        // echo $query;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt->get_result();
    }
    
    public function selectOne($id)
    {
        $query = "SELECT * FROM $this->table WHERE $this->maCL=$id LIMIT 1";
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
