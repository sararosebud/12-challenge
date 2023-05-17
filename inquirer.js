const inquirer = require("inquirer");
const Db = require("./index");
const connection = require("./db/connection");




const db = new Db(connection);
promptUser();

function promptUser() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "prompts",
        message: "What would you like to do?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
        ],
      },
    ])

    .then((data) => {
      console.log(data);

      switch (data.prompts) {
        case "View all departments":
          db.viewAllDepartments()
            .then(([rows]) => {
              console.table(rows);
            })
            .then(() => {
              promptUser();
            });

          break;
        
        case "View all roles":
          db.viewAllRoles()
            .then(([rows]) => {
              console.table(rows);
            })
            .then(() => {
              promptUser();
            });

          break;
        case "View all employees":
          db.viewAllEmployees()
            .then(([rows]) => {
              console.table(rows);
            })
            .then(() => {
              promptUser();
            });
          break;

        case "Add a department":
          inquirer
            .prompt([
              {
                type: "input",
                name: "newDepartmentName",
                message: "Enter the name of the new department:",
              },
            ])
            .then((response) => {
              db.addDepartment(response.newDepartmentName)
                .then(() => {
                  console.log(
                    `New department "${response.newDepartmentName}" added successfully.`
                  );
                  promptUser();
                })
                .catch((error) => {
                  console.error(error);
                  promptUser();
                });
            });
          break;

          case "Add an employee":
            
                inquirer
                  .prompt([
                    {
                      type: "input",
                      name: "firstName",
                      message: "Enter the first name of the new employee",
                    },
                    {
                      type: "input",
                      name: "lastName",
                      message: "Enter the last name of the new employee",
                    },
                    {
                      type: "list",
                      name: "roleTitle",
                      message: "What is this employee's role?",
                      choices: function() {
                        return db.roleChoices();
                    } },

                    {
                      type: "list",
                      name: "departmentId",
                      message: "Enter the department of the new employee",
                      choices: function() {
                        return db.departmentChoices();
                      }
                    },
                    {
                      type: "list",
                      name: "managerId",
                      message: "Who is the manager of the new employee",
                      choices: function() {
                        return db.managerChoices()
                      }
                    },
                  ])
                  .then((response) => {
                    db.addEmployee(
                      response.firstName,
                      response.lastName,
                      response.roleTitle,
                      response.departmentId,
                      response.managerId
                    )
                      .then(() => {
                        console.log(
                          `New employee "${response.firstName} ${response.lastName}" added successfully.`
                        );
                        promptUser();
                      })
                      .catch((error) => {
                        console.error(error);
                        promptUser();
                      });
                  });
              
            break;
          


        //   add role
        case "Add a role":
          inquirer
            .prompt([
              {
                type: "input",
                name: "newRole",
                message: "What is the new role title?",
              },
              {
                type: "input",
                name: "newRoleSalary",
                message: "Enter the salary of this new role.",
              },
              {
                type: "list",
                name: "newRoleDepartment",
                message: "Enter the Department ID of the new role",
                choices: function() {
                    return db.departmentChoices();
                  }
              },
            
            ])
            .then((response) => {
              db.addRole(
                response.newRole,
                response.newRoleSalary,
                response.newRoleDepartment,
                
              )
                .then(() => {
                  console.log(
                    `New role "${response.newRole}" added successfully.`
                  );
                  promptUser();
                })
                .catch((error) => {
                  console.error(error);
                  promptUser();
                });
            });
          break;
      }
    });
}
