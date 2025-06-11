<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:5173"); // Allow React app
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$conn = new mysqli("localhost", "root", "", "shopping");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (!$data) {
        echo json_encode(["status" => "error", "message" => "Invalid JSON input"]);
        exit;
    }

    $name = $conn->real_escape_string($data['name'] ?? '');
    $email = $conn->real_escape_string($data['email'] ?? '');
    $password = $data['password'] ?? '';
    $place = $conn->real_escape_string($data['place'] ?? '');

    if (empty($name) || empty($email) || empty($password) || empty($place)) {
        echo json_encode(["status" => "error", "message" => "All fields are required"]);
        exit;
    }

    // Check email exists
    $checkEmail = $conn->query("SELECT * FROM users WHERE email='$email'");
    if ($checkEmail->num_rows > 0) {
        echo json_encode(["status" => "error", "message" => "Email already registered"]);
        exit;
    }

    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // Insert user
    $sql = "INSERT INTO users (name, email, password, place) VALUES ('$name', '$email', '$hashedPassword', '$place')";
    if ($conn->query($sql)) {
        echo json_encode(["status" => "success", "message" => "Registration successful"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Database error"]);
    }
}
?>