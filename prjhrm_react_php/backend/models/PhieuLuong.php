<?php
class PhieuLuong
{
    private $conn;
    private $table = "phieuluong";
    private $table_nhanvien = "nhanvien";

    private $maPL = "maPL";
    private $kieuLuong = "kieuLuong";
    private $luongCoBan = "luongCoBan";
    // Các cột bị comment thì không có trong csdl nhé tự tính toán vào vào selectAll()
    // private $luongGio = "luongGio";
    // private $gioLam = "gioLam";
    // private $caLam = "caLam";
    // private $gioOT = "gioOT";
    // private $caOT = "caOT";
    // private $luongOT = "luongOT";
    // private $luongHeSo = "luongHeSo";
    // private $luongThuong = "luongThuong";
    // private $tongCong = "tongCong";

    private $maNV = "maNV";

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function selectAll()
    {
        $query = "SELECT p.*, 
                    (p.luongCoBan / NULLIF(SUM(
                        CASE 
                            WHEN cl.tenCa = llv.tenCa THEN TIMESTAMPDIFF(HOUR, bc.tgCheckIn, bc.tgCheckOut)
                            ELSE 0
                        END
                    ), 0)) AS luongGio,

                    SUM(
                        CASE 
                            WHEN cl.tenCa = llv.tenCa THEN TIMESTAMPDIFF(HOUR, bc.tgCheckIn, bc.tgCheckOut)
                            ELSE 0
                        END
                    ) AS gioLam,

                    COUNT(
                        CASE 
                            WHEN cl.tenCa = llv.tenCa AND bc.tgCheckIn IS NOT NULL AND bc.tgCheckOut IS NOT NULL
                            THEN 1
                        END
                    ) AS caLam,

                    SUM(
                        CASE 
                            WHEN cl.tenCa != llv.tenCa THEN TIMESTAMPDIFF(HOUR, bc.tgCheckIn, bc.tgCheckOut)
                            ELSE 0
                        END
                    ) AS gioOT,

                    COUNT(
                        CASE 
                            WHEN cl.tenCa != llv.tenCa AND bc.tgCheckIn IS NOT NULL AND bc.tgCheckOut IS NOT NULL
                            THEN 1
                        END
                    ) AS caOT,

                    (SUM(
                        CASE 
                            WHEN cl.tenCa != llv.tenCa THEN TIMESTAMPDIFF(HOUR, bc.tgCheckIn, bc.tgCheckOut)
                            ELSE 0
                        END
                    ) * (p.luongCoBan / NULLIF(SUM(
                        CASE 
                            WHEN cl.tenCa = llv.tenCa THEN TIMESTAMPDIFF(HOUR, bc.tgCheckIn, bc.tgCheckOut)
                            ELSE 0
                        END
                    ), 0))) AS luongOT,

                    SUM(llv.tienThuong) AS luongThuong,

                    (
                        (SUM(
                            CASE 
                                WHEN cl.tenCa = llv.tenCa THEN TIMESTAMPDIFF(HOUR, bc.tgCheckIn, bc.tgCheckOut)
                                ELSE 0
                            END
                        ) * (p.luongCoBan / NULLIF(SUM(
                            CASE 
                                WHEN cl.tenCa = llv.tenCa THEN TIMESTAMPDIFF(HOUR, bc.tgCheckIn, bc.tgCheckOut)
                                ELSE 0
                            END
                        ), 0)))
                        +
                        (SUM(
                            CASE 
                                WHEN cl.tenCa != llv.tenCa THEN TIMESTAMPDIFF(HOUR, bc.tgCheckIn, bc.tgCheckOut)
                                ELSE 0
                            END
                        ) * (p.luongCoBan / NULLIF(SUM(
                            CASE 
                                WHEN cl.tenCa = llv.tenCa THEN TIMESTAMPDIFF(HOUR, bc.tgCheckIn, bc.tgCheckOut)
                                ELSE 0
                            END
                        ), 0)))
                        +
                        SUM(llv.tienThuong)
                    ) AS tongCongCoHeSo,

                    (
                        ((
                            (SUM(
                                CASE 
                                    WHEN cl.tenCa = llv.tenCa THEN TIMESTAMPDIFF(HOUR, bc.tgCheckIn, bc.tgCheckOut)
                                    ELSE 0
                                END
                            ) * (p.luongCoBan / NULLIF(SUM(
                                CASE 
                                    WHEN cl.tenCa = llv.tenCa THEN TIMESTAMPDIFF(HOUR, bc.tgCheckIn, bc.tgCheckOut)
                                    ELSE 0
                                END
                            ), 0)))
                            +
                            (SUM(
                                CASE 
                                    WHEN cl.tenCa != llv.tenCa THEN TIMESTAMPDIFF(HOUR, bc.tgCheckIn, bc.tgCheckOut)
                                    ELSE 0
                                END
                            ) * (p.luongCoBan / NULLIF(SUM(
                                CASE 
                                    WHEN cl.tenCa = llv.tenCa THEN TIMESTAMPDIFF(HOUR, bc.tgCheckIn, bc.tgCheckOut)
                                    ELSE 0
                                END
                            ), 0)))
                            +
                            SUM(llv.tienThuong)
                        ) - p.luongCoBan)
                    ) AS luongHeSo,

                    (
                        (SUM(
                            CASE 
                                WHEN cl.tenCa = llv.tenCa THEN TIMESTAMPDIFF(HOUR, bc.tgCheckIn, bc.tgCheckOut)
                                ELSE 0
                            END
                        ) * (p.luongCoBan / NULLIF(SUM(
                            CASE 
                                WHEN cl.tenCa = llv.tenCa THEN TIMESTAMPDIFF(HOUR, bc.tgCheckIn, bc.tgCheckOut)
                                ELSE 0
                            END
                        ), 0)))
                        +
                        (SUM(
                            CASE 
                                WHEN cl.tenCa != llv.tenCa THEN TIMESTAMPDIFF(HOUR, bc.tgCheckIn, bc.tgCheckOut)
                                ELSE 0
                            END
                        ) * (p.luongCoBan / NULLIF(SUM(
                            CASE 
                                WHEN cl.tenCa = llv.tenCa THEN TIMESTAMPDIFF(HOUR, bc.tgCheckIn, bc.tgCheckOut)
                                ELSE 0
                            END
                        ), 0)))
                        +
                        SUM(llv.tienThuong)
                    ) AS tongCong

              FROM $this->table p
              INNER JOIN nhanvien nv ON p.maNV = nv.maNV
              LEFT JOIN calam cl ON nv.maCL = cl.maCL
              LEFT JOIN lichlamviec llv ON nv.maNV = llv.maNV
              LEFT JOIN bangcong bc ON llv.maLLV = bc.maLLV
              GROUP BY p.maPL
              ORDER BY p.maPL DESC";

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
