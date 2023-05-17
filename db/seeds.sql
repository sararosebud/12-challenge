INSERT INTO department (dept_name)
VALUES ( "Chocolate Room"),
       ( "Chocolate River"),
       ( "Fear Tunnel"),
       ( "Store Room Number Fifty Four"),
       ("Fizzy Lifting Drink Room"),
       ( "WonkaVision Studio"),
       ( "Stretching Room"),
       ("Executive");

INSERT INTO role (title, salary, department_id)
VALUES ("Chocolate Stamper", 100000, 6),
        ("Taste Tester", 100000, 6), 
        ( "Oompa Loompa", 100000, 2),  
        ("Computer Operator", 100000, 3),
        ( "River Maintenance", 100000, 4),
        ( "Cleanup Crew", 100000,5),
        ( "Owner", 100000,1);
         


INSERT INTO employee (first_name, last_name, department_id, role_id, manager_id)
VALUES ("Willie", "Wonka", 1, 2, NULL),
       ("Veruca", "Salt", 2, 4, 1),
       ("Charlie", "Bucket", 5, 2, NULL),
       ("Violet", "Beauregarde", 5, 3, 3),
       ("Agustus", "Gloop", 1, 2, NULL);
       