CREATE DATABASE ManageTasks;

USE ManageTasks;

CREATE TABLE Tasks(
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50),
    feito INT,
    titulo VARCHAR(150)
);

CREATE TABLE Users(
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100),
    email VARCHAR(200),
    senha VARCHAR(300)
);

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'pedrinho10';



INSERT INTO Tasks(nome, feito, titulo) VALUES (
    "Pedro Augusto",
    0,
    "MINHA PRIMEIRA TASK"
);