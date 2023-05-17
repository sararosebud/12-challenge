const connection = require('./db/connection')

class Db {
    constructor(connection) {
        this.connection = connection;
    }

viewAllDepartments() {
    return this.connection.promise().query('SELECT department.id, department.dept_name FROM department') 
    
}  


viewAllRoles() {
  return this.connection.promise().query(`
    SELECT 
      role.id,
      role.title,
      role.salary,
      role.department_id,
      department.dept_name AS department_name
    FROM role
    INNER JOIN department ON role.department_id = department.id
  `);
}

viewAllEmployees() {
  return this.connection.promise().query(`
    SELECT 
      employee.id,
      employee.first_name,
      employee.last_name,
      role.title AS role_title,
      department.dept_name AS department_name,
      CONCAT(manager.first_name, ' ', manager.last_name) AS manager_name,
      employee.department_id,
      employee.role_id,
      role.salary
    FROM employee
    INNER JOIN role ON employee.role_id = role.id
    INNER JOIN department ON employee.department_id = department.id
    LEFT JOIN employee AS manager ON employee.manager_id = manager.id
  `);
}


addDepartment(newDepartmentName) {
    return this.connection.promise().query(
        "INSERT INTO department (dept_name) VALUES (?)",
        newDepartmentName
    )
}

addEmployee(firstName, lastName, roleTitle, departmentId, managerId) {
    return this.connection.promise().query(
        "INSERT INTO employee (first_name, last_name, role_id, department_id, manager_id) VALUES (?, ?, ?, ?, ?)",
        [firstName, lastName, roleTitle, departmentId, managerId]
    );

    }
addRole(newRole, newRoleSalary, newRoleDepartment) {
    return this.connection.promise().query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",
    [newRole, newRoleSalary, newRoleDepartment] );
}


departmentChoices() {
    return this.connection.promise().query("SELECT id, dept_name FROM department")
      .then(([rows]) => {
        return rows.map(row => {
          return {
            name: `${row.id} - ${row.dept_name}`,
            value: row.id
          };
        });
      });
  }

  roleChoices() {
    return this.connection.promise().query("SELECT id, title FROM role")
    .then(([rows]) => {
      return rows.map(row => {
        return {
          name: `${row.id} - ${row.title}`,
          value: row.id
        };
      });
    });
  }
  
  managerChoices() {
    return this.connection.promise().query("SELECT manager_id, first_name, last_name FROM employee")
    .then(([rows]) => {
      return rows.map(row => {
        return {
          name: `${row.manager_id} - ${row.first_name} ${row.last_name}`,
          value: row.manager_id
        };
      });
    });
  }

  updateEmployeeRole(employeeId, newRoleId) {
    // Check if the newRoleId exists in the role table
    return this.connection
      .promise()
      .query("SELECT id FROM role WHERE id = ?", newRoleId)
      .then(([rows]) => {
        if (rows.length === 0) {
          throw new Error(`Role with id ${newRoleId} does not exist.`);
        }
  
        // Retrieve the department_id and department_name associated with the newRoleId
        return this.connection
          .promise()
          .query(
            "SELECT department_id, dept_name FROM role INNER JOIN department ON role.department_id = department.id WHERE role.id = ?",
            newRoleId
          )
          .then(([result]) => {
            const { department_id, dept_name } = result[0];
  
            // Update the employee's role, department_id, and department_name
            return this.connection.promise().query(
              "UPDATE employee " +
              "SET role_id = ?, department_id = ?, department_name = ? " +
              "WHERE id = ?",
              [newRoleId, department_id, dept_name, employeeId]
            );
          });
      });
  }
  
  
  
  

}

module.exports = Db