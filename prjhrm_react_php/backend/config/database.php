<?php
class Database
{
    private $host = "localhost";   // Địa chỉ database
    private $username = "root";    // Username database
    private $password = "";        // Mật khẩu database
    private $dbname = "dbhrm2"; // Tên database của bạn
    public $conn;

    public function connect()
    {
        $this->conn = null;
        try {
            $this->conn = new mysqli($this->host, $this->username, $this->password, $this->dbname);
            if ($this->conn->connect_error) {
                die("Connection failed: " . $this->conn->connect_error);
            }
        } catch (Exception $e) {
            die("Connection error: " . $e->getMessage());
        }
        return $this->conn;
    }
}

// Kiểm tra kết nối
$db = new Database();
$db->connect();
