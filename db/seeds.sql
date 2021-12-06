USE all_employees;

INSERT INTO department (id, department_name)
VALUES (01, "Accounting");

INSERT INTO role (id, title, salary, department_id)
VALUES (01, "Administrative Assistant", 56000.00, 01);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (01, "Jacob", "Brewer", 01, 02);