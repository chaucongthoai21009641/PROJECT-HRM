<?php
require_once 'config/database.php'; // Kết nối Database
header('Content-Type: application/json');

class TaiKhoanController
{
    private $conn;

    public function __construct()
    {
        $database = new Database();
        $this->conn = $database->connect();
    }

    // Lấy danh sách tài khoản
    public function index()
    {
        $sql = "SELECT * FROM taikhoan";
        $result = $this->conn->query($sql);

        if (!$result) {
            http_response_code(500);
            echo json_encode(["error" => "Lỗi khi truy vấn dữ liệu"]);
            return;
        }

        $taikhoans = $result->fetch_all(MYSQLI_ASSOC);
        echo json_encode($taikhoans);
    }

    // Tạo tài khoản mới
    public function store($data)
    {
        if (!isset($data['tenTaiKhoan'], $data['matKhau'])) {
            http_response_code(400);
            echo json_encode(["error" => "Thiếu dữ liệu đầu vào"]);
            return;
        }

        $matKhauHash = password_hash($data['matKhau'], PASSWORD_BCRYPT);

        $sql = "INSERT INTO taikhoan (tenTaiKhoan, matKhau) VALUES (?, ?)";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("ss", $data['tenTaiKhoan'], $matKhauHash);

        if ($stmt->execute()) {
            $maTK = $this->conn->insert_id;

            // Lấy maLuong ngẫu nhiên
            $result = $this->conn->query("SELECT maLuong FROM luong ORDER BY RAND() LIMIT 1");
            $maLuong = $result->fetch_assoc()['maLuong'];

            // Tạo nhân viên
            $sqlNhanVien = "INSERT INTO nhanvien (hoTen, chucDanh, soDienThoai, email, gioiTinh, ngayVaoLam, tienLuong, ngaySinh, trangThai, maTK, maLuong) 
                            VALUES (NULL, NULL, NULL, NULL, NULL, NOW(), 0, NULL, 1, ?, ?)";
            $stmtNhanVien = $this->conn->prepare($sqlNhanVien);
            $stmtNhanVien->bind_param("ii", $maTK, $maLuong);
            $stmtNhanVien->execute();

            echo json_encode(["message" => "Tạo tài khoản thành công", "maTK" => $maTK]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Lỗi khi tạo tài khoản"]);
        }
    }

    // Lấy thông tin một tài khoản
    public function show($id)
    {
        if (!is_numeric($id)) {
            http_response_code(400);
            echo json_encode(["error" => "ID không hợp lệ"]);
            return;
        }

        $sql = "SELECT * FROM taikhoan WHERE maTK = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $result = $stmt->get_result();
        $taiKhoan = $result->fetch_assoc();

        if ($taiKhoan) {
            echo json_encode($taiKhoan);
        } else {
            http_response_code(404);
            echo json_encode(["error" => "Không tìm thấy tài khoản"]);
        }
    }

    // Cập nhật tài khoản
    public function update($id, $data)
    {
        if (!is_numeric($id)) {
            http_response_code(400);
            echo json_encode(["error" => "ID không hợp lệ"]);
            return;
        }

        $quyenHan = isset($data['quyenHan']) ? $data['quyenHan'] : null;
        $matKhau = isset($data['matKhau']) ? password_hash($data['matKhau'], PASSWORD_BCRYPT) : null;

        $sql = "UPDATE taikhoan SET quyenHan = ?, matKhau = COALESCE(?, matKhau) WHERE maTK = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("ssi", $quyenHan, $matKhau, $id);

        if ($stmt->execute()) {
            echo json_encode(["message" => "Cập nhật thành công"]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Lỗi khi cập nhật"]);
        }
    }

    // Xóa tài khoản
    public function destroy($id)
    {
        if (!is_numeric($id)) {
            http_response_code(400);
            echo json_encode(["error" => "ID không hợp lệ"]);
            return;
        }

        $sql = "DELETE FROM taikhoan WHERE maTK = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("i", $id);

        if ($stmt->execute()) {
            echo json_encode(["message" => "Xóa tài khoản thành công"]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Lỗi khi xóa"]);
        }
    }
}

// Xử lý request từ URL
$controller = new TaiKhoanController();
$method = $_SERVER['REQUEST_METHOD'];
$request = explode("/", trim($_SERVER['PATH_INFO'], "/"));

if ($request[0] === "taikhoan") {
    switch ($method) {
        case "GET":
            isset($request[1]) ? $controller->show($request[1]) : $controller->index();
            break;
        case "POST":
            $data = json_decode(file_get_contents("php://input"), true);
            $controller->store($data);
            break;
        case "PUT":
            $data = json_decode(file_get_contents("php://input"), true);
            isset($request[1]) ? $controller->update($request[1], $data) : http_response_code(400);
            break;
        case "DELETE":
            isset($request[1]) ? $controller->destroy($request[1]) : http_response_code(400);
            break;
        default:
            http_response_code(405);
            echo json_encode(["error" => "Phương thức không hợp lệ"]);
    }
}
