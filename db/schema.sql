DROP DATABASE IF EXISTS tracker;
CREATE DATABASE tracker;
USE tracker;

CREATE TABLE department(
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    departments VARCHAR(30) Not Null
);

CREATE TABLE roles(
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) Not Null,
    salary decimal Not null,
    department_id INTEGER,
    FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE SET NULL
);
CREATE TABLE employee(
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    department_id INTEGER,
    roles_id INTEGER,
    manager_id INTEGER,
    FOREIGN KEY (roles_id) REFERENCES roles(id)

);