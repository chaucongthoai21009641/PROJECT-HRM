<?php
require_once 'config/database.php'; // Kết nối Database
header('Content-Type: application/json');

class LuongController
{
    private $conn;

    public function __construct()
    {
        $database = new Database();
        $this->conn = $database->connect();
    }

    // Lấy danh sách lương
    public function index()
    {
        $sql = "SELECT * FROM luong";
        $result = $this->conn->query($sql);

        if (!$result) {
            http_response_code(500);
            echo json_encode(["error" => "Lỗi khi truy vấn dữ liệu"]);
            return;
        }

        $luongs = $result->fetch_all(MYSQLI_ASSOC);
        echo json_encode($luongs);
    }

    // Thêm lương mới
    public function store($data)
    {
        if (!isset($data['kieuLuong'], $data['soTien'])) {
            http_response_code(400);
            echo json_encode(["error" => "Thiếu dữ liệu đầu vào"]);
            return;
        }

        $sql = "INSERT INTO luong (kieuLuong, soTien) VALUES (?, ?)";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("sd", $data['kieuLuong'], $data['soTien']);

        if ($stmt->execute()) {
            http_response_code(201);
            echo json_encode(["message" => "Thêm lương thành công", "maLuong" => $this->conn->insert_id]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Lỗi khi thêm lương"]);
        }
    }

    // Lấy thông tin một lương
    public function show($id)
    {
        if (!is_numeric($id)) {
            http_response_code(400);
            echo json_encode(["error" => "ID không hợp lệ"]);
            return;
        }

        $sql = "SELECT * FROM luong WHERE maLuong = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $result = $stmt->get_result();
        $luong = $result->fetch_assoc();

        if ($luong) {
            echo json_encode($luong);
        } else {
            http_response_code(404);
            echo json_encode(["error" => "Không tìm thấy lương"]);
        }
    }

    // Cập nhật lương
    public function update($id, $data)
    {
        if (!is_numeric($id)) {
            http_response_code(400);
            echo json_encode(["error" => "ID không hợp lệ"]);
            return;
        }

        $sql = "UPDATE luong SET kieuLuong = COALESCE(?, kieuLuong), soTien = COALESCE(?, soTien) WHERE maLuong = ?";
        $stmt = $this->conn->prepare($sql);

        $kieuLuong = isset($data['kieuLuong']) ? $data['kieuLuong'] : null;
        $soTien = isset($data['soTien']) ? $data['soTien'] : null;

        $stmt->bind_param("sdi", $kieuLuong, $soTien, $id);

        if ($stmt->execute()) {
            echo json_encode(["message" => "Cập nhật thành công"]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Lỗi khi cập nhật"]);
        }
    }

    // Xóa lương
    public function destroy($id)
    {
        if (!is_numeric($id)) {
            http_response_code(400);
            echo json_encode(["error" => "ID không hợp lệ"]);
            return;
        }

        $sql = "DELETE FROM luong WHERE maLuong = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("i", $id);

        if ($stmt->execute()) {
            echo json_encode(["message" => "Xóa lương thành công"]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Lỗi khi xóa"]);
        }
    }
}

// Xử lý request từ URL
$controller = new LuongController();
$method = $_SERVER['REQUEST_METHOD'];
$request = explode("/", trim($_SERVER['PATH_INFO'], "/"));

if ($request[0] === "luong") {
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
