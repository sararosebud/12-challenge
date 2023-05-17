INSERT INTO department (dept_name)
VALUES ( "Chocolate Factory"),
       ( "Chocolate River"),
       ( "Fear Tunnel"),
       ( "Store Room Number Fifty Four"),
       ( "Fizzy Lifting Drink Room"),
       ( "WonkaVision Studio"),
       ( "Stretching Room"),
       ( "General"),
       ( "Executive");

INSERT INTO role (title, salary, department_id)
VALUES ("Chocolate Stamper", 150000, 1),
        ("Taste Tester", 160000, 5), 
        ( "Oompa Loompa", 300000, 8),  
        ("Computer Operator", 400000, 6),
        ( "River Maintenance", 200000, 2),
        ( "Cleanup Crew", 500000, 8),
        ( "Owner", 800000, 9);
         


INSERT INTO employee (first_name, last_name, department_id, role_id, manager_id)
VALUES ("Willie", "Wonka", 1, 5, NULL),
       ("Veruca", "Salt", 2, 4, 1),
       ("Charlie", "Bucket", 5, 2, NULL),
       ("Violet", "Beauregarde", 5, 3, 3),
       ("Agustus", "Gloop", 1, 2, NULL);
       