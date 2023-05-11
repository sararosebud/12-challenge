INSERT INTO department (dept_name)
VALUES ( "Discovery"),
       ( "Design"),
       ( "WebDev"),
       ( "MobileDev"),
       ("Testing"),
       ( "Backend"),
       ( "DevOps");

INSERT INTO role (title, salary, department_id)
VALUES ("Software Developer", 100000, 1), 
        ( "Web Designer", 100000, 2),  
        ("Graphic Designer", 100000, 3),
        ( "Someone else", 100000, 4),
        ( "another one", 100000,5);
         


INSERT INTO employee (first_name, last_name, department_id, role_id, manager_id)
VALUES ("Arthur", "Miller", 1, 2, NULL),
       ("Chinua", "Achebe", 2, 4, 1),
       ("Margaret", "Atwood", 3, 5, NULL),
       ("Gabriel", "Garcia Marquez", 5, 3, 3),
       ("Simone", "de Beauvoir", 1, 1, NULL);
       