DROP DATABASE IF EXISTS all_employees;

CREATE DATABASE all_employees;

USE all_employees;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(30) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL, 
    salary DECIMAL(9,2) NOT NULL,
    department_id INT NOT NULL,

    FOREIGN KEY(department_id) 
    REFERENCES department(id),
    PRIMARY KEY(id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL, 
    last_name VARCHAR(30) NOT NULL, 
    role_id INT NOT NULL,
    manager_id INT NOT NULL,

    FOREIGN KEY(role_id) 
    REFERENCES role(id),
    PRIMARY KEY(id)
);

