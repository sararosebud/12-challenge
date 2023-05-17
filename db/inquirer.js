const inquirer = require("inquirer");
const Db = require("./index");
const connection = require("./connection");

const db = new Db(connection);
const logo = require('asciiart-logo');


renderLogo();
promptUser();

function renderLogo() {const logoText = logo({ name: "Employee Manager" }).render();

console.log(logoText);
}

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
          console.log("All Departments");
          db.viewAllDepartments()
            .then(([rows]) => {
              console.table(rows);
            })
            .then(() => {
              promptUser();
            });

          break;

        case "View all roles":
          console.log("All Roles");
          db.viewAllRoles()
            .then(([rows]) => {
              console.table(rows);
            })
            .then(() => {
              promptUser();
            });

          break;
        case "View all employees":
          console.log("All Employees");
          db.viewAllEmployees()
            .then(([rows]) => {
              console.table(rows);
            })
            .then(() => {
              promptUser();
            });
          break;

        case "Add a department":
          console.log("Add a Department");
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
          console.log("Add an employee");
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
                choices: function () {
                  return db.roleChoices();
                },
              },

              {
                type: "list",
                name: "departmentId",
                message: "Enter the department of the new employee",
                choices: function () {
                  return db.departmentChoices();
                },
              },
              {
                type: "list",
                name: "managerId",
                message: "Who is the manager of the new employee",
                choices: function () {
                  return db.managerChoices();
                },
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
          console.log("Add a role");
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
                choices: function () {
                  return db.departmentChoices();
                },
              },
            ])
            .then((response) => {
              db.addRole(
                response.newRole,
                response.newRoleSalary,
                response.newRoleDepartment
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

        case "Update an employee role":
          console.log("Update an employee role");
          // Retrieve the list of employees from the database
          db.viewAllEmployees().then(([rows]) => {
            // Display the list of employees to choose from
            const employeeChoices = rows.map((row) => {
              return {
                name: `${row.first_name} ${row.last_name}`,
                value: row.id,
              };
            });

            inquirer
              .prompt([
                {
                  type: "list",
                  name: "employeeId",
                  message: "Select the employee whose role you want to update:",
                  choices: employeeChoices,
                },
                {
                  type: "list",
                  name: "newRoleId",
                  message: "Select the new role for the employee:",
                  choices: function () {
                    return db.roleChoices();
                  },
                },
              ])
              .then((response) => {
                const { employeeId, newRoleId } = response;

                // Update the employee's role in the database
                db.updateEmployeeRole(employeeId, newRoleId)
                  .then(() => {
                    console.log("Employee role updated successfully.");
                    promptUser();
                  })
                  .catch((error) => {
                    console.error(error);
                    promptUser();
                  });
              });
          });
          break;
      }
    });
}
