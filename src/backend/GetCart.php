<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$conn = new mysqli("localhost", "root", "", "shopping");
if ($conn->connect_error) {
    echo json_encode(["status" => "error", "message" => "DB connection failed"]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Method Not Allowed"]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);
$user_id = $conn->real_escape_string($data['user_id'] ?? '');

if (!$user_id) {
    echo json_encode(["status" => "error", "message" => "User ID missing"]);
    exit;
}

$sql = "SELECT p.id, p.title, p.description, p.price, p.image 
        FROM cart c 
        JOIN products p ON c.product_id = p.id  
        WHERE c.user_id = '$user_id'";

$result = $conn->query($sql);
$cartItems = [];

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $cartItems[] = $row;
    }
    echo json_encode(["status" => "success", "cart" => $cartItems]);
} else {
    echo json_encode(["status" => "success", "cart" => []]);
}
?>
