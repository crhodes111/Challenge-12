INSERT INTO department(departments)
VALUES
    ('Sales'),
    ('Human Resources'),
    ('Technology'),
    ('Operations'),
    ('Legal');

INSERT INTO roles(title, salary, department_id)
    VALUES
        ("Sales Lead", 100000, 1),
        ("Manager", 120000, 2),
        ("Software Engineer", 150000, 3),
        ('Business Analyst', 95000, 4),
        ('Lawyer', 175000, 5);
INSERT INTO employee (first_name, last_name, department_id, roles_id)
    VALUES
        ("Jimmy", "Neutron", 3, 3),
        ("Jimmy's","Mom", 2, 2),
        ("Mr", "Squidward", 1, 1),
        ("Cooper", "Rhodes", 4, 4),
        ("Johnny", "Cochran", 5, 5);