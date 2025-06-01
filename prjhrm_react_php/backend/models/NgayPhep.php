<?php
class NgayPhep
{
    private $conn;
    private $table = "ngayphep";
    private $table_nhanvien = "nhanvien";

    private $maNP = "maNP";
    private $namPhep = "namPhep";
    private $soNgay = "soNgay";
    private $daNghi = "daNghi";
    private $conLai = "conLai";

    private $maNV = "maNV";

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function selectAll()
    {
        $query = "SELECT * FROM $this->table np LEFT JOIN $this->table_nhanvien nv ON np.$this->maNP = nv.$this->maNV ORDER BY np.$this->maNV DESC";
        $stmt = $this->conn->prepare($query);

        if (!$stmt) {
            die(json_encode(["error" => "SQL error: " . $this->conn->error]));
        }

        $stmt->execute();
        return $stmt->get_result();
    }

    public function selectOne($maNP)
    {
        $query = "SELECT * FROM $this->table WHERE $this->maNP = $maNP LIMIT 1";
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
