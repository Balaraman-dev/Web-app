<?php
// --- CORS HEADERS ---
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// --- Handle preflight OPTIONS request ---
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// --- Database connection ---
$conn = new mysqli("localhost", "root", "", "shopping");
if ($conn->connect_error) {
    echo json_encode(["status" => "error", "message" => "DB connection failed"]);
    exit;
}

// --- Only allow POST ---
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405); // Method Not Allowed
    echo json_encode(["status" => "error", "message" => "Method Not Allowed"]);
    exit;
}

// --- Get raw JSON input ---
$raw = file_get_contents('php://input');
$data = json_decode($raw, true);

// --- Sanitize and validate ---
$user_id = $conn->real_escape_string($data['user_id'] ?? '');
$product_id = $conn->real_escape_string($data['id'] ?? '');

if (!$user_id || !$product_id) {
    echo json_encode(["status" => "error", "message" => "Missing product or user ID"]);
    exit;
}

// --- Check if already in cart ---
$checkSql = "SELECT * FROM cart WHERE user_id='$user_id' AND product_id='$product_id'";
$checkResult = $conn->query($checkSql);
if ($checkResult && $checkResult->num_rows > 0) {
    echo json_encode(["status" => "success", "message" => "Product already in cart"]);
    exit;
}

// --- Insert into cart ---
$insertSql = "INSERT INTO cart (user_id, product_id) VALUES ('$user_id', '$product_id')";
if ($conn->query($insertSql)) {
    echo json_encode(["status" => "success", "message" => "Added to cart"]);
} else {
    echo json_encode(["status" => "error", "message" => "Insert failed"]);
}
?>
