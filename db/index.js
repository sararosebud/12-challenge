const connection = require('./connection')

class Db {
    constructor(connection) {
        this.connection = connection;
    }

viewAllDepartments() {
    return this.connection.promise().query('SELECT department.id, department.dept_name FROM department') 
    
}  


viewAllRoles() {
    return this.connection.promise().query('SELECT role.id, role.title, role.salary, role.department_id FROM role')
}

viewAllEmployees() {
    return this.connection.promise().query('SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, employee.department_id, employee.manager_id FROM employee')
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

}

module.exports = Db