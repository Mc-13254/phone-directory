CREATE DATABASE phone_directories;

USE phone_directories;

CREATE TABLE employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    service VARCHAR(100),
    name VARCHAR(100),
    phone_number VARCHAR(15)
);

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE,
    password VARCHAR(255)
);

CREATE TABLE employees_gmc (
    id INT AUTO_INCREMENT PRIMARY KEY,
    service VARCHAR(100),
    name VARCHAR(100),
    phone_number VARCHAR(15)
);

CREATE TABLE users_gmc (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE,
    password VARCHAR(255)
);