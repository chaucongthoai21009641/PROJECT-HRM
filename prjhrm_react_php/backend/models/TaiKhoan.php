<?php
class TaiKhoan
{
    private $conn;
    private $table = "taikhoan";

    private $maTK = "maTK";
    private $tenTaiKhoan = "tenTaiKhoan";
    private $matKhau = "matKhau";
    private $quyenHan = "quyenHan";

    public function __construct($db)
    {
        $this->conn = $db;
    }

    // Lấy tất cả tài khoản
    public function selectAll()
    {
        $query = "SELECT * FROM $this->table ORDER BY $this->maTK DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt->get_result();
    }

    // Lấy tài khoản theo tên tài khoản
    public function findByUsername($tenTaiKhoan)
    {
        $sql = "SELECT * FROM $this->table WHERE tenTaiKhoan = ? LIMIT 1";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("s", $tenTaiKhoan);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result && $result->num_rows > 0) {
            return $result->fetch_assoc();
        }

        return false;
    }

    // Lấy tài khoản theo ID
    public function getById($id)
    {
        $sql = "SELECT maTK, tenTaiKhoan, quyenHan FROM $this->table WHERE maTK = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("i", $id);
        $stmt->execute();
        return $stmt->get_result();
    }

    // Thêm tài khoản mới
    public function insertUpDel($sql)
    {
        if ($sql->execute())
            return 1;
        else
            return 0;
    }

    public function them($data)
    {
        $sql = "INSERT INTO $this->table (tenTaiKhoan, matKhau, quyenHan) VALUES (?, ?, ?)";
        $stmt = $this->conn->prepare($sql);
        $hashedPassword = password_hash($data['matKhau'], PASSWORD_BCRYPT);
        $stmt->bind_param("sss", $data['tenTaiKhoan'], $hashedPassword, $data['quyenHan']);
        return $stmt->execute();
    }

    // Cập nhật tài khoản
    public function update($id, $data)
    {
        $sql = "UPDATE $this->table SET tenTaiKhoan = ?, quyenHan = ? WHERE maTK = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("ssi", $data['tenTaiKhoan'], $data['quyenHan'], $id);
        return $stmt->execute();
    }

    // Xóa tài khoản
    public function delete($id)
    {
        $sql = "DELETE FROM $this->table WHERE maTK = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("i", $id);
        return $stmt->execute();
    }

    // Kiểm tra đăng nhập
    // public function checkLogin($tenTaiKhoan, $matKhau)
    // {
    //     $sql = "SELECT maTK, matKhau FROM $this->table WHERE tenTaiKhoan = ?";
    //     $stmt = $this->conn->prepare($sql);
    //     $stmt->bind_param("s", $tenTaiKhoan);
    //     $stmt->execute();
    //     $result = $stmt->get_result()->fetch_assoc();

    //     if ($result && password_verify($matKhau, $result['matKhau'])) {
    //         return $result['maTK']; // Trả về ID tài khoản nếu đăng nhập đúng
    //     }
    //     return false; // Đăng nhập thất bại
    // }
}
